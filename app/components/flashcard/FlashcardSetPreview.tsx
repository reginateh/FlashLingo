import { View, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";

type FlashcardSetProps = {
  id: string;
  title: string;
  numOfNewCards: number;
  numOfActiveCards: number;
};

/**
 * A flashcard set preview component.
 * Displays the title and numbers of new/active cards in the set.
 * Serves as a button in the home screen,
 * clicking it will navigate to the details page of the flashcard set.
 * @param title The title of the flashcard set.
 * @param numOfCards The number of cards in the flashcard set.
 */
const FlashcardSetPreview = ({
  id,
  title,
  numOfNewCards,
  numOfActiveCards,
}: FlashcardSetProps) => {
  const showDetails = () => {
    // navigate to details page
    router.navigate({
      pathname: `/screens/${id}`,
    });
  };

  return (
    <TouchableOpacity
      onPress={showDetails}
      className="bg-white w-5/6 p-4 m-2 rounded-lg shadow-ml flex-row justify-between"
    >
      <Text className="text-2xl font-semibold text-gray-800">{title}</Text>
      <View className="flex-row justify-between w-1/3 px-2">
        <Text className="text-2xl font-bold text-[#99AF96]">
          {numOfActiveCards}
        </Text>
        <Text className="text-2xl font-bold text-[#D98A74]">
          {numOfNewCards}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default FlashcardSetPreview;
