import en from "@/locales/en";
import fi from "@/locales/fi";
import ru from "@/locales/ru";
import sv from "@/locales/sv";
import type Translations from "@/locales/Translations";
import { useRouter } from "next/router";

export const useTranslation = (): {
  t: Translations;
  changeLanguage: (language: string) => void;
  currentLanguage: string;
} => {
  const router = useRouter();

  let t: Translations;
  switch (router.locale) {
    case "en":
      t = en;
      break;
    case "sv":
      t = sv;
      break;
    case "fi":
      t = fi;
      break;
    case "ru":
      t = ru;
      break;
    default:
      t = en;
      break;
  }

  const changeLanguage = (locale: string) => {
    router.push(router.pathname, router.asPath, { locale });
  };

  return { t, changeLanguage, currentLanguage: router.locale || "en" };
};
