import React, { useContext } from "react";
import { MenuNavContext } from "../../utils/context/MenuNavContext";

const MenuNavigator = () => {
  const { openMenuNav } = useContext(MenuNavContext);
  return (
    openMenuNav && (
      <div className="min-h-screen  min-w-full top-[60px] left-0 fixed z-[999] bg-white bg-opacity-90">
        <div className="flex flex-col justify-center items-center gap-4 mt-[7rem]">
            <a className = "text-red-500 underline" href="/search">About</a>
            <a className = "text-red-500 underline" href="/bookmarks">Bookmarks</a>
            <a href="/jlpt/n1">JLPTN1</a>
            <a href="/jlpt/n2">JLPTN2</a>
            <a href="/jlpt/n3">JLPTN3</a>
            <a href="/jlpt/n4">JLPTN4</a>
            <a href="/jlpt/n5">JLPTN5</a>
        </div>

      </div>

    )
  );
};

export default MenuNavigator;
