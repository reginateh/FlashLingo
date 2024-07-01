import { View, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";
import Icon from "@expo/vector-icons/Ionicons";

type FlashcardSetTitleEditorProps = {
  oldTitle: string;
  onSave: (newTitle: string) => void;
};

/**
 * The Editor view for the title of a flashcard set.
 * @param oldTitle The current title of the flashcard set, the initial value in TextInput.
 * @param onSave A function to save the new title of the flashcard set.
 */
const FlashcardSetTitleEditor = ({
  oldTitle,
  onSave,
}: FlashcardSetTitleEditorProps) => {
  const [newTitle, setNewTitle] = useState(oldTitle);
  const saveTitle = () => {
    onSave(newTitle);
  };

  return (
    <View className="flex-row items-center">
      <TextInput
        value={newTitle}
        onChangeText={setNewTitle}
        className="border p-2 flex-1"
      />
      <TouchableOpacity onPress={saveTitle} className="ml-2">
        <Icon name="checkmark-outline" size={30} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default FlashcardSetTitleEditor;
