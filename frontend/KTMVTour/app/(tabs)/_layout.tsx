import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";

const layout = () => {
  return (
    <Tabs>
      {/* Making sure all the top navbar route sections created by native are hidden */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
        }}
      />

      <Tabs.Screen
        name="tours"
        options={{
          title: "Tours",
          headerShown: false,
        }}
      />

      <Tabs.Screen
        name="community"
        options={{
          title: "Community",
          headerShown: false,
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
        }}
      />
    </Tabs>
  );
};

export default layout;
