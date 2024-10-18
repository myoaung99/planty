import React from "react";
import { Tabs } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import Entypo from "@expo/vector-icons/Entypo";
import { theme } from "@/theme";

const Layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        tabBarActiveTintColor: theme.colors.green,
        tabBarShowLabel: false,
        headerTitleAlign: "center",
        headerTitleStyle: {
          color: theme.colors.green,
        },
      }}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Entypo name="leaf" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",

          tabBarIcon: ({ color, size }) => (
            <Feather name="user" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default Layout;
