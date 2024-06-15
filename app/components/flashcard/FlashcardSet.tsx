import { Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";

type FlashcardSetProps = {
  title: string;
  numOfCards: number;
};

/**
 * A flashcard set component.
 * Displays the title and number of cards in the set.
 * Serves as a button in the home screen, 
 * Clicking it will navigate to the details page of the flashcard set.
 * @param title The title of the flashcard set
 * @param numOfCards The number of cards in the flashcard set 
 */
const FlashcardSet = ({ title, numOfCards }: FlashcardSetProps) => {
  const showDetails = () => {
    // navigate to details page
    router.navigate({
      pathname: `/screens/${title}`,
    });
  };

  return (
    <TouchableOpacity
      onPress={showDetails}
      className="bg-white w-5/6 p-4 m-2 rounded-lg shadow-ml flex-row justify-between"
    >
      <Text className="text-2xl font-semibold text-gray-800">{title}</Text>
      <Text className="text-2xl font-bold text-[#D98A74]">{numOfCards}</Text>
    </TouchableOpacity>
  );
};

export default FlashcardSet;
