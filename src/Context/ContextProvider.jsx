import React, { createContext, useEffect, useState } from "react";
import data from "../../data.json";
export const AppContext = createContext();

const ContextProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme : "light";
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"))
  }

  return (
    <div>
      <AppContext.Provider value={{ theme, toggleTheme, data }}>
        {children}
      </AppContext.Provider>
    </div>
  );
};

export default ContextProvider;
