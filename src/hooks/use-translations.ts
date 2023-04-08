import { type Translations } from "@/locales/Translations";
import { englishTranslations } from "@/locales/en";
import { finnishTranslations } from "@/locales/fi";
import { swedishTranslations } from "@/locales/sv";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import("dayjs/locale/en");
import("dayjs/locale/sv");
import("dayjs/locale/fi");

export const useTranslation = (): {
  t: Translations;
  changeLanguage: (language: string) => void;
  currentLanguage: string;
} => {
  const router = useRouter();
  dayjs.locale(router.locale);

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
    dayjs.locale(locale);
    router.push(router.pathname, router.asPath, { locale });
  };

  return { t, changeLanguage, currentLanguage: router.locale || "en" };
};
