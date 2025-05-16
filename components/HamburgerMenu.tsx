import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import StatusTotalMenu from "./StatusTotalMenu";
import CardActivity from "./CardActivity";
import { Button } from "./ui/button";
import { deleteCookie } from "@/lib/action";
import { useRouter } from "next/navigation";
import { useGetProfile } from "@/services/userServices";
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";
import Link from "next/link";

const HamburgerMenu = () => {
  const router = useRouter();
  const { data: userData, isLoading, isError } = useGetProfile();

  const handleLogout = async () => {
    await deleteCookie();
    router.push("/login");
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching profile</p>;
  return (
    <Sheet>
      <SheetTrigger asChild className="sm:hidden">
        <Menu role="button" tabIndex={0} data-testid="hamburger-icon" />
      </SheetTrigger>
      <SheetContent className="sm:hidden bg-slate-50 p-4">
        <SheetHeader>
          <SheetTitle>Hello, {userData?.user?.Name}</SheetTitle>
          <SheetDescription>{userData?.user?.Bio}</SheetDescription>
          <div className="flex gap-3">
            <Link
              href="https://github.com/Beluga-Whale"
              target="_blank"
              className="p-1 text-xs rounded-md border-2 border-slate-200  text-violet-500 "
            >
              <GitHubIcon fontSize="small" /> Github
            </Link>
            <Link
              href="https://www.facebook.com/Thanathat159/?locale=th_TH"
              target="_blank"
              className="p-1 text-xs rounded-md border-2 border-slate-200 text-violet-500 "
            >
              <FacebookIcon fontSize="small" /> FaceBook
            </Link>
          </div>
        </SheetHeader>

        {/* NOTE - Total Tasks */}
        <StatusTotalMenu />

        {/* NOTE - Acitvety */}
        <h1>Activity</h1>
        <CardActivity />
        <Button
          type="submit"
          variant="default"
          className="bg-red-500"
          onClick={() => handleLogout()}
        >
          Logout
        </Button>
      </SheetContent>
    </Sheet>
  );
};
export default HamburgerMenu;
