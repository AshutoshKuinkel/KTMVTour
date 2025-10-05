import { Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 items-center pt-10 bg-black">
      <View className="">
        <Text className="text-4xl text-center font-bold text-white mt-14 mx-3">
          Discover Kathmandu
        </Text>
        <Text className="text-center text-secondary mt-2 text-xl mx-3">
          Your ultimate guide to the cultural heart of Nepal.
        </Text>
      </View>
    </View>
  );
}
