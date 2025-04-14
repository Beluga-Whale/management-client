import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useGetAllTasks } from "@/services/taskServices";
import StatusTotalMenu from "../StatusTotalMenu";

jest.mock("@/services/taskServices", () => ({
  useGetAllTasks: jest.fn(),
}));

describe("StatusTotalMenu", () => {
  it("shoud render loading state", () => {
    (useGetAllTasks as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
    });

    render(<StatusTotalMenu />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("shoud render error state", () => {
    (useGetAllTasks as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
    });

    render(<StatusTotalMenu />);
    expect(screen.getByText("Error fetching profile")).toBeInTheDocument();
  });

  it("should render title, count task", () => {
    (useGetAllTasks as jest.Mock).mockReturnValue({
      data: {
        message: [
          {
            ID: 1,
            Title: "Title1",
            Completed: true,
          },
          {
            ID: 2,
            Title: "Title2",
            Completed: true,
          },
          {
            ID: 3,
            Title: "Title3",
            Completed: false,
          },
        ],
      },
      isLoading: false,
      isError: false,
    });

    render(<StatusTotalMenu />);
    expect(screen.getByText(/Completed:/i)).toBeInTheDocument();
    expect(screen.getByText(/Total Tasks:/i)).toBeInTheDocument();
    expect(screen.getByText(/In Progress:/i)).toBeInTheDocument();
    expect(screen.getByText(/Open Tasks:/i)).toBeInTheDocument();

    expect(screen.getByText("3")).toBeInTheDocument();
  });
});
