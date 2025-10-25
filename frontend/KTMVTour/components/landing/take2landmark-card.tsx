import { View, Text, Linking, Platform, Pressable } from "react-native";
import React from "react";
import { MapPin, Navigation } from "lucide-react-native";
import * as Location from "expo-location";

interface openMapArgs {
  latitude: string | number;
  longitude: string | number;
}
const TakeToLandmark = () => {
  const openMap = ({ latitude, longitude}: openMapArgs) => {
    const searchQuery = encodeURIComponent('Landmarks near me')
    
    const scheme = Platform.select({
      ios: `maps://?q=${searchQuery}&sll=${latitude},${longitude}`,
      android: `https://www.google.com/maps/search/?api=1&query=${searchQuery}&center=${latitude},${longitude}`,
    });

    if (scheme) {
      Linking.openURL(scheme).catch((err) =>
        console.error("Error opening map: ", err)
      );
    }
  };

  const handleOpenMap = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission denied");
      return;
    }

    const location = await Location.getCurrentPositionAsync({})

    openMap({
      latitude:location.coords.latitude,
      longitude:location.coords.longitude,
    })
  };
  return (
    <View className="bg-card mt-12 w-[90vw] rounded-2xl border border-border flex items-center shadow-xl">
      <View className="flex flex-col items-center justify-center">
        {/* Nav logo */}
        <View className="bg-[#2C1F48] p-5 rounded-full mt-5">
          <Navigation color={"#8B5CF6"} size={40} />
        </View>

        {/* Text */}
        <View className="mt-4">
          <Text className="text-white text-2xl font-semibold text-center">
            Take me to a nearby landmark
          </Text>
        </View>

        {/* Text */}
        <View className="mt-4">
          <Text className="text-secondary text-md text-center max-w-[80vw] font-semibold">
            Discover the closest historical and cultural sites around you
          </Text>
        </View>

        {/* Find nearby landmarks button */}
        <View className="mt-6 w-[80vw] pb-7">
          <Pressable className="flex-row items-center bg-button justify-center rounded-lg py-3 hover:cursor-pointer gap-3" onPress={handleOpenMap}> 
            {/* Convert this into a pressable next so we can call function on press */}
            <MapPin size={20} color={"white"} />
            <Text className="text-white text-lg font-semibold">
              Find Nearby Landmarks
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default TakeToLandmark;
