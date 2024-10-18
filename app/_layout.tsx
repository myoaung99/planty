import { theme } from "@/theme";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import {
  useFonts,
  Caveat_400Regular,
  Caveat_700Bold,
} from "@expo-google-fonts/caveat";
import * as QuickActions from "expo-quick-actions";
import { useEffect } from "react";
import { Platform } from "react-native";
import { useQuickActionRouting } from "expo-quick-actions/router";

SplashScreen.preventAutoHideAsync();

const Layout = () => {
  useQuickActionRouting();

  const [fontsLoaded] = useFonts({
    Caveat_400Regular,
    Caveat_700Bold,
  });

  if (fontsLoaded) {
    SplashScreen.hideAsync();
  }

  useEffect(() => {
    QuickActions.setItems([
      {
        id: "0",
        title: "Add plant",
        icon: Platform.select({ ios: "symbol:leaf", android: "leaf" }),
        params: { href: "/new-plant" },
      },
    ]);
  }, []);

  return (
    <Stack
      screenOptions={{
        animation: "fade",
        headerTintColor: theme.colors.green,
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="onboarding"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="new-plant"
        options={{
          presentation: "fullScreenModal",
          title: "New Plant",
        }}
      />
    </Stack>
  );
};

export default Layout;
