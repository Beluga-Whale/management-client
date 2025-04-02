import { TaskDto } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { SquarePen } from "lucide-react";
import { Trash2 } from "lucide-react";
import { useAppDispatch } from "@/app/lib/hook";
import {
  setDialogEdit,
  setDialogEditTask,
} from "@/app/lib/feature/dialog/dialogSlice";
import Swal from "sweetalert2";
import { useDeleteTask } from "@/services/taskServices";
// เปิดใช้งาน plugin
dayjs.extend(relativeTime);
type CardTaskProps = {
  task?: TaskDto;
};

const CardTask = ({ task }: CardTaskProps) => {
  const dispatch = useAppDispatch();

  const { mutateAsync: deleteMutation } = useDeleteTask();

  const priorityColor =
    task?.Priority == "low"
      ? "text-green-400"
      : task?.Priority == "medium"
      ? "text-yellow-400"
      : task?.Priority == "high"
      ? "text-red-500"
      : "text-black";

  const handleDelete = () => {
    Swal.fire({
      title: `Delete ${task?.Title} `,
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation(task?.ID ?? 0).then(() => {
          Swal.fire({
            title: "Deleted!",
            text: "Your Task has been deleted.",
            icon: "success",
          });
        });
      }
    });
  };

  return (
    <>
      <Card className="w-full max-w-[20.6rem] mx-auto h-[16.2rem] bg-slate-50 ">
        <CardHeader>
          <CardTitle>{task?.Title}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col justify-between h-full">
          <p>{task?.Description}</p>
          <div className="flex items-center justify-between">
            <p className="text-sm">{dayjs(task?.CreatedAt).fromNow()}</p>
            <p className={`${priorityColor} text-sm capitalize`}>
              {task?.Priority}
            </p>
            <div className="flex items-center gap-2 ">
              <SquarePen
                className="text-yellow-300 cursor-pointer "
                size={24}
                onClick={() => {
                  dispatch(setDialogEdit(true));
                  dispatch(setDialogEditTask(task));
                }}
              />
              <Trash2
                className="text-red-500 cursor-pointer"
                size={24}
                onClick={() => handleDelete()}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};
export default CardTask;
