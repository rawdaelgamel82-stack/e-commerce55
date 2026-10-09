"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import * as z from "zod";

const resetSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  newPassword: z.string().min(6, "Password must be at least 6 characters"),
});

type ResetPayload = z.infer<typeof resetSchema>;

export default function ResetPassword() {
  const router = useRouter();
  const { control, handleSubmit } = useForm<ResetPayload>({
    defaultValues: { email: "", newPassword: "" },
    resolver: zodResolver(resetSchema),
  });

  async function handleReset(values: ResetPayload) {
    try {
      const response = await fetch(
        `https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        },
      );
      const data = await response.json();

      if (data?.token) {
        toast.add({
          title: "Success",
          description: "Password reset successfully! Please login.",
        });
        router.push("/Login");
      } else {
        toast.add({
          title: "Failed",
          description: data?.message || "Something went wrong!",
        });
      }
    } catch (error) {
      throw new Error("Failed");
    }
  }

  return (
    <div className="w-[70%] mx-auto shadow-xl p-10 rounded-md my-10 border border-gray-300">
      <h1 className="text-center text-3xl font-bold text-green-700">
        Set New Password
      </h1>
      <form className="my-8" onSubmit={handleSubmit(handleReset)}>
        <Controller
          name="email"
          control={control}
          render={({ field, fieldState }) => (
            <Field className="mt-3" data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Email Address</FieldLabel>
              <Input {...field} id={field.name} type="email" />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="newPassword"
          control={control}
          render={({ field, fieldState }) => (
            <Field className="mt-4" data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>New Password</FieldLabel>
              <Input {...field} id={field.name} type="password" />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Button type="submit" className="w-full bg-green-700 text-white mt-6">
          Reset Password
        </Button>
      </form>
    </div>
  );
}
