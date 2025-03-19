"use client";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FormInputField from "@/components/FormInputField";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

const formSchema = z.object({
  email: z.string().email("Invalid email format. Please enter a valid email."),
  name: z.string().min(1, { message: "Name is required." }),
  password: z.string().min(1, { message: "Password is required." }),
});
const RegisterPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("values", values);
  };
  return (
    <main className="login-bg flex justify-center items-center min-h-screen ">
      <Card className="login-container bg-slate-50">
        <CardHeader>
          <CardTitle className="text-center text-xl">
            Register for an Account
          </CardTitle>
          <CardDescription className="text-center text-slate-500 ">
            Create an account. Already have an account?{" "}
            <span>
              <Link href="/" className="text-violet-500 font-bold">
                Login here
              </Link>
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FormProvider {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-5"
            >
              <FormInputField
                control={form.control}
                name="email"
                label="Email"
                placeholder="you@example.com"
              />
              <FormInputField
                control={form.control}
                name="name"
                label="Name"
                type="text"
                placeholder="you name"
              />
              <FormInputField
                control={form.control}
                name="password"
                label="Password"
                type="password"
                placeholder="*******"
              />
              <Button type="submit" variant={"default"} className="w-full">
                Register
              </Button>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    </main>
  );
};
export default RegisterPage;
