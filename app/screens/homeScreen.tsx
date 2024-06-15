import { View, Text, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import FlashcardSet from "../components/flashcard/FlashcardSet";

const HomeScreen = () => {
  
  // dummy flashcard set data
  const flashcardSets = [
    { title: "Set 1", numOfCards: 10 },
    { title: "Set 2", numOfCards: 20 },
    { title: "Set 3", numOfCards: 30 },
    { title: "Set 4", numOfCards: 40},
    { title: "Set 5", numOfCards: 50},
    { title: "Set 6", numOfCards: 60},
    { title: "Set 7", numOfCards: 70},
    { title: "Set 8", numOfCards: 80},
    { title: "Set 9", numOfCards: 90},
    { title: "Set 10", numOfCards: 100},
    { title: "Set 11", numOfCards: 110},
  ];
  
  return (
    <SafeAreaView className="flex-1 w-full h-full">
      <ScrollView contentContainerStyle={styles.container}>
        {flashcardSets.map((flashcardSet, index) => {
          return (
            <FlashcardSet key={index} title={flashcardSet.title} numOfCards={flashcardSet.numOfCards} />
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});