import React, { useState, createContext } from "react";
import "./App.css";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primeicons/primeicons.css";
import "/node_modules/primeflex/primeflex.css";
import "./styles/Component.scss";
import "./styles/Pages.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";

const ThemeContext = createContext();
const App = () => {
  const [theme, setTheme] = useState("");
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home/>,
    },
    {
      path: "/edit",
      element: <div>Hello edit page</div>,
    },
  ]);
  return (
    <ThemeContext.Provider value={{theme, setTheme}}>
      <div className="app">
 
        <RouterProvider router={router} />
      </div>
    </ThemeContext.Provider>
  );
};

export default App;
