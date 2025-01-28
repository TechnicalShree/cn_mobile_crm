import { z } from "zod";

const budgetRangeOptions = [
  "2 Cr plus",
  "1.50 Cr - 2 Cr",
  "1.30 Cr - 1.40 Cr",
  "1.20 Cr - 1.30 Cr",
  "1.10 Cr - 1.20 Cr",
  "1 Cr - 1.10 Cr",
  "90 - 1 Cr",
  "80 - 90 L",
  "70 - 80 L",
  "60 - 70 L",
  "50 - 60 L",
  "40-50 L",
] as const;

export const leadFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  mobileNo: z
    .string()
    .min(1, "Mobile number is required")
    .regex(/^\d{10}$/, "Please enter a valid 10-digit mobile number"),
  customerEmail: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  budgetRange: z.enum(budgetRangeOptions, {
    errorMap: () => ({ message: "Please select a budget range" }),
  }),
});

export type LeadFormData = z.infer<typeof leadFormSchema>;
export { budgetRangeOptions };
