import { FormProvider, useForm } from "react-hook-form";
import FormInputField from "../FormInputField";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

type TestFormData = {
  email: string;
};

const RenderFormInputField = () => {
  const form = useForm<TestFormData>({
    defaultValues: { email: "" },
  });
  return (
    <FormProvider {...form}>
      <FormInputField
        control={form.control}
        name="email"
        label="Email"
        type="email"
        placeholder="you@example.com"
        description="Please enter a valid email."
      />
    </FormProvider>
  );
};

describe("FormInputField", () => {
  beforeEach(() => {
    render(<RenderFormInputField />);
  });

  it("should render input field with label, placeholder", () => {
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/you@example.com/i)).toBeInTheDocument();
  });

  it("should render description", () => {
    expect(
      screen.getByText(/Please enter a valid email./i)
    ).toBeInTheDocument();
  });

  it("should input field ", async () => {
    const textInput = screen.getByPlaceholderText(/you@example.com/i);

    await userEvent.type(textInput, "test@gmail.com");

    expect((textInput as HTMLInputElement).value).toBe("test@gmail.com");
  });
});
