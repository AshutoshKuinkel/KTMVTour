import { View, Text, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import {
  User,
  Pencil,
  Save,
  Camera,
  CircleAlertIcon,
  CircleCheck,
} from "lucide-react-native";
import { getItem } from "@/src/store/storage";
import { useMutation } from "@tanstack/react-query";
import { updateProfileAPI } from "@/src/api/user.api";
import { Toast } from "toastify-react-native";
import ToastManager from "toastify-react-native/components/ToastManager";
import { IUser } from "@/src/types/user.types";
import RNRestart from "react-native-restart";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { profileSchema } from "@/src/schema/user.schema";

const toastConfig = {
  success: (props: any) => (
    <View className="bg-post p-4 rounded-2xl flex-row items-center gap-3">
      <CircleCheck color={"#8B5CF6"} fontWeight={"bold"} />
      <Text className="text-white font-bold">{props.text1}</Text>
    </View>
  ),

  error: (props: any) => (
    <View className="bg-post p-4 rounded-2xl flex-row items-center gap-3 max-w-[90vw]">
      <CircleAlertIcon color={"#8B5CF6"} fontWeight={"bold"} />
      <Text className="text-white font-bold text-center max-w-[90vw]">
        {props.text1}
      </Text>
    </View>
  ),
};

const BasicInfoSection = () => {
  const user = getItem("user");
  const [isEditing, setIsEditing] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: user.username,
      email: user.email,
      password: user.password,
    },
    resolver: yupResolver(profileSchema),
    mode: "all",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: updateProfileAPI,
    mutationKey: ["update_profile_key"],
    onSuccess: (response) => {
      setTimeout(
        () => Toast.success(response?.message ?? "Profile Updated", "top"),
        500
      );
      RNRestart.restart();
    },
    onError: (err) => {
      Toast.error(
        err?.message ?? "Error updating profile. Please try again later.",
        "top"
      );
    },
  });

  const handlePress = () => {
    setIsEditing(true);
  };

  const onSubmit = (data: IUser) => {
    (mutate(data), setIsEditing(false));
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
              onPress={handleSubmit(onSubmit)}
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
            <Controller
              control={control}
              name="username"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  placeholderTextColor={"white"}
                  className="border border-white active:border-border p-3 rounded-lg w-[90%] mx-auto text-white"
                  style={{
                    color: "white",
                  }}
                />
              )}
            />
          ) : (
            <Controller
              control={control}
              name="username"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  editable={false}
                  placeholderTextColor={"white"}
                  className="border border-secondary active:border-border p-3 rounded-lg w-[90%] mx-auto text-secondary"
                  style={{
                    color: "#9ca3af",
                  }}
                />
              )}
            />
          )}
        </View>

        {/* Email field */}
        <View className="mt-3">
          <View className="flex items-start mt-2 mb-2 pl-8">
            <Text className="text-secondary text-start">Email</Text>
          </View>

          {isEditing ? (
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  placeholderTextColor={"white"}
                  className="border border-white active:border-border p-3 rounded-lg w-[90%] mx-auto text-white"
                  style={{
                    color: "white",
                  }}
                />
              )}
            />
          ) : (
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  editable={false}
                  placeholderTextColor={"white"}
                  className="border border-secondary active:border-border p-3 rounded-lg w-[90%] mx-auto text-secondary"
                  style={{
                    color: "#9ca3af",
                  }}
                />
              )}
            />
          )}
          {errors.email && (
            <Text className="text-red-500 text-xs pl-8 mt-1">
              Invalid Email Format
            </Text>
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

        {/* Implement this once ready {change profile picture} */}
        {/* {isEditing && (
          <View className="items-center mt-6">
            <Text className="text-secondary mb-2">Change Profile Picture:</Text>
            <View className="py-6 bg-bg w-20 items-center rounded-full">
              <Camera size={24} color={"#8B5CF6"} />
            </View>
          </View>
        )} */}
      </View>
      <ToastManager config={toastConfig} />
    </View>
  );
};

export default BasicInfoSection;
