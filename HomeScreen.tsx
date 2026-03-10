import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { API_ENDPOINTS } from "./lib/api";

const { width } = Dimensions.get("window");

type SpotlightAnime = {
  id: string;
  name: string;
  poster: string;
  description?: string;
};

type TopAiringAnime = {
  id: string;
  name: string;
  jname?: string;
  poster: string;
};

type HomeData = {
  spotlightAnimes: SpotlightAnime[];
  topAiringAnimes: TopAiringAnime[];
};

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  const [data, setData] = useState<HomeData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchHome = async () => {
      try {
        setLoading(true);
        const res = await fetch(API_ENDPOINTS.home);
        const json = await res.json();
        const d = json?.data || json;
        setData({
          spotlightAnimes: d?.spotlightAnimes ?? [],
          topAiringAnimes: d?.topAiringAnimes ?? [],
        });
      } catch (e) {
        // optionally handle error UI here
      } finally {
        setLoading(false);
      }
    };

    fetchHome();
  }, []);

  const spotlight = data?.spotlightAnimes ?? [];
  const topAiring = data?.topAiringAnimes ?? [];

  const sliderRef = useRef<FlatList<SpotlightAnime>>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const spotlightData: SpotlightAnime[] =
    loading && !spotlight.length
      ? Array.from({ length: 3 }).map((_, index) => ({
          id: `skeleton-${index}`,
          name: "",
          poster: "",
          description: "",
        }))
      : spotlight;

  const activeAnime =
    spotlightData.length > 0
      ? spotlightData[Math.min(currentSlide, spotlightData.length - 1)]
      : null;

  // Auto-advance hero slider every 7 seconds
  useEffect(() => {
    if (!spotlightData.length) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => {
        const next = (prev + 1) % spotlightData.length;
        if (sliderRef.current) {
          try {
            sliderRef.current.scrollToIndex({ index: next, animated: true });
          } catch {
            // ignore out-of-range errors while list is updating
          }
        }
        return next;
      });
    }, 7000);

    return () => clearInterval(interval);
  }, [spotlightData.length]);

  return (
    <View className="flex-1 bg-background">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 96 }}
      >
        {/* Hero slider */}
        <View className="mb-6 pt-4">
          <FlatList
            ref={sliderRef}
            data={spotlightData}
            keyExtractor={(item: SpotlightAnime, index) =>
              item?.id ? `${item.id}-${index}` : String(index)
            }
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            contentContainerStyle={{}}
            onMomentumScrollEnd={(e) => {
              const index = Math.round(
                e.nativeEvent.contentOffset.x / width
              );
              if (!Number.isNaN(index)) {
                setCurrentSlide(index);
              }
            }}
            renderItem={({ item }) => {
              const skeleton = !item?.id;
              return (
                <TouchableOpacity
                  activeOpacity={0.85}
                  style={{ width }}
                  onPress={() =>
                    item?.id &&
                    navigation.navigate("AnimeDetail", {
                      id: item.id,
                      name: item.name,
                      poster: item.poster,
                    })
                  }
                >
                  <View className="h-80 overflow-hidden bg-gray-900">
                    {skeleton ? (
                      <View className="flex-1 bg-gray-800" />
                    ) : (
                      <Image
                        source={{ uri: item.poster }}
                        style={{ width: "100%", height: "100%" }}
                        resizeMode="cover"
                      />
                    )}
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>

        {/* Hero content overlaid on slider (stays fixed while background slides) */}
        {activeAnime && (
          <View className="px-5 mt-[-80] mb-8">
            <View className="rounded-3xl bg-[rgba(15,23,42,0.88)] px-5 py-4">
              <Text
                className="text-2xl font-bold text-foreground mb-1"
                numberOfLines={1}
              >
                {activeAnime.name}
              </Text>
              {activeAnime.description ? (
                <Text
                  className="text-xs text-gray-300 mb-4"
                  numberOfLines={2}
                >
                  {activeAnime.description}
                </Text>
              ) : null}

              <View className="flex-row items-center gap-3">
                <TouchableOpacity
                  activeOpacity={0.9}
                  className="px-5 py-2.5 rounded-full bg-red-600"
                  onPress={() =>
                    activeAnime?.id &&
                    navigation.navigate("AnimeDetail", {
                      id: activeAnime.id,
                      name: activeAnime.name,
                      poster: activeAnime.poster,
                    })
                  }
                >
                  <Text className="text-white font-semibold text-sm">
                    ▶ Play
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.9}
                  className="px-5 py-2.5 rounded-full border border-gray-300/70 bg-black/40"
                >
                  <Text className="text-foreground font-semibold text-sm">
                    ＋ My List
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}

        {/* Top Airing section */}
        <View className="px-4 mb-4 flex-row items-center justify-between">
          <View>
            <Text className="text-lg font-semibold text-foreground">
              Top Airing Anime
            </Text>
            <Text className="text-xs text-gray-400">
              Live data from Aniwatch API
            </Text>
          </View>
        </View>

        <View className="px-2 mb-4 flex-row flex-wrap">
          {(loading && !topAiring.length ? Array.from({ length: 6 }) : topAiring).map(
            (item: any, index) => {
              const skeleton = !item?.id;
              const key = item?.id ? `${item.id}-${index}` : `top-${index}`;
              return (
                <TouchableOpacity
                  key={key}
                  className="w-1/3 p-2"
                  activeOpacity={0.85}
                  onPress={() =>
                    item?.id &&
                    navigation.navigate("AnimeDetail", {
                      id: item.id,
                      name: item.name,
                      poster: item.poster,
                    })
                  }
                >
                  <View className="rounded-xl bg-gray-800 border border-gray-700 overflow-hidden">
                    {skeleton ? (
                      <View className="h-28 bg-gray-700" />
                    ) : (
                      <Image
                        source={{ uri: item.poster }}
                        style={{ width: "100%", height: 110 }}
                        resizeMode="cover"
                      />
                    )}
                    <View className="p-2">
                      <Text
                        className="text-xs font-semibold text-foreground"
                        numberOfLines={1}
                      >
                        {skeleton ? "Loading..." : item.name}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }
          )}
        </View>
      </ScrollView>

      {/* Persistent bottom navigation bar */}
      <View className="absolute left-0 right-0 bottom-0 bg-gray-900/95 border-t border-gray-800">
        <View className="flex-row items-center justify-around py-2">
          <TouchableOpacity className="items-center">
            <Text className="text-blue-500 text-xl mb-0.5">⌂</Text>
            <Text className="text-xs font-medium text-blue-500">Home</Text>
          </TouchableOpacity>

          <TouchableOpacity className="items-center">
            <Text className="text-gray-400/80 text-xl mb-0.5">📅</Text>
            <Text className="text-xs font-medium text-gray-400">Schedule</Text>
          </TouchableOpacity>

          <TouchableOpacity className="items-center">
            <Text className="text-gray-400/80 text-xl mb-0.5">🔖</Text>
            <Text className="text-xs font-medium text-gray-400">My List</Text>
          </TouchableOpacity>

          <TouchableOpacity className="items-center">
            <Text className="text-gray-400/80 text-xl mb-0.5">👤</Text>
            <Text className="text-xs font-medium text-gray-400">Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

