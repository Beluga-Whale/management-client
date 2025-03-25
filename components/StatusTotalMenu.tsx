import { Tally1 } from "lucide-react";

const StatusTotalMenu = () => {
  const title = [
    {
      title: "Total Tasks:",
      count: 12,
      color: "text-purple-400",
    },
    {
      title: "In Progress",
      count: 8,
      color: "text-blue-400",
    },
    {
      title: "Open Tasks",
      count: 4,
      color: "text-green-400",
    },
    {
      title: "Completed",
      count: 4,
      color: "text-orange-400",
    },
  ];
  return (
    <div className="grid grid-cols-2 gap-4 ">
      {title.map((item, index) => (
        <div className="flex flex-col" key={index}>
          <p className="text-lg text-gray-400">{item.title}:</p>
          <div className="flex items-center">
            <span>
              <Tally1 className={item.color} size={40} />
            </span>
            <p className="text-2xl">{item.count}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
export default StatusTotalMenu;
