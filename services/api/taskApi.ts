import { CreateTaskDto, TasksAllDto } from "@/types";
import axios from "axios";
const apiUrl: string = process.env.NEXT_PUBLIC_PORT || "";

export const getAllTasks = async (priority: string): Promise<TasksAllDto> => {
  try {
    const result = await axios.get(`${apiUrl}/task?priority=${priority}`, {
      withCredentials: true,
    });

    return result.data;
  } catch (error) {
    throw error;
  }
};

export const createTask = async (body: CreateTaskDto) => {
  try {
    const result = await axios.post(`${apiUrl}/task`, body, {
      withCredentials: true,
    });
    return result?.data;
  } catch (error) {
    throw error;
  }
};

export const editTask = async (id: number, body: CreateTaskDto) => {
  try {
    const result = await axios.put(`${apiUrl}/task/${id}`, body, {
      withCredentials: true,
    });
    return result?.data;
  } catch (error) {
    throw error;
  }
};

export const deleteTask = async (id: number) => {
  try {
    const result = await axios.delete(`${apiUrl}/task/${id}`, {
      withCredentials: true,
    });
    return result?.data;
  } catch (error) {
    throw error;
  }
};

export const getCompleteTasks = async (
  priority: string
): Promise<TasksAllDto> => {
  try {
    const result = await axios.get(
      `${apiUrl}/task/complete?priority=${priority}`,
      {
        withCredentials: true,
      }
    );

    return result.data;
  } catch (error) {
    throw error;
  }
};

export const getPendingTasks = async (
  priority: string
): Promise<TasksAllDto> => {
  try {
    const result = await axios.get(
      `${apiUrl}/task/pending?priority=${priority}`,
      {
        withCredentials: true,
      }
    );

    return result.data;
  } catch (error) {
    throw error;
  }
};

export const getOverdueTasks = async (
  priority: string
): Promise<TasksAllDto> => {
  try {
    const result = await axios.get(
      `${apiUrl}/task/overdue?priority=${priority}`,
      {
        withCredentials: true,
      }
    );

    return result.data;
  } catch (error) {
    throw error;
  }
};
