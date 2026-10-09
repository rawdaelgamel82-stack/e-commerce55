"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { forgotPassword } from "@/app/services/forgotPassword.services";

const forgotSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type ForgotPayload = z.infer<typeof forgotSchema>;

export default function ForgotPassword() {
  const router = useRouter();
  const { control, handleSubmit } = useForm<ForgotPayload>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(forgotSchema),
    mode: "onBlur",
  });

  async function handleForgot(values: ForgotPayload) {
    try {
      const response = await forgotPassword(values.email);

      if (
        response?.statusMsg === "success" ||
        response?.message === "success"
      ) {
        toast.add({
          title: "Success",
          description: "Reset code sent to your email successfully!",
        });
        router.push("/VerifyCode");
      } else {
        toast.add({
          title: "Failed",
          description:
            response?.message || "Something went wrong, please try again!",
        });
      }
    } catch (error) {
      toast.add({
        title: "Error",
        description: "An unexpected error occurred.",
      });
    }
  }

  return (
    <div>
      <div className="w-[70%] mx-auto shadow-xl p-10 rounded-md my-10 border border-gray-300">
        <h1 className="text-center text-3xl font-bold text-green-700">
          Forgot Password
        </h1>
        <p className="text-center text-gray-500 text-sm mt-2">
          Enter your email address to receive a verification code.
        </p>

        <form className="my-8" onSubmit={handleSubmit(handleForgot)}>
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <Field className="mt-3" data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Email Address</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  type="email"
                  placeholder="name@example.com"
                  aria-invalid={fieldState.invalid}
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Button
            type="submit"
            className="w-full bg-green-700 hover:bg-green-800 text-white mt-6 py-2.5"
          >
            Send Reset Code
          </Button>
        </form>
      </div>
    </div>
  );
}
