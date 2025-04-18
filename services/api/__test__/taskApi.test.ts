import axios from "axios";
import {
  createTask,
  deleteTask,
  editTask,
  getAllTasks,
  getCompleteTasks,
  getOverdueTasks,
  getPendingTasks,
} from "../taskApi";
import dayjs from "dayjs";
import { waitFor } from "@testing-library/dom";
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Task.Api", () => {
  const apiUrl = process.env.NEXT_PUBLIC_PORT || "";
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call axios getAllTasks", async () => {
    const mockParams = "low";

    const mockResponse = {
      message: [
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
          Priority: "high",
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

    mockedAxios.get.mockResolvedValueOnce({ data: mockResponse });

    const result = await getAllTasks(mockParams);

    expect(result).toEqual(mockResponse);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      `${apiUrl}/task?priority=${mockParams}`,
      {
        withCredentials: true,
      }
    );
  });

  it("should call axios getAllTasks failed", async () => {
    const mockErrorResponse = new Error("getAllTasks Failed");

    mockedAxios.get.mockRejectedValueOnce(mockErrorResponse);

    await expect(getAllTasks("low")).rejects.toThrow("getAllTasks Failed");
    expect(mockedAxios.get).toHaveBeenCalledWith(
      `${apiUrl}/task?priority=low`,
      {
        withCredentials: true,
      }
    );
  });

  it("should call axios createTask", async () => {
    const mockPayLoad = {
      Title: "Test Titlte",
      Description: "Test Description",
      Priority: "low",
      DueDate: dayjs(),
      Completed: true,
    };

    const mockResponse = {
      message: "create task success",
    };

    mockedAxios.post.mockResolvedValueOnce({ data: mockResponse });

    const result = await createTask(mockPayLoad);

    expect(result).toEqual(mockResponse);
    expect(mockedAxios.post).toHaveBeenCalledWith(
      `${apiUrl}/task`,
      mockPayLoad,
      {
        withCredentials: true,
      }
    );
  });

  it("should call axios createTask failed", async () => {
    const mockErrorResponse = new Error("Create Error");
    const mockPayLoad = {
      Title: "Test Titlte",
      Description: "Test Description",
      Priority: "low",
      DueDate: dayjs(),
      Completed: true,
    };
    mockedAxios.post.mockRejectedValueOnce(mockErrorResponse);

    expect(createTask(mockPayLoad)).rejects.toThrow("Create Error");
    expect(mockedAxios.post).toHaveBeenCalledWith(
      `${apiUrl}/task`,
      mockPayLoad,
      {
        withCredentials: true,
      }
    );
  });

  it("should call axios editTask", async () => {
    const mockPayLoad = {
      Title: "Udatate Titlte",
      Description: "Test Description",
      Priority: "low",
      DueDate: dayjs(),
      Completed: true,
    };
    const id = 1;

    const mockResponse = {
      message: "Update Task Success",
    };

    mockedAxios.put.mockResolvedValueOnce({ data: mockResponse });

    const result = await editTask(id, mockPayLoad);

    expect(result).toEqual(mockResponse);
    expect(mockedAxios.put).toHaveBeenCalledWith(
      `${apiUrl}/task/${id}`,
      mockPayLoad,
      {
        withCredentials: true,
      }
    );
  });

  it("should call axios editTask failed", async () => {
    const id = 1;
    const mockPayLoad = {
      Title: "Udatate Titlte",
      Description: "Test Description",
      Priority: "low",
      DueDate: dayjs(),
      Completed: true,
    };
    const mockErrorResponse = new Error("Update Failed");

    mockedAxios.put.mockRejectedValueOnce(mockErrorResponse);

    expect(editTask(id, mockPayLoad)).rejects.toThrow("Update Failed");
    expect(mockedAxios.put).toHaveBeenCalledWith(
      `${apiUrl}/task/${id}`,
      mockPayLoad,
      {
        withCredentials: true,
      }
    );
  });

  it("should call axios deleteTask ", async () => {
    const mockResponse = {
      message: "Delete Success",
    };

    mockedAxios.delete.mockResolvedValueOnce({ data: mockResponse });
    const id = 1;

    const result = await deleteTask(id);
    expect(result).toEqual(mockResponse);
    expect(result.message).toBe("Delete Success");
    expect(mockedAxios.delete).toHaveBeenCalledWith(`${apiUrl}/task/${id}`, {
      withCredentials: true,
    });
  });

  it("should call axios deleteTask failed", async () => {
    const mockErrorResponse = new Error("Delete Failed");

    mockedAxios.delete.mockRejectedValueOnce(mockErrorResponse);
    const id = 1;

    await waitFor(() => {
      expect(deleteTask(id)).rejects.toThrow("Delete Failed");
    });
    expect(mockedAxios.delete).toHaveBeenCalledWith(`${apiUrl}/task/${id}`, {
      withCredentials: true,
    });
  });

  it("should call axios getCompleteTasks", async () => {
    const mockPriority = "low";
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
      ],
    };
    mockedAxios.get.mockResolvedValueOnce({ data: mockResponse });
    const result = await getCompleteTasks(mockPriority);

    expect(result).toEqual(mockResponse);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      `${apiUrl}/task/complete?priority=${mockPriority}`,
      {
        withCredentials: true,
      }
    );
  });

  it("should call axios getCompleteTasks failed", async () => {
    const mockPriority = "low";
    const mockResponse = new Error("Get complete task failed");

    mockedAxios.get.mockRejectedValueOnce(mockResponse);

    expect(getCompleteTasks(mockPriority)).rejects.toThrow(
      "Get complete task failed"
    );
    expect(mockedAxios.get).toHaveBeenCalledWith(
      `${apiUrl}/task/complete?priority=${mockPriority}`,
      {
        withCredentials: true,
      }
    );
  });

  it("should call axios getPendingTasks", async () => {
    const mockPriority = "low";

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
      ],
    };

    mockedAxios.get.mockResolvedValueOnce({ data: mockResponse });

    const result = await getPendingTasks(mockPriority);

    expect(result).toEqual(mockResponse);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      `${apiUrl}/task/pending?priority=${mockPriority}`,
      {
        withCredentials: true,
      }
    );
  });

  it("should call axios getPendingTasks failed", async () => {
    const mockPriority = "low";

    const mockResponse = new Error("Get Pending Error");

    mockedAxios.get.mockRejectedValueOnce(mockResponse);

    expect(getPendingTasks(mockPriority)).rejects.toThrow("Get Pending Error");
    expect(mockedAxios.get).toHaveBeenCalledWith(
      `${apiUrl}/task/pending?priority=${mockPriority}`,
      {
        withCredentials: true,
      }
    );
  });

  it("should call axios getOverdueTasks", async () => {
    const mockPriority = "low";
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
      ],
    };
    mockedAxios.get.mockResolvedValueOnce({ data: mockResponse });
    const result = await getOverdueTasks(mockPriority);

    expect(result).toEqual(mockResponse);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      `${apiUrl}/task/overdue?priority=${mockPriority}`,
      {
        withCredentials: true,
      }
    );
  });
  it("should call axios getOverdueTasks failed", async () => {
    const mockPriority = "low";
    const mockErrorResponse = new Error("Get PendingTask Failed");
    mockedAxios.get.mockRejectedValueOnce(mockErrorResponse);

    expect(getOverdueTasks(mockPriority)).rejects.toThrow(
      "Get PendingTask Failed"
    );
    expect(mockedAxios.get).toHaveBeenCalledWith(
      `${apiUrl}/task/overdue?priority=${mockPriority}`,
      {
        withCredentials: true,
      }
    );
  });
});
