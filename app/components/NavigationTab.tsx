import { View, Text, SafeAreaView } from "react-native";
import { Link } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

type NavigationTabProps = {
  name: string;
  path: string;
  icon: "card-bulleted" | "medal" | "calendar-check" | "face-man-shimmer";
};

const NavigationTab = () => {
  const tabs: NavigationTabProps[] = [
    { name: "Flashcards", path: "/screens/homeScreen", icon: "card-bulleted" },
    { name: "Leaderboard", path: "/screens/leaderboardScreen", icon: "medal" },
    { name: "Planner", path: "/screens/plannerScreen", icon: "calendar-check" },
    {
      name: "Profile",
      path: "/screens/profileScreen",
      icon: "face-man-shimmer",
    },
  ];

  return (
    <SafeAreaView className="flex-row justify-around items-center py-2 w-full bg-[#B9CBB1]">
      {tabs.map((tab) => (
        <Link href={tab.path} key={tab.name}>
          <View className="flex items-center justify-center">
            <MaterialCommunityIcons name={tab.icon} size={30} color="black" />
            <Text>{tab.name}</Text>
          </View>
        </Link>
      ))}
    </SafeAreaView>
  );
};

export default NavigationTab;
