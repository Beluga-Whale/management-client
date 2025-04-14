import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useGetProfile } from "@/services/userServices";
import Header from "../Header";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const mockPush = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

jest.mock("@/services/userServices", () => ({
  useGetProfile: jest.fn(),
}));

const RenderWithQueryClient = (children: React.ReactNode) => {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("Header", () => {
  it("shoud render loading state", () => {
    (useGetProfile as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
    });
    RenderWithQueryClient(<Header />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("shoud render error state", () => {
    (useGetProfile as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
    });
    RenderWithQueryClient(<Header />);

    expect(screen.getByText("Error fetching profile")).toBeInTheDocument();
  });

  it("shoud render Hader, Welcome, Bio", () => {
    (useGetProfile as jest.Mock).mockReturnValue({
      data: {
        user: {
          Email: "HAHA@gmail.com",
          Bio: "TESTBIO",
        },
      },
      isLoading: false,
      isError: false,
    });
    RenderWithQueryClient(<Header />);

    expect(screen.getByText("👋Welcome, HAHA@gmail.com")).toBeInTheDocument();
    expect(screen.getByText("Bio : TESTBIO")).toBeInTheDocument();
  });

  it("should click icon to open facebook, github", async () => {
    (useGetProfile as jest.Mock).mockReturnValue({
      data: {
        user: {
          Email: "HAHA@gmail.com",
          Bio: "TESTBIO",
        },
      },
      isLoading: false,
      isError: false,
    });
    RenderWithQueryClient(<Header />);

    const gitHub = screen.getByLabelText("GitHub");
    const facebook = screen.getByLabelText("FaceBook");

    expect(gitHub).toHaveAttribute("href", "https://github.com/Beluga-Whale");
    expect(facebook).toHaveAttribute(
      "href",
      "https://www.facebook.com/Thanathat159/?locale=th_TH"
    );
  });
});
