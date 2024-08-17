import { z } from "zod";

const bannerFormSchema = z.object({
  text: z.string().min(1),
  variant: z.enum(["info", "success", "warning", "error"]),
  isActive: z.boolean(),
  target: z.string().min(1),
});

export default bannerFormSchema;
