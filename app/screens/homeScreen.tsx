import { View, Text } from "react-native";
import { FIREBASE_AUTH } from "@/firebaseConfig";
import NavigationTab from "../components/navigationTab";

const HomeScreen = () => {
  console.log(FIREBASE_AUTH.currentUser);
  return (
    <View className="flex-1 w-full">
      <View className="flex-1 justify-center items-center">
        <Text className="font-bold text-2xl text-center mb-2">Home page</Text>
      </View>
      <NavigationTab />
    </View>
  );
};

export default HomeScreen;
