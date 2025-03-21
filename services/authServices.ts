import { useMutation } from "@tanstack/react-query";
import { login, register } from "./api/authApi";

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
