"use client";

import TodoList from "@/components/TodoList";
import { useTodos } from "@/hooks/todos";

export default function TodoListPending() {
    const { todos, isLoading, isError } = useTodos();

    return <TodoList todos={todos} isLoading={isLoading} isError={isError} url="/api/todos" />;
}
