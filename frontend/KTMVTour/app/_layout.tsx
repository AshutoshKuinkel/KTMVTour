import { Stack } from "expo-router";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ToastManager from "toastify-react-native";

// Create a client
const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    //wrapping out app with the queryClientProvider
    <QueryClientProvider client={queryClient}>
      <ToastManager>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </ToastManager>
    </QueryClientProvider>
  );
}
