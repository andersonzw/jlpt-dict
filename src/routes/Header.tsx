import { Outlet, useNavigate } from "react-router-dom";
import { uploadData } from "../utils/firebase/upload.ts";
const Header = () => {
  const nav = useNavigate();
  return (
    <>
      <div className="flex flex-row items-center justify-between p-3 h-auto bg-white sticky top-0 mb-8 border border-b-2 z-50">
        <div className="text-xl cursor-pointer" onClick={() => nav("/")}>
          JLPT Dictionary
        </div>
        <div className="flex flex-row items-center justify-center gap-4">
          <a href="/about" className="text-sm">
            About
          </a>
          <a href="/" className="text-sm">
            More Resources
          </a>
          <a href="" className="text-sm ">
            Sign In
          </a>
        </div>
      </div>
      <button onClick={() => uploadData()}> upload</button>
      <Outlet />
    </>
  );
};

export default Header;
