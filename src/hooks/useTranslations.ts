import { englishTranslations } from "@/locales/en";
import { finnishTranslations } from "@/locales/fi";
import { swedishTranslations } from "@/locales/sv";
import { type Translations } from "@/locales/Translations";
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
      t = englishTranslations;
      break;
    case "sv":
      t = swedishTranslations;
      break;
    case "fi":
      t = finnishTranslations;
      break;
    default:
      t = englishTranslations;
      break;
  }

  const changeLanguage = (locale: string) => {
    router.push(router.pathname, router.asPath, { locale });
  };

  return { t, changeLanguage, currentLanguage: router.locale || "en" };
};
