import { View, Text, TextInput, Pressable } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { loginSchema } from "@/src/schema/auth.schema";
import { useMutation } from "@tanstack/react-query";
import { loginAPI } from "@/src/api/auth.api";
import { ILoginData } from "@/src/types/auth.types";
import { router } from "expo-router";
import { useAuthStore } from "@/src/store/auth.store";
import { MMKV } from "react-native-mmkv";
import { setItem } from "@/src/store/storage";
import Toast from "react-native-toast-message";

const LoginForm = () => {
  // initialising MMKV:
  const storage = new MMKV();

  const { login } = useAuthStore();


  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(loginSchema),
    mode: "all",
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["login_API"],
    mutationFn: loginAPI,
    onSuccess: (response) => {
      setTimeout(
        () =>
          Toast.show({
            type: "success",
            text1: response.message ?? "Profile Updated",
            position: "top",
          }),
        500
      );
      setTimeout(() => login(response.data), 1000);
      // console.log(`Response data {user}: ${JSON.stringify(response.data._id)}`)
      // console.log(`Access token response:${response.KTMVTour_token}`)
      setItem("user", response.data._id);
      setItem("KTMVTour_token", response.KTMVTour_token);
    },
    onError: (err) => {
      Toast.show({
        type: "error",
        text1: err?.message ?? "Sorry, we couldn't log you in at this time.",
        position: "top",
      });
    },
  });
  const onSubmit = async (data: ILoginData) => {
    mutate(data);
  };

  return (
    <View className="mt-8 pb-10 min-w-[90vw] bg-post shadow-2xl border border-border rounded-2xl">
      <View className=" flex-col mt-8">
        <Text className="text-green-50 text-4xl spacing font-semibold text-center">
          Login
        </Text>

        {/* Input fields */}

        {/* Email field */}
        <View>
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
        <View className="mt-6">
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
              {isPending ? "Signing in..." : "Sign In"}
            </Text>
          </Pressable>
        </View>

        {/* Sign up prompt */}
        <View className="mt-4 flex items-center">
          <Text className="text-white">
            Don't have an account?{" "}
            <Text
              className="text-button"
              onPress={() => router.push("/signup")}
            >
              Sign Up
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

export default LoginForm;
