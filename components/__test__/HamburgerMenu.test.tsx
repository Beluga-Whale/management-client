import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import HamburgerMenu from "../HamburgerMenu";
import { useGetProfile } from "@/services/userServices";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
  useGetAllTasks: jest.fn(),
}));

describe("HamburgerMenu", () => {
  it("should render loading state", () => {
    (useGetProfile as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
    });
    RenderWithQueryClient(<HamburgerMenu />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should render error state", () => {
    (useGetProfile as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
    });
    RenderWithQueryClient(<HamburgerMenu />);

    expect(screen.getByText("Error fetching profile")).toBeInTheDocument();
  });

  it("should render icon click menu to open side menu", async () => {
    (useGetProfile as jest.Mock).mockReturnValue({
      data: {
        user: {
          Name: "TEST4",
        },
      },
      isLoading: false,
      isError: false,
    });
    RenderWithQueryClient(<HamburgerMenu />);
    const icon = screen.getByRole("button");
    await userEvent.click(icon);

    await waitFor(() => {
      expect(screen.getByText("Logout")).toBeInTheDocument();
      expect(screen.getByText(/test4/i)).toBeInTheDocument();
    });
  });
});
