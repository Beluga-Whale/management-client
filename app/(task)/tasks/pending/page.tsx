"use client";
import { filterSelect } from "@/app/lib/feature/filter/filterSlice";
import { useAppSelector } from "@/app/lib/hook";
import CardTask from "@/components/CardTask";
import DialogCreateTask from "@/components/DialogCreateTask";
import DialogEditTask from "@/components/DialogEditTask";
import FilterPriority from "@/components/FilterPriority";
import { useGetPendingTasks } from "@/services/taskServices";
import { TaskDto } from "@/types";
const TaskPendingPage = () => {
  // NOTE - get value from Redux
  const { priority } = useAppSelector(filterSelect);

  const {
    data: taskData,
    isLoading,
    isError,
  } = useGetPendingTasks(priority?.toLowerCase() ?? "");

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching profile</p>;
  return (
    <main className="flex-8 p-4 bg-gray-100 rounded-tl-xl rounded-tr-xl overflow-y-auto max-h-screen ">
      <section className="flex justify-between">
        <h1>Completed Tasks</h1>
        <FilterPriority />
      </section>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-10 mx-auto">
        {taskData?.message?.map((task: TaskDto) => (
          <CardTask key={task.ID} task={task} />
        ))}
        <DialogCreateTask btn={false} />
        <DialogEditTask />
      </div>
    </main>
  );
};
export default TaskPendingPage;
