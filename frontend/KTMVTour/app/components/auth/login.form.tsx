import { View, Text, TextInput, Button, Pressable } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

const LoginForm = () => {
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
          <TextInput
            placeholder="your.email@example.com"
            placeholderTextColor={"grey"}
            className="border border-secondary active:border-border p-4 rounded-lg w-[90%] mx-auto text-white"
            style={{
              color: "white",
            }}
          />
        </View>

        {/* Password field */}
        <View className="mt-6">
          <View className="flex items-start mt-3 mb-2 pl-7">
            <Text className="text-secondary text-start">Password</Text>
          </View>
          <TextInput
            placeholder="********"
            secureTextEntry={true}
            placeholderTextColor={"grey"}
            className="border border-secondary active:border-border p-4 rounded-lg w-[90%] mx-auto text-white"
            style={{
              color: "white",
            }}
          />
        </View>

        {/* Submit button */}
        <View className="flex items-center mt-8">
          <Pressable
            onPress={null}
            className="border w-[90%] items-center p-3 rounded-lg bg-button"
          >
            <Text className="text-green-50 font-semibold text-lg">Sign In</Text>
          </Pressable>
        </View>

        {/* Sign up prompt */}
        <View className="mt-4 flex items-center">
          <Text className="text-white">Don't have an account? <Text className="text-button">Sign Up</Text></Text>
        </View>
      </View>
    </View>
  );
};

export default LoginForm;
