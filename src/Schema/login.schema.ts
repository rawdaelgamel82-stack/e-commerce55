import * as zod from "zod";
export const loginSchema = zod.object({
  email: zod.email("invalid email formate......."),
  password: zod.string().regex(/^[A-Z][a-z]{3,}$/, "enter a valid password"),
});
