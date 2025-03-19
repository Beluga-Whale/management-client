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
import { useLogin } from "@/services/authServices";

const formSchema = z.object({
  email: z.string().email("Invalid email format. Please enter a valid email."),
  password: z.string().min(1, { message: "password is required." }),
});
const LoginPage = () => {
  const { mutate: loginMutate, error } = useLogin();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    loginMutate(values);
  };

  console.log("error", error);
  return (
    <main className="login-bg flex justify-center items-center min-h-screen ">
      <Card className="login-container bg-slate-50">
        <CardHeader>
          <CardTitle className="text-center text-xl">
            Login to Your Account
          </CardTitle>
          <CardDescription className="text-center text-slate-500 ">
            Login Now. Don't have an account?{" "}
            <span>
              <Link href="/register" className="text-violet-500 font-bold">
                Register
              </Link>
            </span>{" "}
            here
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
                name="password"
                label="Password"
                type="password"
                placeholder="*******"
              />
              <Button type="submit" variant={"default"} className="w-full">
                Login
              </Button>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    </main>
  );
};
export default LoginPage;
