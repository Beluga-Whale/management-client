import { TasksAllDto } from "@/types";
import axios from "axios";
const apiUrl: string = process.env.NEXT_PUBLIC_PORT || "";

export const getAllTasks = async (): Promise<TasksAllDto> => {
  try {
    const result = await axios.get(`${apiUrl}/task`, {
      withCredentials: true,
    });

    return result.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
