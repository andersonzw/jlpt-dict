import React from "react";
import { useNavigate } from "react-router-dom";

const GrammarList = ({ data, level }) => {
  const nav = useNavigate();
  return (
    <ul className="w-1/2 h-auto p-4">
      <h1
        className="text-2xl mt-8 mb-4 bg-gray-300 px-4 py-1 cursor-pointer"
        onClick={() => nav(`jlpt/${level.toLowerCase()}`)}
      >
        JLPT {level}
      </h1>
      {data.map((point) => {
        return <li className="leading-loose">・{point.grammar}</li>;
      })}
    </ul>
  );
};

export default GrammarList;
