import { Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../utils/store";
import { selectCurrentUser } from "../../utils/slices/userReducer";
import { signOutUser } from "../../utils/firebase/firebase-config";
import { clearBookmarks } from "../../utils/slices/bookmarkReducer";
import { HiMenu } from "react-icons/hi";

import React, { useContext } from "react";
import MenuNavigator from "./MenuNavigator";
import { MenuNavContext } from "../../utils/context/MenuNavContext";

const Header = React.memo(() => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser);
  const { setOpenMenuNav } = useContext(MenuNavContext);

  const handleSignOut = async () => {
    await signOutUser();
    dispatch(clearBookmarks());
  };

  const SignInButton = () => {
    return !currentUser?.email ? (
      <a
        href="/signin"
        className="text-sm py-2 px-2 rounded-lg hover:bg-[#b4b4b4] hover:bg-opacity-10"
      >
        Sign In
      </a>
    ) : (
      <a
        href="/"
        onClick={() => handleSignOut()}
        className="text-sm py-2 px-2 rounded-lg hover:bg-[#b4b4b4] hover:bg-opacity-10"
      >
        Sign Out
      </a>
    );
  };

  return (
    <div className="relative">
      <div className="flex flex-row items-center justify-between px-3 h-auto  sticky top-0 mb-8 border-opacity-20 border-b-[1px] z-50 bg-white bg-opacity-90">
        <a className="text-xl cursor-pointer " href="/">
          <img className="object-cover h-[60px]" src="/logo2.webp" alt="" />
        </a>
        {/* Right header icons */}
        <div className="flex flex-row items-center justify-center sm:hidden">
          <SignInButton />
          <HiMenu
            className="blcok cursor-pointer text-primary-black h-[24px] w-[24px] ml-2"
            onClick={() => setOpenMenuNav((prevState) => !prevState)}
          />
        </div>

        <div className=" flex-row items-center justify-center gap-4 hidden sm:flex">
          <a
            href="/jlpt/n5"
            className="text-sm py-2 px-2 rounded-lg hover:bg-[#b4b4b4] hover:bg-opacity-10"
          >
            Search
          </a>
          <a
            href="/bookmarks"
            className="text-sm py-2 px-2 rounded-lg hover:bg-[#b4b4b4] hover:bg-opacity-10"
          >
            Bookmarks
          </a>
          <SignInButton />
        </div>
      </div>
      <Outlet />
      {/* header mobile for mobile */}
      <MenuNavigator />
    </div>
  );
});

export default Header;
