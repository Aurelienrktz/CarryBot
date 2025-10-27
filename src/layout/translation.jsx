
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import translationEN from "../translation/en/translation.json";
import translationFR from "../translation/fr/transaltion.json";
import translationMLG from "../translation/mlg/translation.json";

const resources = {
  en: { translation: translationEN },
  fr: { translation: translationFR },
  mlg: { translation: translationMLG },
};

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "fr",
    interpolation: { escapeValue: false },
    detection: {
      order: ["localStorage", "navigator", "htmlTag"],
      caches: ["localStorage"],
    },
});

export default i18next;
