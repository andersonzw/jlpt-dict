import React, { useState } from "react";
import { CardData } from "./Card";
type ContentProps = {
  key: number;
  card: CardData;
};
const Content: React.FC<ContentProps> = ({ card }) => {
  const [visible, setVisible] = useState(false);
  const { grammar, meaning, english, structure, level, sentences } = card;
  console.log({ english });
  return (
    <div className="flex flex-col w-full mb-6 bg-white">
      <div className="inline-block  text-center bg-blue-100">{grammar}</div>
      <div className="p-4">
        {structure ? (
          <>
            <p className="">Structure:</p>
            <p className="ml-2">・{structure}</p>
          </>
        ) : null}

        <p className="">Meaning:</p>
        <p className="ml-2">・{meaning}</p>

        {english.length !== 0 ? (
          <>
            <p className="">English:</p>
            <p className="ml-2">・{english}</p>
          </>
        ) : null}

        {/* Footer */}
        <div className="flex flex-row justify-between mt-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white px-4 rounded"
            onClick={() => {
              setVisible((visible) => !visible);
              console.log(visible);
            }}
          >
            Reveal Sentences
          </button>
          <button className=""> Generate Sentences</button>
          <div className=""> JLPT: {level}</div>
        </div>

        <div id="sentence-container" className={`${!visible ? "hidden" : ""}`}>
          {sentences.map((sentence) => (
            <div className="ml-4 leading-loose">・{sentence}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Content;
