import { View, Text, TextInput, Pressable } from "react-native";
import React, { useRef, useState } from "react";
import { User, Pencil, Save, Camera } from "lucide-react-native";
import { getItem, setItem} from "@/src/store/storage";
import { useMutation } from "@tanstack/react-query";
import { updateProfileAPI } from "@/src/api/user.api";
import Toast from "react-native-toast-message";
import { IUser } from "@/src/types/user.types";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { profileSchema } from "@/src/schema/user.schema";
import { useAuthStore } from "@/src/store/auth.store";

const BasicInfoSection = () => {
  const {user} = useAuthStore()
  const [isEditing, setIsEditing] = useState(false);
  const payloadRef = useRef<Partial<IUser>>({}); //using a useRef hook to update without rerendering + hold current payload.

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: user?.username,
      email: user?.email,
      password: "",
    },
    resolver: yupResolver(profileSchema),
    mode: "all",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: updateProfileAPI,
    mutationKey: ["update_profile_key"],
    onSuccess: (response,variables) => {
      // updating user key to our updated values
      const updatedUser = {...user,...variables}
      setItem('user',updatedUser) 

      Toast.show({
        type: "success",
        text1: response.message ?? "Profile Updated",
        position: "top",
      });
      setIsEditing(false);
    },
    onError: (err) => {
      console.log("Error occurred:", err);
      Toast.show({
        type: "error",
        text1:
          err?.message ?? "Error updating profile. Please try again later.",
        position: "top",
      });
    },
  });

  const handlePress = () => {
    setIsEditing(true);
  };

  const onSubmit = (data: IUser) => {
    const payload: Partial<IUser> = {} //purpose of this partial is to help make all the fields we defined in our type optional.

    if (data.username !== user?.username) {
      payload.username = data.username
    }
    if (data.email !== user?.email) {
      payload.email = data.email;
    }
    if (data.password && data.password.trim() !== "") {
      payload.password = data.password
    }

    // making sure theres at least one field to update
    if (Object.keys(payload).length === 0) {
      Toast.show({
        type: "error",
        text1: "Nothing to update",
        position: "top",
      });
      setIsEditing(false);
      return;
    }
    payloadRef.current = payload //making sure our current payload is updated to our payload ref so it stores updated values.
    mutate(payload as IUser);
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
              {isPending ? (
                <Text className="text-border">Saving...</Text>
              ) : (
                <Text className="text-border">Save</Text>
              )}
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
                  onChangeText={onChange}
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
                  onChangeText={onChange}
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
                  onChangeText={onChange}
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
                  onChangeText={onChange}
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
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  secureTextEntry={true}
                  placeholderTextColor={"white"}
                  placeholder="********"
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
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  secureTextEntry={true}
                  editable={false}
                  placeholderTextColor={"#9ca3af"}
                  placeholder="********"
                  className="border border-secondary active:border-border p-3 rounded-lg w-[90%] mx-auto text-secondary"
                  style={{
                    color: "#9ca3af",
                  }}
                />
              )}
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
    </View>
  );
};

export default BasicInfoSection;
