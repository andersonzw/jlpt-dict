import jlptn1 from "../../assets/jlptn1.json";
import jlptn2 from "../../assets/jlptn2.json";
import jlptn3 from "../../assets/jlptn3.json";
import jlptn4 from "../../assets/jlptn4.json";
import jlptn5 from "../../assets/jlptn5.json";
import jlptn0 from "../../assets/jlptn0.json";
import GrammarList from "./components/GrammarList";
import { useState } from "react";
const Home = () => {
  const [search, setSearch] = useState("");
  return (
    // N1
    <div className="innerWidth flex flex-col">
      <div className="flex relative">
        <input
          className=" m-auto relative"
          value={search}
          id="search-bar"
          placeholder="検索"
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="absolute top-0.5 right-36 z-20 text-2xl opacity-65 cursor-pointer"
        onClick={()=>setSearch('')}>
          x
        </div>
      </div>

      <div className="flex flex-row flex-wrap w-full">
        <GrammarList data={jlptn1} level={"N1"} search={search} />
        <GrammarList data={jlptn2} level={"N2"} search={search} />
        <GrammarList data={jlptn3} level={"N3"} search={search} />
        <GrammarList data={jlptn4} level={"N4"} search={search} />
        <GrammarList data={jlptn5} level={"N5"} search={search} />
        <GrammarList data={jlptn0} level={"N0"} search={search} />
      </div>
    </div>
  );
};

export default Home;
