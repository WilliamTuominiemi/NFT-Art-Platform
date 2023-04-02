import { UserAvatar } from "@/components/layout/user-avatar";
import { useTranslation } from "@/hooks/useTranslations";
import { Framer, Menu, PenTool, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const links = [
  {
    href: "/",
    label: "home",
  },
  {
    href: "/create",
    label: "create",
  },
];

export const Navbar = () => {
  const { t } = useTranslation();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <header className="container sticky top-0 z-40 bg-white dark:bg-slate-900">
      <div className="flex h-16 items-center justify-between border-b border-b-slate-200 py-4 dark:border-b-slate-700">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="hidden items-center space-x-2 md:flex">
            <Framer />
            <span className="hidden font-bold sm:inline-block">Baynet</span>
          </Link>
          {links.map((link) => (
            <nav className="hidden gap-6 md:flex" key={link.href}>
              <Link
                href={link.href}
                className="flex items-center text-lg font-semibold sm:text-sm"
              >
                {t.navbar[link.label as keyof typeof t.navbar]}
              </Link>
            </nav>
          ))}
          <button
            className="flex items-center space-x-2 md:hidden"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            {showMobileMenu ? <X /> : <Menu />}
          </button>
          {showMobileMenu && (
            <div className="animate-in slide-in-from-bottom-80 fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto bg-white p-6 pb-32 shadow-md dark:bg-slate-900 md:hidden">
              <div className="relative z-20 grid gap-6 rounded-md p-4 shadow-md">
                <Link href="/" className="flex items-center space-x-2">
                  <PenTool />
                  <span className="font-bold">Baynet</span>
                </Link>
                <nav className="grid grid-flow-row auto-rows-max text-sm">
                  {links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline"
                    >
                      {t.navbar[link.label as keyof typeof t.navbar]}
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
          )}
        </div>
        <UserAvatar />
      </div>
    </header>
  );
};
