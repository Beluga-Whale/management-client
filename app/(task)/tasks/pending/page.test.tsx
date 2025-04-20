import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "@/app/lib/feature/filter/filterSlice";
import dialogSlice from "@/app/lib/feature/dialog/dialogSlice";
import { Provider } from "react-redux";
import TaskPendingPage from "./page";
import { useDeleteTask, useGetPendingTasks } from "@/services/taskServices";
import userEvent from "@testing-library/user-event";

jest.mock("sweetalert2", () => ({
  fire: jest.fn().mockResolvedValue({ isConfirmed: true }),
}));

jest.mock("@/services/taskServices", () => ({
  useGetPendingTasks: jest.fn(),

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

describe("Overdue Page Integration test", () => {
  it("should render loading state", () => {
    (useGetPendingTasks as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
    });
    RenderWrapper(<TaskPendingPage />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
  it("should render loading state", () => {
    (useGetPendingTasks as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
    });
    RenderWrapper(<TaskPendingPage />);

    expect(screen.getByText("Error fetching profile")).toBeInTheDocument();
  });

  it("should render complete page", () => {
    (useGetPendingTasks as jest.Mock).mockReturnValue({
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
    RenderWrapper(<TaskPendingPage />);
    const title1 = screen.getAllByText("TEST1111");
    const title2 = screen.getAllByText("HALAY12");
    expect(title1.length).toBeGreaterThan(0);
    expect(title2.length).toBeGreaterThan(0);
  });

  it("should delete task", async () => {
    const { fire } = require("sweetalert2"); // Import the mocked version
    (useGetPendingTasks as jest.Mock).mockReturnValue({
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

    const mutateAsyncMock = jest.fn().mockResolvedValue({});
    (useDeleteTask as jest.Mock).mockReturnValue({
      mutateAsync: mutateAsyncMock,
    });

    RenderWrapper(<TaskPendingPage />);

    const deleteButtons = screen.getAllByTestId("Delete task");
    await userEvent.click(deleteButtons[0]);

    fire("Test title", "Test message", "success");

    expect(fire).toHaveBeenCalledWith("Test title", "Test message", "success");

    await waitFor(() => {
      expect(mutateAsyncMock).toHaveBeenCalledWith(33);
    });
  });
});
