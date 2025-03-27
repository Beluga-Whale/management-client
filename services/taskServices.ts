import { useMutation, useQuery } from "@tanstack/react-query";
import { createTask, getAllTasks } from "./api/taskApi";
const getTasksQueryKey = "getTasksQueryKey";

export const useGetAllTasks = () => {
  return useQuery({
    queryKey: [getTasksQueryKey],
    queryFn: getAllTasks,
  });
};

export const useCreateTask = () => {
  return useMutation({
    mutationFn: createTask,
  });
};
