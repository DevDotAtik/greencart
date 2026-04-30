"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";

type Language = "en" | "hi";

type Dictionary = {
  navHome: string;
  navProducts: string;
  navOrders: string;
  navAccount: string;
  searchPlaceholder: string;
  cart: string;
  login: string;
  heroTitle: string;
  heroSubtitle: string;
  shopNow: string;
  exploreDeals: string;
};

const dictionaries: Record<Language, Dictionary> = {
  en: {
    navHome: "Home",
    navProducts: "Products",
    navOrders: "Orders",
    navAccount: "Account",
    searchPlaceholder: "Search fruits, vegetables, seeds, organic staples...",
    cart: "Cart",
    login: "Login",
    heroTitle: "Fresh from farms. Better for every basket.",
    heroSubtitle:
      "Shop directly from verified farmers, compare mandi-aligned prices, and track seasonal crop intelligence in one modern marketplace.",
    shopNow: "Shop now",
    exploreDeals: "Explore deals",
  },
  hi: {
    navHome: "होम",
    navProducts: "उत्पाद",
    navOrders: "ऑर्डर",
    navAccount: "अकाउंट",
    searchPlaceholder: "फल, सब्जियां, बीज, ऑर्गेनिक सामान खोजें...",
    cart: "कार्ट",
    login: "लॉगिन",
    heroTitle: "खेतों से सीधे. हर खरीद के लिए बेहतर.",
    heroSubtitle:
      "सत्यापित किसानों से सीधे खरीदें, मंडी आधारित कीमतें देखें और फसल संबंधी जानकारी एक ही आधुनिक प्लेटफॉर्म पर पाएँ।",
    shopNow: "अभी खरीदें",
    exploreDeals: "डील देखें",
  },
};

type LanguageContextValue = {
  language: Language;
  dictionary: Dictionary;
  toggleLanguage: () => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: PropsWithChildren) {
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    const stored = window.localStorage.getItem("greencart-language");
    if (stored === "en" || stored === "hi") {
      setLanguage(stored);
    }
  }, []);

  const value = useMemo(
    () => ({
      language,
      dictionary: dictionaries[language],
      toggleLanguage: () => {
        setLanguage((current) => {
          const next = current === "en" ? "hi" : "en";
          window.localStorage.setItem("greencart-language", next);
          return next;
        });
      },
    }),
    [language],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }

  return context;
}
