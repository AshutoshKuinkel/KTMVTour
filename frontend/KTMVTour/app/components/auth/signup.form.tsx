import { View, Text, TextInput, Pressable } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { loginSchema, signupSchema } from "@/src/schema/auth.schema";
import { useMutation } from "@tanstack/react-query";
import { loginAPI, signupAPI } from "@/src/api/auth.api";
import { ILoginData, ISignupData } from "@/src/types/auth.types";
import ToastManager, { Toast } from "toastify-react-native";
import { CircleAlertIcon, CircleCheck } from "lucide-react-native";
import { router } from "expo-router";
import { useAuthStore } from "@/src/store/auth.store";
import { MMKV } from "react-native-mmkv";
import { setItem } from "@/src/store/storage";

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

const SignupForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
    resolver: yupResolver(signupSchema),
    mode: "all",
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["signup_API"],
    mutationFn: signupAPI,
    onSuccess: (response) => {
      setTimeout(
        () =>
          Toast.success(response?.message ?? "Successfully Signed Up", "top"),
        500
      );
      setTimeout(() => router.push("/login"), 1000);
    },
    onError: (err) => {
      Toast.error(
        err?.message ?? `Sorry, we couldn't sign you up at this time.`,
        "top"
      );
    },
  });
  const onSubmit = async (data: ISignupData) => {
    mutate(data);
  };

  return (
    <View className="mt-8 pb-10 min-w-[90vw] bg-post shadow-2xl border border-border rounded-2xl">
      <View className=" flex-col mt-8">
        <Text className="text-green-50 text-4xl spacing font-semibold text-center">
          Sign Up
        </Text>

        {/* Input fields */}

        {/* Username field */}
        <View className="mt-6">
          <View className="flex items-start mt-3 mb-2 pl-7">
            <Text className="text-secondary text-start">Username</Text>
          </View>
          <Controller
            control={control}
            name="username"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="John Doe"
                placeholderTextColor={"grey"}
                className="border border-secondary active:border-border p-4 rounded-lg w-[90%] mx-auto text-white"
                style={{
                  color: "white",
                }}
              />
            )}
          />
          {errors.username && (
            <Text className="text-red-500 text-xs pl-8 mt-1">
              {errors.username.message}
            </Text>
          )}
        </View>

        {/* Email field */}
        <View className="mt-3">
          <View className="flex items-start mt-3 mb-2 pl-8">
            <Text className="text-secondary text-start">Email</Text>
          </View>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="your.email@example.com"
                placeholderTextColor={"grey"}
                className="border border-secondary active:border-border p-4 rounded-lg w-[90%] mx-auto text-white"
                style={{
                  color: "white",
                }}
              />
            )}
          />
          {errors.email && (
            <Text className="text-red-500 text-xs pl-8 mt-1">
              {errors.email.message}
            </Text>
          )}
        </View>

        {/* Password field */}
        <View className="mt-3">
          <View className="flex items-start mt-3 mb-2 pl-7">
            <Text className="text-secondary text-start">Password</Text>
          </View>
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="********"
                secureTextEntry={true}
                placeholderTextColor={"grey"}
                className="border border-secondary active:border-border p-4 rounded-lg w-[90%] mx-auto text-white"
                style={{
                  color: "white",
                }}
              />
            )}
          />
          {errors.password && (
            <Text className="text-red-500 text-xs pl-8 mt-1">
              {errors.password.message}
            </Text>
          )}
        </View>

        {/* Submit button */}
        <View className="flex items-center mt-8">
          <Pressable
            onPress={handleSubmit(onSubmit)}
            className="border w-[90%] items-center p-3 rounded-lg bg-button"
          >
            <Text className="text-green-50 font-semibold text-lg">
              {isPending ? "Signing up..." : "Sign Up"}
            </Text>
          </Pressable>
        </View>

        {/* Log In prompt */}
        <View className="mt-4 flex items-center">
          <Text className="text-white">
            Already have an account?{" "}
            <Text
              className="text-button"
              onPress={() => router.push("/login")}
            >
              Log In
            </Text>
          </Text>
        </View>
      </View>
      <ToastManager config={toastConfig} />
    </View>
  );
};

export default SignupForm;
