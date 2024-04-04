import Content from "./Content";
import data from "../assets/jlptn3_n1.json";

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
const Card = () => {

  return (
    <div className="innerWidth p-1" >
      {data.map((card: CardData, i: number) => {
        return <Content key={i} card={card} />;
      })}
    </div>
  );
};

export default Card;
