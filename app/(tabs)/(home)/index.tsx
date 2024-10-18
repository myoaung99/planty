import { FlatList, StyleSheet, Text } from "react-native";
import { theme } from "@/theme";
import usePlantStore from "@/store/plant-store";
import { PlantCard } from "@/components/planty-card";
import Button from "@/components/planty-button";
import { useRouter } from "expo-router";

export default function App() {
  const router = useRouter();
  const plants = usePlantStore((state) => state.plants);
  const addPlantHandler = () => {
    router.push("/new-plant");
  };

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      data={plants}
      keyExtractor={({ id }) => id}
      renderItem={({ item }) => <PlantCard plant={item} />}
      ListEmptyComponent={() => (
        <Button onPress={addPlantHandler}>Add your first plant</Button>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  contentContainer: {
    padding: 12,
  },
});
