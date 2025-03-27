import * as dayjs from "dayjs";
export type Login = {
  email: string;
  password: string;
};

export type Register = {
  email: string;
  name: string;
  password: string;
};

type Role = "user" | "admin"; // ประเภทของ role ที่สามารถเลือกได้

export type UserDto = {
  user: {
    Id: number; // GORM Model จะมี field นี้
    Email: string;
    Name: string;
    Password: string;
    Photo: string;
    Bio?: string; // `Bio` เป็น optional
    Role: Role; // กำหนดเป็น enum
    IsVerified: boolean; // ตัวแปรนี้ใน Go เป็น private
  };
};

export type TaskDto = {
  ID?: number;
  CreatedAt?: dayjs.Dayjs | null;
  UpdatedAt?: dayjs.Dayjs | null;
  DeletedAt?: dayjs.Dayjs | null;
  DueDate?: dayjs.Dayjs | null;
  Title?: string;
  Description?: string;
  Status?: "active" | "inactive";
  Completed?: boolean;
  Priority?: "low" | "medium" | "high";
  UserID?: number;
};

export type TasksAllDto = {
  message: TaskDto[] | undefined;
};

export type CreateTaskDto = {
  Title?: string | undefined;
  Description?: string | undefined;
  Priority?: "low" | "medium" | "heigh";
  DueDate?: dayjs.Dayjs | null;
  Completed: boolean;
};
