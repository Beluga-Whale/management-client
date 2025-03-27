"use client";
import { useState } from "react";
import { Menubar, MenubarMenu, MenubarTrigger } from "./ui/menubar";

const FilterPriority = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const priorityList = ["All", "Low", "Medium", "High"];
  return (
    <div>
      <Menubar className="bg-slate-50 border-none">
        {priorityList?.map((item, index) => (
          <MenubarMenu key={index}>
            <MenubarTrigger
              className={`hover:text-violet-500 cursor-pointer ${
                activeIndex == index ? "text-violet-500" : "text-black"
              } 
              ${activeIndex == index ? "bg-slate-200" : "bg-none"}
              `}
              onClick={() => setActiveIndex(index)}
            >
              {item}
            </MenubarTrigger>
          </MenubarMenu>
        ))}
      </Menubar>
    </div>
  );
};
export default FilterPriority;
