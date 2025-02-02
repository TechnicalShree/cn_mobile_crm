import { z } from "zod";

export const taskSchema = z.object({
  taskTitle: z.string().min(1, "Task title is required"),
  taskDate: z.string().refine((date) => {
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selectedDate >= today;
  }, "Date must be today or in the future"),
  taskTime: z.string().min(1, "Time is required"),
});

export type TaskFormData = z.infer<typeof taskSchema>;
