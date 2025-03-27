import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { createTask, getAllTasks } from "./api/taskApi";
const getTasksQueryKey = "getTasksQueryKey";

export const useGetAllTasks = (priority?: string) => {
  return useQuery({
    queryKey: [getTasksQueryKey, priority],
    queryFn: () => getAllTasks(priority ?? ""),
  });
};

export const useCreateTask = () => {
  const queryClient = useQueryClient(); // ใช้ queryClient
  return useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [getTasksQueryKey] });
    },
    onError: (error: Error) => {
      console.error("Register Failed:", error.message);
    },
  });
};
