import { View, Text, TextInput } from "react-native";
import React from "react";
import { User } from "lucide-react-native";
import { getItem } from "@/src/store/storage";

const BasicInfoSection = () => {
  const user = getItem("user");
  return (
    <View className="mt-8 pb-10 min-w-[90vw] bg-post shadow-2xl border border-border rounded-2xl">
      <View className=" flex-col mt-8">
        <View className="pl-7 flex-row gap-2 items-center">
          <User color={"#8B5CF6"} />
          <Text className="text-white text-lg">Basic Information</Text>
        </View>
        {/* Input fields */}
        {/* Username field */}
        <View className="mt-4">
          <View className="flex items-start mt-2 mb-2 pl-7">
            <Text className="text-secondary text-start">Username</Text>
          </View>
          <TextInput
            placeholder={user.username}
            placeholderTextColor={"grey"}
            className="border border-secondary active:border-border p-3 rounded-lg w-[90%] mx-auto text-white"
            style={{
              color: "white",
            }}
          />
        </View>

        {/* Email field */}
        <View className="mt-3">
          <View className="flex items-start mt-2 mb-2 pl-8">
            <Text className="text-secondary text-start">Email</Text>
          </View>

          <TextInput
            placeholder={user.email}
            placeholderTextColor={"grey"}
            className="border border-secondary active:border-border p-3 rounded-lg w-[90%] mx-auto text-white"
            style={{
              color: "white",
            }}
          />
        </View>

        {/* Password field */}
        <View className="mt-3">
          <View className="flex items-start mt-2 mb-2 pl-7">
            <Text className="text-secondary text-start">Password</Text>
          </View>

          <TextInput
            placeholder="********"
            secureTextEntry={true}
            placeholderTextColor={"grey"}
            className="border border-secondary active:border-border p-3 rounded-lg w-[90%] mx-auto text-white"
            style={{
              color: "white",
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default BasicInfoSection;
