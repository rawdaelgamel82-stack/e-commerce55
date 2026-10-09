import * as zod from "zod";
export const checkOutSchema = zod.object({
  city: zod.string().nonempty("city is required"),
  phone: zod.string().nonempty("phone is required"),
  details: zod.string().nonempty("details is required"),
});
