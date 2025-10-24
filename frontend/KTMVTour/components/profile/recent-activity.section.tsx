import { View, Text } from "react-native";
import React from "react";
import { Clock, MapPin, Camera } from "lucide-react-native";

const RecentActivitySection = () => {
  return (
    <View className="mt-8 pb-10 min-w-[90vw] bg-post shadow-2xl border border-border rounded-2xl">
      <View className=" flex-col mt-8">
        <View className="pl-7 flex-row gap-2 items-center">
          <Clock color={"#8B5CF6"} size={20} />
          <Text className="text-white text-lg">Recent Activity</Text>
        </View>

        {/* Fields */}
        <View className="pl-7 mt-6">
          {/* Check in field */}
          <View>
            <View className="flex-row gap-3 items-center">
              <View className="py-3 bg-bg w-10 items-center rounded-lg">
                <MapPin size={16} color={"#8B5CF6"} />
              </View>
              <View>
                <Text className="text-white">Visited Swayambhunath Temple</Text>
                <Text className="text-secondary text-sm">2 days ago</Text>
              </View>
            </View>
            {/* Line Break */}
            <View className="border-[0.2px] border-secondary w-[80vw] mt-3"></View>
          </View>

          {/* Photos field */}
          <View className="mt-4">
            <View className="flex-row gap-3 items-center">
              <View className="py-3 bg-bg w-10 items-center rounded-lg">
                <Camera size={16} color={"#8B5CF6"} />
              </View>
              <View>
                <Text className="text-white">Posted 3 photos at Durbar Square</Text>
                <Text className="text-secondary text-sm">5 days ago</Text>
              </View>
            </View>
            {/* Line Break */}
            <View className="border-[0.2px] border-secondary w-[80vw] mt-3"></View>
          </View>

          
          <View className="mt-4">
            <View className="flex-row gap-3 items-center">
              <View className="py-3 bg-bg w-10 items-center rounded-lg">
                <MapPin size={16} color={"#8B5CF6"} />
              </View>
              <View>
                <Text className="text-white">Visited Boudhanath Stupa</Text>
                <Text className="text-secondary text-sm">1 week ago</Text>
              </View>
            </View>
          </View>

        </View>
      </View>
    </View>
  );
};

export default RecentActivitySection;
