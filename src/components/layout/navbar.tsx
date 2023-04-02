import UserAvatar from "@/components/layout/user-avatar";
import { PenTool } from "lucide-react";
import Link from "next/link";

const links = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/create",
    label: "Create",
  },
];

const Navbar = () => {
  return (
    <header className="container sticky top-0 z-40 bg-white">
      <div className="flex h-16 items-center justify-between border-b border-b-slate-200 py-4">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="hidden items-center space-x-2 md:flex">
            <PenTool />
            <span className="hidden font-bold sm:inline-block">Baynet</span>
          </Link>
          {links.map((link) => (
            <nav className="hidden gap-6 md:flex" key={link.href}>
              <Link
                href={link.href}
                className="flex items-center text-lg font-semibold text-slate-600 hover:text-slate-900 sm:text-sm"
              >
                {link.label}
              </Link>
            </nav>
          ))}
        </div>
        <UserAvatar />
      </div>
    </header>
  );
};

export default Navbar;
