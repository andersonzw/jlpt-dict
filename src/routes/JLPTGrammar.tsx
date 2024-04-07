import Content from "../component/Content";
import n1_data from "../assets/jlptn1.json";
import n2_data from "../assets/jlptn2.json";
import n3_data from "../assets/jlptn3.json";
import n4_data from "../assets/jlptn4.json";
import n5_data from "../assets/jlptn5.json";
import LevelSelect from "../component/LevelSelect";
import { useParams } from "react-router-dom";
import { CardData } from "../utils/types";
import { useEffect, useState } from "react";

const JLPTGrammar = () => {
  const { level } = useParams();
  const [search, setSearch] = useState("");
  const [data, setData] = useState<CardData[]>([]);

  // Only runs during page change
  useEffect(() => {
    console.log("fire");
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

  const filteredData = data.filter((ele) => ele.grammar.includes(search));
  return (
    <div className="flex flex-col innerWidth p-1">
      <input
        autoComplete="off"
        value={search}
        id="search-bar"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <LevelSelect />

      {filteredData.map((card: CardData, i: number) => {
        return <Content key={i} card={card} />;
      })}
    </div>
  );
};

export default JLPTGrammar;
