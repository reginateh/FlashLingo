import { Tabs } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

type NavigationTabProps = {
  name: string;
  icon: "card-multiple" | "medal" | "calendar-check" | "face-man-shimmer";
};

export default function TabLayout() {
  const tabs: NavigationTabProps[] = [
    { name: "Flashcards", icon: "card-multiple" },
    { name: "Leaderboard", icon: "medal" },
    { name: "Planner", icon: "calendar-check" },
    { name: "Profile", icon: "face-man-shimmer" },
  ];
  return (
    <Tabs
      screenOptions={{
        tabBarLabelStyle: { color: "black", fontWeight: "bold", fontSize: 12 },
      }}
    >
      {tabs.map((tab) => {
        return (
          <Tabs.Screen
            name={tab.name}
            key={tab.name}
            options={{
              title: tab.name,
              tabBarLabel: tab.name,
              tabBarIcon: ({ focused }) => (
                <MaterialCommunityIcons
                  name={tab.icon}
                  size={24}
                  color={focused ? "black" : "#99AF96"}
                />
              ),
              tabBarStyle: {
                backgroundColor: "#B9CBB1",
              },
              headerStyle: {
                backgroundColor: "#B9CBB1",
              },
            }}
          />
        );
      })}
    </Tabs>
  );
}
