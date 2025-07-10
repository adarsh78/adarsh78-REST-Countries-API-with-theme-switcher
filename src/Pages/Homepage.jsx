import React, { useContext, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { AppContext } from "../Context/ContextProvider";
import { FaAngleDown } from "react-icons/fa";

const Homepage = () => {
  const { theme, data } = useContext(AppContext);

  const [searchInput, setSearchInput] = useState("");

  const filteredCountry = data.filter((da) => {
    return da.name.toLowerCase().includes(searchInput.toLowerCase());
  });

  return (
    <>
      <div className={`px-5 pt-9 pb-[5rem] w-[100%]`}>
        <div
          className={`${
            theme === "dark"
              ? "bg-[hsl(209,23%,22%)] text-[hsl(0,100%,100%)] placeholder-[hsl(0,100%,100%)]"
              : "bg-[hsl(0,100%,100%)] text-[hsl(200,15%,8%)] placeholder-[hsl(200,15%,8%)]"
          } px-10 py-5 rounded-md flex items-center font-medium`}
        >
          <IoMdSearch size={30} />
          <input
            className="ml-5 focus:outline-none"
            type="text"
            placeholder="Search for a country..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>

        <div
          className={`${
            theme === "dark"
              ? "bg-[hsl(209,23%,22%)] text-[hsl(0,100%,100%)]"
              : "bg-[hsl(0,100%,100%)] text-[hsl(200,15%,8%)]"
          } px-6 py-5 w-[185px] mt-[3.5rem] rounded-md flex items-center justify-between font-medium`}
        >
          <p>Filter by Region</p>
          <FaAngleDown />
        </div>

        {/* countries dropdown here */}

        <div className="mt-[3rem] flex flex-col gap-[3.5rem] w-[280px] m-auto">
          {filteredCountry.map((da) => {
            return (
              <div key={da.numericCode}>
                <div
                  className={`${
                    theme === "dark"
                      ? "bg-[hsl(209,23%,22%)] text-[hsl(0,100%,100%)]"
                      : "bg-[hsl(0,100%,100%)] text-[hsl(200,15%,8%)]"
                  } rounded-md `}
                >
                  <img src={da?.flag} alt={da?.name} className="rounded-t-md"/>
                  <div className="px-8 pb-[3.2rem] pt-[1.8rem]">
                  <h2 className="font-bold text-[1.8rem] mb-4">{da?.name}</h2>
                  <p className="font-bold text-[1.2rem] mb-1">Population: <span className="font-normal">{da?.population}</span></p>
                  <p className="font-bold text-[1.2rem] mb-1">Region: <span className="font-normal">{da?.region}</span></p>
                  <p className="font-bold text-[1.2rem] mb-1">Capital: <span className="font-normal">{da?.capital}</span></p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Homepage;
