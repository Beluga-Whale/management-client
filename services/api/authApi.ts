import { Login } from "@/types";
import axios from "axios";

const apiUrl: string = process.env.NEXT_PUBLIC_PORT || "";

export const login = async (data: Login) => {
  const result = await axios.post(`${apiUrl}/user/login`, data, {
    withCredentials: true,
  });
  return result.data;
};
