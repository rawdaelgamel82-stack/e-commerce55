"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import * as z from "zod";
async function verifyResetCodeService(resetCode: string) {
  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ resetCode }),
      },
    );
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
}

const verifySchema = z.object({
  resetCode: z.string().min(1, "Please enter the verification code"),
});

type VerifyPayload = z.infer<typeof verifySchema>;

export default function VerifyCode() {
  const router = useRouter();
  const { control, handleSubmit } = useForm<VerifyPayload>({
    defaultValues: { resetCode: "" },
    resolver: zodResolver(verifySchema),
  });

  async function handleVerify(values: VerifyPayload) {
    try {
      const response = await verifyResetCodeService(values.resetCode);

      if (response?.status === "Success" || response?.message === "success") {
        toast.add({
          title: "Success",
          description: "Code verified successfully! Now set your new password.",
        });
        router.push("/ResetPassword");
      } else {
        toast.add({
          title: "Failed",
          description: response?.message || "Invalid or expired code!",
        });
      }
    } catch (error) {
      throw new Error("Failed ");
    }
  }

  return (
    <div className="w-[70%] mx-auto shadow-xl p-10 rounded-md my-10 border border-gray-300">
      <h1 className="text-center text-3xl font-bold text-green-700">
        Verify Reset Code
      </h1>
      <p className="text-center text-gray-500 text-sm mt-2">
        Enter the code sent to your email.
      </p>

      <form className="my-8" onSubmit={handleSubmit(handleVerify)}>
        <Controller
          name="resetCode"
          control={control}
          render={({ field, fieldState }) => (
            <Field className="mt-3" data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Verification Code</FieldLabel>
              <Input
                {...field}
                id={field.name}
                type="text"
                placeholder="Enter code"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Button
          type="submit"
          className="w-full bg-green-700 hover:bg-green-800 text-white mt-6 py-2.5"
        >
          Verify Code
        </Button>
      </form>
    </div>
  );
}
