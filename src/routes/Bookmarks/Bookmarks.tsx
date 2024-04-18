import React from "react";
import { persistor, useAppSelector } from "../../utils/store";
import { selectBookmarks } from "../../utils/slices/bookmarkReducer";
import Content from "../JLPT Cards/components/GrammarCard";
import { CardData } from "../../utils/types";

const Bookmarks = () => {
  const handleReset = async () => {
    await persistor.purge(); // Clears the persisted store
    window.location.reload(); // Optional: reload the page to reinitialize the state
  };
  const bookmarkList = useAppSelector(selectBookmarks);
  return (
    <div className="flex flex-col innerWidth p-1">
      <button onClick={handleReset}>reset state</button>
      {bookmarkList["N1"].map((card: CardData, i: number) => {
        return <Content key={i} card={card} param={"n1"} />;
      })}
      {bookmarkList["N2"].map((card: CardData, i: number) => {
        return <Content key={i} card={card} param={"n2"} />;
      })}
      {bookmarkList["N3"].map((card: CardData, i: number) => {
        return <Content key={i} card={card} param={"n3"} />;
      })}
      {bookmarkList["N4"].map((card: CardData, i: number) => {
        return <Content key={i} card={card} param={"n4"} />;
      })}
      {bookmarkList["N5"].map((card: CardData, i: number) => {
        return <Content key={i} card={card} param={"n5"} />;
      })}
    </div>
  );
};

export default Bookmarks;
