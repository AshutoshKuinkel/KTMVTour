import { Map, MapPin } from "lucide-react-native";
import { View, Text } from "react-native";
import LinearGradient from "react-native-linear-gradient";

const InteractiveMapCard = () => {
  return (
    <View className="bg-post w-[90vw] mt-12 rounded-2xl border border-border h-[400px] ">
      {/* Image of card for loading state */}
      <LinearGradient
        colors={["1f1f1f","rgba(45, 27, 105, 0.2)"]}
        className="w-full bg-gradient-to-br from-[#1f1f1f] to-[#2d1b69]/20 h-[200px] rounded-t-2xl flex items-center justify-center relative"
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View className="">
          <View className="flex flex-col items-center">
            <Map size={60} color={"#8B5CF6"} />
            <Text className="text-secondary animate-pulse">
              Interactive map loading...
            </Text>
          </View>
          <MapPin
            size={24}
            color={"#8B5CF6"}
            className="absolute top-[20%] left-[10%] animate-pulse"
          />
          <MapPin
            size={24}
            color={"#8B5CF6"}
            className="absolute bottom-[10%] left-[15%] animate-pulse"
          />
          <MapPin
            size={24}
            color={"#8B5CF6"}
            className="absolute top-[10%] right-[10%] animate-pulse"
          />
        </View>
      </LinearGradient>
    </View>
  );
};

export default InteractiveMapCard;
