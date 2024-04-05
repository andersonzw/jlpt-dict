import React from "react";
import { useNavigate } from "react-router-dom";

const LevelSelect = () => {
  const nav = useNavigate()
  return (
    <div className="flex flex-row justify-evenly mb-4">
      <button className="" onClick={()=>nav('/jlpt/n1')}>JLPT N1</button>
      <button className="" onClick={()=>nav('/jlpt/n2')}>JLPT N2</button>
      <button className="" onClick={()=>nav('/jlpt/n3')}>JLPT N3</button>
      <button className="" onClick={()=>nav('/jlpt/n4')}>JLPT N4</button>
      <button className="" onClick={()=>nav('/jlpt/n5')}>JLPT N5</button>
    </div>
  );
};

export default LevelSelect;
