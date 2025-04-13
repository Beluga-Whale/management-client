"use client";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "./ui/dialog";
import FormInputField from "./FormInput/FormInputField";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormSelectField from "./FormInput/FormSelectFiled";
import FormDatePickerField from "./FormInput/FormDatePickerField";
import dayjs from "dayjs";
import { useCreateTask } from "@/services/taskServices";
import { CreateTaskDto } from "@/types";
import { toast } from "react-toastify";
import { useState } from "react";

type DialogCreateTaskProps = {
  btn: boolean;
};

const formSchema = z.object({
  title: z.string().min(1, { message: "title is required." }),
  description: z.string().min(1, { message: "title is required." }),
  priority: z.string().min(1, "Priority is required"),
  dudeDate: z.date({
    required_error: "Date is required",
  }),
  complete: z.string().min(1, "Complete is required"),
});

const DialogCreateTask = ({ btn }: DialogCreateTaskProps) => {
  const [open, setOpen] = useState(false);

  const { mutateAsync: mutateCreateTask } = useCreateTask();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: "",
      dudeDate: dayjs().toDate(),
    },
  });

  const handleSubmitTask = async (values: z.infer<typeof formSchema>) => {
    try {
      const payload: CreateTaskDto = {
        Title: values.title,
        Description: values.description,
        Priority: values.priority,
        DueDate: dayjs(values.dudeDate),
        Completed: Number(values?.complete) == 1 ? true : false,
      };
      await mutateCreateTask(payload)
        .then(() => {
          toast.success("Create Success");

          setOpen(false);
          form.reset();
        })
        .catch((error) => {
          toast.error(error);
        });
    } catch (err) {
      console.error("Error : ", err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="mx-auto w-full">
        {btn ? (
          <Button
            onClick={() => setOpen(true)}
            variant="outline"
            className=" cursor-pointer bg-violet-500 text-white "
          >
            Add New Task
          </Button>
        ) : (
          <Button
            onClick={() => setOpen(true)}
            variant="outline"
            className="max-w-[20.6rem]  h-[16.2rem]  border-dashed hover:bg-slate-200 hover:border-solid cursor-pointer"
          >
            Add New Task
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="p-3 bg-slate-50" aria-describedby="dialog-desc">
        <DialogHeader>
          <DialogTitle>Create Task</DialogTitle>
          <DialogDescription className="sr-only">
            Form for creating a new task
          </DialogDescription>
        </DialogHeader>
        <FormProvider {...form}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit(handleSubmitTask)();
            }}
            className="space-y-5"
          >
            <FormInputField
              control={form.control}
              name="title"
              label="Title"
              placeholder="Task Title"
            />
            <FormInputField
              control={form.control}
              name="description"
              label="Description"
              placeholder="Task Description"
            />
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
            <FormDatePickerField
              control={form.control}
              name="dudeDate"
              label="Select Due Date"
              description="Choose the due date for the task."
            />
            <FormSelectField
              control={form.control}
              name="complete"
              label="Task Completed"
              options={[
                { label: "Yes", value: 1 },
                { label: "No", value: 2 },
              ]}
            />
            <DialogFooter>
              <Button type="submit" className="w-full">
                Save changes
              </Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};
export default DialogCreateTask;
