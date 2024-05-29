import { TouchableOpacity, Text } from "react-native";
import { Link } from "expo-router";

type ButtonProps = {
  bg: "lg" | "dg" | "lp" | "dp";
  size: "sm" | "md" | "lg";
  text: string;
  onPress?: () => void;
  link?: string;
};
const Button = ({ bg, size, text, onPress, link }: ButtonProps) => {
  const backgroundColour = bg === "lg" ? "bg-[#B9CBB1]" :
    bg === "dg" ? "bg-[#99AF96]" :
    bg === "lp" ? "bg-[#F7E2CD]" :
    "bg-[#D98A74]";
  const textColour = "text-black";
  const width = size === "sm" ? "w-1/4" : size === "md" ? "w-1/2" : "w-full";
  const height = size === "sm" ? "h-8" : size === "md" ? "h-10" : "h-12";
  return (
    onPress ? (
      <TouchableOpacity
      onPress={onPress}
      className={`p-2 mt-2 rounded-xl flex justify-center items-center text-center ${backgroundColour} ${width}`}
      >
      <Text className={`text-xl ${textColour}`}>{text}</Text>
    </TouchableOpacity>
    ) : link ? (
    <Link
      href={link}
      className={`p-2 mt-2 rounded-xl flex justify-center items-center text-center ${backgroundColour} ${width}`}
    >
      <Text className={`text-xl ${textColour}`}>{text}</Text>
    </Link>
    ) : (
      <Text>onPress or link needed</Text>
    )
  );
};

export default Button;