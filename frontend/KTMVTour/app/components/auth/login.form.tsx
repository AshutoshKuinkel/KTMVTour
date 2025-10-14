import { View, Text, TextInput, Pressable } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { loginSchema } from "@/app/schema/auth.schema";

const LoginForm = () => {
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
  const onSubmit = (data: any) => {
    console.log(data);
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
            <Text className="text-green-50 font-semibold text-lg">Sign In</Text>
          </Pressable>
        </View>

        {/* Sign up prompt */}
        <View className="mt-4 flex items-center">
          <Text className="text-white">
            Don't have an account? <Text className="text-button">Sign Up</Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

export default LoginForm;
