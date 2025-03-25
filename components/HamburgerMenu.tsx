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

const HamburgerMenu = () => {
  return (
    <Sheet>
      <SheetTrigger asChild className="sm:hidden">
        <Menu />
      </SheetTrigger>
      <SheetContent className="sm:hidden bg-slate-50 p-4">
        <SheetHeader>
          <SheetTitle>Hello, Thanathat</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        {/* NOTE - Total Tasks */}
        <StatusTotalMenu />

        {/* NOTE - Acitvety */}
        <h1>Activity</h1>
        <CardActivity />
      </SheetContent>
    </Sheet>
  );
};
export default HamburgerMenu;
