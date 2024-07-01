import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import FlashcardSetPreview from "../components/flashcard/FlashcardSetPreview";
import { useEffect, useState, useCallback } from "react";
import FlashcardData from "../components/flashcard/FlashcardData";
import { FIREBASE_AUTH } from "@/firebaseConfig";
import { DocumentData } from "firebase/firestore";
import LoadingScreen from "./loadingScreen";
import { onAuthStateChanged } from "firebase/auth";
import { Tabs, useFocusEffect } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import InputModal from "../components/InputModal";

/**
 * The home screen of the app.
 * Displays the flashcard sets and an add button to add flashcard set.
 * If there are no flashcard sets, it prompts the user to add one.
 */
const HomeScreen = () => {
  const [flashcardSets, setFlashcardSets] = useState<Map<
    string,
    DocumentData
  > | null>(null);

  // Fetch the flashcard sets from the database
  const fetchData = async () => {
    try {
      // Ensure the user is authenticated
      const user = FIREBASE_AUTH.currentUser;
      if (!user) {
        return;
      }

      // Get the singleton instance of FlashcardData
      const flashcardData = FlashcardData.getInstance(user.uid);

      // Fetch the flashcard sets
      const sets = await flashcardData.getFlashcardSets();
      setFlashcardSets(new Map(sets));
      console.log(sets);
    } catch (err: any) {
      console.log(err.message);
    }
  };

  // Fetch the flashcard sets when the screen is loaded
  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      fetchData();
    });
  }, []);

  // Fetch the flashcard sets when the screen is focused
  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  // Add a flashcard set
  const [addCardSetModalVisible, setAddCardSetModalVisible] = useState(false);
  const createFlashcardSet = async (title: string) => {
    if (!title) {
      return;
    }
    setAddCardSetModalVisible(false);
    const [newSetId, newSet] =
      await FlashcardData.getInstance().addFlashcardSet(title);
    const updatedFlashcardSets = new Map(flashcardSets);
    updatedFlashcardSets.set(newSetId, newSet);
    setFlashcardSets(updatedFlashcardSets);
  };

  if (!flashcardSets) {
    return <LoadingScreen />;
  }

  return (
    <SafeAreaView className="flex-1 w-full h-full">
      <Tabs.Screen
        options={{
          headerRight: () => (
            <TouchableOpacity onPress={() => setAddCardSetModalVisible(true)}>
              <MaterialCommunityIcons
                name={"plus"}
                size={24}
                color={"black"}
                style={{ marginRight: 20 }}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <ScrollView contentContainerStyle={styles.container}>
        {flashcardSets &&
          Array.from(flashcardSets.entries()).map(([id, flashcardSet]) => {
            return (
              <FlashcardSetPreview
                key={id}
                id={id}
                title={flashcardSet.title}
                numOfNewCards={flashcardSet.numOfNewCards}
                numOfActiveCards={flashcardSet.numOfActiveCards}
              />
            );
          })}
        {!flashcardSets.size && <Text>Add your first flashcard set!</Text>}
      </ScrollView>
      <InputModal
        title="Add a flashcard set"
        visible={addCardSetModalVisible}
        placeholders={["title"]}
        initialValues={[""]}
        onSave={(values: string[]) => createFlashcardSet(values[0])}
        onCancel={() => setAddCardSetModalVisible(false)}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
});
