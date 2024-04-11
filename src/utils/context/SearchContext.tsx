import React, { ReactNode, useState, createContext } from "react";

type SearchContextType = {
  searchParam: string;
  setSearchParam: (searchParam: string) => void;
};

export const SearchContext = createContext<SearchContextType>({
  searchParam: "",
  setSearchParam: () => {}, 
});

type SearchProviderProps = {
  children: ReactNode;
};

export const SearchProvider: React.FC<SearchProviderProps> = ({ children }) => {
  const [searchParam, setSearchParam] = useState("");
  const value = { searchParam, setSearchParam };

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};
