import "@testing-library/jest-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { login, logout, register } from "../api/authApi";
import { act, renderHook, waitFor } from "@testing-library/react";
import { useLogin, useLogout, useRegister } from "../authServices";

jest.mock("../api/authApi.ts", () => ({
  login: jest.fn(),
  register: jest.fn(),
  logout: jest.fn(),
}));

const createWrapper = () => {
  const queryClient = new QueryClient();
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("AuthServices", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call login mutation function with correct data", async () => {
    const mockLogin = login as jest.Mock;
    mockLogin.mockResolvedValueOnce({ token: "123c" });

    const wrapper = createWrapper();
    const { result } = renderHook(() => useLogin(), { wrapper });

    await waitFor(() => {
      act(() => {
        result.current.mutateAsync({
          email: "test@email.com",
          password: "password",
        });
      });
    });

    expect(mockLogin).toHaveBeenCalledWith({
      email: "test@email.com",
      password: "password",
    });
  });

  it("should call error login fails ", async () => {
    const mockLogin = login as jest.Mock;
    const error = new Error("Login failed");

    mockLogin.mockRejectedValueOnce(error);

    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    // NOTE - เปลี่ยนพฤติกรรมของมัน (mockImplementation) ให้ไม่แสดง error จริง ๆ บน console (ป้องกัน test log รก)
    const wrapper = createWrapper();
    const { result } = renderHook(() => useLogin(), { wrapper });

    await act(async () => {
      try {
        await result.current.mutateAsync({
          email: "TEST2@gmail.com",
          password: "TEST",
        });
      } catch (error) {}
    });

    expect(consoleSpy).toHaveBeenCalledWith("Login Failed:", "Login failed");
    consoleSpy.mockRestore();
  });

  it("should call userRegister ", async () => {
    const mockRegister = register as jest.Mock;

    mockRegister.mockResolvedValueOnce({ message: "Register success" });

    const wrapper = createWrapper();
    const { result } = renderHook(() => useRegister(), { wrapper });

    await act(async () => {
      await result.current.mutateAsync({
        email: "TEST@gamil.com",
        password: "test",
        name: "test",
      });
    });

    expect(mockRegister).toHaveBeenCalledWith({
      email: "TEST@gamil.com",
      password: "test",
      name: "test",
    });
  });

  it("should call useRegister error", async () => {
    const mockUseRegister = register as jest.Mock;
    const mockError = new Error("Error to register");
    mockUseRegister.mockRejectedValueOnce(mockError);

    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementationOnce(() => {});

    const wrapper = createWrapper();
    const { result } = renderHook(() => useRegister(), { wrapper });

    await act(async () => {
      try {
        await result.current.mutateAsync({
          email: "TEST@gamil.com",
          password: "test",
          name: "test",
        });
      } catch (error) {}
    });

    expect(consoleSpy).toHaveBeenCalledWith(
      "Register Failed:",
      "Error to register"
    );
    consoleSpy.mockRestore();
  });

  it("should call logout", async () => {
    const mockLogout = logout as jest.Mock;

    mockLogout.mockResolvedValueOnce({ data: "Logout Success" });

    const wrapper = createWrapper();
    const { result } = renderHook(() => useLogout(), { wrapper });

    await act(async () => {
      await result.current.mutateAsync();
    });

    expect(mockLogout).toHaveBeenCalledTimes(1);
  });

  it("should call logout failed", async () => {
    const mockLogout = logout as jest.Mock;

    const mockErrorResponse = new Error("Logout Failed");
    mockLogout.mockRejectedValueOnce(mockErrorResponse);

    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementationOnce(() => {});

    const wrapper = createWrapper();
    const { result } = renderHook(() => useLogout(), { wrapper });

    await act(async () => {
      try {
        await result.current.mutateAsync();
      } catch (error) {}
    });

    expect(consoleSpy).toHaveBeenCalledWith("Logout Failed:", "Logout Failed");

    consoleSpy.mockRestore();
  });
});
