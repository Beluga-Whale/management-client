"use client";
import { useGetProfile } from "@/services/userServices";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import PersonIcon from "@mui/icons-material/Person";
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";
import Link from "next/link";
// import { useLogout } from "@/services/authServices";
import { useRouter } from "next/navigation";
import { deleteCookie } from "@/lib/action";
const DialogProfile = () => {
  const router = useRouter();

  const { data: userData, isLoading, isError } = useGetProfile();

  const handleLogout = async () => {
    await deleteCookie();
    router.push("/login");
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching profile</p>;
  return (
    <Dialog>
      <DialogTrigger
        asChild
        className="p-2 bg-violet-400 text-white rounded-lg hover:cursor-pointer hover:bg-violet-500 "
      >
        <h1 className="flex items-center justify-between">
          Hello, {userData?.user?.Name}{" "}
          <span>
            <PersonIcon />
          </span>{" "}
        </h1>
      </DialogTrigger>
      <DialogContent className="p-3 bg-slate-50">
        <DialogHeader>
          <DialogTitle> Profile</DialogTitle>
        </DialogHeader>
        <div className="flex justify-between gap-2 ">
          <div>
            <p>{userData?.user?.Email}</p>
            <p className="text-xs text-gray-400">{userData?.user?.Email}</p>
          </div>
          <div className="flex  items-center gap-2 ">
            <Link
              href="https://github.com/Beluga-Whale"
              target="_blank"
              className="p-1 text-xs rounded-md border-2 border-slate-200  "
            >
              <GitHubIcon fontSize="small" /> Github
            </Link>
            <Link
              href="https://www.facebook.com/Thanathat159/?locale=th_TH"
              target="_blank"
              className="p-1 text-xs rounded-md border-2 border-slate-200  "
            >
              <FacebookIcon fontSize="small" /> Github
            </Link>
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            variant="default"
            className="bg-red-500"
            onClick={() => handleLogout()}
          >
            Logout
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default DialogProfile;
