import useUserStore from "@/store/user-store";
import { theme } from "@/theme";
import { AntDesign } from "@expo/vector-icons";
import { Link, Redirect, Stack } from "expo-router";
import { Pressable } from "react-native";

const Layout = () => {
  const hasFinishedOnboarding = useUserStore(
    (state) => state.hasFinishedOnBoarding
  );

  if (!hasFinishedOnboarding) {
    return <Redirect href={"/onboarding"} />;
  }

  return (
    <Stack
      screenOptions={{
        headerTitleAlign: "center",
        headerTitleStyle: {
          color: theme.colors.green,
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Plants",
          headerRight: () => (
            <Link href="/new-plant" asChild>
              <Pressable hitSlop={20} style={{ marginRight: 12 }}>
                <AntDesign
                  name="pluscircleo"
                  size={24}
                  color={theme.colors.green}
                />
              </Pressable>
            </Link>
          ),
        }}
      />
      <Stack.Screen name="plants/[plantId]" options={{ title: "" }} />
    </Stack>
  );
};

export default Layout;
