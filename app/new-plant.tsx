import {
  Text,
  StyleSheet,
  TextInput,
  Alert,
  ScrollView,
  View,
  TouchableOpacity,
  Platform,
} from "react-native";
import { theme } from "@/theme";
import { useState } from "react";
import PlantyImage from "@/components/planty-image";
import Button from "@/components/planty-button";
import { moderateScale } from "react-native-size-matters";
import usePlantStore from "@/store/plant-store";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";

export default function NewScreen() {
  const [name, setName] = useState<string>();
  const [days, setDays] = useState<string>();
  const [imageUri, setImageUri] = useState<string>();
  const addPlant = usePlantStore((state) => state.addPlant);
  const router = useRouter();

  const handleSubmit = () => {
    if (!name) {
      return Alert.alert("Validation Error", "Give your plant a name");
    }

    if (!days) {
      return Alert.alert(
        "Validation Error",
        `How often does ${name} need to be watered?`
      );
    }

    if (Number.isNaN(Number(days))) {
      return Alert.alert(
        "Validation Error",
        "Watering frequency must be a be a number"
      );
    }

    addPlant(name, +days, imageUri);
    router.push("/");
  };

  const handlePickImage = async () => {
    if (Platform.OS === "web") return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      console.log(result.assets[0].uri.split("/").slice(-1)[0]);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="handled" // Prevents keyboard from hiding on scroll
    >
      <TouchableOpacity
        onPress={handlePickImage}
        activeOpacity={0.6}
        style={styles.imageContainer}
      >
        <PlantyImage imageUri={imageUri} />
      </TouchableOpacity>
      <Text style={styles.label}>Name</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        style={styles.input}
        placeholder="E.g. Casper the Cactus"
        autoCapitalize="words"
      />
      <Text style={styles.label}>Watering Frequency (every x days)</Text>
      <TextInput
        value={days}
        onChangeText={setDays}
        style={styles.input}
        placeholder="E.g. 6"
        keyboardType="number-pad"
      />
      <Button onPress={handleSubmit}>Add plant</Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  contentContainer: {
    paddingTop: 24,
    paddingHorizontal: 24,
    paddingBottom: 100,
  },
  input: {
    borderWidth: 2,
    borderColor: theme.colors.lightGrey,
    padding: 12,
    borderRadius: 6,
    marginBottom: 24,
    fontSize: 18,
  },
  label: {
    fontSize: moderateScale(16),
    marginBottom: 8,
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 12,
  },
});
