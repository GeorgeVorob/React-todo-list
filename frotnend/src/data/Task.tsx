import { z } from "zod";

export const TaskSchema = z.object({
    id: z.number(),
    name: z.string().max(32),
    desc: z.string(),
    completed: z.boolean(),
    createdAt: z.date()
});

export const NewTaskSchema = z.object({
    name: z.string().max(32),
    desc: z.string().default(""),
});

export type TaskType = z.infer<typeof TaskSchema>;