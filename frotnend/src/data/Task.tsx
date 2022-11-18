import { z } from "zod";

// Модель задачи как таковой
export const TaskSchema = z.object({
    id: z.number(),
    name: z.string().max(32),
    desc: z.string().default(""),
    completed: z.boolean(),
    createdAt: z.date()
});

// Модель новой задачи
export const NewTaskSchema = z.object({
    name: z.string().max(32),
    desc: z.string().default(""),
});

export type TaskType = z.infer<typeof TaskSchema>;

export type NewTaskInputs = {
    name: string,
    desc: string,
};