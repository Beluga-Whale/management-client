import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { configureStore } from "@reduxjs/toolkit";
import dialogSlice from "@/app/lib/feature/dialog/dialogSlice";
import { Provider } from "react-redux";
import DialogEditTask from "../DialogEditTask";
import dayjs from "dayjs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import userEvent from "@testing-library/user-event";

describe("DialogEditTask", () => {
  it("should render open Dialog Edit ", () => {
    const queryClient = new QueryClient();
    const mockStore = configureStore({
      reducer: { dialog: dialogSlice },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false,
        }),
      preloadedState: {
        dialog: {
          dialogEdit: true,
          task: {
            ID: 1,
            Title: "Test Task",
            Description: "Test Description",
            Priority: "low" as const,
            DueDate: dayjs("2025-04-13T00:00:00.000Z"), // ✅ Use string
            Completed: true,
          },
        },
      },
    });

    render(
      <Provider store={mockStore}>
        <QueryClientProvider client={queryClient}>
          <DialogEditTask />
        </QueryClientProvider>
      </Provider>
    );

    expect(screen.getByText("Edit Task")).toBeInTheDocument();
  });

  it("should render close Dialog Edit", async () => {
    const queryClient = new QueryClient();
    const mockStore = configureStore({
      reducer: { dialog: dialogSlice },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false,
        }),
      preloadedState: {
        dialog: {
          dialogEdit: true,
          task: {
            ID: 1,
            Title: "Test Task",
            Description: "Test Description",
            Priority: "low" as const,
            DueDate: dayjs("2025-04-13T00:00:00.000Z"), // ✅ Use string
            Completed: true,
          },
        },
      },
    });

    render(
      <Provider store={mockStore}>
        <QueryClientProvider client={queryClient}>
          <DialogEditTask />
        </QueryClientProvider>
      </Provider>
    );

    expect(screen.getByText("Edit Task")).toBeInTheDocument();

    const closeIcon = screen.getByRole("button", { name: /close/i });
    userEvent.click(closeIcon);

    await waitFor(() => {
      expect(screen.queryByText("Edit Task")).not.toBeInTheDocument();
    });
  });
});
