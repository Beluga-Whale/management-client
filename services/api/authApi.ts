import { Login, Register, UserDto } from "@/types";
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

export const logout = async () => {
  try {
    const result = await axios.post(`${apiUrl}/user/logout`, {
      withCredentials: true, // ให้เบราว์เซอร์ส่ง cookie ไปกับ request
    });
    return result.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getProfile = async (): Promise<UserDto> => {
  try {
    const result = await axios.get(`${apiUrl}/user`, {
      withCredentials: true,
    });
    return result.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
