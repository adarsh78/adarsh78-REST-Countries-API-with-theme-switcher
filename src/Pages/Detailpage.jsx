import React, { useContext, useEffect, useMemo, useState } from "react";
import { AppContext } from "../Context/ContextProvider";
import { useNavigate, useParams } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";

const Detailpage = () => {
  const navigate = useNavigate();
  const { data, theme } = useContext(AppContext);
  const { numCode } = useParams();
  const [borders, setBorders] = useState([]);

  const individualCountry = useMemo(() => {
    return data.filter((country) => country.numericCode === numCode);
  }, [data, numCode]);

  const borderCountries = (borderArr) => {
    const countries = borderArr?.map((borAr) =>
      data.filter((con) => con?.alpha3Code === borAr)
    );
    setBorders(countries);
    return countries;
  };

  useEffect(() => {
    borderCountries(individualCountry[0]?.borders);
  }, [individualCountry]);

  const handleCountryClick = (countryName) => {
    const currentCountry = data.filter(
      (country) => country.name === countryName
    );
    const countryCode = currentCountry[0].numericCode;
    navigate(`/Detailpage/${countryCode}`);
    return countryCode;
  };

  return (
    <>
      <div
        className={`px-5 lg:px-[5rem] pt-9 pb-[5rem] w-[100%] h-auto ${
          theme === "dark"
            ? "text-[hsl(0,100%,100%)]"
            : "text-[hsl(200,15%,8%)]"
        }`}
      >
        <button
          onClick={() => navigate("/")}
          className={`${
            theme === "dark"
              ? "bg-[hsl(209,23%,22%)] text-[hsl(0,100%,100%)]"
              : "bg-[hsl(0,100%,100%)] text-[hsl(200,15%,8%)]"
          } flex justify-center items-center gap-2 px-6 py-1 rounded-[2px] mb-[4.5rem] cursor-pointer shadow`}
        >
          {" "}
          <BsArrowLeft /> Back
        </button>

        <div className="md:flex md:justify-start md:gap-[10rem]">
          <div className="w-full max-w-[50rem] aspect-[16/10] mx-auto overflow-hidden md:max-w-[40rem] shadow">
            <img
              src={individualCountry[0]?.flag}
              alt={individualCountry[0]?.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className=" md:w-[50rem] md:h-[30rem] md:text-sm">
            <div className="md:flex md:justify-start md:items-center md:gap-[5rem] md:text-left">
              <div>
                <h2 className="mt-[2.5rem] text-[1.5rem] font-bold">
                  {individualCountry[0]?.name}
                </h2>

                <div className="flex flex-col gap-3 mt-6 mb-8">
                  <p>
                    Native Name: <span>{individualCountry[0]?.nativeName}</span>
                  </p>
                  <p>
                    Population: <span>{individualCountry[0]?.population}</span>
                  </p>
                  <p>
                    Region: <span>{individualCountry[0]?.region}</span>
                  </p>
                  <p>
                    Sub Region: <span>{individualCountry[0]?.subregion}</span>
                  </p>
                  <p>
                    Capital: <span>{individualCountry[0]?.capital}</span>
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-4 mt-10 mb-8">
                <p>
                  Top Level Domain:{" "}
                  <span>{individualCountry[0]?.topLevelDomain[0]}</span>
                </p>
                <p>
                  Currencies: <span>{individualCountry[0]?.population}</span>
                </p>
                <p>
                  Languages:{" "}
                  <span>
                    {individualCountry[0]?.languages.map(
                      (lang) => lang.name + ", "
                    )}
                  </span>
                </p>
              </div>
            </div>

            <div className="mt-5 w-full">
              <p className="text-[1.2rem]">Border Countries:</p>
              <div className="flex gap-2 flex-wrap mt-5">
                {borders?.map((countries) =>
                  countries.map((country) => (
                    <div
                      key={numCode}
                      onClick={() => handleCountryClick(country?.name)}
                      className={`${
                        theme === "dark"
                          ? "bg-[hsl(209,23%,22%)]"
                          : "bg-[hsl(0,100%,100%)]"
                      } px-6 py-1 rounded-[2px] text-sm cursor-pointer shadow`}
                    >
                      {country?.name}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Detailpage;
