import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { API_ENDPOINTS } from "./lib/api";

type RouteParams = {
  id: string;
  name?: string;
  poster?: string;
};

type Episode = {
  number: number;
  title?: string;
  episodeId: string;
};

type RecommendedAnime = {
  id: string;
  name: string;
  poster: string;
};

export default function AnimeDetailScreen() {
  const route = useRoute() as { params: RouteParams };
  const navigation = useNavigation<any>();
  const { id, name: routeName, poster: routePoster } = route.params || {};

  const [title, setTitle] = useState(routeName ?? "");
  const [poster, setPoster] = useState(routePoster ?? "");
  const [description, setDescription] = useState("");
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [recommended, setRecommended] = useState<RecommendedAnime[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    if (!id) return;
    const fetchDetail = async () => {
      try {
        setLoading(true);

        const [infoRes, epRes] = await Promise.all([
          fetch(API_ENDPOINTS.anime(id)),
          fetch(API_ENDPOINTS.episodes(id)),
        ]);

        const infoJson = await infoRes.json();
        const epJson = await epRes.json();

        const animeData = infoJson?.data?.anime;
        const first = Array.isArray(animeData) ? animeData[0] : animeData;
        const info = first?.info ?? first;
        const moreInfo = first?.moreInfo;

        setTitle(info?.name ?? routeName ?? "");
        setPoster(info?.poster ?? routePoster ?? "");
        setDescription(info?.description ?? moreInfo?.description ?? "");

        const epsRaw = epJson?.data?.episodes ?? [];
        setEpisodes(
          Array.isArray(epsRaw)
            ? epsRaw.map((e: any) => ({
                number: e.number,
                title: e.title,
                episodeId: e.episodeId,
              }))
            : []
        );

        const rec = infoJson?.data?.recommendedAnimes ?? [];
        setRecommended(
          Array.isArray(rec)
            ? rec.map((a: any) => ({
                id: a.id,
                name: a.name,
                poster: a.poster,
              }))
            : []
        );
      } catch (e) {
        // basic error swallow; could add toast/log
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  return (
    <View className="flex-1 bg-background">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 96 }}
      >
        {/* Hero image */}
        <View className="h-80 bg-gray-900">
          {poster ? (
            <Image
              source={{ uri: poster }}
              style={{ width: "100%", height: "100%" }}
              resizeMode="cover"
            />
          ) : null}
        </View>

        {/* Title + meta + actions */}
        <View className="px-4 py-5">
          <Text className="text-2xl font-bold text-foreground mb-1">
            {title}
          </Text>

          {/* Meta row – can be enriched with real data later */}
          <Text className="text-[11px] text-gray-400 mb-3">
            HD • Sub / Dub • Anime
          </Text>

          <View className="flex-row items-center gap-3 mb-4">
            <TouchableOpacity
              activeOpacity={0.9}
              className="flex-row items-center gap-2 px-6 py-2.5 rounded-full bg-red-600"
            >
              <Text className="text-white font-semibold text-sm">▶ Play</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.9}
              className="flex-row items-center gap-2 px-6 py-2.5 rounded-full bg-gray-800 border border-gray-600"
            >
              <Text className="text-foreground font-semibold text-sm">
                ⬇ Download
              </Text>
            </TouchableOpacity>
          </View>

          {description ? (
            <View className="mb-2">
              <Text
                className="text-xs text-gray-300 leading-relaxed"
                numberOfLines={showFullDescription ? undefined : 4}
              >
                {description}
              </Text>
              {!showFullDescription && description.length > 220 && (
                <TouchableOpacity
                  activeOpacity={0.7}
                  className="mt-1"
                  onPress={() => setShowFullDescription(true)}
                >
                  <Text className="text-[11px] font-semibold text-blue-400">
                    Read more
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          ) : null}
        </View>

        {/* Episodes */}
        <View className="px-4 mb-6">
          <View className="flex-row items-center justify-between mb-2">
            <Text className="text-lg font-semibold text-foreground">
              Episodes
            </Text>
          </View>

          <View className="rounded-2xl bg-gray-900 border border-gray-800 mb-3 px-3 py-2">
            <Text className="text-xs text-gray-500">Search episode</Text>
          </View>

          {episodes.length > 0 && (
            <FlatList
              data={episodes}
              keyExtractor={(ep) => ep.episodeId}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingVertical: 6, paddingRight: 16 }}
              renderItem={({ item: ep }) => (
                <TouchableOpacity
                  activeOpacity={0.9}
                  className="mr-3 w-44 rounded-2xl bg-gray-900 border border-gray-800 overflow-hidden"
                >
                  <View className="h-24 bg-gray-800 items-center justify-center">
                    <Text className="text-white text-lg">▶</Text>
                  </View>
                  <View className="px-3 py-2">
                    <Text className="text-xs text-gray-400 mb-0.5">
                      Episode {ep.number}
                    </Text>
                    {ep.title ? (
                      <Text
                        className="text-sm font-semibold text-foreground"
                        numberOfLines={2}
                      >
                        {ep.title}
                      </Text>
                    ) : null}
                  </View>
                </TouchableOpacity>
              )}
            />
          )}
        </View>

        {/* Recommended / More like this */}
        {recommended.length > 0 && (
          <View className="px-4 mb-6">
            <Text className="text-lg font-semibold text-foreground mb-3">
              More like this
            </Text>
            <FlatList
              data={recommended}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingRight: 16 }}
              renderItem={({ item }) => (
                <TouchableOpacity
                  activeOpacity={0.85}
                  className="mr-3 w-36"
                  onPress={() =>
                    navigation.push("AnimeDetail", {
                      id: item.id,
                      name: item.name,
                      poster: item.poster,
                    })
                  }
                >
                  <View className="rounded-xl overflow-hidden bg-gray-800 mb-2">
                    <Image
                      source={{ uri: item.poster }}
                      style={{ width: "100%", height: 150 }}
                      resizeMode="cover"
                    />
                  </View>
                  <Text
                    className="text-xs text-foreground font-semibold"
                    numberOfLines={2}
                  >
                    {item.name}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
}

