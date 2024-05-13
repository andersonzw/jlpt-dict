import React from "react";
import { useNavigate } from "react-router-dom";

type LevelSelectProps = {
  selected: string | undefined;
};
const LevelSelect: React.FC<LevelSelectProps> = ({ selected }) => {
  const nav = useNavigate();
  return (
    <div className="flex flex-row justify-evenly mb-8 gap-2 px-4">
      <button
        className={`level-btn ${selected === "n1" ? "selected" : null} grow max-w-[95px]`}
        onClick={() => nav("/jlpt/n1")}
      >
        <span className="hidden sm:inline">JLPT</span> N1
      </button>
      <button
        className={`level-btn ${selected === "n2" ? "selected" : null} grow max-w-[95px]`}
        onClick={() => nav("/jlpt/n2")}
      ><span className="hidden sm:inline">JLPT</span> N2</button>
      
      <button
        className={`level-btn ${selected === "n3" ? "selected" : null} grow max-w-[95px]`}
        onClick={() => nav("/jlpt/n3")}
      >
        <span className="hidden sm:inline">JLPT</span> N3
      </button>
      <button
        className={`level-btn ${selected === "n4" ? "selected" : null} grow max-w-[95px]`}
        onClick={() => nav("/jlpt/n4")}
      >
        <span className="hidden sm:inline">JLPT</span> N4
      </button>
      <button
        className={`level-btn ${selected === "n5" ? "selected" : null} grow max-w-[95px]`}
        onClick={() => nav("/jlpt/n5")}
      >
        <span className="hidden sm:inline">JLPT</span> N5
      </button>
    </div>
  );
};

export default LevelSelect;
