import { View, Text } from "react-native";

type FlashcardPreviewProps = {
  id: number;
};

/**
 * A Flashcard preview component to be displayed in the flashcard set details screen.
 * @param id The id of the flashcard
 */
const FlashcardPreview = ({ id }: FlashcardPreviewProps) => {
  return (
    <View className="p-5 bg-gray-100 my-2 rounded-lg shadow-md">
      <Text className="text-lg">Flashcard {id}</Text>
    </View>
  );
};

export default FlashcardPreview;
