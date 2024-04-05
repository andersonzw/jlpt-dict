import React from "react";
import jlptn1 from "../assets/jlptn1.json";
import jlptn2 from "../assets/jlptn2.json";
import jlptn3 from "../assets/jlptn3.json";
import jlptn4 from "../assets/jlptn4.json";
import jlptn5 from "../assets/jlptn5.json";
import jlptn0 from "../assets/jlptn0.json";
import { CardData } from "./JLPTGrammar";
import SearchBar from "../component/SearchBar";
import GrammarList from "../component/GrammarList";
const Home = () => {
  return (
    // N1
    <div className="innerWidth flex flex-col">
      <SearchBar />
      <div className="flex flex-row flex-wrap w-full">
        <GrammarList data={jlptn1} level={"N1"} />
        <GrammarList data={jlptn2} level={"N2"} />
        <GrammarList data={jlptn3} level={"N3"} />
        <GrammarList data={jlptn4} level={"N4"} />
        <GrammarList data={jlptn5} level={"N5"} />
        <GrammarList data={jlptn0} level={"N0"} />
      </div>
    </div>
  );
};

export default Home;
