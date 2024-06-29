import { View, Text } from "react-native";
import { useState, useEffect } from "react";
import { FIREBASE_AUTH } from "@/firebaseConfig";
import { onAuthStateChanged, User } from "firebase/auth";
import Button from "../components/button";
import { router } from "expo-router";
import FlashcardData from "../components/flashcard/FlashcardData";

/**
 * The profile screen displays the user's display name and a logout button.
 * Upon logout, user will be redirected to the welcome screen.
 */
const ProfileScreen = () => {
  const [user, setUser] = useState<User | null>(FIREBASE_AUTH.currentUser);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, setUser);
  }, []);

  const signOutAndBackToWelcomeScreen = async () => {
    try {
      FlashcardData.clearInstance();
      await FIREBASE_AUTH.signOut();
    } catch (error: any) {
      console.log(error);
      alert("sign out failed: " + error.message);
    }
    router.navigate("/");
  };

  return (
    <View className="flex-1">
      <View className="flex-1 justify-center items-center">
        <Text className="font-bold text-2xl text-center mb-2">
          Welcome, {user?.displayName}
        </Text>
        <Button
          bg="dg"
          size="md"
          text="Logout"
          onPress={signOutAndBackToWelcomeScreen}
        />
      </View>
    </View>
  );
};

export default ProfileScreen;
