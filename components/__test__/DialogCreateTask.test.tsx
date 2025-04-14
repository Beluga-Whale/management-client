import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import DialogCreateTask from "../DialogCreateTask";
import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "@/app/lib/feature/filter/filterSlice";
import dialogSlice from "@/app/lib/feature/dialog/dialogSlice";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import userEvent from "@testing-library/user-event";

const RenderWithProvider = (children: React.ReactNode) => {
  const store = configureStore({
    reducer: {
      filter: filterSlice,
      dialog: dialogSlice,
    },
  });
  const queryClient = new QueryClient();
  return render(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </Provider>
  );
};

describe("DialogCreateTask", () => {
  it("should render button Add New task True", () => {
    RenderWithProvider(<DialogCreateTask btn={true} />);
    expect(
      screen.getByRole("button", { name: "Add New Task" })
    ).toBeInTheDocument();
  });

  it("should render button Add New Task False", () => {
    RenderWithProvider(<DialogCreateTask btn={false} />);
    expect(
      screen.getByRole("button", { name: "Add New Task" })
    ).toBeInTheDocument();
  });

  it("should render Dialog trigger open", async () => {
    RenderWithProvider(<DialogCreateTask btn={true} />);
    const btnAddNewTask = screen.getByRole("button", { name: "Add New Task" });
    userEvent.click(btnAddNewTask);

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: "Save changes" })
      ).toBeInTheDocument();
    });
  });

  it("should render text from input Title, Description, Priority, Date, Completed", async () => {
    RenderWithProvider(<DialogCreateTask btn={true} />);
    const btnAddNewTask = screen.getByRole("button", { name: "Add New Task" });
    userEvent.click(btnAddNewTask);

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: "Save changes" })
      ).toBeInTheDocument();
    });

    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
    expect(screen.getByText("Select Priority")).toBeInTheDocument();
    expect(screen.getByText("Select Due Date")).toBeInTheDocument();
    expect(screen.getByText("Task Completed")).toBeInTheDocument();
  });
});
