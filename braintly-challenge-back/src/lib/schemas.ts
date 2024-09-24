import { z } from "zod";

// Todo Item Schema
export const TodoSchema = z.object({
    _id: z.string(),
    name: z.string(),
    isCompleted: z.boolean().default(false),
    isCompletedAt: z.string().datetime({ offset: true }).or(z.null()).default(null),
    deadline: z.string().datetime({ offset: true }).or(z.null()).default(null),
    createdAt: z.string().datetime({ offset: true }),
});

// Todo Item Schema
export const EditTodoSchema = z.object({
    name: z.string().optional(),
    isCompleted: z.boolean().optional(),
    isCompletedAt: z.string().datetime({ offset: true }).or(z.null()).optional(),
    deadline: z.string().datetime({ offset: true }).optional(),
});
