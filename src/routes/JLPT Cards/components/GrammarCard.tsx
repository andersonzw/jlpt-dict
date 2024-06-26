import React, { useEffect, useState } from "react";
import { CardData } from "../../../utils/types";
import { CiStar } from "react-icons/ci";

import {
  addToBookmarks,
  removeFromBookmarks,
  selectBookmarks,
} from "../../../utils/slices/bookmarkReducer.ts";
import { useAppDispatch, useAppSelector } from "../../../utils/store.ts";

type ContentProps = {
  card: CardData;
  param: string | undefined;
};
const Content: React.FC<ContentProps> = ({ card, param }) => {
  const [visible, setVisible] = useState(false);
  const [alreadyBookmarked, setAlreadyBookmarked] = useState(false);
  const { grammar, meaning, english, structure, level, sentences } = card;
  const dispatch = useAppDispatch();
  const localBookmarks = useAppSelector(selectBookmarks);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setVisible(false);
    setAlreadyBookmarked(false);
  }, [param]);

  useEffect(() => {
    if (param) {
      const bookmarks = localBookmarks[param.toUpperCase()];
      bookmarks.forEach((ele) => {
        if (ele.grammar === grammar) {
          setAlreadyBookmarked(true);
        }
      });
    }
  }, [param, localBookmarks, grammar]);

  const handleAddClick = async () => {
    setIsAnimating(true); // Trigger animation
    const bookmarkObject = {
      grammar: grammar,
      meaning: meaning,
      english: english,
      structure: structure,
      level: level,
      sentences: sentences,
      notes: [],
      link: "",
      other: [],
    };
    // return if already bookmarked
    if (alreadyBookmarked) {
      dispatch(removeFromBookmarks(bookmarkObject));
      setAlreadyBookmarked(false);
    } else {
      dispatch(addToBookmarks(bookmarkObject));
    }

    setTimeout(() => setIsAnimating(false), 100);
  };

  const findJapneseChar = (text: string) => {
    const regex = /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/;
    const match = text.match(regex);
    return match ? match[0] : null;
  };

  return (
    <div className="flex flex-col w-full mb-8 bg-white relative px-4 ">
      {/* Heading */}
      <div className="inline-block  text-center bg-red-200 font-bold py-1 jp-font">
        {grammar}
      </div>

      {/* Main Content */}
      <div className="sm:p-4 py-4 px-2 relative">
        {/* Subheading */}
        <div className="flex justify-between items-center h-auto sm:pb-4 pb-2 mb-4 border-b-[1px]">
          {/* First Character */}
          <div className="text-xl jp-font">[{findJapneseChar(grammar)}]</div>
          {/* Bookmark Icon */}
          <div className="group relative h-[28px] hover:bg-theme-red-100 hover:rounded-full">
            <CiStar
              onClick={() => handleAddClick()}
              className={`relative h-7 w-7 cursor-pointer select-none hover:text-theme-red-400 ${
                alreadyBookmarked ? "text-theme-red-500" : "text-gray-400"
              }
              transition ease-linear duration-100 transform ${
                isAnimating ? "scale-150" : "scale-100"
              }`}
            />
            <span className="absolute right-0 top-[2.5rem] whitespace-nowrap px-2 py-1 text-xs text-white bg-theme-red-200 rounded-md hidden  group-hover:block transition-opacity duration-300 ease-in-out">
              {alreadyBookmarked ? "Remove from Bookmark" : "Bookmark"}
            </span>
          </div>
        </div>

        {/* Structure */}
        {structure[0] ? (
          <>
            <p className="font-bold">Structure:</p>
            <p className="ml-4 mb-4 jp-font" >・{structure}</p>
          </>
        ) : null}

        {meaning[0] ? (
          <>
            <p className="font-bold">Meaning:</p>
            <p className="ml-4 mb-4 jp-font">・{meaning}</p>
          </>
        ) : null}
        {english[0] ? (
          <>
            <p className="font-bold">English:</p>
            <p className="ml-4 mb-4">・{english}</p>
          </>
        ) : null}

        {/* Footer */}
        <div className="flex flex-row justify-between mt-7">
          {/* Sentence */}
          <button
            className={`bg-red-100 hover:bg-red-300 text-black px-4 rounded text-sm ${
              sentences[0] == undefined && "invisible"
            }`}
            onClick={() => {
              setVisible((visible) => !visible);
            }}
          >
            {`${visible ? "Hide " : "Reveal Sentences"}`}
          </button>

          {/* JLPT */}
          <div className="border px-4 rounded"> JLPT: {level}</div>
        </div>

        <div
          id="sentence-container"
          className={`${!visible ? "hidden" : ""} mt-4 py-2 border-t-[1px]`}
        >
          {sentences.map((sentence, i) => (
            <div key={i} className="ml-4 leading-loose jp-font">
              ・{sentence}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Content;
