import { useMutation } from "@tanstack/react-query";
import { login, logout, register } from "./api/authApi";

export const useLogin = () => {
  return useMutation({
    mutationFn: login,
    onSuccess: () => {},
    onError: (error: Error) => {
      console.error(" Login Failed:", error.message);
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: register,
    onSuccess: () => {},
    onError: (error: Error) => {
      console.error("Register Failed:", error.message);
    },
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {},
    onError: (error: Error) => {
      console.error("Logout Failed:", error.message);
    },
  });
};
