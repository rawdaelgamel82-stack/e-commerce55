"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { Controller, FieldValues, useForm } from "react-hook-form";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod";

import { checkOutSchema } from "@/Schema/checkOut.schema";
import { useParams } from "next/navigation";
import { checkOutSession } from "@/app/services/checkOut.service";
export default function Checkout() {
  const { id } = useParams<{ id: string }>();
  const { control, register, handleSubmit } = useForm({
    defaultValues: {
      city: "",
      phone: "",
      details: "",
    },
    resolver: zodResolver(checkOutSchema),
    mode: "onBlur",
  });
  async function handlePayment(value: Checkout) {
    const response = await checkOutSession(id, value);
    if (response.status == "success") {
      window.location.href = response.session.url;
    }
  }
  return (
    <div>
      <div className="w-[70%] mx-auto shadow-xl p-10 rounded-md my-5 border border-gray-300">
        <h1 className="text-center text-3xl font-bold text-green-700">
          Payment
        </h1>
        <form className="my-10" onSubmit={handleSubmit(handlePayment)}>
          <Controller
            name="city"
            control={control}
            render={({ field, fieldState }) => (
              <Field className="mt-3" data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>City</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  type="text"
                  aria-invalid={fieldState.invalid}
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="phone"
            control={control}
            render={({ field, fieldState }) => (
              <Field className="mt-3" data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Phone</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  type="tell"
                  aria-invalid={fieldState.invalid}
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="details"
            control={control}
            render={({ field, fieldState }) => (
              <Field className="mt-3" data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Details</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  type="text"
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
            variant="destructive"
            className="bg-green-700 text-white  mt-6 my-4"
          >
            Pay Now
          </Button>
        </form>
      </div>
    </div>
  );
}
