import { theme } from "@/theme";
import { ComponentProps } from "react";
import {
  GestureResponderEvent,
  Platform,
  Pressable,
  StyleSheet,
  Text,
} from "react-native";
import * as haptic from "expo-haptics";

interface Props extends ComponentProps<typeof Pressable> {
  children: React.ReactNode;
}

const Button = (props: Props) => {
  const handlePress = (e: GestureResponderEvent) => {
    if (Platform.OS !== "web") {
      haptic.impactAsync(haptic.ImpactFeedbackStyle.Soft);
    }

    props?.onPress && props.onPress(e);
  };

  return (
    <Pressable
      onPress={handlePress}
      hitSlop={20}
      style={({ pressed }) => [
        style.button,
        pressed ? style.pressedButton : undefined,
      ]}
      {...props}
    >
      <Text style={style.buttonText}>{props.children}</Text>
    </Pressable>
  );
};

const style = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.green,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 5,
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: theme.colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  buttonText: {
    color: theme.colors.white,
    fontWeight: "bold",
    fontSize: 18,
  },
  pressedButton: {
    backgroundColor: theme.colors.leafGreen,
  },
});

export default Button;
