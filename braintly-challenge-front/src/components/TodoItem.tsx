"use client";

import { useState } from "react";

import { LoadingIcon, TrashIcon } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { deleteTodo, updateTodo } from "@/lib/api-helpers";
import { type TodoSchema } from "@/lib/schemas";
import { cn } from "@/lib/utils";
import { differenceInHours, differenceInSeconds, format, formatDistanceToNow } from "date-fns";
import { motion } from "framer-motion";
import { useSWRConfig } from "swr";
import { type z } from "zod";

interface TodoItemProps extends z.infer<typeof TodoSchema> {
    children: React.ReactNode;
    url: string;
}

export default function TodoItem({
    children,
    _id,
    isCompleted,
    isCompletedAt,
    deadline,
    url,
}: TodoItemProps) {
    const [value, setValue] = useState(!!isCompleted);
    const [isDeleting, setIsDeleting] = useState(false);
    const { mutate } = useSWRConfig();

    return (
        <motion.div
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: -20 }}
            exit={{ opacity: 0, x: 20 }}
            layoutId={_id}
        >
            <div className="flex items-center gap-2">
                <Checkbox
                    onCheckedChange={async (checked) => {
                        // First we show that the todo is being checked
                        setValue(!!checked);
                        // Then we update the todo
                        await updateTodo(_id, !!checked);
                        await mutate(url);
                        if (checked) {
                            await mutate("/api/todos/completed");
                        }
                    }}
                    checked={value}
                />
                <div className="group/todo flex items-center gap-2">
                    <label className="leading-tight">{children}</label>
                    {!isCompletedAt && deadline && (
                        <span
                            className={cn(
                                "text-xs",
                                differenceInSeconds(deadline, new Date()) < 0
                                    ? "text-red-400"
                                    : "text-gray-400"
                            )}
                        >
                            {differenceInHours(deadline, new Date()) < 24
                                ? formatDistanceToNow(deadline, {
                                      addSuffix: true,
                                  })
                                : format(deadline, "d MMM")}
                        </span>
                    )}
                    {isCompletedAt && (
                        <span className="text-xs text-gray-400">
                            {differenceInHours(isCompletedAt, new Date()) < 24
                                ? formatDistanceToNow(isCompletedAt, {
                                      addSuffix: true,
                                  })
                                : format(isCompletedAt, "d MMM")}
                        </span>
                    )}
                    <Button
                        type="button"
                        variant="ghost"
                        className={"group size-5 opacity-0 group-hover/todo:opacity-100"}
                        size="icon"
                        onClick={async () => {
                            setIsDeleting(true);
                            await deleteTodo(_id);
                            await mutate(url);
                        }}
                    >
                        {isDeleting ? (
                            <LoadingIcon className="size-4 animate-spin text-gray-400 group-hover:text-gray-700" />
                        ) : (
                            <TrashIcon className="size-4 text-gray-400 group-hover:text-gray-700" />
                        )}
                    </Button>
                </div>
            </div>
        </motion.div>
    );
}
