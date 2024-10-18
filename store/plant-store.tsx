import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import * as FileSystem from "expo-file-system";

export interface Plant {
  id: string;
  name: string;
  imageUri?: string;
  wateringFrequencyInDays: number;
  lastWateredTimestamp?: number;
}

interface PlantStore {
  nextId: number;
  plants: Plant[];
  waterPlant: (id: number) => void;
  addPlant: (
    name: string,
    wateringFrequencyInDays: number,
    imageUri?: string
  ) => Promise<void>;
  removePlant: (id: number) => void;
  clearPlants: () => void;
}

const usePlantStore = create(
  persist<PlantStore>(
    (set) => ({
      plants: [],
      nextId: 1,
      clearPlants: () => {
        set({ plants: [] });
      },
      removePlant: (id: number) => {
        set((state) => ({
          plants: state.plants.filter((plant) => +plant.id !== id),
        }));
      },
      waterPlant(id) {
        set((state) => {
          return {
            plants: state.plants.map((p) => {
              if (+p.id === id) {
                p.lastWateredTimestamp = new Date().getTime();
              }
              return p;
            }),
          };
        });
      },
      async addPlant(name, wateringFrequencyInDays, imageUri) {
        const savedImageUri =
          FileSystem.documentDirectory +
          `${imageUri?.split("/").slice(-1)[0]}-${new Date().getTime()}`;

        if (imageUri) {
          await FileSystem.copyAsync({
            from: imageUri,
            to: savedImageUri,
          });
        }

        set((state) => ({
          plants: [
            {
              name,
              id: String(state.nextId),
              wateringFrequencyInDays,
              imageUri: imageUri ? savedImageUri : undefined,
            },
            ...state.plants,
          ],
          nextId: state.nextId + 1,
        }));
      },
    }),
    {
      name: "planty-plant-store",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default usePlantStore;
