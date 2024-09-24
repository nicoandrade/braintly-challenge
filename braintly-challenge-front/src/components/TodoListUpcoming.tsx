"use client";

import TodoList from "@/components/TodoList";
import { useTodosUpcoming } from "@/hooks/todos";
import { type TodoSchema } from "@/lib/schemas";
import { format, parseISO } from "date-fns";
import { type z } from "zod";

export default function TodoListUpcoming() {
    const { todos, isLoading, isError } = useTodosUpcoming();

    // Separate todos into groups by date
    const todosByDate =
        todos?.reduce(
            (acc, todo) => {
                const date = todo.deadline ? format(todo.deadline, "yyyy-MM-dd") : "No Deadline";
                if (!acc[date]) {
                    acc[date] = [] as z.infer<typeof TodoSchema>[];
                }
                acc[date].push(todo);
                return acc;
            },
            {} as Record<string, z.infer<typeof TodoSchema>[]>
        ) ?? ({} as Record<string, z.infer<typeof TodoSchema>[]>);

    return (
        <div className="flex w-full flex-col gap-8">
            {Object.keys(todosByDate).length === 0 ? (
                <div className="text-center text-gray-500">There is no upcoming todos</div>
            ) : (
                Object.entries(todosByDate)
                    .reverse()
                    .map(([date, todos]) => (
                        <div key={date} className="flex flex-col gap-3">
                            <h2 className="border-b pb-1 text-lg font-medium text-gray-800">
                                {format(parseISO(date), "EEEE, MMMM d")}
                            </h2>
                            <TodoList
                                todos={todos}
                                isLoading={isLoading}
                                isError={isError}
                                url="/api/todos/upcoming"
                            />
                        </div>
                    ))
            )}
        </div>
    );
}
