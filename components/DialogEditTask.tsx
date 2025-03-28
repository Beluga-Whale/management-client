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
} from "./ui/dialog";
import FormInputField from "./FormInput/FormInputField";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormSelectField from "./FormInput/FormSelectFiled";
import FormDatePickerField from "./FormInput/FormDatePickerField";
import dayjs from "dayjs";
import { useCreateTask, useEditTask } from "@/services/taskServices";
import { CreateTaskDto } from "@/types";
import { toast } from "react-toastify";
import {
  dialogSelect,
  setDialogEdit,
  setDialogEditTask,
} from "@/app/lib/feature/dialog/dialogSlice";
import { useAppDispatch, useAppSelector } from "@/app/lib/hook";
import { useEffect } from "react";

const formSchema = z.object({
  title: z.string().min(1, { message: "title is required." }),
  description: z.string().min(1, { message: "title is required." }),
  priority: z.string().min(1, "Priority is required"),
  dudeDate: z.date({
    required_error: "Date is required",
  }),
  complete: z.string().min(1, "Complete is required"),
});

const DialogEditTask = () => {
  const dispatch = useAppDispatch();
  const { dialogEdit, task } = useAppSelector(dialogSelect);

  const { mutateAsync: mutateEditTask } = useEditTask();

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
      await mutateEditTask({
        id: task?.ID ?? 0,
        body: payload,
      })
        .then(() => {
          toast.success("Create Success");

          dispatch(setDialogEdit(false));
          dispatch(setDialogEditTask(undefined));
          form.reset();
        })
        .catch((error) => {
          toast.error(error);
        });
    } catch (err) {
      console.error("Error : ", err);
    }
  };

  useEffect(() => {
    if (task) {
      form.reset({
        title: task.Title ?? "",
        description: task.Description ?? "",
        priority: task.Priority ?? "",
        dudeDate: task.DueDate
          ? dayjs(task.DueDate).toDate()
          : dayjs().toDate(),
        complete: task.Completed ? "1" : "2",
      });
    }
  }, [task, form]);

  return (
    <Dialog
      open={dialogEdit}
      onOpenChange={(open) => {
        dispatch(setDialogEdit(open));
        dispatch(setDialogEditTask(undefined));
      }}
    >
      <DialogTrigger asChild className="mx-auto w-full"></DialogTrigger>
      <DialogContent className="p-3 bg-slate-50">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
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
export default DialogEditTask;
