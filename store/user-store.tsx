import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type UserStore = {
  hasFinishedOnBoarding: Boolean;
  toggleHasFinishedOnBoarding: () => void;
};

const useUserStore = create(
  persist<UserStore>(
    (set) => ({
      hasFinishedOnBoarding: false,
      toggleHasFinishedOnBoarding: () =>
        set((state) => ({
          hasFinishedOnBoarding: !state.hasFinishedOnBoarding,
        })),
    }),
    {
      name: "planty-user-store",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useUserStore;
