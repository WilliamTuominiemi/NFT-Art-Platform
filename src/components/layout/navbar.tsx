import { UserAvatar } from "@/components/layout/user-avatar";
import { Framer } from "lucide-react";
import Link from "next/link";

export const Navbar = () => {
  return (
    <header className="container sticky top-0 z-40 bg-white dark:bg-slate-900">
      <div className="flex h-16 items-center justify-between border-b border-b-slate-200 py-4 dark:border-b-slate-700">
        <Link href="/" className="flex items-center space-x-2">
          <Framer />
          <span className="font-bold">Baynet</span>
        </Link>
        <UserAvatar />
      </div>
    </header>
  );
};
