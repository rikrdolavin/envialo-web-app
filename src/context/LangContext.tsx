import { createContext, useContext, useState, ReactNode, useMemo } from "react";
import { Locale } from "@/models/language";

interface LanguageContextType {
  lang: Locale["locale"] | null;
  setLang: (lang: Locale["locale"]) => void;
  dictionaries: Record<string, unknown>;
  setDictionaries: (dictionary: Record<string, unknown>) => void;
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
  initDictionary: Record<string, unknown>;
  initLang: Locale["locale"];
}) => {
  const [dictionaries, setDictionaries] = useState(initDictionary);
  const [lang, setLang] = useState<Locale["locale"] | null>(initLang);

  const contextValue = useMemo(() => {
    return {
      setDictionaries,
      dictionaries,
      lang,
      setLang,
    };
  }, [dictionaries, lang]);

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
