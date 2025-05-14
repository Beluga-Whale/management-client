"use client";
import { Menubar, MenubarMenu, MenubarTrigger } from "./ui/menubar";
import { useAppSelector, useAppDispatch } from "@/app/lib/hook";
import { setPriority } from "@/app/lib/feature/filter/filterSlice";

const FilterPriority = () => {
  // รับค่าจาก Redux
  const { priority } = useAppSelector((state) => state.filter);

  const dispatch = useAppDispatch();
  // const priorityList = ["All", "Low", "Medium", "High"];
  const priorityList = [
    {
      label: "All",
      queryString: "",
    },
    {
      label: "Low",
      queryString: "low",
    },
    {
      label: "Medium",
      queryString: "medium",
    },
    {
      label: "High",
      queryString: "high",
    },
  ];

  const handleSelect = (item: string) => {
    dispatch(setPriority(item)); // แก้ไขค่าสำหรับ "All"
  };

  return (
    <div>
      <Menubar className="bg-slate-50 border-none">
        {priorityList?.map((item, index) => (
          <MenubarMenu key={index}>
            <MenubarTrigger
              className={`cursor-pointer text-black hover:text-violet-500 transition-all duration-200 ${
                priority === item?.queryString
                  ? "text-violet-500 bg-slate-200"
                  : ""
              }`}
              onClick={() => handleSelect(item?.queryString)}
            >
              {item?.label}
            </MenubarTrigger>
          </MenubarMenu>
        ))}
      </Menubar>
    </div>
  );
};
export default FilterPriority;
