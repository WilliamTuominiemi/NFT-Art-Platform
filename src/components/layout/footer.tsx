import { useTranslation } from "@/hooks/use-translations";
import { Pencil } from "lucide-react";

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="container bg-white text-zinc-600 dark:bg-zinc-950 dark:text-zinc-400">
      <div className="flex flex-col items-center justify-between gap-4 border-t border-t-zinc-200 py-10 md:h-24 md:flex-row md:py-0 dark:border-t-zinc-700">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Pencil />
          <p className="text-center text-sm leading-loose md:text-left">
            {t.footer.builtBy}{" "}
            <span className="font-medium underline underline-offset-4">
              William & Hagelstam LLC
            </span>
          </p>
        </div>
        <p className="text-center text-sm md:text-left">
          {t.footer.sourceCode}{" "}
          <a
            href="https://github.com/WilliamTuominiemi/NFT-Art-Platform"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            GitHub
          </a>
          .
        </p>
      </div>
    </footer>
  );
};
