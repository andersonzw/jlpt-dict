import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../utils/store";
import { selectCurrentUser } from "../utils/slices/userReducer";
import { signOutUser } from "../utils/firebase/firebase-config";
import { clearBookmarks } from "../utils/slices/bookmarkReducer";
const Header = () => {
  const nav = useNavigate();
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser);
  const handleSignOut = async () => {
    await signOutUser();
    dispatch(clearBookmarks());
    window.location.href = "/";
  };

  return (
    <>
      <div className="flex flex-row items-center justify-between p-3 h-auto bg-gray-100 sticky top-0 mb-8 border-opacity-20 border-b-[1px] z-50 bg-[url('/mi-min-pkpqoBp11Jc-unsplash.png')]">
        <div className="text-xl cursor-pointer" onClick={() => nav("/")}>
          JLPT Dictionary
        </div>
        <div className="flex flex-row items-center justify-center gap-4">
          <Link to="/jlpt/n5" className="text-sm">
            Search
          </Link>
          <Link to="/bookmarks" className="text-sm">
            Bookmarks
          </Link>
          {!currentUser?.email ? (
            <Link to="/signin" className="text-sm ">
              Sign In
            </Link>
          ) : (
            <p onClick={() => handleSignOut()} className="text-sm">
              Sign Out
            </p>
          )}
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Header;
