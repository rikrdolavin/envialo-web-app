import { createContext, useContext, useState, ReactNode, useMemo } from "react";
import { Locale } from "@/models/language";

interface LanguageContextType {
  lang: Locale["locale"];
  setLang: (lang: Locale["locale"]) => void;
  dictionary: Record<string, any>;
  setDictionary: (dictionary: Record<string, any>) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export const LanguageProvider = ({
  children,
  initDictionary,
  initLang,
}: {
  children: ReactNode;
  initDictionary: Record<string, any>;
  initLang: Locale["locale"];
}) => {
  const [dictionary, setDictionary] = useState(initDictionary);
  const [lang, setLang] = useState<Locale["locale"]>(initLang);

  const contextValue = useMemo(() => {
    return {
      setDictionary,
      dictionary,
      lang,
      setLang,
    };
  }, [dictionary, lang]);

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLang = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLang must be used within a LanguageProvider");
  }
  return context;
};
