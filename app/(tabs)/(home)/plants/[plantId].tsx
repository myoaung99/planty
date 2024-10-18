import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import { differenceInCalendarDays, format } from "date-fns";
import { theme } from "@/theme";
import { useEffect } from "react";
import usePlantStore from "@/store/plant-store";
import PlantyImage from "@/components/planty-image";
import Button from "@/components/planty-button";

const fullDateFormat = "LLL d yyyy, h:mm aaa";

export default function PlantDetails() {
  const router = useRouter();
  const waterPlant = usePlantStore((store) => store.waterPlant);
  const removePlant = usePlantStore((store) => store.removePlant);
  const params = useLocalSearchParams();
  const plantId = params.plantId;
  const plant = usePlantStore((state) =>
    state.plants.find((plant) => String(plant.id) === plantId)
  );
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: plant?.name,
    });
  }, [plant?.name, navigation]);

  const handleWaterPlant = () => {
    if (typeof plantId === "string") {
      waterPlant(+plantId);
    }
  };

  const handleDeletePlant = () => {
    if (!plant?.id) {
      return;
    }

    Alert.alert(
      `Are you sure you want to delete ${plant?.name}?`,
      "It will be gone for good",
      [
        {
          text: "Yes",
          onPress: () => {
            removePlant(+plant.id);
            router.navigate("/");
          },
          style: "destructive",
        },
        { text: "Cancel", style: "cancel" },
      ]
    );
  };

  if (!plant) {
    return (
      <View style={styles.notFoundContainer}>
        <Text style={styles.notFoundText}>
          Plant with ID {plantId} not found
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.detailsContainer}>
      <View style={{ alignItems: "center" }}>
        <PlantyImage imageUri={plant.imageUri} />
        <View style={styles.spacer} />
        <Text style={styles.key}>Water me every</Text>
        <Text style={styles.value}>{plant.wateringFrequencyInDays} days</Text>
        <Text style={styles.key}>Last watered at</Text>
        <Text style={styles.value}>
          {plant.lastWateredTimestamp
            ? `${format(plant.lastWateredTimestamp, fullDateFormat)}`
            : "Never 😟"}
        </Text>
        <Text style={styles.key}>Days since last watered</Text>
        <Text style={styles.value}>
          {plant.lastWateredTimestamp
            ? differenceInCalendarDays(Date.now(), plant.lastWateredTimestamp)
            : "N/A"}
        </Text>
      </View>
      <Button onPress={handleWaterPlant}>Water me!</Button>
      <Pressable style={styles.deleteButton} onPress={handleDeletePlant}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  notFoundContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.white,
  },
  notFoundText: {
    fontSize: 18,
  },
  detailsContainer: {
    padding: 12,
    backgroundColor: theme.colors.white,
    flex: 1,
    justifyContent: "center",
  },
  key: {
    marginRight: 8,
    fontSize: 16,
    color: theme.colors.black,
    textAlign: "center",
  },
  value: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: theme.colors.green,
  },
  deleteButton: {
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteButtonText: {
    color: theme.colors.grey,
    fontWeight: "bold",
  },
  spacer: {
    height: 18,
  },
});
