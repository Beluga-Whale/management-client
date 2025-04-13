import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CardActivity from "../CardActivity";
import { useGetAllTasks } from "@/services/taskServices";
import { ReactNode } from "react";

jest.mock("@/services/taskServices", () => ({
  useGetAllTasks: jest.fn(),
}));

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// ✅ Mock ขนาด DOM จริงให้ ResponsiveContainer ใช้
beforeEach(() => {
  Object.defineProperty(HTMLElement.prototype, "clientWidth", {
    configurable: true,
    value: 500,
  });
  Object.defineProperty(HTMLElement.prototype, "clientHeight", {
    configurable: true,
    value: 500,
  });
});

jest.mock("recharts", () => {
  const OriginalRecharts = jest.requireActual("recharts");
  return {
    ...OriginalRecharts,
    ResponsiveContainer: ({ children }: { children: ReactNode }) => (
      <div style={{ width: 500, height: 300 }}>{children}</div>
    ),
  };
});

describe("CardActivity", () => {
  it("should render loading state", () => {
    (useGetAllTasks as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
    });
    render(
      <>
        <div style={{ width: 500, height: 500 }}>
          <CardActivity />
        </div>
      </>
    );
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should render error fetching", () => {
    (useGetAllTasks as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
    });
    render(
      <div style={{ width: 500, height: 500 }}>
        <CardActivity />
      </div>
    );
    expect(screen.getByText("Error fetching")).toBeInTheDocument();
  });

  it("should render title, description", () => {
    (useGetAllTasks as jest.Mock).mockReturnValue({
      data: {
        message: [
          { Completed: true, id: 1, name: "Task 1" },
          { Completed: false, id: 2, name: "Task 2" },
        ],
      },
      isLoading: false,
      isError: false,
    });
    render(
      <div style={{ width: 500, height: 500, minWidth: 300, minHeight: 300 }}>
        <CardActivity />
      </div>
    );
    expect(screen.getByText("Complete vs Pending Tasks")).toBeInTheDocument();
    expect(screen.getByText("Task completion status.")).toBeInTheDocument();
  });

  it.skip("should render count task", async () => {
    (useGetAllTasks as jest.Mock).mockReturnValue({
      data: {
        message: [
          { Completed: true, id: 1, name: "Task 1" },
          { Completed: false, id: 2, name: "Task 2" },
        ],
      },
      isLoading: false,
      isError: false,
    });
    render(
      <div style={{ width: 500, height: 500 }}>
        <CardActivity />
      </div>
    );

    const totalText = screen.getByTestId("total-tasks");

    expect(totalText).toHaveTextContent("2");

    expect(totalText).toHaveTextContent(/Tasks/i);
  });
});
