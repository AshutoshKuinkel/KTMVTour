import { View, Text } from "react-native";
import React from "react";
import { Camera, Plus,MapPin } from "lucide-react-native";

const ShareExperienceCard = () => {
  return (
    <View className="bg-card mt-12 w-[90vw] rounded-2xl border border-border flex items-center shadow-xl">
      <View className="flex flex-col items-center justify-center">
        {/* Plus logo */}
        <View className="bg-button p-5 rounded-full mt-5">
          <Plus color={"white"} size={40} />
        </View>

        {/* Text */}
        <View className="mt-4">
          <Text className="text-white text-2xl font-semibold text-center">
            Share your experience today
          </Text>
        </View>

        {/* Text */}
        <View className="mt-4">
          <Text className="text-secondary text-md text-center max-w-[80vw] font-semibold">
            Let others discover Kathmandu through your eyes
          </Text>
        </View>

        {/* Find nearby landmarks button */}
        <View className="mt-6 w-[80vw] pb-7">
          <View className="flex-row items-center bg-button justify-center rounded-lg py-3 hover:cursor-pointer gap-4">
            <Camera size={20} color={"white"} />
            <Text className="text-white text-lg font-semibold">
              Share your Moment
            </Text>
          </View>

          <View className="flex-row items-center bg-black border border-border justify-center rounded-lg py-3 hover:cursor-pointer gap-4 mt-4">
            <MapPin size={20} color={"white"} />
            <Text className="text-white text-lg font-semibold">
              Check In at Location
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ShareExperienceCard;
