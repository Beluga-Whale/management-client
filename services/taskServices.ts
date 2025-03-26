import { useQuery } from "@tanstack/react-query";
import { getAllTasks } from "./api/taskApi";
const getTasksQueryKey = "getTasksQueryKey";

export const useGetAllTasks = () => {
  return useQuery({
    queryKey: [getTasksQueryKey],
    queryFn: getAllTasks,
  });
};
