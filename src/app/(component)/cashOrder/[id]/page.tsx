"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useParams } from "next/navigation";
import { cashOrder } from "@/app/services/cashOrder.service";
import { cashOrderSchema } from "@/Schema/cashOrder.schema";
import { useContext } from "react";
import { cartContext } from "@/context/cartContext";

export default function CashOrder() {
  const { setCartNumber } = useContext(cartContext);
  const Router = useRouter();
  const { id } = useParams<{ id: string }>();
  const { control, register, handleSubmit } = useForm({
    defaultValues: {
      city: "",
      phone: "",
      details: "",
      postalCode: "",
    },
    resolver: zodResolver(cashOrderSchema),
    mode: "onBlur",
  });
  async function handlePayment(value: checkOrder) {
    const response = await cashOrder(id, value);
    if (response.status == "success") {
      Router.push("/");
      setCartNumber(0);

      toast.add({
        title: "Success",
        description: "Payment successfully...!",
      });
    } else {
      toast.add({
        title: "fail",
        description: "Payment fail...!",
      });
    }
  }
  return (
    <div>
      <div className="w-[70%] mx-auto shadow-xl p-10 rounded-md my-5 border border-gray-300">
        <h1 className="text-center text-3xl font-bold text-green-700">
          Cash Payment
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
          <Controller
            name="postalCode"
            control={control}
            render={({ field, fieldState }) => (
              <Field className="mt-3" data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>PostalCode</FieldLabel>
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
