"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { loginSchema } from "@/Schema/login.schema";
import { LoginPayload } from "@/app/services/Login.services";
import { signIn } from "next-auth/react";
export default function Login() {
  const route = useRouter();
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
  });
  async function handleLogin(value: LoginPayload) {
    const response = await signIn("credentials", {
      ...value,
      redirect: false,
    });
    // const response = await LoginForm(value);
    if (response?.ok) {
      route.push("/");
      toast.add({
        title: "Success",
        description: "you are loged in successfully...!",
      });
    } else {
      toast.add({
        title: "Field",
        description: "there is an error...!",
      });
    }
  }
  return (
    <div>
      <div className="w-[70%] mx-auto shadow-xl p-10 rounded-md my-5 border border-gray-300">
        <h1 className="text-center text-3xl font-bold text-green-700">
          Log in
        </h1>
        <form className="my-10" onSubmit={handleSubmit(handleLogin)}>
          <Controller
            name="password"
            control={control}
            render={({ field, fieldState }) => (
              <Field className="mt-3" data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  type="password"
                  aria-invalid={fieldState.invalid}
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <Field className="mt-3" data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  type="email"
                  aria-invalid={fieldState.invalid}
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <div className="flex justify-end mt-2">
            <Link
              href="/ForgotPassword"
              className="text-sm text-green-700 hover:underline font-medium"
            >
              Forgot password?
            </Link>
          </div>
          <Button
            type="submit"
            variant="destructive"
            className="bg-green-700 text-white  mt-6 my-4"
          >
            Login Now
          </Button>
        </form>
      </div>
    </div>
  );
}
