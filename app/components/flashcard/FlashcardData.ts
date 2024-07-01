import {
  collection,
  getDocs,
  addDoc,
  doc,
  setDoc,
  DocumentData,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import { FlashcardType } from "./FlashcardType";

/**
 * Class to handle fetching and updating flashcard data from Firestore.
 * This class is a singleton, and only one instance can be created at a time.
 * To get an instance of this class, use the getInstance method.
 * The instance can be cleared using the clearInstance method.
 */
class FlashcardData {
  private uid: string;
  private userRef;
  private flashcardSets: Map<string, DocumentData>;
  private flashcards: Map<string, FlashcardType[]>;
  private fetchFlashcardSetsPromise: Promise<void>;
  private static instance: FlashcardData | null;

  private constructor(uid: string) {
    this.uid = uid;
    this.userRef = doc(db, "users", uid);
    this.flashcardSets = new Map<string, DocumentData>();
    this.flashcards = new Map<string, FlashcardType[]>();
    this.fetchFlashcardSetsPromise = this.fetchFlashcardSets();
  }

  public static getInstance(uid?: string): FlashcardData {
    if (!FlashcardData.instance) {
      if (!uid) {
        throw new Error(
          "No instance exists, and no UID was provided to create one."
        );
      }
      FlashcardData.instance = new FlashcardData(uid);
    } else if (uid && FlashcardData.instance.uid !== uid) {
      throw new Error("A different user is already logged in.");
    }
    return FlashcardData.instance;
  }

  public static clearInstance() {
    FlashcardData.instance = null;
  }

  ////////////////////////
  // GET FLASHCARD SETS //
  ////////////////////////

  private async fetchFlashcardSets() {
    const flashcardSets = new Map<string, DocumentData>();
    const querySnapshot = await getDocs(
      collection(this.userRef, "flashcardSets")
    );
    querySnapshot.forEach((doc) => {
      flashcardSets.set(doc.id, doc.data());
    });
    this.flashcardSets = flashcardSets;
  }

  public async getFlashcardSets() {
    await this.fetchFlashcardSetsPromise;
    return this.flashcardSets;
  }

  public getFlashcardSetDetailsById(id: string): DocumentData {
    const flashcardSetDetails = this.flashcardSets.get(id);
    if (!flashcardSetDetails) {
      return {
        title: "",
        numOfNewCards: 0,
        numOfActiveCards: 0,
      };
    }
    return flashcardSetDetails;
  }

  ///////////////////////
  // GET FLASHCARDS    //
  ///////////////////////

  /**
   * Fetch flashcards for a given flashcard set ID and stores them in the flashcards map,
   * with the key being the flashcard set ID.
   * @param setId The ID of the flashcard set to fetch flashcards for.
   */
  private async fetchFlashcardsBySetId(setId: string) {
    const flashcards: FlashcardType[] = [];
    const querySnapshot = await getDocs(
      collection(this.userRef, "flashcardSets", setId, "flashcards")
    );
    querySnapshot.forEach((doc) => {
      const id = doc.id;
      const data = { id, ...doc.data() } as FlashcardType;
      if (this.isFlashcardType(data)) {
        flashcards.push(data);
      }
    });
    this.flashcards.set(setId, flashcards);
  }

  /**
   * Check if the fetched data matches the FlashcardType type.
   * @param data
   * @returns ture if the data matches the FlashcardType type, false otherwise.
   */
  private isFlashcardType = (data: any): boolean => {
    return (
      typeof data.id === "string" &&
      typeof data.word === "string" &&
      typeof data.definition === "string" &&
      typeof data.partOfSpeech === "string" &&
      typeof data.level === "number"
    );
  };

  /**
   * Get flashcards for a given flashcard set ID.
   * If the flashcards have not been fetched yet, fetch them first.
   * @param setId The ID of the flashcard set to fetch flashcards for.
   * @returns An array containing the flashcards for the given set ID.
   */
  public async getFlashcardsBySetId(setId: string): Promise<FlashcardType[]> {
    if (!this.flashcards.has(setId)) {
      await this.fetchFlashcardsBySetId(setId);
    }
    return this.flashcards.get(setId) ?? [];
  }

  ///////////////////////
  // FLASHCARD ACTIONS //
  ///////////////////////

  /**
   * Add a flashcard to a given flashcard set.
   * @param setId The ID of the flashcard set to add the flashcard to.
   * @param flashcard The new flashcard to add.
   * @returns The auto-generated ID by Firestore of the new flashcard.
   */
  public async addFlashcard(
    setId: string,
    flashcard: FlashcardType
  ): Promise<string> {
    const flashcards: FlashcardType[] = this.flashcards.get(setId) ?? [];
    const newFlashcards = [...flashcards, flashcard];
    this.flashcards.set(setId, newFlashcards);
    const toFireStore = {
      word: flashcard.word,
      definition: flashcard.definition,
      partOfSpeech: flashcard.partOfSpeech,
      level: flashcard.level,
    };
    const docRef = await addDoc(
      collection(this.userRef, "flashcardSets", setId, "flashcards"),
      toFireStore
    );
    flashcard.id = docRef.id;
    await this.updateFlashcardSetCardCount(setId, 1, "new");
    return docRef.id;
  }

  /**
   * Update a flashcard in a given flashcard set.
   * Replace the flashcard with the same ID in the flashcards map with the new flashcard.
   * @param setId The ID of the flashcard set to update the flashcard in.
   * @param flashcard The new flashcard with new information to replace the old flashcard.
   */
  public async updateFlashcard(setId: string, flashcard: FlashcardType) {
    const flashcards: FlashcardType[] = this.flashcards.get(setId) ?? [];
    const index = flashcards.findIndex((card) => card.id === flashcard.id);
    if (index === -1) {
      return;
    }
    flashcards[index] = flashcard;
    this.flashcards.set(setId, flashcards);
    const toFireStore = {
      word: flashcard.word,
      definition: flashcard.definition,
      partOfSpeech: flashcard.partOfSpeech,
      level: flashcard.level,
    };
    await setDoc(
      doc(this.userRef, "flashcardSets", setId, "flashcards", flashcard.id),
      toFireStore
    );
  }

  /**
   * Update the level of a flashcard in a given flashcard set.
   * @param setId The ID of the flashcard set to update the flashcard in.
   * @param flashcardId The ID of the flashcard to update the level of.
   * @param addLevel The number to add to the current level of the flashcard.
   */
  public async updateFlashcardLevel(
    setId: string,
    flashcardId: string,
    addLevel: number
  ) {
    const flashcards: FlashcardType[] = this.flashcards.get(setId) ?? [];
    const index = flashcards.findIndex((card) => card.id === flashcardId);
    if (index === -1) {
      return;
    }
    const flashcard = flashcards[index];
    const oldLevel = flashcard.level;
    flashcard.level = oldLevel + addLevel;
    flashcards[index] = flashcard;
    this.flashcards.set(setId, flashcards);
    if (oldLevel === 0) {
      await this.updateFlashcardSetCardCount(setId, -1, "new");
      await this.updateFlashcardSetCardCount(setId, 1, "active");
    }
    await this.updateFlashcard(setId, flashcard);
  }

  /**
   * Delete a flashcard from a given flashcard set.
   * @param setId The ID of the flashcard set to delete the flashcard from.
   * @param flashcardId The ID of the flashcard to delete.
   * @returns The level of the deleted flashcard, or -1 if the flashcard was not found.
   */
  public async deleteFlashcard(
    setId: string,
    flashcardId: string
  ): Promise<number> {
    const flashcards: FlashcardType[] = this.flashcards.get(setId) ?? [];
    const index = flashcards.findIndex((card) => card.id === flashcardId);
    if (index === -1) {
      return -1;
    }
    const toDeleteLevel = flashcards[index].level;
    flashcards.splice(index, 1);
    this.flashcards.set(setId, flashcards);
    await deleteDoc(
      doc(this.userRef, "flashcardSets", setId, "flashcards", flashcardId)
    );
    await this.updateFlashcardSetCardCount(
      setId,
      -1,
      toDeleteLevel === 0 ? "new" : "active"
    );
    return toDeleteLevel;
  }

  //////////////////////
  // CARD SET ACTIONS //
  //////////////////////

  /**
   * Update the title of a flashcard set.
   * @param setId The ID of the flashcard set to update the title of.
   * @param title A string containing the new title of the flashcard set.
   */
  public async updateFlashcardSetTitle(setId: string, title: string) {
    const flashcardSet = this.flashcardSets.get(setId);
    if (!flashcardSet) {
      return;
    }
    this.flashcardSets.set(setId, { ...flashcardSet, title: title });
    await updateDoc(doc(this.userRef, "flashcardSets", setId), {
      title: title,
    });
  }

  /**
   * Add a new flashcard set to Firestore.
   * @param title The title of the new flashcard set.
   * @returns The new flashcard set's ID and data.
   */
  public async addFlashcardSet(title: string): Promise<[string, DocumentData]> {
    const newFlashcardSet = {
      title: title,
      numOfNewCards: 0,
      numOfActiveCards: 0,
    };
    const docRef = await addDoc(
      collection(this.userRef, "flashcardSets"),
      newFlashcardSet
    );
    this.flashcardSets.set(docRef.id, newFlashcardSet);
    return [docRef.id, newFlashcardSet];
  }

  /**
   * Delete a flashcard set from Firestore.
   * @param setId The ID of the flashcard set to delete.
   */
  public async deleteFlashcardSet(setId: string) {
    this.flashcardSets.delete(setId);
    await deleteDoc(doc(this.userRef, "flashcardSets", setId));
  }

  /**
   * Update the number of new or active cards in a flashcard set.
   * @param setId The ID of the flashcard set to update the card count of.
   * @param count The number of cards to add. If negative, the number of cards will be subtracted.
   * @param status The status of the cards to update: "new" or "active".
   */
  private async updateFlashcardSetCardCount(
    setId: string,
    count: number,
    status: "new" | "active"
  ) {
    const flashcardSet = this.flashcardSets.get(setId);
    if (!flashcardSet) {
      return;
    }
    if (status === "new") {
      const newCount = flashcardSet.numOfNewCards + count;
      this.flashcardSets.set(setId, {
        ...flashcardSet,
        numOfNewCards: newCount,
      });
      await updateDoc(doc(this.userRef, "flashcardSets", setId), {
        numOfNewCards: newCount,
      });
    } else if (status === "active") {
      const activeCount = flashcardSet.numOfActiveCards + count;
      this.flashcardSets.set(setId, {
        ...flashcardSet,
        numOfActiveCards: activeCount,
      });
      await updateDoc(doc(this.userRef, "flashcardSets", setId), {
        numOfActiveCards: activeCount,
      });
    }
  }
}

export default FlashcardData;
