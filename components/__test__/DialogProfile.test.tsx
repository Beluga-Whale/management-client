import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useGetProfile } from "@/services/userServices";
import DialogProfile from "../DialogProfile";
import userEvent from "@testing-library/user-event";

jest.mock("@/services/userServices", () => ({
  useGetProfile: jest.fn(),
  useUpdateUser: jest.fn(() => ({ mutateAsync: jest.fn() })),
}));

const mockPush = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

jest.mock("@/lib/action", () => ({
  deleteCookie: jest.fn(),
}));

describe("DialogProfile", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should render loading state", () => {
    (useGetProfile as jest.Mock).mockReturnValue({
      isLoading: true,
      data: null,
      isError: false,
    });

    render(<DialogProfile />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should render error state", () => {
    (useGetProfile as jest.Mock).mockReturnValue({
      isLoading: false,
      data: null,
      isError: true,
    });

    render(<DialogProfile />);

    expect(screen.getByText("Error fetching profile")).toBeInTheDocument();
  });

  it("should render button ", () => {
    (useGetProfile as jest.Mock).mockReturnValue({
      isLoading: false,
      data: { user: { Name: "Halay4" } },
      isError: false,
    });

    render(<DialogProfile />);
    expect(screen.getByText(/hello, halay4/i)).toBeInTheDocument();
  });

  it("should render button to open dialog profile", async () => {
    (useGetProfile as jest.Mock).mockReturnValue({
      isLoading: false,
      data: { user: { Name: "Halay4" } },
      isError: false,
    });

    render(<DialogProfile />);

    const btnHello = screen.getByText(/hello, halay4/i);
    await userEvent.click(btnHello);

    await waitFor(() => {
      expect(screen.getByText("Profile")).toBeInTheDocument();
      expect(screen.getByText("Bio")).toBeInTheDocument();
    });
  });

  it("should close dialog profile", async () => {
    (useGetProfile as jest.Mock).mockReturnValue({
      isLoading: false,
      data: { user: { Name: "Halay4" } },
      isError: false,
    });

    render(<DialogProfile />);

    const btnHello = screen.getByText(/hello, halay4/i);
    await userEvent.click(btnHello);

    await waitFor(() => {
      expect(screen.getByText("Profile")).toBeInTheDocument();
      expect(screen.getByText("Bio")).toBeInTheDocument();
    });

    const closeBtn = screen.getByRole("button", { name: /close/i });

    await userEvent.click(closeBtn);

    await waitFor(() => {
      expect(screen.queryByText("Profile")).not.toBeInTheDocument();
    });
  });

  it("should navigate to login when click logout", async () => {
    (useGetProfile as jest.Mock).mockReturnValue({
      isLoading: false,
      data: { user: { Name: "Halay4", Email: "abc@example.com", Bio: "" } },
      isError: false,
    });

    render(<DialogProfile />);

    const triggerBtn = screen.getByText(/hello, halay4/i);
    await userEvent.click(triggerBtn);
    expect(screen.getByText("Profile")).toBeInTheDocument();

    const logoutBtn = screen.getByText("Logout");
    await userEvent.click(logoutBtn);
    await waitFor(async () => {
      expect(mockPush).toHaveBeenCalledWith("/login");
    });
  });
});
