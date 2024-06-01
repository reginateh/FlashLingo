import { View, Text } from "react-native";
import NavigationTab from "../components/navigationTab";

const ProfileScreen = () => {
  return (
    <View className="flex-1">
      <Text className="flex-1">Profile</Text>
      <NavigationTab />
    </View>
  );
};

export default ProfileScreen;
