import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const kFormatter = (num: number) => {
  if (num < 1000) {
    return `${num}`;
  }

  const base = Math.floor(Math.log(Math.abs(num)) / Math.log(1000));
  const suffix = "kmb"[base - 1];
  const abbrev = String(num / 1000 ** base).substring(0, 3);
  return (abbrev.endsWith(".") ? abbrev.slice(0, -1) : abbrev) + suffix;
};

export const formatUserJoinedString = (
  joined: string,
  lang: string,
  date: Date,
) =>
  `${joined} ${date.toLocaleDateString(lang, {
    dateStyle: "long",
  })}`;
