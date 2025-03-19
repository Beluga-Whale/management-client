"use client";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
// import FormInputField from "@/components/FormInputField";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FormInputField from "@/components/FormInputField";

const formSchema = z.object({
  email: z.string().email("Invalid email format. Please enter a valid email."),
  password: z.string(),
});
const LoginPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("values", values);
  };
  return (
    <main className="login-bg">
      <h1>Login</h1>
      {/* <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          <FormInputField
            name="email"
            label="Email"
            placeholder="you@example.com"
            control={form.control}
            validationMessage={form.formState.errors.email?.message}
          />
        </form>
      </Form> */}
      {/* <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form> */}
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit((data) => console.log(data))}>
          <FormInputField
            control={form.control}
            name="email"
            label="Email"
            placeholder="you@example.com"
          />
          <button type="submit">Submit</button>
        </form>
      </FormProvider>
    </main>
  );
};
export default LoginPage;
