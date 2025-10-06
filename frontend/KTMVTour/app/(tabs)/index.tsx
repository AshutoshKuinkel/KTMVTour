import { Text, View, Button } from "react-native";
import { Navigation,MapPin } from 'lucide-react-native'

export default function Index() {
  return (
    <View className="flex-1 items-center pt-10 bg-black">
      {/* Page heading */}
      <View className="">
        <Text className="text-4xl text-center font-bold text-white mt-14 mx-3">
          Discover Kathmandu
        </Text>
        <Text className="text-center text-secondary mt-2 text-xl mx-3">
          Your ultimate guide to the cultural heart of Nepal.
        </Text>
      </View>

      {/* Take me to landmark card */}
      <View className="bg-[#161120] mt-12 w-[90vw] rounded-2xl border-[#2d1b69] flex items-center">
        <View className="flex flex-col items-center justify-center">

          {/* Nav logo */}
          <View className="bg-[#2C1F48] p-5 rounded-full mt-5">
            <Navigation color={'#8B5CF6'} size={40}/>
          </View>

          {/* Text */}
          <View className="mt-4">
            <Text className="text-white text-2xl font-semibold">Take me to a nearby landmark</Text>
          </View>

          {/* Text */}
          <View className="mt-4">
            <Text className="text-secondary text-md text-center max-w-[80vw] font-semibold">Discover the closest historical and cultural sites around you</Text>
          </View>

          {/* Find nearby landmarks button */}
          <View className="mt-4 w-[80vw] pb-7">
            <View className="flex-row items-center bg-button justify-center rounded-lg py-1 hover:cursor-pointer gap-3">
              <MapPin size={20} color={'white'}/>
              <Text className="text-white text-lg font-semibold">Find Nearby Landmarks</Text>
            </View>
            
          </View>
        </View>
      </View>
    </View>
  );
}
