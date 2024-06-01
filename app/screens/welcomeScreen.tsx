import { View, Text } from "react-native";
import Button from "../components/button";
import { router } from "expo-router";

const WelcomeScreen = () => {
  return (
    <View className="w-full flex-1 justify-center items-center bg-[#B9CBB1]">
      <Text className="font-bold text-2xl text-center mb-2">
        Welcome to FlashLingo
      </Text>
      <View className="flex-col justify-center items-center w-full">
        <Button
          bg="dg"
          size="md"
          text="Login"
          onPress={() => router.navigate("/screens/loginScreen")}
        />
        <Button
          bg="dg"
          size="md"
          text="Create Account"
          onPress={() => router.navigate("/screens/signUpScreen")}
        />
      </View>
    </View>
  );
};

export default WelcomeScreen;
