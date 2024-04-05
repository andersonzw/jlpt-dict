import Content from "../component/Content";
import n1_data from "../assets/jlptn1.json";
import n2_data from "../assets/jlptn2.json";
import n3_data from "../assets/jlptn3.json";
import n4_data from "../assets/jlptn4.json";
import n5_data from "../assets/jlptn5.json";
import LevelSelect from "../component/LevelSelect";
import { useParams } from "react-router-dom";
import { CardData } from "../utils/types";

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

      {data.map((card: CardData, i: number) => {
        return <Content key={i} card={card} />;
      })}
    </div>
  );
};

export default JLPTGrammar;
