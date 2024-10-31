import React, { createContext, useContext, useState } from 'react';

const context = createContext();

// Custom hook to use the ThemeContext
export const useMovieTrailerContext = () => useContext(context);

// Provider component
export const MovieTrailerContextProvider = ({ children }) => {
    const [shouldPlayTrailer, setShouldPlayTrailer] = useState(false);

    const toggleTrailerState = () => {
        setShouldPlayTrailer(prev => !prev)
    };

    return (
        <context.Provider value={{ shouldPlayTrailer, toggleTrailerState }}>
            {children}
        </context.Provider>
    );
};
