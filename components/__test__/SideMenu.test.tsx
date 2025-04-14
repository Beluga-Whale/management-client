import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SideMenu from "../SideMenu";
import { usePathname } from "next/navigation";

jest.mock("@/services/userServices", () => ({
  useGetProfile: jest.fn(),
  useGetAllTasks: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

describe("SigeMenu", () => {
  it("renders all menu items with tooltips", () => {
    (usePathname as jest.Mock).mockReturnValue("/tasks"); // Mock path

    render(<SideMenu />);

    expect(screen.getByLabelText("All")).toBeInTheDocument();
    expect(screen.getByLabelText("Completed")).toBeInTheDocument();
    expect(screen.getByLabelText("Pending")).toBeInTheDocument();
    expect(screen.getByLabelText("Overdue")).toBeInTheDocument();
  });
  it("active color when current path", () => {
    (usePathname as jest.Mock).mockReturnValue("/tasks/pending");

    render(<SideMenu />);

    const pendingBtn = screen.getByLabelText("Pending");

    expect(pendingBtn).toBeInTheDocument();
  });
});
