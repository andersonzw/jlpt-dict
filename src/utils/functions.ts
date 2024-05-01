import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase/firebase-config";
import { BookmarkState } from "./types";

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
      const docData = docSnap.data()
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
