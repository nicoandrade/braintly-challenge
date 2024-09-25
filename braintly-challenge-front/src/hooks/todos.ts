import { getTodos, getTodosCompleted, getTodosUpcoming } from "@/lib/api-helpers";
import { type TodoSchema } from "@/lib/schemas";
import useSWR from "swr";
import { type z } from "zod";

export function useTodos() {
    const { data, error, isLoading } = useSWR<
        {
            data: z.infer<typeof TodoSchema>[];
            count: number;
        },
        Error
    >(`/api/todos`, getTodos);
    return {
        todos: data?.data,
        count: data?.count ?? 0,
        isLoading,
        isError: error,
    };
}

export function useTodosCompleted() {
    const { data, error, isLoading } = useSWR<
        {
            data: z.infer<typeof TodoSchema>[];
            count: number;
        },
        Error
    >(`/api/todos/completed`, getTodosCompleted);
    return {
        todos: data?.data,
        count: data?.count ?? 0,
        isLoading,
        isError: error,
    };
}

export function useTodosUpcoming() {
    const { data, error, isLoading } = useSWR<
        {
            data: z.infer<typeof TodoSchema>[];
        },
        Error
    >(`/api/todos/upcoming`, getTodosUpcoming);
    return {
        todos: data?.data,
        isLoading,
        isError: error,
    };
}
