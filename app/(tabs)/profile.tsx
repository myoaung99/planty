import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { theme } from "@/theme";
import Button from "@/components/planty-button";
import usePlantStore from "@/store/plant-store";

const Profile = () => {
  const clearPlants = usePlantStore((state) => state.clearPlants);
  return (
    <View style={styles.container}>
      <Button onPress={clearPlants}>Clear Plants</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Profile;
