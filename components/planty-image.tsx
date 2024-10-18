import { Image } from "expo-image";
import { useWindowDimensions } from "react-native";

interface Props {
  size?: number;
  imageUri?: string;
}
const PlantyImage = ({ size, imageUri }: Props) => {
  const { width } = useWindowDimensions();
  const imageSize = size || Math.min(width / 1.5, 400);

  return (
    <Image
      source={
        imageUri
          ? {
              uri: imageUri,
            }
          : require("@/assets/plantly.png")
      }
      style={{ width: imageSize, height: imageSize, borderRadius: 5 }}
    />
  );
};

export default PlantyImage;
