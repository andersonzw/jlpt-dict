import { addDoc, collection, doc, getDoc, getDocs, query, setDoc } from "firebase/firestore";
import { db } from "./firebase/firebase-config";
import { bookmarkState } from "./types";

export const uploadBookmarksToFirebase = async (
  userId: string | undefined,
  bookmarkToUpload: bookmarkState
) => {
  try {
    const docRef = doc(db, `users/${userId}`);
    await setDoc(docRef, bookmarkToUpload);
    console.log("bookmarked uploaded");
  } catch (error) {
    console.log(error);
  }
};

export const fetchBookmarksFromFirebase = async (userId: string) => {
  try {
    const q = query(collection(db,`users/${userId}`))
    const querySnapshot = await getDocs(q);
    console.log("fetching...");
    if (querySnapshot) {
        const fetchedBookmarkList = querySnapshot.docs.map((doc)=>doc.data())
        console.log(fetchedBookmarkList);

    } else{
        console.log("does not exist");
    }
  } catch (error) {
    console.log(error);
  }
};
