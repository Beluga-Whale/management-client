import axios from "axios";
import {
  getProfile,
  login,
  logout,
  register,
  updateUser,
} from "@/services/api/authApi";
import "@testing-library/jest-dom";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;
describe("Auth.Api", () => {
  const apiUrl = process.env.NEXT_PUBLIC_PORT || "";

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call axios login ", async () => {
    const mockPayload = { email: "test@mail.com", password: "1234" };

    const mockResponse = {
      message: "Login success",
      token: "eyJhbGciOi...",
      user: {
        email: "example@example.com",
        id: 1,
        name: "John Doe",
      },
    };

    //NOTE - mock axios response
    mockedAxios.post.mockResolvedValueOnce({ data: mockResponse });
    const result = await login(mockPayload);

    //NOTE -  ตรวจสอบว่าเรียก axios.post ด้วยข้อมูลที่ถูกต้อง
    expect(mockedAxios.post).toHaveBeenCalledWith(
      `${apiUrl}/user/login`,
      mockPayload,
      { withCredentials: true }
    );
    // NOTE - เช็คว่าเท่ากันทั้งก้อนไหม
    expect(result).toEqual(mockResponse);
    // NOTE - เช็คว่ามีค่านี้ไหม
    expect(result.message).toBe("Login success");
    // NOTE - เช็คว่าเป็น Undefined
    expect(result.token).toBeDefined();
    // NOTE - เช็คว่าค่าแต่ละ Key ตรงกันไหม
    expect(result.user).toMatchObject({
      email: "example@example.com",
      name: "John Doe",
      id: 1,
    });
  });

  it("should throw error when login fails", async () => {
    const mockError = new Error("Login failed");

    mockedAxios.post.mockRejectedValueOnce(mockError);
    await expect(
      login({ email: "fail@example.com", password: "wrongpass" })
    ).rejects.toThrow("Login failed");

    expect(mockedAxios.post).toHaveBeenCalledWith(
      `${apiUrl}/user/login`,
      { email: "fail@example.com", password: "wrongpass" },
      { withCredentials: true }
    );
  });

  it("should call axios register", async () => {
    const mockData = {
      email: "test@gmail.com",
      name: "test",
      password: "password",
    };

    const mockResponse = {
      message: "Register success",
    };

    mockedAxios.post.mockResolvedValueOnce({ data: mockResponse });

    const result = await register(mockData);

    expect(mockedAxios.post).toHaveBeenCalledWith(
      `${apiUrl}/user/register`,
      mockData,
      { withCredentials: true }
    );
    expect(result.message).toBe("Register success");
  });

  it("should call axios register fails", async () => {
    const mockData = {
      email: "test@gmail.com",
      name: "test",
      password: "password",
    };

    const mockErrorResponse = new Error("Register failed");

    mockedAxios.post.mockRejectedValueOnce(mockErrorResponse);

    await expect(register(mockData)).rejects.toBeDefined();

    expect(mockedAxios.post).toHaveBeenCalledWith(
      `${apiUrl}/user/register`,
      mockData,
      { withCredentials: true }
    );
  });

  it("should call axios logout ", async () => {
    const mockResponse = {
      message: "Logout Success",
    };

    mockedAxios.post.mockResolvedValueOnce({ data: mockResponse });

    const result = await logout();

    expect(result.message).toBe("Logout Success");
  });

  it("should call axios logout fails", async () => {
    const mockError = new Error("Logout Fails");

    mockedAxios.post.mockRejectedValueOnce(mockError);

    expect(logout()).rejects.toBeDefined();
    expect(mockedAxios.post).toHaveBeenCalledWith(`${apiUrl}/user/logout`, {
      withCredentials: true,
    });
  });

  it("should call getProfile", async () => {
    const mockResponse = {
      user: {
        ID: 1,
        CreatedAt: "2025-04-02T09:35:37.535786Z",
        UpdatedAt: "2025-04-18T08:04:34.815192Z",
        DeletedAt: null,
        Email: "example@example.com",
        Name: "John Doe",
        Password:
          "$2a$10$0ppsksrjKhFjpRglk8mr6ObKFo.AstoS.pEe72GwqPcAaouyAAe/i",
        Photo:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        Bio: "ธฎฆธ",
        Role: "user",
        Tasks: null,
      },
    };

    mockedAxios.get.mockResolvedValueOnce({ data: mockResponse });

    const result = await getProfile();

    expect(result).toEqual(mockResponse);
    expect(mockedAxios.get).toHaveBeenCalledWith(`${apiUrl}/user`, {
      withCredentials: true,
    });
  });

  it("should call getProfile Failed", async () => {
    const mockResponseError = new Error("Get Profile Error");

    mockedAxios.get.mockRejectedValueOnce(mockResponseError);

    expect(getProfile()).rejects.toThrow("Get Profile Error");
    expect(mockedAxios.get).toHaveBeenCalledWith(`${apiUrl}/user`, {
      withCredentials: true,
    });
  });

  it("should call axios updateUser", async () => {
    const mockPayload = {
      Bio: "TEST",
    };

    const mockResponse = {
      user: {
        ID: 0,
        CreatedAt: "0001-01-01T00:00:00Z",
        UpdatedAt: "0001-01-01T00:00:00Z",
        DeletedAt: null,
        Email: "example2@example.com",
        Name: "",
        Password: "test",
        Photo: "",
        Bio: "TEST",
        Role: "",
        Tasks: null,
      },
    };

    mockedAxios.put.mockResolvedValueOnce({ data: mockResponse });

    const result = await updateUser(1, mockPayload);

    expect(result).toEqual(mockResponse);
    expect(mockedAxios.put).toHaveBeenCalledWith(
      `${apiUrl}/user/1`,
      mockPayload,
      {
        withCredentials: true,
      }
    );
  });

  it("should call axios updateUser failed ", async () => {
    const mockResponseError = new Error("update failed");
    const id = 1;
    const mockPayload = {
      Bio: "TEST",
    };

    mockedAxios.put.mockRejectedValueOnce(mockResponseError);

    expect(updateUser(1, mockPayload)).rejects.toThrow("update failed");
    expect(mockedAxios.put).toHaveBeenCalledWith(
      `${apiUrl}/user/${id}`,
      mockPayload,
      {
        withCredentials: true,
      }
    );
  });
});
