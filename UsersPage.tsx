import { useNavigation } from '@react-navigation/native';
import { View, Text, Button } from 'react-native';

export default function UsersPage() {
  const navigation = useNavigation();

  return (
    <View className="flex-1 items-center justify-center" style={{ backgroundColor: '#000000' }}>
      <Text className="text-white text-3xl font-bold mb-8">Users Page Works! 🎉</Text>
      <View className="w-[90%]">
        <Button 
          title="← Go to Auth Page" 
          onPress={() => navigation.navigate('Auth' as never)}
        />
      </View>
    </View>
  );
}
