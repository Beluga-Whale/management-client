import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  createTask,
  deleteTask,
  editTask,
  getAllTasks,
  getCompleteTasks,
  getOverdueTasks,
  getPendingTasks,
} from "./api/taskApi";
import { CreateTaskDto } from "@/types";
const getTasksQueryKey = "getTasksQueryKey";
const getTasksCompleteQueryKey = "getTasksCompleteQueryKey";
const getTasksPendingQueryKey = "getTasksPendingQueryKey";
const getTasksOverdueQueryKey = "getTasksOverdueQueryKey";

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
      queryClient.invalidateQueries({
        queryKey: [getTasksQueryKey],
      });
      queryClient.invalidateQueries({
        queryKey: [getTasksCompleteQueryKey],
      });
      queryClient.invalidateQueries({
        queryKey: [getTasksPendingQueryKey],
      });
      queryClient.invalidateQueries({
        queryKey: [getTasksOverdueQueryKey],
      });
    },
    onError: (error: Error) => {
      console.error("Register Failed:", error.message);
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [getTasksQueryKey],
      });
      queryClient.invalidateQueries({
        queryKey: [getTasksCompleteQueryKey],
      });
      queryClient.invalidateQueries({
        queryKey: [getTasksPendingQueryKey],
      });
      queryClient.invalidateQueries({
        queryKey: [getTasksOverdueQueryKey],
      });
    },
    onError: (error: Error) => {
      console.error("Register Failed:", error.message);
    },
  });
};

export const useGetCompleteTasks = (priority?: string) => {
  return useQuery({
    queryKey: [getTasksCompleteQueryKey, priority],
    queryFn: () => getCompleteTasks(priority ?? ""),
    enabled: priority != undefined,
  });
};

export const useGetPendingTasks = (priority?: string) => {
  return useQuery({
    queryKey: [getTasksPendingQueryKey, priority],
    queryFn: () => getPendingTasks(priority ?? ""),
    enabled: priority != undefined,
  });
};

export const useGetOverdueTasks = (priority?: string) => {
  return useQuery({
    queryKey: [getTasksOverdueQueryKey, priority],
    queryFn: () => getOverdueTasks(priority ?? ""),
    enabled: priority != undefined,
  });
};
