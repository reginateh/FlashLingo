import { View, Text, TouchableWithoutFeedback } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { FlashcardType } from "../components/flashcard/FlashcardType";
import { FlatList, TouchableOpacity, Modal } from "react-native";
import FlashcardDetails from "../components/flashcard/FlashcardDetails";
import FlashcardPreview from "../components/flashcard/FlashcardPreview";
import Icon from "@expo/vector-icons/Ionicons";
import { Stack } from "expo-router";
import FlashcardData from "../components/flashcard/FlashcardData";
import { FIREBASE_AUTH } from "@/firebaseConfig";
import InputModal from "../components/InputModal";
import FlashcardSetTitleEditor from "../components/flashcard/FlashcardSetTitleEditor";
import { router } from "expo-router";
import DeleteConfirmation from "../components/DeleteConfirmation";

/**
 * The details screen for a flashcard set.
 * The route parameter is the ID of the flashcard set.
 * Displays the title of the flashcard set, the number of active and new cards,
 * the list of flashcards, and buttons to add a new card and delete the flashcard set.
 */
const FlashcardSetDetailsScreen = () => {
  // Get the flashcard set ID from the route parameters
  const { flashcardSetId } = useLocalSearchParams<{ flashcardSetId: string }>();
  const [id, setId] = useState<string>(flashcardSetId as string);

  // Get the flashcard set details from Firestore
  const initialFlashcardSetDetails =
    FlashcardData.getInstance().getFlashcardSetDetailsById(id);
  const [flashcardSetDetails, setFlashcardSetDetails] = useState(
    initialFlashcardSetDetails
  );

  const [flashcards, setFlashcards] = useState<FlashcardType[]>([]);

  // Fetch flashcards in this flashcard set
  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = FIREBASE_AUTH.currentUser;
        if (!user) {
          throw new Error("No user is signed in.");
        }

        const cards = await FlashcardData.getInstance(
          user.uid
        ).getFlashcardsBySetId(id);
        setFlashcards(cards);
      } catch (err: any) {
        console.log(err.message);
      }
    };

    fetchData();
  }, []);

  /////////////////////////
  // EDIT CARD SET TITLE //
  /////////////////////////
  const [title, setTitle] = useState(flashcardSetDetails.title || "");
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const saveTitle = async (newTitle: string) => {
    setTitle(newTitle);
    setIsEditingTitle(false);
    await FlashcardData.getInstance().updateFlashcardSetTitle(id, newTitle);
  };

  /////////////////////
  // DELETE CARD SET //
  /////////////////////

  const [isDeletingSet, setIsDeletingSet] = useState<boolean>(false);

  /**
   * Delete this card set and navigate back to the Flashcards screen.
   */
  const deleteFlashcardSet = async () => {
    setIsDeletingSet(false);
    await FlashcardData.getInstance().deleteFlashcardSet(id);
    router.push("/(tabs)/Flashcards");
  };

  ///////////////////////
  // ADD NEW FLASHCARD //
  ///////////////////////
  const [isAddingCard, setIsAddingCard] = useState<boolean>(false);

  /**
   * Function to add a new card to the flashcard set.
   * Also updates the number of new cards in the flashcard set details.
   * @param values an array of strings representing the word, part of speech, and definition of the new card.
   */
  const addCard = async (values: string[]) => {
    if (
      values[0].trim() === "" ||
      values[1].trim() === "" ||
      values[2].trim() === ""
    ) {
      return;
    }
    const newCard: FlashcardType = {
      id: "",
      word: values[0],
      partOfSpeech: values[1],
      definition: values[2],
      level: 0,
    };
    setFlashcards([...flashcards, newCard]);
    setIsAddingCard(false);
    const newCardId = await FlashcardData.getInstance().addFlashcard(
      id,
      newCard
    );
    newCard.id = newCardId;
    setFlashcardSetDetails({
      ...flashcardSetDetails,
      numOfNewCards: flashcardSetDetails.numOfNewCards + 1,
    });
  };

  ///////////////////////
  // EDIT FLASHCARD    //
  ///////////////////////

  /**
   * Function to save the edited card.
   * Updates the flashcards state and saves the edited card to Firestore.
   * @param editedCard the edited card to save.
   */
  const saveEditedCard = async (editedCard: FlashcardType) => {
    setFlashcards(
      flashcards.map((card) => (card.id === editedCard.id ? editedCard : card))
    );
    await FlashcardData.getInstance().updateFlashcard(id, editedCard);
  };

  ///////////////////////
  // DELETE FLASHCARD  //
  ///////////////////////

  /**
   * Function to delete a card from the flashcard set.
   * Updates the flashcards state and deletes the card from Firestore.
   * Also updates the number of new or active cards in the flashcard set details.
   * @param cardId the ID of the card to delete.
   */
  const deleteCard = async (cardId: string) => {
    setFlashcards(flashcards?.filter((card) => card.id !== cardId));
    closeCardDetails();
    const toDeleteLevel = await FlashcardData.getInstance().deleteFlashcard(
      id,
      cardId
    );
    if (toDeleteLevel === 0) {
      setFlashcardSetDetails({
        ...flashcardSetDetails,
        numOfNewCards: Math.max(0, flashcardSetDetails.numOfNewCards - 1),
      });
    } else if (toDeleteLevel >= 1) {
      setFlashcardSetDetails({
        ...flashcardSetDetails,
        numOfActiveCards: Math.max(0, flashcardSetDetails.numOfActiveCards - 1),
      });
    }
  };

  ///////////////////////
  // FLASHCARD MODAL   //
  ///////////////////////
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(
    null
  );

  /**
   * Function to switch the card being viewed in the FlashcardDetails modal.
   * @param direction the direction to switch the card in.
   */
  const switchCard = (direction: "prev" | "next") => {
    if (direction === "prev") {
      setSelectedCardIndex((prevIndex) =>
        prevIndex == null
          ? prevIndex
          : prevIndex > 0
          ? prevIndex - 1
          : flashcards.length - 1
      );
    } else if (direction === "next") {
      setSelectedCardIndex((prevIndex) =>
        prevIndex == null
          ? prevIndex
          : prevIndex < flashcards.length - 1
          ? prevIndex + 1
          : 0
      );
    }
  };

  /**
   * Open the FlashcardDetails modal when a card is clicked.
   * @param index the index of the card to view.
   */
  const openCardDetails = (index: number) => {
    setSelectedCardIndex(index);
  };

  /**
   * Close the FlashcardDetails modal when the background is clicked.
   */
  const closeCardDetails = () => {
    setSelectedCardIndex(null);
  };

  ///////////////////////
  // VIEW COMPONENTS   //
  ///////////////////////

  /**
   * Display the title and the edit button.
   */
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

  /**
   * Display the flashcards in a scrollable list.
   */
  const ScrollFlashcardsView = () => {
    return (
      <FlatList
        data={flashcards}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => openCardDetails(index)}>
            <FlashcardPreview word={item.word} />
          </TouchableOpacity>
        )}
      />
    );
  };

  /**
   * Display the add card and delete set buttons.
   */
  const AddCardAndDeleteSetButtons = () => {
    return (
      <View className="flex-row justify-around mt-4">
        <TouchableOpacity
          onPress={() => setIsDeletingSet(true)}
          className="items-center"
        >
          <Icon name="trash-outline" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setIsAddingCard(true)}
          className="items-center"
        >
          <Icon name="add-circle-outline" size={30} color="black" />
        </TouchableOpacity>
      </View>
    );
  };

  /**
   * Display the modal to add a new card.
   * Visible when the add card button is clicked.
   */
  const AddNewCardModal = () => {
    return (
      <InputModal
        title="Add New Card"
        visible={isAddingCard}
        placeholders={["word", "part of speech", "definition"]}
        initialValues={["", "", ""]}
        onSave={addCard}
        onCancel={() => setIsAddingCard(false)}
      />
    );
  };

  /**
   * Display the modal to confirm the deletion of the flashcard set.
   * Visible when the delete set button is clicked.
   */
  const DeleteSetConfirmation = () => {
    return (
      <DeleteConfirmation
        name="flashcard set"
        visible={isDeletingSet}
        onDelete={deleteFlashcardSet}
        onCancel={() => setIsDeletingSet(false)}
      />
    );
  };

  return (
    <View className="flex-1 p-5">
      <Stack.Screen options={{ title: "", headerBackTitle: "Flashcards" }} />
      {isEditingTitle ? (
        <FlashcardSetTitleEditor oldTitle={title} onSave={saveTitle} />
      ) : (
        <TitleView />
      )}
      <View className="flex-row justify-between my-2">
        <Text className="text-[#99AF96]">
          Active Cards: {flashcardSetDetails.numOfActiveCards}
        </Text>
        <Text className="text-[#D98A74]">
          New Cards: {flashcardSetDetails.numOfNewCards}
        </Text>
      </View>
      <ScrollFlashcardsView />
      <AddCardAndDeleteSetButtons />
      {selectedCardIndex !== null && (
        <Modal visible={selectedCardIndex !== null} transparent={true}>
          <TouchableWithoutFeedback onPress={closeCardDetails}>
            <View className="flex-1 justify-center items-center">
              <View className="w-full flex-row justify-center px-4 items-center absolute top-1/3 transform -translate-y-1/2">
                <TouchableOpacity
                  onPress={() => switchCard("prev")}
                  className="z-10"
                >
                  <Icon name="arrow-back-outline" size={28} color="black" />
                </TouchableOpacity>
                <TouchableWithoutFeedback>
                  <View>
                    <FlashcardDetails
                      card={flashcards[selectedCardIndex]}
                      onDelete={deleteCard}
                      onEdit={saveEditedCard}
                    />
                  </View>
                </TouchableWithoutFeedback>
                <TouchableOpacity
                  onPress={() => switchCard("next")}
                  className="z-10"
                >
                  <Icon name="arrow-forward-outline" size={28} color="black" />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
      <AddNewCardModal />
      <DeleteSetConfirmation />
    </View>
  );
};

export default FlashcardSetDetailsScreen;
