import { createContext, useContext } from "react";

export const LanguageContext = createContext();

//custom hook
export const useLanguage = () => {
  return useContext(LanguageContext);
};

