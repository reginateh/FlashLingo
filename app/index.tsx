import { Text, View } from "react-native";
import Button from "./components/button";
import { useEffect, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "@/firebaseConfig";
import HomeScreen from "./homeScreen";

export default function Index() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
    });
  }, [])

  return (
    <View className="w-full flex-1">
      {user ? (
        <HomeScreen />
      ) : (
        <View className="w-full flex-1 justify-center items-center bg-[#B9CBB1]">
          <Text className="font-bold text-2xl text-center mb-2">Welcome to FlashLingo</Text>
          <View className="flex-col justify-center items-center w-full">
            <Button bg="dg" size="md" text="Login" link="loginScreen"/>
            <Button bg="dg" size="md" text="Create Account" link="signUpScreen" />
          </View>
        </View>
      )}
    </View>
  );
}
