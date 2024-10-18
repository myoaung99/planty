import { theme } from "@/theme";
import { Stack } from "expo-router";

const Layout = () => {
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
