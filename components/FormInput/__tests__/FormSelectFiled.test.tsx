import { render, screen } from "@testing-library/react";
import { z } from "zod";
import "@testing-library/jest-dom";
import FormSelectField from "../FormSelectFiled";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  priority: z.string().min(1, "Priority is required"),
});

const RenderFormSelectFiled = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      priority: "",
    },
  });

  return (
    <FormProvider {...form}>
      <FormSelectField
        control={form.control}
        name="priority"
        label="Select Priority"
        options={[
          { label: "Low", value: "low" },
          { label: "Medium", value: "medium" },
          { label: "High", value: "high" },
        ]}
      />
    </FormProvider>
  );
};

describe("FormSelectField", () => {
  beforeEach(() => {
    render(<RenderFormSelectFiled />);
  });

  it("shold render SelectField with label and button", () => {
    expect(screen.getByText(/Select Priority/i)).toBeInTheDocument();
    const combobox = screen.getByRole("combobox");
    expect(combobox).toBeInTheDocument();
  });
});
