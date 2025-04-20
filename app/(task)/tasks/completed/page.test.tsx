import { render, screen, waitFor, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useDeleteTask, useGetCompleteTasks } from "@/services/taskServices";
import TaskCompletedPage from "./page";
import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "@/app/lib/feature/filter/filterSlice";
import dialogSlice from "@/app/lib/feature/dialog/dialogSlice";
import { Provider } from "react-redux";
import userEvent from "@testing-library/user-event";
import { useServerInsertedHTML } from "next/navigation";

jest.mock("sweetalert2", () => ({
  fire: jest.fn().mockResolvedValue({ isConfirmed: true }),
}));

jest.mock("@/services/taskServices", () => ({
  useGetCompleteTasks: jest.fn(),

  useDeleteTask: jest.fn(() => ({
    mutateAsync: jest.fn(),
  })),
  useCreateTask: jest.fn(() => ({
    mutateAsync: jest.fn(),
  })),
  useEditTask: jest.fn(() => ({
    mutateAsync: jest.fn(),
  })),
}));

const RenderWrapper = (children: React.ReactNode) => {
  const queryClient = new QueryClient();
  const store = configureStore({
    reducer: {
      filter: filterSlice,
      dialog: dialogSlice,
    },
  });
  return render(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </Provider>
  );
};

describe("Completed Page Integration test", () => {
  it("should render loading state", () => {
    (useGetCompleteTasks as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
    });
    RenderWrapper(<TaskCompletedPage />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
  it("should render error state", () => {
    (useGetCompleteTasks as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
    });
    RenderWrapper(<TaskCompletedPage />);

    expect(screen.getByText("Error fetching profile")).toBeInTheDocument();
  });

  it("should render complete page", () => {
    (useGetCompleteTasks as jest.Mock).mockReturnValue({
      data: {
        message: [
          {
            ID: 33,
            CreatedAt: "2025-04-19T12:06:04.312617+07:00",
            UpdatedAt: "2025-04-19T12:06:04.312617+07:00",
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
      },
      isLoading: false,
      isError: false,
    });
    RenderWrapper(<TaskCompletedPage />);
    const title1 = screen.getAllByText("TEST1111");
    const title2 = screen.getAllByText("HALAY12");
    expect(title1.length).toBeGreaterThan(0);
    expect(title2.length).toBeGreaterThan(0);
  });

  it("should delete task", async () => {
    const { fire } = require("sweetalert2"); // Import the mocked version
    (useGetCompleteTasks as jest.Mock).mockReturnValue({
      data: {
        message: [
          {
            ID: 33,
            Title: "TEST1111",
          },
          {
            ID: 32,
            Title: "HALAY12",
          },
        ],
      },
      isLoading: false,
      isError: false,
    });

    // ม็อคฟังก์ชัน `mutateAsync` ให้ทำการ resolve เมื่อถูกเรียก
    const mutateAsyncMock = jest.fn().mockResolvedValue({});
    (useDeleteTask as jest.Mock).mockReturnValue({
      mutateAsync: mutateAsyncMock,
    });

    RenderWrapper(<TaskCompletedPage />);

    const deleteButtons = screen.getAllByTestId("Delete task");
    await userEvent.click(deleteButtons[0]);

    fire("Test title", "Test message", "success");

    expect(fire).toHaveBeenCalledWith("Test title", "Test message", "success");

    await waitFor(() => {
      expect(mutateAsyncMock).toHaveBeenCalledWith(33);
    });
  });

  it("should click AddnewTask to createTask", async () => {
    (useGetCompleteTasks as jest.Mock).mockReturnValue({
      data: {
        message: [
          {
            ID: 33,
            Title: "TEST1111",
          },
          {
            ID: 32,
            Title: "HALAY12",
          },
        ],
      },
      isLoading: false,
      isError: false,
    });
    RenderWrapper(<TaskCompletedPage />);

    const addNewTaskBtn = screen.getByText(/add new task/i);
    userEvent.click(addNewTaskBtn);

    await waitFor(() => {
      expect(addNewTaskBtn).toBeInTheDocument();
      expect(screen.getByRole("dialog")).toBeInTheDocument();
      expect(screen.getByText("Task Completed")).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Save changes" })
      ).toBeInTheDocument();
    });
  });

  it("should call validate save change dialog no input", async () => {
    (useGetCompleteTasks as jest.Mock).mockReturnValue({
      data: {
        message: [
          {
            ID: 33,
            Title: "TEST1111",
          },
          {
            ID: 32,
            Title: "HALAY12",
          },
        ],
      },
      isLoading: false,
      isError: false,
    });
    RenderWrapper(<TaskCompletedPage />);

    const addNewTaskBtn = screen.getByText(/add new task/i);
    userEvent.click(addNewTaskBtn);

    await waitFor(() => {
      expect(addNewTaskBtn).toBeInTheDocument();
      expect(screen.getByRole("dialog")).toBeInTheDocument();
      expect(screen.getByText("Task Completed")).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Save changes" })
      ).toBeInTheDocument();
    });

    const saveChangeBtn = screen.getByRole("button", { name: "Save changes" });

    expect(saveChangeBtn).toBeInTheDocument();
    await userEvent.click(saveChangeBtn);
    const titleValidate = screen.getAllByText("title is required.");
    await waitFor(() => {
      expect(titleValidate.length).toBeGreaterThan(0);
    });
  });
});
