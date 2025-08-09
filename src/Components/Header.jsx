import React, { memo, useContext, useMemo } from "react";
import { AppContext } from "../Context/ContextProvider";
import { IoMoonOutline } from "react-icons/io5";
import { IoMoon } from "react-icons/io5";

const Header = memo(() => {
  const { theme, toggleTheme, data } = useContext(AppContext);

  return (
    <>
      <div
        className={`${
          theme === "dark"
            ? "bg-[hsl(209,23%,22%)] text-[hsl(0,100%,100%)]"
            : "bg-[hsl(0,100%,100%)] text-[hsl(200,15%,8%)]"
        } shadow`}
      >
        <div className="flex justify-between items-center px-[1rem] md:px-[5rem] py-[2rem]">
          <h1 className="font-bold">Where in the world?</h1>
          <button onClick={toggleTheme} className="flex items-center gap-2 cursor-pointer">
            {theme === "light" ? <IoMoonOutline /> : <IoMoon />}
            Dark Mode
          </button>
        </div>
      </div>
    </>
  );
});

export default Header;
