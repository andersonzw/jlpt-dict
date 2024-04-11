import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CardData } from "../../../utils/types";
import { SearchContext } from "../../../utils/context/SearchContext";

type ContentProps = {
  data: CardData[];
  level: string;
  search: string;
};
const GrammarList: React.FC<ContentProps> = ({ data, level, search }) => {
  const nav = useNavigate();
  const filteredData = data.filter((ele) => ele.grammar.includes(search));
  const { setSearchParam } = useContext(SearchContext);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    let text = e.currentTarget.textContent;
    if (text) {
      if (text[0] == "〜") {
        text = text.substring(1);
        console.log(text);
      } else console.log(text);
      setSearchParam(text);
      nav(`jlpt/${level.toLowerCase()}`);
    }
  };
  return (
    <ul className="w-1/2 h-auto p-4">
      <h1
        className="text-2xl mb-4 bg-gray-300 px-4 py-1 cursor-pointer"
        onClick={() => {
          nav(`jlpt/${level.toLowerCase()}`);
          setSearchParam("");
        }}
      >
        JLPT {level}
      </h1>
      {filteredData.map((ele, i) => {
        return (
          <li key={i} className="leading-loose ">
            ・
            <span
              className="cursor-pointer"
              data-level={level}
              onClick={(e) => handleClick(e)}
            >
              {ele.grammar}
            </span>
          </li>
        );
      })}
    </ul>
  );
};

export default GrammarList;
