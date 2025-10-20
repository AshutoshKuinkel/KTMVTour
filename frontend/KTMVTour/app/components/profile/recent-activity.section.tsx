import { View, Text } from "react-native";
import React from "react";
import {Clock} from 'lucide-react-native'

const RecentActivitySection = () => {
  return (
    <View className="mt-8 pb-10 min-w-[90vw] bg-post shadow-2xl border border-border rounded-2xl">
      <View className=" flex-col mt-8">
        <View className="pl-7 flex-row gap-2 items-center">
          <Clock color={"#8B5CF6"} size={20}/>
          <Text className="text-white text-lg">Recent Activity</Text>
        </View> 
        {/* Input fields */}
      </View>
    </View>
  );
};

export default RecentActivitySection;
