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
  const fullBookmarks = useAppSelector(selectBookmarks);

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

  const handleAddClick = () => {
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
  };

  return (
    <div className="flex flex-col w-full mb-8 bg-white relative ">
      {/* Heading */}
      <div className="inline-block  text-center bg-red-200 font-bold py-1">
        {grammar}
      </div>

      {/* Main Content */}
      <div className="p-4 relative">
        {/* Bookmark Icon */}
        <CiStar
          onClick={() => handleAddClick()}
          className={`absolute top-2 right-4 h-7 w-7 cursor-pointer select-none ${
            alreadyBookmarked ? "bg-cyan-400" : ""
          }`}
        />
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
