import { useAppDispatch, useAppSelector } from "../../utils/store";
import {
  clearBookmarks,
  selectBookmarks,
} from "../../utils/slices/bookmarkReducer";
import Content from "../JLPT Cards/components/GrammarCard";
import { CardData } from "../../utils/types";
import { useEffect, useState } from "react";
import { selectCurrentUser } from "../../utils/slices/userReducer";
import {
  fetchBookmarksFromFirebase,
  uploadBookmarksToFirebase,
} from "../../utils/functions";

const Bookmarks = () => {
  const handleClearBookmarks = async () => {
    dispatch(clearBookmarks());
  };
  const currentUser = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  const localBookmarks = useAppSelector(selectBookmarks);
  const [empty, setEmpty] = useState(true);

  // bookmarks to display on this page
  // Use local bookmarks as default
  const [bookmarks, setBookmarks] = useState(localBookmarks);

  // If signed in, fetch from firebase storage, dispatch to
  // Refetch everytime bookmark store is updated
  useEffect(() => {
    const fetchData = async () => {
      if (currentUser.uid) {
        const result = await fetchBookmarksFromFirebase(currentUser.uid);
        setBookmarks(result);
      }
    };
    // Update user's firebase bookmark everytime local bookmark is changed
    const uploadToFirebase = async () => {
      await uploadBookmarksToFirebase(currentUser.uid, {
        bookmarkList: localBookmarks,
      });
    };

    fetchData();
    uploadToFirebase();

  }, [localBookmarks]);

  
  useEffect(() => {

  }, [localBookmarks]);

  // See if bookmark list is empty
  useEffect(() => {
    setEmpty(true);
    for (const level in bookmarks) {
      if (bookmarks[level].length !== 0) {
        setEmpty(false);
      }
    }
  }, [bookmarks]);

  const renderLevel = (level: string) =>
    bookmarks[level].map((card: CardData, i: number) => (
      <Content key={i} card={card} param={level.toLowerCase()} />
    ));

  if (empty) {
    return (
      <div className="text-center">
        <p className="text-sm italic mb-16">
          {currentUser.uid ? (
            <span>Currently Synced: {currentUser.email}</span>
          ) : (
            <span>*Sign in to sync bookmark across devices</span>
          )}
        </p>
        Empty Bookmark
      </div>
    );
  }
  return (
    <div className="flex flex-col innerWidth p-1">
      <p className="text-sm italic text-end">
        {currentUser.uid ? (
          <span>Currently Synced: {currentUser.email}</span>
        ) : (
          <span>*Sign in to sync bookmark across devices</span>
        )}
      </p>
      {["N1", "N2", "N3", "N4", "N5"].map((level) => renderLevel(level))}
      <button
        className="bg-red-400 text-white px-4 py-2 rounded w-50 mx-auto"
        onClick={handleClearBookmarks}
      >
        Clear Bookmarks
      </button>
    </div>
  );
};

export default Bookmarks;
