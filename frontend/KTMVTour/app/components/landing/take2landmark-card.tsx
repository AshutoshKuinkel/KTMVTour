import { View, Text } from 'react-native'
import React from 'react'
import { MapPin, Navigation } from 'lucide-react-native'

const TakeToLandmark = () => {
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
              <View className="flex-row items-center bg-button justify-center rounded-lg py-3 hover:cursor-pointer gap-3">
                <MapPin size={20} color={"white"} />
                <Text className="text-white text-lg font-semibold">
                  Find Nearby Landmarks
                </Text>
              </View>
            </View>
          </View>
        </View>
  )
}

export default TakeToLandmark