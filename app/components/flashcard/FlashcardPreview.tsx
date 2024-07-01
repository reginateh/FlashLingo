import { View, Text } from "react-native";

type FlashcardPreviewProps = {
  word: string;
};

/**
 * A Flashcard preview component to be displayed in the FlashcardSetDetailsScreen.
 * @param id The id of the flashcard
 */
const FlashcardPreview = ({ word }: FlashcardPreviewProps) => {
  return (
    <View className="p-5 bg-gray-100 my-2 rounded-lg shadow-md">
      <Text className="text-lg">{word}</Text>
    </View>
  );
};

export default FlashcardPreview;
