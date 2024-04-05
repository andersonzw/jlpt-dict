import Content from "../component/Content";
import n1_data from "../assets/jlptn1.json";
import n2_data from "../assets/jlptn2.json";
import n3_data from "../assets/jlptn3.json";
import n4_data from "../assets/jlptn4.json";
import n5_data from "../assets/jlptn5.json";
import LevelSelect from "../component/LevelSelect";
import { useParams } from "react-router-dom";

export type CardData = {
  grammar: string;
  meaning: string | string[];
  english: string | string[];
  structure: string | string[];
  level: string | string[];
  notes: string[];
  sentences: string[];
  other: string[];
  link: string;
};
let data:CardData[];

const JLPTGrammar = () => {
  const { level } = useParams();
  console.log(level);
  switch (level) {
    case "n1":
      data = n1_data;
      break;

    case "n2":
      data = n2_data;
      break;
    case "n3":
      data = n3_data;
      break;
    case "n4":
      data = n4_data;
      break;
    case "n5":
      data = n5_data;
      break;

    default:
      break;
  }
  return (
    <div className="flex flex-col innerWidth p-1">
      <LevelSelect />
      <input id="search-bar" className="w-3/4 mx-auto mb-4 py-2 px-4 border focus-visible:outline-blue-200"/>

      {data.map((card: CardData, i: number) => {
        return <Content key={i} card={card} />;
      })}
    </div>
  );
};

export default JLPTGrammar;
