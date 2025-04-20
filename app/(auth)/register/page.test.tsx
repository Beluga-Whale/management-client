import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import userEvent from "@testing-library/user-event";
import RegisterPage from "./page";
import { useRegister } from "@/services/authServices";

const mockPush = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

// ✅ mock useLogin แบบไม่ทำให้เกิด hoisting error
jest.mock("@/services/authServices", () => {
  const actual = jest.requireActual("@/services/authServices");
  return {
    ...actual,
    useRegister: jest.fn(),
  };
});

const RenderWrapper = (children: React.ReactNode) => {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("Register Page Integration test", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render register and can input data for register", async () => {
    (useRegister as jest.Mock).mockReturnValue({
      mutateAsync: jest.fn().mockResolvedValue({ message: "Register Success" }),
      isError: false,
      error: null,
    });
    RenderWrapper(<RegisterPage />);

    const email = screen.getByLabelText(/email/i);
    const name = screen.getByLabelText(/name/i);
    const password = screen.getByLabelText(/password/i);
    const register = screen.getByRole("button", { name: /register/i });

    await userEvent.type(email, "test1@gmail.com");
    await userEvent.type(name, "test");
    await userEvent.type(password, "password");
    await userEvent.click(register);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/login");
    });
  });

  it("should render Login link with correct href and class", () => {
    RenderWrapper(<RegisterPage />);

    const loginLink = screen.getByRole("link", { name: /login here/i });

    expect(loginLink).toBeInTheDocument();
    expect(loginLink).toHaveAttribute("href", "/");
    expect(loginLink).toHaveClass("text-violet-500", "font-bold");
  });

  it("should render validate if not input filed", async () => {
    RenderWrapper(<RegisterPage />);
    const register = screen.getByRole("button", { name: /register/i });

    await userEvent.click(register);

    expect(
      screen.getByText(/Invalid email format. Please enter a valid email./i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Name is required./i)).toBeInTheDocument();
    expect(screen.getByText(/Password is required./i)).toBeInTheDocument();
  });
});
