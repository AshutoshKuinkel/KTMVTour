import { View, Text } from "react-native";
import React from "react";
import{
  Camera,
  useCameraDevice,
  useCameraPermission,
} from "react-native-vision-camera";

const tours = () => {
  const device = useCameraDevice("back");

  const { hasPermission } = useCameraPermission();

  if (!hasPermission)
    return console.log(`Permission not obtained to use RN Vision Camera`);
  if (device == null) return console.log(`Can't find camera on device.`);

  return (
    <View className="flex-1 items-center pt-8 bg-black">
      <Text className="text-4xl font-bold text-white mt-14">Tours</Text>
      <Camera device={device} isActive={true} />
    </View>
  ); 
};

export default tours;
