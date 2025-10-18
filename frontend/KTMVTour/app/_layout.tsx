import { Stack } from "expo-router";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuthStore } from "@/src/store/auth.store";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

// Create a client
const queryClient = new QueryClient();

export default function RootLayout() {
  // Successfully created authstore using zustand
  const { isAuthenticated,checkAuth } = useAuthStore();
  const [isLoading,setIsLoading] = useState(true)

  useEffect(()=>{
    const init = async ()=>{
      await checkAuth()
      setIsLoading(false)
    }

    init()
  },[])

  if (isLoading){
    return(
      <View className="flex items-center justify-center">
        <ActivityIndicator size={"large"}/>
      </View>
    )
  }
  
  return (
    //wrapping out app with the queryClientProvider
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Protected guard={isAuthenticated}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack.Protected>
        <Stack.Protected guard={!isAuthenticated}>
          <Stack.Screen name="login" options={{ headerShown: false }} />
          <Stack.Screen name="signup" options={{ headerShown: false }} />
        </Stack.Protected>
      </Stack>
    </QueryClientProvider>
  );
}
