import { View, Text } from "react-native";
import NavigationTab from "../components/navigationTab";

const LeaderboardScreen = () => {
  return (
    <View className="flex-1">
      <Text className="flex-1">Leaderboard</Text>
      <NavigationTab />
    </View>
  );
};

export default LeaderboardScreen;
