"use client";
import { LayoutGrid } from "lucide-react";
import { FileCheck } from "lucide-react";
import { Timer } from "lucide-react";
import { TimerOff } from "lucide-react";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { usePathname } from "next/navigation";
const SideMenu = () => {
  const pathname = usePathname();
  const activeColor = (path: string) => {
    return pathname == path ? "text-violet-400" : "text-slate-500";
  };

  const pathMenu = [
    {
      title: "All",
      path: "/tasks",
      icon: <LayoutGrid className={activeColor("/tasks")} />,
    },
    {
      title: "Completed",
      path: "/tasks/completed",
      icon: <FileCheck className={activeColor("/tasks/completed")} />,
    },
    {
      title: "Pending",
      path: "/tasks/pending",
      icon: <Timer className={activeColor("/tasks/pending")} />,
    },
    {
      title: "Overdue",
      path: "/tasks/overdue",
      icon: <TimerOff className={activeColor("/tasks/overdue")} />,
    },
  ];
  return (
    <div className="flex flex-col items-center  gap-10 p-4 ">
      {pathMenu.map((item, index) => (
        <TooltipProvider key={index}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href={item?.path}>{item?.icon}</Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>{item?.title}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  );
};
export default SideMenu;
