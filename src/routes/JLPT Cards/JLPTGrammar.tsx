import Content from "./components/GrammarCard";
import n1_data from "../../assets/jlptn1.json";
import n2_data from "../../assets/jlptn2.json";
import n3_data from "../../assets/jlptn3.json";
import n4_data from "../../assets/jlptn4.json";
import n5_data from "../../assets/jlptn5.json";
import LevelSelect from "./components/LevelSelect";
import { useParams } from "react-router-dom";
import { CardData } from "../../utils/types";
import { useContext, useEffect, useState } from "react";
import { SearchContext } from "../../utils/context/SearchContext";

const JLPTGrammar = () => {
  const { level } = useParams();
  const [search, setSearch] = useState("");
  const [data, setData] = useState<CardData[]>([]);
  const { searchParam, setSearchParam } = useContext(SearchContext);
  // Only runs during page change
  useEffect(() => {
    switch (level) {
      case "n1":
        setData(n1_data);
        break;
      case "n2":
        setData(n2_data);
        break;
      case "n3":
        setData(n3_data);
        break;
      case "n4":
        setData(n4_data);
        break;
      case "n5":
        setData(n5_data);
        break;

      default:
        break;
    }
  }, [level]);

  useEffect(() => {
    setSearch(searchParam);
  }, [searchParam]);

  const filteredData = data.filter(
    (ele) => ele.grammar.includes(search) || ele.structure.includes(search)
  );
  return (
    <div className="flex flex-col innerWidth p-1">
      <div className="flex relative">
        {/* Search Bar */}
        <input
          autoComplete="off"
          value={search}
          id="search-bar"
          onChange={(e) => {
            setSearch(e.target.value);
            setSearchParam(e.target.value);
          }}
          placeholder="検索"
        />
        <div
          className="absolute top-0.5 right-36 z-20 text-2xl opacity-65 cursor-pointer"
          onClick={() => {
            setSearch("");
            setSearchParam("");
          }}
        >
          x
        </div>
      </div>
      <LevelSelect selected={level} />

      {filteredData.map((card: CardData, i: number) => {
        return <Content key={i} card={card} param = {level}/>;
      })}
    </div>
  );
};

export default JLPTGrammar;
