import UserAvatar from "@/components/layout/user-avatar";
import Link from "next/link";

const Navbar = () => {
  return (
    <header className="container sticky top-0 z-40 bg-white">
      <div className="flex h-16 items-center justify-between border-b border-b-slate-200 py-4">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="hidden items-center space-x-2 md:flex">
            Logo
          </Link>
          <nav className="hidden gap-6 md:flex">
            <Link
              href="#"
              className="flex items-center text-lg font-semibold text-slate-600 sm:text-sm"
            >
              Home
            </Link>
          </nav>
        </div>
        <UserAvatar />
      </div>
    </header>
  );
};

export default Navbar;
