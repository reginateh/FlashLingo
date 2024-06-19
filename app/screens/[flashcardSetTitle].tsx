import { View, Text, TouchableWithoutFeedback } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { FlashcardType } from "../components/flashcard/FlashcardType";
import { FlatList, TouchableOpacity, Modal, TextInput } from "react-native";
import FlashcardDetails from "../components/flashcard/FlashcardDetails";
import FlashcardPreview from "../components/flashcard/FlashcardPreview";
import Icon from "@expo/vector-icons/Ionicons";

const FlashcardSetDetailsScreen = () => {
  const { flashcardSetTitle } = useLocalSearchParams();
  const [cards, setCards] = useState<FlashcardType[]>([
    { id: 1, word: "Card 1", definition: "Definition 1", partOfSpeech: "Noun" },
    { id: 2, word: "Card 2", definition: "Definition 2", partOfSpeech: "Verb" },
    {
      id: 3,
      word: "Card 3",
      definition: "Definition 3",
      partOfSpeech: "Adjective",
    },
    {
      id: 4,
      word: "Card 4",
      definition: "Definition 4",
      partOfSpeech: "Adverb",
    },
    { id: 5, word: "Card 5", definition: "Definition 5", partOfSpeech: "Noun" },
    { id: 6, word: "Card 6", definition: "Definition 6", partOfSpeech: "Verb" },
    {
      id: 7,
      word: "Card 7",
      definition: "Definition 7",
      partOfSpeech: "Adjective",
    },
    {
      id: 8,
      word: "Card 8",
      definition: "Definition 8",
      partOfSpeech: "Adverb",
    },
  ]);
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(
    null
  );
  const [isModalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState(flashcardSetTitle);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [newTitle, setNewTitle] = useState<string>(
    (!title ? "" : title.constructor === Array ? title[0] : title) as string
  );

  const addCard = () => {
    const newCard = {
      id: cards.length + 1,
      word: `Card ${cards.length + 1}`,
      definition: `Definition ${cards.length + 1}`,
      partOfSpeech: "Noun",
    };
    setCards([...cards, newCard]);
  };

  const deleteCardSet = () => {
    // Handle deleting the card set
  };

  const saveTitle = () => {
    setTitle(newTitle);
    setIsEditingTitle(false);
  };

  const openCardDetails = (index: number) => {
    setSelectedCardIndex(index);
    setModalVisible(true);
  };

  const closeCardDetails = () => {
    setModalVisible(false);
    setSelectedCardIndex(null);
  };

  const deleteCard = (cardId: number) => {
    setCards(cards.filter((card) => card.id !== cardId));
    closeCardDetails();
  };

  const saveEditedCard = (editedCard: FlashcardType) => {
    setCards(
      cards.map((card) => (card.id === editedCard.id ? editedCard : card))
    );
  };

  const switchCard = (direction: "prev" | "next") => {
    if (direction === "prev") {
      setSelectedCardIndex((prevIndex) =>
        prevIndex == null
          ? prevIndex
          : prevIndex > 0
          ? prevIndex - 1
          : cards.length - 1
      );
    } else if (direction === "next") {
      setSelectedCardIndex((prevIndex) =>
        prevIndex == null
          ? prevIndex
          : prevIndex < cards.length - 1
          ? prevIndex + 1
          : 0
      );
    }
  };

  const TitleView = () => {
    return (
      <View className="flex-row justify-between items-center">
        <Text className="text-2xl font-bold">{title}</Text>
        <TouchableOpacity
          onPress={() => setIsEditingTitle(true)}
          className="ml-2"
        >
          <Icon name="create-outline" size={30} color="black" />
        </TouchableOpacity>
      </View>
    );
  };

  const EditingTitleView = () => {
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

  const ScrollFlashcardsView = () => {
    return (
      <FlatList
        data={cards}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => openCardDetails(index)}>
            <FlashcardPreview id={item.id} />
          </TouchableOpacity>
        )}
      />
    );
  };

  const AddAndDeleteButtons = () => {
    return (
      <View className="flex-row justify-around mt-4">
        <TouchableOpacity onPress={addCard} className="items-center">
          <Icon name="add-circle-outline" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={deleteCardSet} className="items-center">
          <Icon name="trash-outline" size={30} color="black" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View className="flex-1 p-5">
      {isEditingTitle ? <EditingTitleView /> : <TitleView />}
      <View className="flex-row justify-between my-2">
        <Text className="text-green-500">Active Cards: {cards.length}</Text>
        <Text className="text-blue-500">New Cards: {cards.length}</Text>
      </View>
      <ScrollFlashcardsView />
      <AddAndDeleteButtons />
      {selectedCardIndex !== null && (
        <Modal visible={isModalVisible} transparent={true}>
          <TouchableWithoutFeedback onPress={closeCardDetails}>
            <View className="flex-1 justify-center items-center">
              <TouchableWithoutFeedback>
                <View className="flex-row justify-between items-center w-full px-6 absolute top-1/3 transform -translate-y-1/2">
                  <TouchableOpacity
                    onPress={() => switchCard("prev")}
                    className="justify-center"
                  >
                    <Icon name="arrow-back-outline" size={30} color="black" />
                  </TouchableOpacity>
                  <View className="">
                    <FlashcardDetails
                      card={cards[selectedCardIndex]}
                      onClose={closeCardDetails}
                      onDelete={deleteCard}
                      onEdit={saveEditedCard}
                    />
                  </View>
                  <TouchableOpacity
                    onPress={() => switchCard("next")}
                    className="justify-center"
                  >
                    <Icon
                      name="arrow-forward-outline"
                      size={30}
                      color="black"
                    />
                  </TouchableOpacity>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
    </View>
  );
};

export default FlashcardSetDetailsScreen;
