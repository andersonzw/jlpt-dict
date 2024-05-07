import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CardData } from "../../../utils/types";
import { SearchContext } from "../../../utils/context/SearchContext";
import { MdReadMore } from "react-icons/md";

type ContentProps = {
  data: CardData[];
  level: string;
  search: string;
};
const GrammarList: React.FC<ContentProps> = ({ data, level, search }) => {
  const nav = useNavigate();
  const { setSearchParam } = useContext(SearchContext);

  // Wait for data to finish loading
  if (data === undefined) return;
  const filteredData = data.filter((ele) => ele.grammar.includes(search));

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    const text = e.currentTarget.textContent;
    if (text) {
      if (text[0] == "〜") {
        setSearchParam(text.substring(1));
      } else setSearchParam(text);
      nav(`jlpt/${level.toLowerCase()}`);
    }
  };
  return (
    <ul className="w-1/2 h-auto p-4">
      {/* Title */}
      <a href={`jlpt/${level.toLowerCase()}`}
        className="text-xl mb-4 bg-red-300 px-4 py-2 cursor-pointer flex justify-between items-center"
        onClick={() => {
          
          setSearchParam("");
        }}
      >
        JLPT {level}
        <span>
          <MdReadMore />
        </span>
      </a>
      {/* Grammar list */}
      {filteredData.map((ele, i) => {
        return (
          <li key={i} className="leading-loose ">
            ・
            <span
              className="cursor-pointer hover:text-theme-red-400"
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
