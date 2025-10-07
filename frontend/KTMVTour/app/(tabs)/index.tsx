import { View, ScrollView } from "react-native";
import Heading from "../components/landing/heading";
import TakeToLandmark from "../components/landing/take2landmark-card";
import InteractiveMapCard from "../components/landing/interactiveMap-card";

export default function Index() {
  return (
    <ScrollView
      bounces={false}
      showsVerticalScrollIndicator={false}
      decelerationRate="fast"
      scrollEventThrottle={16}
    >
      <View className="flex-1 items-center pt-10 bg-black h-screen pb-10">
        {/* Page heading */}
        <Heading />

        {/* Take me to landmark card */}
        <TakeToLandmark />

        {/* Interactive map card */}
        <InteractiveMapCard />
      </View>
    </ScrollView>
  );
}
