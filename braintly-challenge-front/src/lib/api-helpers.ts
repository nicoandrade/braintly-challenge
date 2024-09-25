import { type TodoSchema } from "@/lib/schemas";
import { fetcher } from "@/lib/utils";
import { type z } from "zod";

/**
 * Get all pending Todos
 */
export const getTodos = async () =>
    (await fetcher(`/api/todos`, {
        cache: "no-store",
    })) as {
        data: z.infer<typeof TodoSchema>[];
        count: number;
    };

/**
 * Get all completed Todos
 */
export const getTodosCompleted = async () =>
    (await fetcher(`/api/todos/completed`, {
        cache: "no-store",
    })) as {
        data: z.infer<typeof TodoSchema>[];
        count: number;
    };

/**
 * Update a Todo
 */
export const updateTodo = async (id: string, isCompleted: boolean) =>
    (await fetcher(`/api/todos/${id}`, {
        method: "POST",
        body: JSON.stringify({ isCompleted }),
    })) as {
        data: z.infer<typeof TodoSchema>;
    };

/**
 * Create a Todo
 */
export const createTodo = async ({ name, deadline }: { name: string; deadline?: Date }) =>
    (await fetcher(`/api/todos`, {
        method: "POST",
        body: JSON.stringify({ name: name, deadline: deadline }),
    })) as {
        data: z.infer<typeof TodoSchema>;
    };

/**
 * Delete a Todo
 */
export const deleteTodo = async (id: string) =>
    (await fetcher(`/api/todos/${id}`, {
        method: "DELETE",
    })) as {
        data: z.infer<typeof TodoSchema>;
    };

/**
 * Get all upcoming Todos
 */
export const getTodosUpcoming = async () =>
    (await fetcher(`/api/todos/upcoming`, {
        cache: "no-store",
    })) as {
        data: z.infer<typeof TodoSchema>[];
    };
