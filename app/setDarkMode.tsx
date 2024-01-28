"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface StylesContextProps {
  styles: {
    backgroundColor: string;
    textColor: string;
    borderColor: string;
    textShadowColor: string;
  };
  updateStyles: (newStyles: Partial<StylesContextProps["styles"]>) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const StylesContext = createContext<StylesContextProps | undefined>(undefined);

interface StylesProviderProps {
  children: ReactNode;
}

export const StylesProvider: React.FC<StylesProviderProps> = ({ children }) => {
  const [styles, setStyles] = useState({
    backgroundColor: "white",
    textColor: "black",
    borderColor: "gray",
    textShadowColor: "none",
  });

  const [darkMode, setDarkMode] = useState(false);

  const updateStyles = (newStyles: Partial<StylesContextProps["styles"]>) => {
    setStyles((prevStyles) => ({ ...prevStyles, ...newStyles }));
  };

  const toggleDarkMode = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
    updateStyles({
      backgroundColor: darkMode ? "white" : "black",
      textColor: darkMode ? "black" : "white",
      borderColor: darkMode ? "gray" : "darkgray",
      textShadowColor: darkMode
        ? "rgba(255, 255, 255, 0.5)"
        : "rgba(0, 0, 0, 0.5)",
    });
  };

  return (
    <StylesContext.Provider
      value={{ styles, updateStyles, darkMode, toggleDarkMode }}
    >
      {children}
    </StylesContext.Provider>
  );
};

export const useStyles = (): StylesContextProps => {
  const context = useContext(StylesContext);
  if (!context) {
    throw new Error("useStyles must be used within a StylesProvider");
  }
  return context;
};
