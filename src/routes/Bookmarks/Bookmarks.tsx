import { persistor, useAppSelector } from "../../utils/store";
import { selectBookmarks } from "../../utils/slices/bookmarkReducer";
import Content from "../JLPT Cards/components/GrammarCard";
import { CardData } from "../../utils/types";
import { useEffect, useState } from "react";

const Bookmarks = () => {
  const handleReset = async () => {
    await persistor.purge(); // Clears the persisted store
    window.location.reload(); // Optional: reload the page to reinitialize the state
  };
  const bookmarkList = useAppSelector(selectBookmarks);
  const [empty, setEmpty] = useState(true);

  useEffect(() => {
    setEmpty(true);
    for (const level in bookmarkList) {
      if (bookmarkList[level].length !== 0) {
        setEmpty(false);
      }
    }
  }, [bookmarkList]);

  const renderLevel = (level: string) =>
    bookmarkList[level].map((card: CardData, i: number) => (
      <Content key={i} card={card} param={level.toLowerCase()} />
    ));

  // Usage in the return statement

  if (empty) {
    return <div className="text-center">Empty Bookmark</div>;
  }
  return (
    <div className="flex flex-col innerWidth p-1">
      <p className="text-sm italic text-end">*Sign in to sync bookmark across devices</p>
      {["N1", "N2", "N3", "N4", "N5"].map((level) => renderLevel(level))}
      <button
        className="bg-red-400 text-white px-4 py-2 rounded w-50 mx-auto"
        onClick={handleReset}
      >
        Delete Bookmarks
      </button>
    </div>
  );
};

export default Bookmarks;
