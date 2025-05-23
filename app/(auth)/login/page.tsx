"use client";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FormInputField from "@/components/FormInput/FormInputField";
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
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const formSchema = z.object({
  email: z.string().email("Invalid email format. Please enter a valid email."),
  password: z.string().min(1, { message: "password is required." }),
});
const LoginPage = () => {
  const router = useRouter();
  const { mutateAsync: loginMutate, error, isError } = useLogin();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await loginMutate(values)
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
    <main className="login-bg flex justify-center items-center min-h-screen ">
      <Card className="login-container bg-slate-50">
        <CardHeader>
          <CardTitle className="text-center text-xl">
            Login to Your Account
          </CardTitle>
          <CardDescription className="text-center text-slate-500 ">
            Login Now. Don&apos;t have an account?
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
              {isError && axios.isAxiosError(error) && (
                <p className="text-red-500 text-sm ">
                  {error?.response?.data?.error}
                </p>
              )}
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
