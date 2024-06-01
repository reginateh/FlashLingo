import { View, Text } from "react-native";
import NavigationTab from "../components/navigationTab";

const PlannerScreen = () => {
  return (
    <View className="flex-1">
      <Text className="flex-1">Planner</Text>
      <NavigationTab />
    </View>
  );
};

export default PlannerScreen;
