"use client";

import ErrorMessage from "@/components/ErrorMessage";
import TodoItem from "@/components/TodoItem";
import { type TodoSchema } from "@/lib/schemas";
import { AnimatePresence } from "framer-motion";
import { type z } from "zod";

export default function TodoList({
    todos,
    isLoading,
    isError,
    url,
}: {
    todos?: z.infer<typeof TodoSchema>[];
    isLoading?: boolean;
    isError?: Error;
    url: string;
}) {
    if (!todos && isLoading) return <Skeleton />;
    if (isError) return <ErrorMessage>Error loading the todos</ErrorMessage>;

    return (
        <div className="flex w-full flex-col gap-4">
            <AnimatePresence initial={false}>
                {todos?.map((todo) => (
                    <TodoItem key={todo._id} {...todo} url={url}>
                        {todo.name}
                    </TodoItem>
                ))}
            </AnimatePresence>
        </div>
    );
}

function Skeleton() {
    return (
        <div className="flex w-full flex-col gap-4">
            {Array.from(Array(5).keys()).map((i) => (
                <div key={i} className="flex w-full items-center gap-2">
                    <span className="loading flex size-5 rounded" />
                    <span className="loading flex h-5 w-1/2 rounded" />
                </div>
            ))}
        </div>
    );
}
