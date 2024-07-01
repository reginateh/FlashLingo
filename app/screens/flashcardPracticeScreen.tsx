import { View, Text, TouchableOpacity } from "react-native";
import {
  Stack,
  useLocalSearchParams,
  router,
  useFocusEffect,
} from "expo-router";
import FlashcardData from "../components/flashcard/FlashcardData";
import { useEffect, useState, useCallback } from "react";
import { FlashcardType } from "../components/flashcard/FlashcardType";
import Button from "../components/button";
import LoadingScreen from "./loadingScreen";

const FlashcardPracticeScreen = () => {
  const { flashcardSetId } = useLocalSearchParams<{ flashcardSetId: string }>();

  const [flashcards, setFlashcards] = useState<FlashcardType[]>([]);
  const [correctCounts, setCorrectCounts] = useState<number[]>([]);
  const [completedFlashcards, setCompletedFlashcards] = useState<boolean[]>([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);

    const cards: FlashcardType[] =
      await FlashcardData.getInstance().getFlashcardsBySetId(
        flashcardSetId as string
      );

    if (cards.length === 0) {
      alert("No flashcards available in this set.");
      router.push({
        pathname: `/screens/${flashcardSetId}`,
      });
      return;
    }

    // If there are more than 20 cards, select 10 new cards and 10 active cards
    let selectedCards = cards;
    if (cards.length > 20) {
      const newCards = cards.filter((card) => card.level === 0);
      const activeCards = cards
        .filter((card) => card.level > 0)
        .sort((card1, card2) => card1.level - card2.level);
      let selectedNewCardNumber = 10;
      let selectedActiveCardNumber = 10;
      if (newCards.length < 10) {
        selectedActiveCardNumber = 20 - newCards.length;
      } else if (activeCards.length < 10) {
        selectedNewCardNumber = 20 - activeCards.length;
      }
      const selectedNewCards = newCards.slice(0, selectedNewCardNumber);
      const selectedActiveCards = activeCards.slice(
        0,
        selectedActiveCardNumber
      );
      selectedCards = selectedNewCards.concat(selectedActiveCards);
    }

    setFlashcards(selectedCards);
    setCorrectCounts(new Array(selectedCards.length).fill(0));
    setCompletedFlashcards(new Array(selectedCards.length).fill(false));
    setCurrentQuestionIndex(0);
    setShowAnswer(false);
    setLoading(false);
    console.log(flashcardSetId);
    console.log(selectedCards);
  };

  useEffect(() => {
    fetchData();
  }, [flashcardSetId]);

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  const classifyCard = async (status: "know" | "unsure" | "dontknow") => {
    const updatedCorrectCounts = [...correctCounts];
    const updatedCompletedFlashcards = [...completedFlashcards];

    if (status === "know") {
      updatedCorrectCounts[currentQuestionIndex] += 1;
      if (updatedCorrectCounts[currentQuestionIndex] >= 3) {
        // Mark card as completed if it has been answered correctly 3 times in a row
        updatedCompletedFlashcards[currentQuestionIndex] = true;
        // Update the flashcard level (+1) in the database
        await FlashcardData.getInstance().updateFlashcardLevel(
          flashcardSetId as string,
          flashcards[currentQuestionIndex].id,
          1
        );
      }
    } else if (status === "dontknow") {
      // Substract correct count by 2 if the answer was incorrect
      updatedCorrectCounts[currentQuestionIndex] = Math.max(
        0,
        updatedCorrectCounts[currentQuestionIndex] - 2
      );
    } else {
      // Substract correct count by 1 if the answer was unsure
      updatedCorrectCounts[currentQuestionIndex] = Math.max(
        0,
        updatedCorrectCounts[currentQuestionIndex] - 1
      );
    }

    setCorrectCounts(updatedCorrectCounts);
    setCompletedFlashcards(updatedCompletedFlashcards);
    setShowAnswer(false);

    if (updatedCompletedFlashcards.includes(false)) {
      // Move to the next question, looping back to the start if necessary
      setCurrentQuestionIndex((prevIndex) =>
        getNextActiveCardIndex(prevIndex + 1)
      );
    } else {
      alert("All flashcards mastered!");
      router.push({
        pathname: `/screens/${flashcardSetId}`,
      });
    }

    console.log(updatedCorrectCounts);
    console.log(updatedCompletedFlashcards);
  };

  const getNextActiveCardIndex = (startIndex: number) => {
    // Find the next active card index from the start index
    let index = startIndex % flashcards.length;
    while (completedFlashcards[index]) {
      index = (index + 1) % flashcards.length;
    }
    return index;
  };

  const currentFlashcard = flashcards[currentQuestionIndex];

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <View className="flex-1 justify-center items-center p-4 bg-[#F7E2CD]">
      <Stack.Screen options={{ title: "Flashcard Practice" }} />
      <View className="w-full h-1/2 p-6 border border-gray-300 rounded-lg bg-white shadow-lg justify-center items-center">
        <View className="h-1/3 justify-center">
          <Text className="text-lg font-bold p-4">{currentFlashcard.word}</Text>
        </View>
        <View className="h-2/3">
          <View className={`${showAnswer ? "block" : "hidden"}`}>
            <Text className="text-lg">{currentFlashcard.definition}</Text>
          </View>
        </View>
      </View>
      <View className="h-1/6 w-full items-center">
        <View className={`${showAnswer ? "hidden" : "block"}`}>
          <Button
            bg="dg"
            size="md"
            text="Show Answer"
            onPress={() => setShowAnswer(true)}
          />
        </View>
        <View
          className={`${
            showAnswer ? "block" : "hidden"
          } flex-row justify-between p-2`}
        >
          <TouchableOpacity
            className="px-4 py-2 bg-[#D98A74] rounded-md m-2"
            onPress={async () => await classifyCard("dontknow")}
          >
            <Text className="text-white">I Don't Know</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="px-4 py-2 bg-gray-400 rounded-md m-2"
            onPress={async () => await classifyCard("unsure")}
          >
            <Text className="text-white">I'm Unsure</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="px-4 py-2 bg-[#B9CBB1] rounded-md m-2"
            onPress={async () => await classifyCard("know")}
          >
            <Text className="text-white">I Know This</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default FlashcardPracticeScreen;
