"use client";
import Link from "next/link";
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";
import { Button } from "./ui/button";
import HamburgerMenu from "./HamburgerMenu";
import { useGetProfile } from "@/services/userServices";

const Header = () => {
  const { data: userData, isLoading, isError } = useGetProfile();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching profile</p>;
  return (
    <nav className="w-full  p-4 flex items-center justify-between  bg-white ">
      <Link href="/" className="text-2xl font-bold text-violet-500 ">
        BELUGA
      </Link>
      <div className="hidden sm:flex justify-between items-center  w-full px-4 md:px-14 lg:px-20 ">
        <div>
          <p>👋Welcome, {userData?.user?.Email}</p>
          <p>
            You have <span className="text-violet-500 font-bold">11313123</span>{" "}
            active tasks
          </p>
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
      </div>
      {/* Mobile Menu (Hamburger) */}
      <HamburgerMenu />
    </nav>
  );
};
export default Header;
