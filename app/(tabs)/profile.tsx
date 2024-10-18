import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { theme } from "@/theme";
import Button from "@/components/planty-button";
import usePlantStore from "@/store/plant-store";
import { useRouter } from "expo-router";

const Profile = () => {
  const clearPlants = usePlantStore((state) => state.clearPlants);
  const router = useRouter();

  const navigateToOnboarding = () => {
    router.navigate("onboarding");
  };
  return (
    <View style={styles.container}>
      <Button onPress={clearPlants}>Clear Plants</Button>
      <Button onPress={navigateToOnboarding}>To Onboarding</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
});

export default Profile;
