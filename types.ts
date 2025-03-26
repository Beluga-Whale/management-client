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
