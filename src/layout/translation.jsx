
import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import translationEN from "../translation/en/translation.json";
import translationFR from "../translation/fr/transaltion.json";
import translationMLG from "../translation/mlg/translation.json";

const resources = {
  en: { translation: translationEN },
  fr: { translation: translationFR },
  mlg: { translation: translationMLG },
};

i18next.use(initReactI18next).init({
  resources,
  lng: "fr",
  interpolation: { escapeValue: false },
});

export default i18next;
