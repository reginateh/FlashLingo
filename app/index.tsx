import { View } from "react-native";
import { useEffect, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "@/firebaseConfig";
import WelcomeScreen from "./screens/welcomeScreen";
import LoadingScreen from "./screens/loadingScreen";
import { Redirect } from "expo-router";

export default function Index() {
  const [user, setUser] = useState<User | null>(FIREBASE_AUTH.currentUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
      setLoading(false);
    });
  }, []);

  return (
    <View className="w-full flex-1">
      {loading ? (
        <LoadingScreen />
      ) : user ? (
        <Redirect href={"/(tabs)/Flashcards"} />
      ) : (
        <WelcomeScreen />
      )}
    </View>
  );
}
