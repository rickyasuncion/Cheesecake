import React, { createContext, useContext, useEffect, useState } from 'react';


const ThemeContext = createContext();


export const useTheme = () => {
  return useContext(ThemeContext);
};


export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === 'true') {
      setDarkMode(true);
      document.documentElement.classList.add('dark'); 
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem('darkMode', newMode);
      document.documentElement.classList.toggle('dark', newMode); 
      return newMode;
    });
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
