"use client";

import { InboxIcon, LoadingIcon, LogbookIcon } from "@/components/Icons";
import { useTodos, useTodosCompleted } from "@/hooks/todos";

export default function Summary() {
    const { count: countPending } = useTodos();
    const { count: countCompleted } = useTodosCompleted();

    return (
        <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-3 rounded-2xl bg-emerald-200/70 p-6">
                <span className="flex size-11 items-center justify-center rounded-full bg-emerald-300">
                    <LogbookIcon className="size-6 text-emerald-700" />
                </span>
                <div className="flex flex-col gap-1">
                    <h2 className="font-medium leading-tight text-emerald-800">Completed</h2>
                    <p className="flex items-center gap-2 text-xs leading-tight text-emerald-600 md:text-sm">
                        {countCompleted ? (
                            countCompleted
                        ) : (
                            <LoadingIcon className="size-3 animate-spin text-emerald-500" />
                        )}{" "}
                        items completed.
                    </p>
                </div>
            </div>

            <div className="flex flex-col gap-3 rounded-2xl bg-cyan-200/70 p-6">
                <span className="flex size-11 items-center justify-center rounded-full bg-cyan-300">
                    <InboxIcon className="size-6 text-cyan-700" />
                </span>
                <div className="flex flex-col gap-1">
                    <h2 className="font-medium leading-tight text-cyan-800">Uncompleted</h2>
                    <p className="text-xs leading-tight text-cyan-600 md:text-sm">
                        {countPending ? (
                            countPending
                        ) : (
                            <LoadingIcon className="size-3 animate-spin text-cyan-500" />
                        )}{" "}
                        items uncompleted.
                    </p>
                </div>
            </div>
        </div>
    );
}
