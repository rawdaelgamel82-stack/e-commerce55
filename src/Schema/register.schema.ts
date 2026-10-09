import * as zod from "zod";
export const registerSchema = zod
  .object({
    name: zod
      .string()
      .nonempty("Name is required")
      .min(3, "at least 3 characters.....")
      .max(15, "at most 15 characters........"),
    email: zod.email("invalid email formate......."),
    password: zod.string().regex(/^[A-Z][a-z]{3,}$/, "enter a valid password"),
    rePassword: zod.string().nonempty("Name is required"),
    phone: zod
      .string()
      .regex(/^(010|011|012|015)[0-9]{8}$/, "must be egyption number"),
  })
  .refine(
    (obj) => {
      return obj.password == obj.rePassword;
    },
    {
      error: "password and rePassword must be matched",
      path: ["rePassword"],
    },
  );
