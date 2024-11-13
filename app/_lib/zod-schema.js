import { z } from "zod";

// Define a schema for your form
export const userFormSchema = z.object({
  nationalID: z.string().regex(/^[a-zA-Z0-9]{6,12}$/, {
    message: "Please provide a proper national ID",
  }),
});
