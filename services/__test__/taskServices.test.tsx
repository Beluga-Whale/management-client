import "@testing-library/jest-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act, renderHook, waitFor } from "@testing-library/react";
import {
  createTask,
  deleteTask,
  editTask,
  getAllTasks,
  getCompleteTasks,
  getOverdueTasks,
  getPendingTasks,
} from "../api/taskApi";
import {
  getTasksCompleteQueryKey,
  getTasksOverdueQueryKey,
  getTasksPendingQueryKey,
  getTasksQueryKey,
  useCreateTask,
  useDeleteTask,
  useEditTask,
  useGetAllTasks,
  useGetCompleteTasks,
  useGetOverdueTasks,
  useGetPendingTasks,
} from "../taskServices";

jest.mock("../api/taskApi.ts", () => ({
  getAllTasks: jest.fn(),
  createTask: jest.fn(),
  editTask: jest.fn(),
  deleteTask: jest.fn(),
  getCompleteTasks: jest.fn(),
  getPendingTasks: jest.fn(),
  getOverdueTasks: jest.fn(),
}));

const createWrapper = () => {
  const queryClient = new QueryClient();
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("TaskServices", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call useGetAllTasks", async () => {
    const mockGetAllTask = getAllTasks as jest.Mock;
    const mockResponse = {
      message: [
        {
          ID: 32,
          CreatedAt: "2025-04-18T21:52:17.350621+07:00",
          UpdatedAt: "2025-04-18T22:21:49.222378+07:00",
          DeletedAt: null,
          DueDate: "0001-01-01T07:00:00+07:00",
          Title: "HALAY12",
          Description: "HALAY!",
          Status: "active",
          Completed: true,
          Priority: "low",
          UserID: 1,
        },
        {
          ID: 11,
          CreatedAt: "2025-03-25T16:42:23.008483+07:00",
          UpdatedAt: "2025-03-25T16:42:23.008483+07:00",
          DeletedAt: null,
          DueDate: "0001-01-01T07:00:00+07:00",
          Title: "TEST1111",
          Description: "sdfsdf",
          Status: "active",
          Completed: false,
          Priority: "low",
          UserID: 1,
        },
        {
          ID: 8,
          CreatedAt: "2025-03-15T19:26:09.056045+07:00",
          UpdatedAt: "2025-03-15T19:26:09.056045+07:00",
          DeletedAt: null,
          DueDate: "0001-01-01T07:00:00+07:00",
          Title: "TEST",
          Description: "sdfsdf",
          Status: "active",
          Completed: false,
          Priority: "low",
          UserID: 1,
        },
      ],
    };
    mockGetAllTask.mockResolvedValueOnce(mockResponse);

    const wrapper = createWrapper();
    const { result } = renderHook(() => useGetAllTasks("high"), { wrapper });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(mockGetAllTask).toHaveBeenCalledWith("high");
    expect(result.current.data).toEqual(mockResponse);
  });

  it("should call useCreateTask ", async () => {
    const mockCreateTask = createTask as jest.Mock;
    const mockResponse = {
      message: "create task success",
    };

    mockCreateTask.mockResolvedValueOnce(mockResponse);

    const wrapper = createWrapper();
    const { result } = renderHook(() => useCreateTask(), { wrapper });

    await act(async () => {
      await result?.current?.mutateAsync({
        Title: "TEST1111",
        Description: "sdfsdf",
        Completed: true,
      });
    });

    expect(mockCreateTask).toHaveBeenCalledWith({
      Title: "TEST1111",
      Description: "sdfsdf",
      Completed: true,
    });
  });

  it("should error call useCreateTask", async () => {
    const mockCreateTask = createTask as jest.Mock;
    const mockErrorResponse = new Error("Create Task Failed");

    mockCreateTask.mockRejectedValueOnce(mockErrorResponse);

    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementationOnce(() => {});

    const wrapper = createWrapper();
    const { result } = renderHook(() => useCreateTask(), { wrapper });

    await act(async () => {
      try {
        await result?.current?.mutateAsync({
          Title: "TEST1111",
          Description: "sdfsdf",
          Completed: true,
        });
      } catch (error) {}
    });

    expect(consoleSpy).toHaveBeenCalledWith(
      "Create Task Failed:",
      "Create Task Failed"
    );
    consoleSpy.mockRestore();
  });

  it("should calls editTask and invalidates queries on success", async () => {
    const mockEditTask = editTask as jest.Mock;
    mockEditTask.mockResolvedValueOnce({ message: "Task updated" });

    const queryClient = new QueryClient();
    const invalidateSpy = jest.spyOn(queryClient, "invalidateQueries");

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const { result } = renderHook(() => useEditTask(), { wrapper });

    await act(async () => {
      await result.current.mutateAsync({
        id: 1,
        body: {
          Title: "Test",
          Description: "Updated Description",
          Completed: false,
        },
      });
    });

    expect(mockEditTask).toHaveBeenCalledWith(1, {
      Title: "Test",
      Description: "Updated Description",
      Completed: false,
    });

    expect(invalidateSpy).toHaveBeenCalledWith({
      queryKey: [getTasksQueryKey],
    });
    expect(invalidateSpy).toHaveBeenCalledWith({
      queryKey: [getTasksCompleteQueryKey],
    });
    expect(invalidateSpy).toHaveBeenCalledWith({
      queryKey: [getTasksPendingQueryKey],
    });
    expect(invalidateSpy).toHaveBeenCalledWith({
      queryKey: [getTasksOverdueQueryKey],
    });
  });

  it("should error calls editTask ", async () => {
    const mockEditTask = editTask as jest.Mock;
    const mockErrorResponse = new Error("Register Failed");

    mockEditTask.mockRejectedValueOnce(mockErrorResponse);

    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementationOnce(() => {});

    const wrapper = createWrapper();
    const { result } = renderHook(() => useEditTask(), { wrapper });

    await act(async () => {
      try {
        await result.current.mutateAsync({
          id: 1,
          body: {
            Title: "Test",
            Description: "Updated Description",
            Completed: false,
          },
        });
      } catch (error) {}
    });

    expect(consoleSpy).toHaveBeenCalledWith(
      "Register Failed:",
      "Register Failed"
    );
  });

  it("should calls deleteTask and invalidates queries on success", async () => {
    const mockDeleteTask = deleteTask as jest.Mock;
    mockDeleteTask.mockResolvedValueOnce({ message: "Delete success" });

    const queryClient = new QueryClient();
    const invalidateSpy = jest.spyOn(queryClient, "invalidateQueries");

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const { result } = renderHook(() => useDeleteTask(), { wrapper });

    await act(async () => {
      await result.current.mutateAsync(1);
      expect(mockDeleteTask).toHaveBeenCalledTimes(1);
    });

    expect(invalidateSpy).toHaveBeenCalledWith({
      queryKey: [getTasksQueryKey],
    });
    expect(invalidateSpy).toHaveBeenCalledWith({
      queryKey: [getTasksCompleteQueryKey],
    });
    expect(invalidateSpy).toHaveBeenCalledWith({
      queryKey: [getTasksPendingQueryKey],
    });
    expect(invalidateSpy).toHaveBeenCalledWith({
      queryKey: [getTasksOverdueQueryKey],
    });
  });

  it("should error calls deleteTask ", async () => {
    const mockDeleteTask = deleteTask as jest.Mock;
    const mockErrorResponse = new Error("Delete failed");

    mockDeleteTask.mockRejectedValueOnce(mockErrorResponse);

    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementationOnce(() => {});

    const wrapper = createWrapper();
    const { result } = renderHook(() => useDeleteTask(), { wrapper });

    await act(async () => {
      try {
        await result.current.mutateAsync(1);
      } catch (error) {}
    });

    expect(consoleSpy).toHaveBeenCalledWith("Delete Failed:", "Delete failed");
  });

  it("should call useGetCompleteTasks", async () => {
    const mockGetCompleteTask = getCompleteTasks as jest.Mock;
    const mockResponse = {
      message: [
        {
          ID: 32,
          CreatedAt: "2025-04-18T21:52:17.350621+07:00",
          UpdatedAt: "2025-04-18T22:21:49.222378+07:00",
          DeletedAt: null,
          DueDate: "0001-01-01T07:00:00+07:00",
          Title: "HALAY12",
          Description: "HALAY!",
          Status: "active",
          Completed: true,
          Priority: "low",
          UserID: 1,
        },
        {
          ID: 11,
          CreatedAt: "2025-03-25T16:42:23.008483+07:00",
          UpdatedAt: "2025-03-25T16:42:23.008483+07:00",
          DeletedAt: null,
          DueDate: "0001-01-01T07:00:00+07:00",
          Title: "TEST1111",
          Description: "sdfsdf",
          Status: "active",
          Completed: false,
          Priority: "low",
          UserID: 1,
        },
        {
          ID: 8,
          CreatedAt: "2025-03-15T19:26:09.056045+07:00",
          UpdatedAt: "2025-03-15T19:26:09.056045+07:00",
          DeletedAt: null,
          DueDate: "0001-01-01T07:00:00+07:00",
          Title: "TEST",
          Description: "sdfsdf",
          Status: "active",
          Completed: false,
          Priority: "low",
          UserID: 1,
        },
      ],
    };
    mockGetCompleteTask.mockResolvedValueOnce(mockResponse);

    const wrapper = createWrapper();
    const { result } = renderHook(() => useGetCompleteTasks("high"), {
      wrapper,
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(mockGetCompleteTask).toHaveBeenCalledWith("high");
    expect(result.current.data).toEqual(mockResponse);
  });

  it("should call useGetPendingTasks", async () => {
    const mockGetCompleteTask = getPendingTasks as jest.Mock;
    const mockResponse = {
      message: [
        {
          ID: 32,
          CreatedAt: "2025-04-18T21:52:17.350621+07:00",
          UpdatedAt: "2025-04-18T22:21:49.222378+07:00",
          DeletedAt: null,
          DueDate: "0001-01-01T07:00:00+07:00",
          Title: "HALAY12",
          Description: "HALAY!",
          Status: "active",
          Completed: true,
          Priority: "low",
          UserID: 1,
        },
        {
          ID: 11,
          CreatedAt: "2025-03-25T16:42:23.008483+07:00",
          UpdatedAt: "2025-03-25T16:42:23.008483+07:00",
          DeletedAt: null,
          DueDate: "0001-01-01T07:00:00+07:00",
          Title: "TEST1111",
          Description: "sdfsdf",
          Status: "active",
          Completed: false,
          Priority: "low",
          UserID: 1,
        },
        {
          ID: 8,
          CreatedAt: "2025-03-15T19:26:09.056045+07:00",
          UpdatedAt: "2025-03-15T19:26:09.056045+07:00",
          DeletedAt: null,
          DueDate: "0001-01-01T07:00:00+07:00",
          Title: "TEST",
          Description: "sdfsdf",
          Status: "active",
          Completed: false,
          Priority: "low",
          UserID: 1,
        },
      ],
    };
    mockGetCompleteTask.mockResolvedValueOnce(mockResponse);

    const wrapper = createWrapper();
    const { result } = renderHook(() => useGetPendingTasks("high"), {
      wrapper,
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(mockGetCompleteTask).toHaveBeenCalledWith("high");
    expect(result.current.data).toEqual(mockResponse);
  });
  it("should call useGetOverdueTasks", async () => {
    const mockGetCompleteTask = getOverdueTasks as jest.Mock;
    const mockResponse = {
      message: [
        {
          ID: 32,
          CreatedAt: "2025-04-18T21:52:17.350621+07:00",
          UpdatedAt: "2025-04-18T22:21:49.222378+07:00",
          DeletedAt: null,
          DueDate: "0001-01-01T07:00:00+07:00",
          Title: "HALAY12",
          Description: "HALAY!",
          Status: "active",
          Completed: true,
          Priority: "low",
          UserID: 1,
        },
        {
          ID: 11,
          CreatedAt: "2025-03-25T16:42:23.008483+07:00",
          UpdatedAt: "2025-03-25T16:42:23.008483+07:00",
          DeletedAt: null,
          DueDate: "0001-01-01T07:00:00+07:00",
          Title: "TEST1111",
          Description: "sdfsdf",
          Status: "active",
          Completed: false,
          Priority: "low",
          UserID: 1,
        },
        {
          ID: 8,
          CreatedAt: "2025-03-15T19:26:09.056045+07:00",
          UpdatedAt: "2025-03-15T19:26:09.056045+07:00",
          DeletedAt: null,
          DueDate: "0001-01-01T07:00:00+07:00",
          Title: "TEST",
          Description: "sdfsdf",
          Status: "active",
          Completed: false,
          Priority: "low",
          UserID: 1,
        },
      ],
    };
    mockGetCompleteTask.mockResolvedValueOnce(mockResponse);

    const wrapper = createWrapper();
    const { result } = renderHook(() => useGetOverdueTasks("high"), {
      wrapper,
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(mockGetCompleteTask).toHaveBeenCalledWith("high");
    expect(result.current.data).toEqual(mockResponse);
  });
});
