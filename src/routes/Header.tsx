import { Outlet, useNavigate } from "react-router-dom";
import { selectBookmarks } from "../utils/slices/bookmarkReducer.ts";
import { useAppSelector } from "../utils/store.ts";
const Header = () => {
  const nav = useNavigate();
  const bookmarks = useAppSelector(selectBookmarks);
  console.log(bookmarks);
  return (
    <>
      <div className="flex flex-row items-center justify-between p-3 h-auto bg-gray-100 sticky top-0 mb-8 border-opacity-20 border-b-[1px] z-50 bg-[url('/mi-min-pkpqoBp11Jc-unsplash.png')]">
        <div className="text-xl cursor-pointer" onClick={() => nav("/")}>
          JLPT Dictionary
        </div>
        <div className="flex flex-row items-center justify-center gap-4">
          <a href="/about" className="text-sm">
            About
          </a>
          <a href="/jlpt/n5" className="text-sm">
            Search
          </a>
          <a href="/bookmarks" className="text-sm">
            Bookmarks
          </a>
          <a href="" className="text-sm ">
            Sign In
          </a>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Header;
