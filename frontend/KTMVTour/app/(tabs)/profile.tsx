import { View, Text, ImageBackground, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { useAuthStore } from "@/src/store/auth.store";
import { MMKV } from "react-native-mmkv";
import { removeItem } from "@/src/store/storage";

interface User {
  username: string;
  id: string;
  email: string;
}

const profile = () => {
  const { logout } = useAuthStore();
  const [user, setUser] = useState<User | null>(null);
  const storage = new MMKV();

  useEffect(() => {
    const storedUser = storage.getString("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handlelogout = () => {
    removeItem('user')
    removeItem('KTMVTour_token')
    logout()
    // console.log(user)
  };

  return (
    <View className="flex-1 items-center bg-black">
      <Text className="text-4xl font-bold text-white mt-14">Profile</Text>
      <Text className="text-4xl font-bold text-white mt-2 mb-14">
        Hi {user?.username ?? "guest"}
      </Text>
      <Button title="logout" onPress={handlelogout} />
    </View>
  );
};

export default profile;
