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
import { useCreateTask } from "@/services/taskServices";
import { CreateTaskDto } from "@/types";

const formSchema = z.object({
  title: z.string().min(1, { message: "title is required." }),
  description: z.string().min(1, { message: "title is required." }),
  priority: z.string().min(1, "Priority is required"),
  dudeDate: z.date({
    required_error: "Date is required",
  }),
  complete: z.string().min(1, "Complete is required"),
});

const DialogCreateTask = () => {
  const { mutate: mutateCreateTask } = useCreateTask();

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
        DueDate: values.dudeDate,
      };
      await mutateCreateTask(payload)
        .then(() => {
          toast.success("Login Success");
          router.push("/tasks");
        })
        .catch((error) => {
          toast.error(error);
        });
    } catch (err) {
      console.error("Error : ", err);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild className="mx-auto w-full">
        <Button
          variant="outline"
          className="max-w-[20.6rem]  h-[16.2rem]  border-dashed hover:bg-slate-200 hover:border-solid cursor-pointer"
        >
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="p-3 bg-slate-50">
        <DialogHeader>
          <DialogTitle>Create Task</DialogTitle>
        </DialogHeader>
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmitTask)}
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
            {/* {isError && axios.isAxiosError(error) && (
              <p className="text-red-500 text-sm ">
                {error?.response?.data?.error}
              </p>
            )} */}
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
