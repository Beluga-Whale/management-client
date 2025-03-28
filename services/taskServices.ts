import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { createTask, editTask, getAllTasks } from "./api/taskApi";
import { CreateTaskDto } from "@/types";
const getTasksQueryKey = "getTasksQueryKey";

export const useGetAllTasks = (priority?: string) => {
  return useQuery({
    queryKey: [getTasksQueryKey, priority],
    queryFn: () => getAllTasks(priority ?? ""),
    enabled: priority != undefined,
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

export const useEditTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { id: number; body: CreateTaskDto }) =>
      editTask(data?.id, data?.body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [getTasksQueryKey] });
    },
    onError: (error: Error) => {
      console.error("Register Failed:", error.message);
    },
  });
};
