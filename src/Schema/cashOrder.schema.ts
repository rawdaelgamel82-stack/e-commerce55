import * as zod from "zod";
export const cashOrderSchema = zod.object({
  city: zod.string().nonempty("city is required"),
  phone: zod.string().nonempty("phone is required"),
  details: zod.string().nonempty("details is required"),
  postalCode: zod.string().nonempty("postalCode is required"),
});
