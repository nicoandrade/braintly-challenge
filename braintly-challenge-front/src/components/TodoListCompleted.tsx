"use client";

import TodoList from "@/components/TodoList";
import { useTodosCompleted } from "@/hooks/todos";

export default function TodoListCompleted() {
    const { todos, isLoading, isError } = useTodosCompleted();

    return (
        <TodoList
            todos={todos}
            isLoading={isLoading}
            isError={isError}
            url="/api/todos/completed"
        />
    );
}
