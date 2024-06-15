import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";

const FlashcardSetDetailsScreen = () => {
  const { flashcardSetTitle } = useLocalSearchParams();
  return (
    <View>
      <Text>Title: {flashcardSetTitle}</Text>
    </View>
  );
};

export default FlashcardSetDetailsScreen;
