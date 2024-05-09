import React from "react";
import { useNavigate } from "react-router-dom";

type LevelSelectProps = {
  selected: string|undefined;
};
const LevelSelect: React.FC<LevelSelectProps> = ({ selected }) => {
  const nav = useNavigate();
  return (
    <div className="flex flex-row justify-evenly mb-8">
      <button
        className={`level-btn ${selected === "n1" ? "selected" : null}`}
        onClick={() => nav("/jlpt/n1")}
      >
        JLPT N1
      </button>
      <button
        className={`level-btn ${selected === "n2" ? "selected" : null}`}
        onClick={() => nav("/jlpt/n2")}
      >
        JLPT N2
      </button>
      <button
        className={`level-btn ${selected === "n3" ? "selected" : null}`}
        onClick={() => nav("/jlpt/n3")}
      >
        JLPT N3
      </button>
      <button
        className={`level-btn ${selected === "n4" ? "selected" : null}`}
        onClick={() => nav("/jlpt/n4")}
      >
        JLPT N4
      </button>
      <button
        className={`level-btn ${selected === "n5" ? "selected" : null}`}
        onClick={() => nav("/jlpt/n5")}
      >
        JLPT N5
      </button>
    </div>
  );
};

export default LevelSelect;
