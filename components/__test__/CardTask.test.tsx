import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { TaskDto } from "@/types";
import CardTask from "../CardTask";
import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "@/app/lib/feature/filter/filterSlice";
import dialogSlice from "@/app/lib/feature/dialog/dialogSlice";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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

describe("CardTask", () => {
  it("should render titel, content, color text", () => {
    const mockDataTask: TaskDto[] = [
      {
        ID: 1,
        Title: "Title1",
        Description: "Description1",
        Priority: "low",
      },
      {
        ID: 2,
        Title: "Title2",
        Description: "Description2",
        Priority: "medium",
      },
      {
        ID: 3,
        Title: "Title3",
        Description: "Description3",
        Priority: "high",
      },
      {
        ID: 4,
        Title: "Title4",
        Description: "Description4",
        Priority: undefined,
      },
    ];

    RenderWithProvider(
      <div style={{ width: 200, height: 200 }}>
        {mockDataTask?.map((item: TaskDto) => (
          <CardTask key={item?.ID} task={item} />
        ))}
      </div>
    );

    expect(screen.getByText("Title1")).toBeInTheDocument();
    expect(screen.getByText("Description1")).toBeInTheDocument();
    expect(screen.getByText("Title2")).toBeInTheDocument();
    expect(screen.getByText("Description3")).toBeInTheDocument();
    expect(screen.getByText("Title2")).toBeInTheDocument();
    expect(screen.getByText("Description3")).toBeInTheDocument();

    const priorityLowElement = screen.getByText("low");
    const priorityMediumElement = screen.getByText("medium");
    const priorityHighElement = screen.getByText("high");

    expect(priorityLowElement).toHaveClass("text-green-400");
    expect(priorityMediumElement).toHaveClass("text-yellow-400");
    expect(priorityHighElement).toHaveClass("text-red-500");
  });
});
