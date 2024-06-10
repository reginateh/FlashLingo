import { View, Text, SafeAreaView } from "react-native";
import { Link, usePathname } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

type NavigationTabProps = {
  name: string;
  path: string;
  icon: "card-multiple" | "medal" | "calendar-check" | "face-man-shimmer";
};

/**
 * A navigation tab component
 * containing 4 tabs: Flashcards, Leaderboard, Planner, and Profile.
 * Pages for the tabs are placed in the screens folder.
 */
const NavigationTab = () => {
  const pathname = usePathname();

  const tabs: NavigationTabProps[] = [
    { name: "Flashcards", path: "/screens/homeScreen", icon: "card-multiple" },
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
      {tabs.map((tab) => {
        const isActive = pathname === tab.path;
        return (
          <Link
            href={tab.path}
            key={tab.name}
            style={{ pointerEvents: isActive ? "none" : "auto" }}
          >
            <View className="flex items-center justify-center">
              <MaterialCommunityIcons
                name={tab.icon}
                size={30}
                color={isActive ? "black" : "#99AF96"}
              />
              <Text>{tab.name}</Text>
            </View>
          </Link>
        );
      })}
    </SafeAreaView>
  );
};

export default NavigationTab;
