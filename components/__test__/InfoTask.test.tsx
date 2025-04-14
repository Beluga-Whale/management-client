import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useGetProfile } from "@/services/userServices";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import InfoTask from "../InfoTask";

const mockPush = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

jest.mock("@/services/userServices", () => ({
  useGetProfile: jest.fn(),
  useUpdateUser: jest.fn(() => ({
    mutateAsync: jest.fn(),
  })),
}));

const RenderWithQueryClient = (children: React.ReactNode) => {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("InfoTask", () => {
  it("render loading state", () => {
    (useGetProfile as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
    });
    RenderWithQueryClient(<InfoTask />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("render error state", () => {
    (useGetProfile as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
    });
    RenderWithQueryClient(<InfoTask />);

    expect(screen.getByText("Error fetching profile")).toBeInTheDocument();
  });

  it("render Email , Activity", () => {
    (useGetProfile as jest.Mock).mockReturnValue({
      data: {
        user: {
          Email: "TEST@gmail.com",
        },
      },
      isLoading: false,
      isError: false,
    });
    RenderWithQueryClient(<InfoTask />);

    expect(screen.getByText("TEST@gmail.com")).toBeInTheDocument();
    expect(screen.getByText("Activity")).toBeInTheDocument();
  });
});
