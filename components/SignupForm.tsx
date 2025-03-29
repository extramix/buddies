"use client";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import axiosInstance from "@/lib/axios";
import FormField from "@/components/FormField";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { login } from "@/lib/auth";
const schema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  email: z.string().email("Invalid email address"),
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
});

type FormValues = {
  username: string;
  password: string;
  email: string;
  first_name: string;
  last_name: string;
};

export function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      username: '',
      password: '',
      email: '',
      first_name: '',
      last_name: '',
    },
  });

  const router = useRouter();

  const onSubmit = async (data: FormValues) => {
    try {
      
      const response = await axiosInstance.post("/user/", data);
      console.log("Success:", response.data);

      const loginSuccess = await login(data.username, data.password);
      if (loginSuccess) {
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Error:", error);
      if (error instanceof AxiosError && error.response?.data) {
        const errorData = error.response.data;
        Object.keys(errorData).forEach((field) => {
          methods.setError(field as keyof FormValues, {
            type: 'manual',
            message: errorData[field][0]
          });
        });
      }

    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Signup</CardTitle>
        </CardHeader>
        <CardContent>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <div className="grid gap-6">
                <FormField name="username" label="Username" required />
              <FormField name="password" label="Password" required />
              <FormField name="email" label="Email" required /> 
              <FormField name="first_name" label="First Name" required />
              <FormField name="last_name" label="Last Name" required />
              <Button type="submit" className="w-full">
                Sign Up
              </Button>
            </div>
            <div className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="underline underline-offset-4">
                Sign up
              </Link>
            </div>
          </form>
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  );
}
