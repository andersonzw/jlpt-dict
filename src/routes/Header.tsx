
import { Outlet } from "react-router-dom";

const Header = () => {
  return (
    <>
      <div className="flex flex-row items-center justify-between p-3 h-auto bg-white sticky top-0 mb-8 border border-b-2 z-50">
        <div className="text-xl">JLPT Dictionary</div>
        <div className="flex flex-row items-center justify-center gap-4">
          <a href="" className="text-sm">
            About
          </a>
          <a href="" className="text-sm">
            More Resources
          </a>
          <a href="" className="text-sm ">
            Sign In
          </a>
        </div>
      </div>
      <Outlet/>
      
    </>
  );
};

export default Header;
