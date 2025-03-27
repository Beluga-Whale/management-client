"use client";
import CardTask from "@/components/CardTask";
import DialogCreateTask from "@/components/DialogCreateTask";
import FilterPriority from "@/components/FilterPriority";
import { useGetAllTasks } from "@/services/taskServices";
import { TaskDto } from "@/types";
const TaskPage = () => {
  const { data: taskData, isLoading, isError } = useGetAllTasks();
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching profile</p>;
  return (
    <main className="flex-8 p-4 bg-gray-100 rounded-tl-xl rounded-tr-xl ">
      <section className="flex justify-between">
        <h1>All Tasks</h1>
        <FilterPriority />
      </section>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-10 mx-auto">
        {taskData?.message?.map((task: TaskDto) => (
          <CardTask key={task.ID} task={task} />
        ))}
        <DialogCreateTask />
      </div>
    </main>
  );
};
export default TaskPage;
