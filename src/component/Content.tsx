import React, { useState } from "react";
import { CardData } from "../utils/types";
import { CiStar } from "react-icons/ci";

type ContentProps = {
  card: CardData;
};
const Content: React.FC<ContentProps> = ({ card }) => {
  const [visible, setVisible] = useState(false);
  const { grammar, meaning, english, structure, level, sentences } = card;
  return (
    <div className="flex flex-col w-full mb-8 bg-white relative ">
      {/* Heading */}
      <div className="inline-block  text-center bg-blue-100 font-bold py-1">
        {grammar}
      </div>

      {/* Main Content */}
      <div className="p-4 relative">
        <CiStar className="absolute top-2 right-4 h-7 w-7" />
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
            className="bg-blue-200 hover:bg-blue-500 text-black px-4 rounded"
            onClick={() => {
              setVisible((visible) => !visible);
            }}
          >
            {`${visible ? "Hide " : "Reveal Sentences"}`}
          </button>
          {/* <button className=""> Generate Sentences</button> */}
          <div className="border px-4 rounded"> JLPT: {level}</div>
        </div>

        <div id="sentence-container" className={`${!visible ? "hidden" : ""}`}>
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
