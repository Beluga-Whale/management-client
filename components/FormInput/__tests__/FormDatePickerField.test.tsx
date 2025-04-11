import dayjs from "dayjs";
import { FormProvider, useForm } from "react-hook-form";
import FormDatePickerField from "../FormDatePickerField";
import { render, screen, waitFor } from "@testing-library/react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

const formSchema = z.object({
  dudeDate: z.date({
    required_error: "Date is required",
  }),
});

const RenderFormDatePickerField = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dudeDate: dayjs().toDate(),
    },
  });

  return (
    <FormProvider {...form}>
      <FormDatePickerField
        control={form.control}
        name="dudeDate"
        label="Date"
        description="Choose the due date for the task."
      />
    </FormProvider>
  );
};

describe("FormDatePickerField", () => {
  beforeEach(() => {
    render(<RenderFormDatePickerField />);
  });

  it("should render datePicker with label, defaultDate", () => {
    expect(screen.getByLabelText(/Date/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Choose the due date for the task./i)
    ).toBeInTheDocument();
  });

  it("can open datepicker", async () => {
    // ค้นหาปุ่มที่เปิดปฏิทิน (button ที่มี aria-label เป็น "Date")
    const openBtn = screen.getByRole("button");

    // กดปุ่มเพื่อเปิดปฏิทิน
    userEvent.click(openBtn);

    // รอให้ปฏิทินหรือ dialog ปรากฏ
    await waitFor(() => {
      // ตรวจสอบว่า dialog หรือ popover สำหรับปฏิทินปรากฏ
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });
  });
});
