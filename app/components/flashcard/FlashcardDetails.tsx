import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { FlashcardType } from "./FlashcardType";
import Icon from "@expo/vector-icons/Ionicons";
import DeleteConfirmation from "../DeleteConfirmation";
import InputModal from "../InputModal";

type FlashcardDetailsProps = {
  card: FlashcardType;
  onDelete: (id: string) => Promise<void>;
  onEdit: (card: FlashcardType) => Promise<void>;
};

/**
 * A component to display the details of a flashcard.
 * Allows the user to edit or delete the flashcard.
 * It is wrapped in a modal in FlashcardSetDetailsScreen.
 * @param card The flashcard to display.
 * @param onDelete A function to delete the flashcard.
 * @param onEdit A function to save the edited flashcard.
 */
const FlashcardDetails = ({
  card,
  onDelete,
  onEdit,
}: FlashcardDetailsProps) => {
  if (!card) {
    return null;
  }

  //////////////////////
  // EDIT FLASHCARD   //
  //////////////////////
  const [isEditing, setIsEditing] = useState(false);

  /**
   * Get the values from the input fields and save the edited flashcard.
   * If any of the fields are empty, do not save the flashcard.
   * @param values An array of strings whose values are the word, part of speech, and definition of the flashcard.
   */
  const handleSave = async (values: string[]) => {
    if (
      values[0].trim() === "" ||
      values[1].trim() === "" ||
      values[2].trim() === ""
    ) {
      return;
    }
    const editedCard = {
      ...card,
      word: values[0],
      partOfSpeech: values[1],
      definition: values[2],
    };
    setIsEditing(false);
    await onEdit(editedCard);
  };

  const EditView = () => {
    return (
      <InputModal
        visible={isEditing}
        placeholders={["word", "part of speech", "definition"]}
        initialValues={[card.word, card.partOfSpeech, card.definition]}
        onSave={handleSave}
        onCancel={() => setIsEditing(false)}
      />
    );
  };

  //////////////////////
  // DELETE FLASHCARD //
  //////////////////////
  const [isDeletingCard, setIsDeletingCard] = useState(false);

  // Close the delete confirmation modal and delete the flashcard
  const handleDelete = async () => {
    setIsDeletingCard(false);
    await onDelete(card.id);
  };

  const DeleteCardConfirmation = () => {
    return (
      <DeleteConfirmation
        name="flashcard"
        visible={isDeletingCard}
        onDelete={handleDelete}
        onCancel={() => setIsDeletingCard(false)}
      />
    );
  };

  return (
    <View className="flex-1 justify-center items-center">
      {isEditing ? (
        <EditView />
      ) : (
        <View className="relative w-80 p-4 bg-white rounded-lg shadow-md">
          <Text className="text-xl font-bold mb-2 text-center">
            {card.word}
          </Text>
          <Text className="text-lg mb-2 text-center">{card.partOfSpeech}</Text>
          <Text className="text-lg mb-4 text-center">{card.definition}</Text>
          <View className="flex-row justify-around">
            <TouchableOpacity
              onPress={() => setIsDeletingCard(true)}
              className="items-center"
            >
              <Icon name="trash-outline" size={30} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setIsEditing(true)}
              className="items-center"
            >
              <Icon name="create-outline" size={30} color="black" />
            </TouchableOpacity>
          </View>
          <DeleteCardConfirmation />
        </View>
      )}
    </View>
  );
};

export default FlashcardDetails;
