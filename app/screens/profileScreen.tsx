import { View, Text } from "react-native";
import { useState, useEffect } from "react";
import NavigationTab from "../components/navigationTab";
import { FIREBASE_AUTH } from "@/firebaseConfig";
import { onAuthStateChanged, User, updateProfile } from "firebase/auth";
import Button from "../components/button";
import { router } from "expo-router";

/**
 * The profile screen displays the user's display name and a logout button.
 * It also sets the user's display name to their email if it is not set.
 */
const ProfileScreen = () => {
  const [user, setUser] = useState<User | null>(FIREBASE_AUTH.currentUser);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, async (user) => {
      if (user) {
        setUser(user);
        if (user.displayName == undefined) {
          try {
            await updateProfile(user, {
              displayName: user.email?.split("@")[0],
            });
          } catch (error: any) {
            console.log(error);
          }
        }
      }
    });
  }, []);

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
          onPress={async () => {
            try {
              await FIREBASE_AUTH.signOut();
            } catch (error: any) {
              console.log(error);
              alert("sign out failed: " + error.message);
            }
            router.navigate("/");
          }}
        />
      </View>
      <NavigationTab />
    </View>
  );
};

export default ProfileScreen;
