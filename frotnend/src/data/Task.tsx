import { z } from "zod";

export const TaskSchema = z.object({
    id: z.number(),
    name: z.string().length(32),
    desc: z.string(),
    completed: z.boolean(),
    createdAt: z.date()
});

export type TaskType = z.infer<typeof TaskSchema>;