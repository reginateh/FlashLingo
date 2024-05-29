import { View, Text } from "react-native";
import { Link } from "expo-router";

const NavigationTab = () => {
  const tabs = [
    { name: "Home", path: "/homeScreen" },
    { name: "Leaderboard", path: "/leaderboardScreen" },
    { name: "Planner", path: "/plannerScreen" },
    { name: "Profile", path: "/profileScreen" },
  ];

  return (
    <View className="flex flex-row justify-between mb-3">
      {tabs.map((tab) => (
        <Link href={"../" + tab.path} className="flex flex-col" key={tab.name}>
          <View>
            <Text>{tab.name}</Text>
          </View>
        </Link>
      ))}
    </View>
  );
};

export default NavigationTab;
