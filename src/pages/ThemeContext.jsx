import React, { createContext, useContext, useState } from 'react';

// Create the ThemeContext
const ThemeContext = createContext();

// Custom hook to use the ThemeContext
export const useTheme = () => useContext(ThemeContext);

// Provider component
export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
