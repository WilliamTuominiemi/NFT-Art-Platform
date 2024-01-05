import { UserAvatar } from "@/components/layout/user-avatar";
import { Pencil } from "lucide-react";
import Link from "next/link";

export const Navbar = () => {
  return (
    <header className="container sticky top-0 z-40 bg-white dark:bg-zinc-950">
      <div className="flex h-16 w-full items-center justify-between border-b border-b-zinc-200 py-4 dark:border-b-zinc-700">
        <Link href="/" className="flex items-center space-x-2">
          <Pencil />
          <span className="font-bold">Baynet</span>
        </Link>
        <UserAvatar />
      </div>
    </header>
  );
};
