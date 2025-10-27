import { View, Text } from "react-native";
import { Camera, Upload, Trash2Icon } from "lucide-react-native";
import React from "react";

const ChangePictureOptions = () => {
  return (
    <View className="bg-card w-[85vw] rounded-lg pb-10 border-fourth">
      <Text className="text-white font-semibold text-3xl pl-5 mt-6">
        Change Profile Picture
      </Text>

      {/* Icons */}
      <View className="mt-6">
        {/* Take photo + icon */}
        <View className="pl-9">
          <View className="flex-row items-center gap-3">
            <View className="bg-fourth p-2 rounded-full items-center">
              <Camera color={"#8B5CF6"} />
            </View>
            <Text className="text-white text-lg">Take Photo</Text>
          </View>
          {/* Line Break */}
          <View className="border-[0.2px] border-button w-[80%] mt-4 flex itesm"></View>
        </View>

        {/* Upload from photos + icon */}
        <View className="pl-9">
          <View className="flex-row items-center gap-3 mt-6">
            <View className="bg-fourth p-2 rounded-full items-center">
              <Upload color={"#8B5CF6"} />
            </View>
            <Text className="text-white text-lg">Upload from Photos</Text>
          </View>
          {/* Line Break */}
          <View className="border-[0.2px] border-button w-[80%] mt-4 flex itesm"></View>
        </View>

        {/* Delete + icon */}
        <View className="flex-row items-center gap-3 pl-9 mt-6">
          <View className="bg-fourth p-2 rounded-full items-center">
            <Trash2Icon color={"#ef4444"} />
          </View>
          <Text className="text-red-500 text-lg">Delete</Text>
        </View>
      </View>
    </View>
  );
};

export default ChangePictureOptions;
