import React, { useContext, useEffect, useMemo, useState } from "react";
import { AppContext } from "../Context/ContextProvider";
import { useNavigate, useParams } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";

const Detailpage = () => {
  const navigate = useNavigate();
  const { data, theme } = useContext(AppContext);
  const { numCode } = useParams();
  console.log(numCode);
  const [borders, setBorders] = useState([]);

  const individualCountry = useMemo(() => {
    return data.filter((country) => country.numericCode === numCode);
  }, [data, numCode]);

  const borderCountries = (borderArr) => {
    const countries = borderArr.map((borAr) =>
      data.filter((con) => con.alpha3Code === borAr)
    );
    setBorders(countries);
    return countries;
  };
  console.log(borders);

  useEffect(() => {
    borderCountries(individualCountry[0]?.borders);
  }, [data, numCode]);

  return (
    <>
      <div
        className={`px-5 pt-9 pb-[5rem] w-[100%] ${
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
          } flex justify-center items-center gap-2 px-6 py-1 rounded-[2px] mb-[4.5rem] cursor-pointer`}
        >
          {" "}
          <BsArrowLeft /> Back
        </button>

        <img
          src={individualCountry[0]?.flag}
          alt={individualCountry[0]?.name}
          className="h-60 w-full"
        />

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
            sub Region: <span>{individualCountry[0]?.subregion}</span>
          </p>
          <p>
            Capital: <span>{individualCountry[0]?.capital}</span>
          </p>
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
              {individualCountry[0]?.languages.map((lang) => lang.name + ", ")}
            </span>
          </p>
        </div>

        <div className="mt-10">
          <p className="text-[1.2rem]">Border Countries:</p>
          <div className="flex gap-2 flex-wrap mt-5">
            {borders.map((countries) => (
                countries.map((country) => (
                <div
                  className={`${
                    theme === "dark"
                      ? "bg-[hsl(209,23%,22%)]"
                      : "bg-[hsl(0,100%,100%)]"
                  } px-6 py-1 rounded-[2px] text-sm`}
                >
                  {country?.name}
                </div>
              )
            ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Detailpage;
