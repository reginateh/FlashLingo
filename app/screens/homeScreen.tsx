import { View, Text } from "react-native";
import Button from "../components/button";
import { FIREBASE_AUTH } from "@/firebaseConfig";
import { router } from "expo-router";
import NavigationTab from "../components/navigationTab";

const HomeScreen = () => {
  console.log(FIREBASE_AUTH.currentUser);
  return (
    <View className="flex-1 w-full">
      <View className="flex-1 justify-center items-center">
        <Text className="font-bold text-2xl text-center mb-2">Home page</Text>
        <Button
          bg="dg"
          size="md"
          text="Logout"
          onPress={async () => {
            await FIREBASE_AUTH.signOut();
            router.navigate("/");
          }}
        />
      </View>
      <NavigationTab />
    </View>
  );
};

export default HomeScreen;
