import React, { memo, useContext, useEffect, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { AppContext } from "../Context/ContextProvider";
import { FaAngleDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Homepage = memo(() => {
  const navigate = useNavigate();
  const { theme, data } = useContext(AppContext);
  const [searchInput, setSearchInput] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [isOpen, setIsOpen] = useState(false);



  // Filter based on Country Search and region
  const filteredCountry = data.filter((country) => {
    const searchedCountry = country.name.toLowerCase().includes(searchInput.toLowerCase());
    //If selectedRegion is empty (no region selected), matchedRegion is always true (so all regions are included).
    const matchedRegion = selectedRegion ? country.region.toLowerCase() === selectedRegion.toLowerCase() : true;
    return searchedCountry && matchedRegion;
  });

  const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

  const handleSelectRegion = (region) => {
    setSelectedRegion(region);
    setIsOpen(false);
  }

  const handleCountryClick = (numericCode) => {
    navigate(`/Detailpage/${numericCode}`);
  }


  return (
    <>
      <div className={`px-5 lg:px-[5rem] pt-9 pb-[5rem] w-[100%]`}>

        <div className="flex flex-col md:flex-row lg:flex-row lg:flex-wrap md:flex-wrap gap-[3.5rem] lg:gap-0 justify-between lg:items-center mt-3">
        <div
          className={`${
            theme === "dark"
              ? "bg-[hsl(209,23%,22%)] text-[hsl(0,100%,100%)] placeholder-[hsl(0,100%,100%)]"
              : "bg-[hsl(0,100%,100%)] text-[hsl(200,15%,8%)] placeholder-[hsl(200,15%,8%)]"
          } px-8 py-4 rounded-md flex items-center font-medium sm:w-full lg:w-[35rem]`}
        >
          <IoMdSearch size={24} />
          <input
            className="ml-5 focus:outline-none"
            type="text"
            placeholder="Search for a country..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>

        <div
          className={`relative w-[185px] text-[14px] font-medium`}
        >
          <button
          onClick={() => setIsOpen(!isOpen)}
            className={`${
              theme === "dark"
                ? "bg-[hsl(209,23%,22%)] text-[hsl(0,100%,100%)]"
                : "bg-[hsl(0,100%,100%)] text-[hsl(200,15%,8%)]"
            } rounded-md cursor-pointer p-4 w-full flex items-center justify-between`}
          >
            <p>{selectedRegion || "Filter by Region"}</p>
            <FaAngleDown />
          </button>
          {isOpen && (
              <ul
            className={`${
              theme === "dark"
                ? "bg-[hsl(209,23%,22%)] text-[hsl(0,100%,100%)]"
                : "bg-[hsl(0,100%,100%)] text-[hsl(200,15%,8%)]"
            } rounded-md p-4 absolute mt-1 w-full flex flex-col gap-2`}
          >
            {regions.map((region) => (
              <li 
              key={region} 
              className=""
              onClick={() => handleSelectRegion(region)}
              >
                {region}
              </li>
            ))}
          </ul>
          )}
        </div>
        </div>

        <div className="mt-[3rem] flex flex-col md:flex-row lg:flex-row flex-wrap gap-[4rem] sm:w-[280px] lg:w-[1300px] m-auto">
          {filteredCountry.map((da) => {
            return (
              <div key={da.numericCode} onClick={() => handleCountryClick(da.numericCode)}>
                <div
                  className={`${
                    theme === "dark"
                      ? "bg-[hsl(209,23%,22%)] text-[hsl(0,100%,100%)]"
                      : "bg-[hsl(0,100%,100%)] text-[hsl(200,15%,8%)]"
                  } rounded-md lg:w-[17rem]`}
                >
                  <img src={da?.flag} alt={da?.name} className="rounded-t-md w-full object-cover h-[15rem] md:h-[11rem] lg:w-[25rem]" />
                  <div className="px-8 pb-[3.2rem] pt-[1.8rem]">
                    <h2 className="font-bold text-[1.8rem] mb-4">{da?.name}</h2>
                    <p className="font-bold text-[1.2rem] mb-1">
                      Population:{" "}
                      <span className="font-normal">{da?.population}</span>
                    </p>
                    <p className="font-bold text-[1.2rem] mb-1">
                      Region: <span className="font-normal">{da?.region}</span>
                    </p>
                    <p className="font-bold text-[1.2rem] mb-1">
                      Capital:{" "}
                      <span className="font-normal">{da?.capital}</span>
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </>
  );
});

export default Homepage;
