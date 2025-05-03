import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LoginPage from "./page";
import userEvent from "@testing-library/user-event";

const mockPush = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
    replace: jest.fn(),
  }),
}));

// ✅ mock useLogin
jest.mock("@/services/authServices", () => {
  const actual = jest.requireActual("@/services/authServices");
  return {
    ...actual,
    useLogin: jest.fn(),
  };
});

import { useLogin } from "@/services/authServices";

const RenderWrapper = (children: React.ReactNode) => {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("Login Page Integration Test", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should click login when input email and password", async () => {
    (useLogin as jest.Mock).mockReturnValue({
      mutateAsync: jest.fn().mockResolvedValue({ token: "fake-token" }),
      isError: false,
      error: null,
    });

    RenderWrapper(<LoginPage />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginBtn = screen.getByRole("button", { name: /login/i });

    await userEvent.type(emailInput, "example1@example.com");
    await userEvent.type(passwordInput, "securePassword123");
    await userEvent.click(loginBtn);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/tasks");
    });
  });

  it("should show validate when not input form and click button", async () => {
    (useLogin as jest.Mock).mockReturnValue({
      mutateAsync: jest.fn().mockRejectedValue({
        response: { data: { error: "Invalid credentials" } },
      }),
      isError: true,
      error: {
        response: { data: { error: "Invalid credentials" } },
      },
    });

    RenderWrapper(<LoginPage />);
    const loginBtn = screen.getByRole("button", { name: /login/i });
    await userEvent.click(loginBtn);

    await waitFor(() => {
      expect(
        screen.getByText("Invalid email format. Please enter a valid email.")
      ).toBeInTheDocument();
    });
  });

  it("should show click to navigate to register page", async () => {
    RenderWrapper(<LoginPage />);

    const registerLink = screen.getByRole("link", { name: /register/i });

    expect(registerLink).toBeInTheDocument();

    await userEvent.click(registerLink);

    await waitFor(() => {
      expect(registerLink).toHaveAttribute("href", "/register");
    });

    expect(registerLink).toHaveClass("text-violet-500");
    expect(registerLink).toHaveClass("font-bold");
  });
});
