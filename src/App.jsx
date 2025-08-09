import React, { useContext } from 'react'
import Header from "./Components/Header.jsx";
import { Outlet } from "react-router-dom";
import "./App.css";
import { AppContext } from './Context/ContextProvider.jsx';

const App = () => {

  const { theme } = useContext(AppContext);

  return (
    <>
    <div className={`${theme === "dark" ? "bg-[hsl(207,26%,17%)]" : "bg-[hsl(0,0%,99%)]"} min-h-screen`}>
      <Header />
      <Outlet />
    </div>
    </>
  )
}

export default App