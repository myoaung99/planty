import useUserStore from "@/store/user-store";
import { theme } from "@/theme";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "@/components/planty-button";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import PlantyImage from "@/components/planty-image";
import { moderateScale } from "react-native-size-matters";

const Onboarding = () => {
  const router = useRouter();
  const toggleOnBoarding = useUserStore(
    (state) => state.toggleHasFinishedOnBoarding
  );

  const handlePress = () => {
    toggleOnBoarding();
    router.replace("/");
  };

  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      colors={[
        theme.colors.green,
        theme.colors.appleGreen,
        theme.colors.limeGreen,
      ]}
      style={styles.container}
    >
      <StatusBar style="light" />
      <View style={styles.textContainer}>
        <Text style={styles.heading}>Plantly</Text>
        <Text style={styles.tagline}>
          Keep your plants healthy and hydrated
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <PlantyImage />
        <Button onPress={handlePress}>Let me in!</Button>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  textContainer: {
    width: "80%",
  },
  heading: {
    fontSize: moderateScale(theme.fontSize.heading),
    color: theme.colors.white,
    fontWeight: "bold",
    marginBottom: theme.spacing[12],
    textAlign: "center",
  },
  tagline: {
    fontWeight: "bold",
    fontSize: moderateScale(theme.fontSize[20]),
    color: theme.colors.white,
    textAlign: "center",
  },
  buttonContainer: {
    alignItems: "center",
  },
});

export default Onboarding;
