import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { db } from "./firebase/firebase-config";
import { BookmarkState, CardData } from "./types";

export const uploadBookmarksToFirebase = async (
  userId: string | null,
  bookmarkToUpload: BookmarkState
) => {
  if (!userId) return;
  try {
    const docRef = doc(db, `users/${userId}`);
    await setDoc(docRef, bookmarkToUpload);
    console.log("bookmarked updated");
  } catch (error) {
    console.log(error);
  }
};

export const fetchBookmarksFromFirebase = async (userId: string | null) => {
  if (!userId) return;
  try {
    const docRef = doc(db, `users/${userId}`);
    const docSnap = await getDoc(docRef);
    console.log("fetching...");
    if (docSnap.exists()) {
      const docData = docSnap.data();
      const fetchedBookmarkList = docData.bookmarkList;
      console.log("succesfully fetched");
      return fetchedBookmarkList;
    } else {
      console.log("does not exist");
    }
  } catch (error) {
    console.log("error from fetching", error);
  }
};
export type DataObjectType = {
  [key: string]: CardData[];
};
export const fetchGrammarDataFromFirebase = async () => {
  const collections = [
    "jlptn0",
    "jlptn1",
    "jlptn2",
    "jlptn3",
    "jlptn4",
    "jlptn5",
  ];
  const dataObject: DataObjectType = {
    jlptn0: [],
    jlptn1: [],
    jlptn2: [],
    jlptn3: [],
    jlptn4: [],
    jlptn5: [],
  };

  for (const collectionName of collections) {
    try {
      const q = await getDocs(collection(db, collectionName));
      const data = q.docs.map((doc) => {
        const docData = doc.data();
        const cardData: CardData = {
          grammar: docData.grammar,
          meaning: docData.meaning,
          structure: docData.structure,
          level: docData.level,
          notes: docData.notes,
          sentences: docData.sentences,
          other: docData.other,
          link: docData.link,
          english: docData.english,
        };
        return cardData;
      });

      dataObject[collectionName] = data;
    } catch (error) {
      console.log(error);
    }
  }
  return dataObject;
};
