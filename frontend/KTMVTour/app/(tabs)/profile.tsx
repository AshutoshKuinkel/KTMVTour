import { View, Text, Pressable, TextInput, ScrollView } from "react-native";
import React from "react";
import { useAuthStore } from "@/src/store/auth.store";
import { getItem, removeItem } from "@/src/store/storage";
import { LinearGradient } from "expo-linear-gradient";
import { User } from "lucide-react-native";
import BasicInfoSection from "../components/profile/basic-info.section";
import RecentActivitySection from "../components/profile/recent-activity.section";

const profile = () => {
  const { logout } = useAuthStore();
  const {user} = useAuthStore()

  const handlelogout = () => {
    removeItem("user");
    removeItem("KTMVTour_token");
    logout();
    // console.log(user)
  };

  return (
    <ScrollView
      bounces={false}
      showsVerticalScrollIndicator={false}
      decelerationRate="fast"
      scrollEventThrottle={16}
    >
      <View className="items-center bg-black pb-10">
        {/* Header Section: Gradient + Profile Picture */}
        <View className="relative w-full h-40">
          <LinearGradient
            colors={["#25153e", "#10071b", "#321e55"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ flex: 1 }}
          />

          {/* Profile Picture (Positioned inside gradient) */}
          <View className="absolute left-[5%] bottom-[-55px] bg-third rounded-full p-7 z-10 border-[1px] border-border">
            <User size={60} color={"white"} />
          </View>
        </View>

        {/* Content section {below header} */}
        <View className="mt-16">
          {/* profile name + stats section */}
          <View className="flex items-center">
            <Text className="text-white text-3xl font-semibold">
              {user ? user.username : "Guest"}{" "}
            </Text>
            <Text className="text-secondary text-lg">
              Member since{" "}
              {new Date(user?.createdAt!).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
              })}
            </Text>
            {/* Stats */}
            <View className="mt-2 flex-row gap-8 items-center justify-center">
              {/* Posts stats */}
              <View className="flex items-center">
                <Text className="text-white text-2xl font-semibold">12</Text>
                <Text className="text-white">Posts</Text>
              </View>

              {/* Places visited. */}
              <View className="flex items-center">
                <Text className="text-white text-2xl font-semibold">18</Text>
                <Text className="text-white">Check Ins</Text>
              </View>
            </View>
          </View>

          {/* Basic info section */}
          <BasicInfoSection />

          {/* Recent Activity section */}
          <RecentActivitySection />

          {/* logout button */}
          <Pressable
            onPress={handlelogout}
            className="border border-red-500 w-[90vw] rounded-lg p-2 flex items-center justify-center mt-6"
          >
            <Text className="text-red-500 font-bold text-lg">Logout</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

export default profile;
