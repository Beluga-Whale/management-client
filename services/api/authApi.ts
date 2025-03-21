import { Login } from "@/types";
import { Register } from "@tanstack/react-query";
import axios from "axios";

const apiUrl: string = process.env.NEXT_PUBLIC_PORT || "";

export const login = async (data: Login) => {
  try {
    const result = await axios.post(`${apiUrl}/user/login`, data, {
      withCredentials: true,
    });
    return result.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const register = async (data: Register) => {
  try {
    const result = await axios.post(`${apiUrl}/user/register`, data, {
      withCredentials: true,
    });
    return result.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
