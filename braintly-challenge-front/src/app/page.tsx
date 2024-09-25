import CreateTodo from "@/components/CreateTodo";
import Summary from "@/components/Summary";
import TodoListPending from "@/components/TodoListPending";

export default function HomePage() {
    return (
        <main className="mx-auto flex max-w-xl items-center justify-between px-4 py-6 sm:px-6 md:px-8">
            <div className="flex w-full flex-col gap-6">
                <Summary />
                <CreateTodo />
                <TodoListPending />
            </div>
        </main>
    );
}
