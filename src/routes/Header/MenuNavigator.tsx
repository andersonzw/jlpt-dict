import React, { useContext } from "react";
import { MenuNavContext } from "../../utils/context/MenuNavContext";

const MenuNavigator = () => {
  const { openMenuNav } = useContext(MenuNavContext);
  return (
    openMenuNav && (
      <div className="min-h-screen  min-w-full top-[65px] left-0 fixed z-[999] bg-white bg-opacity-[0.95]">
        <div className="flex flex-col justify-center items-center gap-4 mt-[7rem] text-[1.2rem]">
          <a className="text-red-500  ;" href="/">
            Home
          </a>
          <a className="text-red-500 " href="/bookmarks">
            Bookmarks
          </a>
          <a href="/jlpt/n1">JLPT N1</a>
          <a href="/jlpt/n2">JLPT N2</a>
          <a href="/jlpt/n3">JLPT N3</a>
          <a href="/jlpt/n4">JLPT N4</a>
          <a href="/jlpt/n5">JLPT N5</a>
        </div>
      </div>
    )
  );
};

export default MenuNavigator;
