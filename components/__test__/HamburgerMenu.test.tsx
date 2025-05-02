import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import HamburgerMenu from "../HamburgerMenu";
import { useGetProfile } from "@/services/userServices";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useGetAllTasks } from "@/services/taskServices";

const RenderWithQueryClient = (children: React.ReactNode) => {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

const mockPush = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

jest.mock("@/services/userServices", () => ({
  useGetProfile: jest.fn(),
}));

jest.mock("@/services/taskServices", () => ({
  useGetAllTasks: jest.fn(),
}));

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

jest.mock("recharts", () => {
  const original = jest.requireActual("recharts");
  return {
    ...original,
    ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
      <div style={{ width: 400, height: 300 }}>{children}</div>
    ),
  };
});

describe("HamburgerMenu", () => {
  const mockedUseGetProfile = useGetProfile as jest.Mock;
  const mockedUseGetAllTasks = useGetAllTasks as jest.Mock;

  it("should render loading state", () => {
    mockedUseGetProfile.mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
    });
    RenderWithQueryClient(
      <>
        <div style={{ width: 500, height: 500, minWidth: 300, minHeight: 300 }}>
          <HamburgerMenu />
        </div>
      </>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should render error state", () => {
    mockedUseGetProfile.mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
    });

    RenderWithQueryClient(
      <>
        <div style={{ width: 500, height: 500, minWidth: 300, minHeight: 300 }}>
          <HamburgerMenu />
        </div>
      </>
    );

    expect(screen.getByText("Error fetching profile")).toBeInTheDocument();
  });

  it("should render icon click menu to open side menu", async () => {
    mockedUseGetProfile.mockReturnValue({
      data: {
        user: {
          Name: "TEST4",
        },
      },
      isLoading: false,
      isError: false,
    });
    mockedUseGetAllTasks.mockReturnValue({
      data: [],
      isLoading: false,
      isError: false,
    });
    RenderWithQueryClient(
      <>
        <div style={{ width: 500, height: 500, minWidth: 300, minHeight: 300 }}>
          <HamburgerMenu />
        </div>
      </>
    );
    const icon = screen.getByRole("button");
    userEvent.click(icon);

    await waitFor(() => {
      expect(screen.getByText("Logout")).toBeInTheDocument();
      expect(screen.getByText(/test4/i)).toBeInTheDocument();
    });
  });
});
