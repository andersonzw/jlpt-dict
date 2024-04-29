import React, { useEffect, useState } from "react";
import { CardData } from "../../../utils/types";
import { CiStar } from "react-icons/ci";

import {
  addToBookmarks,
  removeFromBookmarks,
  selectBookmarks,
} from "../../../utils/slices/bookmarkReducer.ts";
import { useAppDispatch, useAppSelector } from "../../../utils/store.ts";
import { uploadBookmarksToFirebase } from "../../../utils/functions.ts";
import { selectCurrentUser } from "../../../utils/slices/userReducer.ts";

type ContentProps = {
  card: CardData;
  param: string | undefined;
};
const Content: React.FC<ContentProps> = ({ card, param }) => {
  const [visible, setVisible] = useState(false);
  const [alreadyBookmarked, setAlreadyBookmarked] = useState(false);
  const { grammar, meaning, english, structure, level, sentences } = card;
  const dispatch = useAppDispatch();
  const fullBookmarks = useAppSelector(selectBookmarks);
  const [isAnimating, setIsAnimating] = useState(false);
  const currentUser = useAppSelector(selectCurrentUser);

  useEffect(() => {
    setVisible(false);
    setAlreadyBookmarked(false);
  }, [param]);

  useEffect(() => {
    if (param) {
      const bookmarks = fullBookmarks[param.toUpperCase()];
      bookmarks.forEach((ele) => {
        if (ele.grammar === grammar) {
          setAlreadyBookmarked(true);
        }
      });
    }
  }, [param, fullBookmarks, grammar]);

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

    await uploadBookmarksToFirebase(currentUser?.uid, {
      bookmarkList: fullBookmarks,
    });
    console.log("bookmarked uplaoded");

    setTimeout(() => setIsAnimating(false), 100);
  };

  const findJapneseChar = (text: string) => {
    const regex = /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/;
    const match = text.match(regex);
    return match ? match[0] : null;
  };

  return (
    <div className="flex flex-col w-full mb-8 bg-white relative ">
      {/* Heading */}
      <div className="inline-block  text-center bg-red-200 font-bold py-1">
        {grammar}
      </div>

      {/* Main Content */}
      <div className="p-4 relative">
        {/* Subheading */}
        <div className="flex justify-between items-center h-auto pb-4 mb-4 border-b-[1px]">
          {/* First Character */}
          <div className="text-xl ">[{findJapneseChar(grammar)}]</div>
          {/* Bookmark Icon */}
          <div className="group relative h-[28px] hover:bg-theme-red-100 hover:rounded-full">
            <CiStar
              onClick={() => handleAddClick()}
              className={`relative h-7 w-7 cursor-pointer select-none ${
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
        {structure ? (
          <>
            <p className="font-bold">Structure:</p>
            <p className="ml-2">・{structure}</p>
          </>
        ) : null}

        <p className="font-bold">Meaning:</p>
        <p className="ml-2">・{meaning}</p>

        {english.length !== 0 ? (
          <>
            <p className="font-bold">English:</p>
            <p className="ml-2">・{english}</p>
          </>
        ) : null}

        {/* Footer */}
        <div className="flex flex-row justify-between mt-4">
          <button
            className="bg-red-100 hover:bg-red-300 text-black px-4 rounded"
            // Sentence visibility
            onClick={() => {
              setVisible((visible) => !visible);
            }}
          >
            {`${visible ? "Hide " : "Reveal Sentences"}`}
          </button>
          {/* <button className=""> Generate Sentences</button> */}
          <div className="border px-4 rounded"> JLPT: {level}</div>
        </div>

        <div
          id="sentence-container"
          className={`${!visible ? "hidden" : ""} mt-4 py-2 border-t-[1px]`}
        >
          {sentences.map((sentence, i) => (
            <div key={i} className="ml-4 leading-loose">
              ・{sentence}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Content;
