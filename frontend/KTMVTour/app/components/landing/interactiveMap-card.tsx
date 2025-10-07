import { Map, MapPin } from "lucide-react-native";
import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const InteractiveMapCard = () => {
  return (
    <View className="bg-post w-[90vw] mt-12 rounded-2xl border border-border h-[400px] overflow-hidden">
      {/* Image of card for loading state */}

      <LinearGradient
        colors={["#1f1f1f", "rgba(45, 27, 105, 0.2)"]}
        className=" w-full bg-gradient-to-br from-[#1f1f1f] to-[#2d1b69]/20 h-[200px]  flex items-center justify-center rounded-t-2xl"
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <View className="flex items-center justify-center h-[230px] w-full">
          <View className="flex flex-col items-center justify-center">
            <Map size={60} color={"#8B5CF6"}/>
            <Text className="text-secondary animate-pulse">
              Interactive map loading...
            </Text>
          </View>
          <View className="absolute top-12 left-12 animate-pulse">
            <MapPin size={24} color={"#8B5CF6"} />
          </View>
          <View className="absolute bottom-12 left-8 animate-pulse">
            <MapPin size={24} color={"#8B5CF6"} />
          </View>
          <View className="absolute top-8 right-8 animate-pulse">
            <MapPin size={24} color={"#8B5CF6"} />
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

export default InteractiveMapCard;
