import { Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../utils/store";
import { selectCurrentUser } from "../utils/slices/userReducer";
import { signOutUser } from "../utils/firebase/firebase-config";
import { clearBookmarks } from "../utils/slices/bookmarkReducer";
import React from "react";
const Header = React.memo(() => {
  const nav = useNavigate();
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser);
  const handleSignOut = async () => {
    await signOutUser();
    dispatch(clearBookmarks());
  };
  return (
    <>
      <div className="flex flex-row items-center justify-between px-3 h-auto  sticky top-0 mb-8 border-opacity-20 border-b-[1px] z-50 bg-white bg-opacity-90">
        <div className="text-xl cursor-pointer " onClick={() => nav("/")}>
          <img className="object-cover h-[60px]" src="/logo2.png" alt="" />
        </div>
        <div className="flex flex-row items-center justify-center gap-4">
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
          {!currentUser?.email ? (
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
          )}
        </div>
      </div>
      <Outlet />
    </>
  );
});

export default Header;
