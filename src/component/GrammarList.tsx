import React from "react";
import { useNavigate } from "react-router-dom";
import { CardData } from "../utils/types";

type ContentProps = {
  data: CardData[];
  level: string;
  search: string;
};
const GrammarList: React.FC<ContentProps> = ({ data, level, search }) => {
  const nav = useNavigate();
  const filteredData = data.filter((ele) => ele.grammar.includes(search));
  return (
    <ul className="w-1/2 h-auto p-4">
      <h1
        className="text-2xl mb-4 bg-gray-300 px-4 py-1 cursor-pointer"
        onClick={() => nav(`jlpt/${level.toLowerCase()}`)}
      >
        JLPT {level}
      </h1>
      {filteredData.map((ele, i) => {
        return (
          <li key={i} className="leading-loose">
            ・{ele.grammar}
          </li>
        );
      })}
    </ul>
  );
};

export default GrammarList;
