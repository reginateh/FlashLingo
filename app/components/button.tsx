import { TouchableOpacity, Text } from "react-native";

type ButtonProps = {
  bg: "lg" | "dg" | "lp" | "dp";
  size: "sm" | "md" | "lg";
  text: string;
  onPress: () => void;
};
/**
 * A button component
 * @param bg - background colour of the button: choosing from 
 * "lg" (light green), "dg" (dark green), "lp" (light pink), "dp" (dark pink)
 * @param size - size of the button: choosing from 
 * "sm" (small), "md" (medium), "lg" (large)
 * @param text - text displayed on the button
 * @param onPress - function to be executed when the button is pressed
 * @returns  A button component
 */
const Button = ({ bg, size, text, onPress }: ButtonProps) => {
  const backgroundColour = bg === "lg" ? "bg-[#B9CBB1]" :
    bg === "dg" ? "bg-[#99AF96]" :
    bg === "lp" ? "bg-[#F7E2CD]" :
    "bg-[#D98A74]";
  const textColour = "text-black";
  const width = size === "sm" ? "w-1/4" : size === "md" ? "w-1/2" : "w-full";
  const height = size === "sm" ? "h-8" : size === "md" ? "h-10" : "h-12";
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`p-2 mt-2 rounded-xl flex justify-center items-center text-center ${backgroundColour} ${width}`}
    >
      <Text className={`text-xl ${textColour}`}>{text}</Text>
    </TouchableOpacity>
  );
};

export default Button;