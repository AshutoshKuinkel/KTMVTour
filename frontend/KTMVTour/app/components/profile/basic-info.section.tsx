import { View, Text, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import { User, Pencil, Save, Camera } from "lucide-react-native";
import { getItem } from "@/src/store/storage";

const BasicInfoSection = () => {
  const user = getItem("user");
  const [isEditing, setIsEditing] = useState(false);

  const handlePress = () => {
    setIsEditing(true);
  };

  const onSubmit = () => {
    setIsEditing(false);
  };
  return (
    <View className="mt-8 pb-6 min-w-[90vw] bg-post shadow-2xl border border-border rounded-2xl">
      <View className=" flex-col mt-8">
        <View className="justify-between flex-row pr-7">
          <View className="pl-7 flex-row gap-2 items-center">
            <User color={"#8B5CF6"} />
            <Text className="text-white text-lg">Basic Information</Text>
          </View>

          {isEditing ? (
            <Pressable
              className="flex-row items-center gap-2 bg-button p-3 rounded-lg"
              onPress={onSubmit}
            >
              <Save size={16} color={"#2d1b69"} />
              <Text className="text-border">Save</Text>
            </Pressable>
          ) : (
            <Pressable
              className="flex-row items-center gap-2 bg-button p-3 rounded-lg"
              onPress={handlePress}
            >
              <Pencil size={16} color={"#2d1b69"} />
              <Text className="text-border">Edit</Text>
            </Pressable>
          )}
        </View>

        {/* Input fields */}
        {/* Username field */}
        <View className="mt-4">
          <View className="flex items-start mt-2 mb-2 pl-7">
            <Text className="text-secondary text-start">Username</Text>
          </View>
          {isEditing ? (
            <TextInput
              placeholder={user.username}
              placeholderTextColor={"white"}
              className="border border-white active:border-border p-3 rounded-lg w-[90%] mx-auto text-white"
              style={{
                color: "white",
              }}
            />
          ) : (
            <TextInput
              placeholder={user.username}
              placeholderTextColor={"grey"}
              className="border border-secondary active:border-border p-3 rounded-lg w-[90%] mx-auto text-white"
              editable={false}
              style={{
                color: "white",
              }}
            />
          )}
        </View>

        {/* Email field */}
        <View className="mt-3">
          <View className="flex items-start mt-2 mb-2 pl-8">
            <Text className="text-secondary text-start">Email</Text>
          </View>

          {isEditing ? (
            <TextInput
              placeholder={user.email}
              placeholderTextColor={"white"}
              className="border border-white active:border-border p-3 rounded-lg w-[90%] mx-auto text-white"
              style={{
                color: "white",
              }}
            />
          ) : (
            <TextInput
              placeholder={user.email}
              placeholderTextColor={"grey"}
              className="border border-secondary active:border-border p-3 rounded-lg w-[90%] mx-auto text-white"
              editable={false}
              style={{
                color: "white",
              }}
            />
          )}
        </View>

        {/* Password field */}
        <View className="mt-3">
          <View className="flex items-start mt-2 mb-2 pl-7">
            <Text className="text-secondary text-start">Password</Text>
          </View>

          {isEditing ? (
            <TextInput
              placeholder="********"
              secureTextEntry={true}
              placeholderTextColor={"white"}
              className="border border-white active:border-border p-3 rounded-lg w-[90%] mx-auto text-white"
              style={{
                color: "white",
              }}
            />
          ) : (
            <TextInput
              placeholder="********"
              secureTextEntry={true}
              placeholderTextColor={"grey"}
              className="border border-secondary active:border-border p-3 rounded-lg w-[90%] mx-auto text-white"
              editable={false}
              style={{
                color: "white",
              }}
            />
          )}
        </View>

        {isEditing && (
          <View className="items-center mt-6">
            <Text className="text-secondary mb-2">Change Profile Picture:</Text>
            <View className="py-6 bg-bg w-20 items-center rounded-full">
              <Camera size={24} color={"#8B5CF6"} />
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default BasicInfoSection;
