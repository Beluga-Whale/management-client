import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "./ui/menubar";

const FilterPriority = () => {
  return (
    <div>
      <Menubar className="bg-slate-50 border-none">
        <MenubarMenu>
          <MenubarTrigger>All</MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Low</MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Medium</MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>High</MenubarTrigger>
        </MenubarMenu>
      </Menubar>
    </div>
  );
};
export default FilterPriority;
