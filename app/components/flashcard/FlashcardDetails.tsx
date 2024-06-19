import { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { FlashcardType } from './FlashcardType';
import Icon from '@expo/vector-icons/Ionicons';
import Button from '../button';

type FlashcardDetailsProps = {
  card: FlashcardType | null;
  onClose: () => void;
  onDelete: (id: number) => void;
  onEdit: (card: FlashcardType) => void;
};

const FlashcardDetails = ({ card, onClose, onDelete, onEdit }: FlashcardDetailsProps) => {
  if (!card) {
    return null;
  }

  const [isEditing, setIsEditing] = useState(false);
  const [editedCard, setEditedCard] = useState(card);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onEdit(editedCard);
    setIsEditing(false);
  };

  const handleChange = (key: string, value: string) => {
    setEditedCard({ ...editedCard, [key]: value });
  };

  return (
    <View className="flex-1 justify-center items-center">
      <View className="w-80 p-5 bg-white rounded-lg shadow-md">
        {isEditing ? (
          <>
            <TextInput
              className="border p-2 mb-2"
              value={editedCard.word}
              onChangeText={(text) => handleChange('word', text)}
            />
            <TextInput
              className="border p-2 mb-2"
              value={editedCard.partOfSpeech}
              onChangeText={(text) => handleChange('partOfSpeech', text)}
            />
            <TextInput
              className="border p-2 mb-2"
              value={editedCard.definition}
              onChangeText={(text) => handleChange('definition', text)}
            />
            <Button bg="lp" onPress={handleSave} text='Save' size="lg" />
          </>
        ) : (
          <>
            <Text className="text-xl font-bold mb-2 text-center">{card.word}</Text>
            <Text className="text-lg mb-2 text-center">{card.partOfSpeech}</Text>
            <Text className="text-lg mb-4 text-center">{card.definition}</Text>
            <View className="flex-row justify-around">
              <TouchableOpacity onPress={() => onDelete(card.id)} className="items-center">
                <Icon name="trash-outline" size={30} color="black" />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleEdit} className="items-center">
                <Icon name="create-outline" size={30} color="black" />
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </View>
  );
};

export default FlashcardDetails;
