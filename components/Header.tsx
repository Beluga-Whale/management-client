"use client";
import Link from "next/link";
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";
import PersonIcon from "@mui/icons-material/Person";
import { Button } from "./ui/button";
import HamburgerMenu from "./HamburgerMenu";

const Header = () => {
  return (
    <nav className="container-main flex items-center justify-between  bg-white ">
      <Link href="/" className="text-2xl font-bold text-violet-500 ">
        BELUGA
      </Link>
      <div className="hidden sm:flex justify-between items-center  w-full px-4 md:px-14 lg:px-20 ">
        <div>
          <p>👋Welcome, test888@gmail.com!</p>
          <p>You have 1 active tasks</p>
        </div>

        <div>
          <Button>Add New Task</Button>
        </div>
      </div>
      <div className="hidden sm:flex items-center gap-4">
        <Link href={"/"} className="p-2 border-2 border-slate-200 rounded-full">
          <GitHubIcon className="text-violet-500 " />
        </Link>
        <Link href={"/"} className="p-2 border-2 border-slate-200 rounded-full">
          <FacebookIcon className="text-violet-500 " />
        </Link>
        <Link href={"/"} className="p-2 border-2 border-slate-200 rounded-full">
          <PersonIcon className="text-violet-500 " />
        </Link>
      </div>
      {/* Mobile Menu (Hamburger) */}
      <HamburgerMenu />
    </nav>
  );
};
export default Header;
