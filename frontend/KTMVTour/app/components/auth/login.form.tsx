import { View, Text, TextInput } from "react-native";
import React from "react";

const LoginForm = () => {
  return (
    <View className="mt-8 h-[450px] min-w-[90vw] bg-post shadow-2xl border border-border rounded-2xl">
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
      </View>
    </View>
  );
};

export default LoginForm;
