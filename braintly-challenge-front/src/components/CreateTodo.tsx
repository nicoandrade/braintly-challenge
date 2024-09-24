"use client";

import { useState } from "react";

import DatetimePicker from "@/components/DatetimePicker";
import { UpcomingIcon } from "@/components/Icons";
import { PlusIcon } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createTodo } from "@/lib/api-helpers";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSWRConfig } from "swr";
import { z } from "zod";

const CreateTodoSchema = z.object({
    todoName: z.string().min(1),
    datetime: z
        .date({
            required_error: "Date & time is required!.",
        })
        .optional(),
});

export default function CreateTodo() {
    const [showDatetimePicker, setShowDatetimePicker] = useState(false);
    const { mutate } = useSWRConfig();

    // 1. Define your form.
    const form = useForm<z.infer<typeof CreateTodoSchema>>({
        resolver: zodResolver(CreateTodoSchema),
        defaultValues: {
            todoName: "",
        },
    });

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof CreateTodoSchema>) {
        await createTodo({ name: values.todoName, deadline: values.datetime });
        await mutate("/api/todos");
        form.reset();
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2">
                <FormField
                    control={form.control}
                    name="todoName"
                    render={({ field }) => (
                        <FormItem className="flex-1">
                            <FormLabel hidden>Todo Name</FormLabel>
                            <div className="flex w-full items-center gap-2">
                                <FormControl>
                                    <div className="relative w-full">
                                        <Input
                                            placeholder="Create todo..."
                                            {...field}
                                            autoComplete="off"
                                            className="peer text-base"
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            className={cn(
                                                "group absolute right-1 top-1 size-8 hover:opacity-100 peer-focus:opacity-100",
                                                showDatetimePicker ? "opacity-100" : "opacity-0"
                                            )}
                                            size="icon"
                                            onClick={() =>
                                                setShowDatetimePicker(!showDatetimePicker)
                                            }
                                        >
                                            <UpcomingIcon className="size-4 text-gray-500 group-hover:text-gray-700" />
                                        </Button>
                                    </div>
                                </FormControl>
                                <Button
                                    type="submit"
                                    variant="secondary"
                                    size="icon"
                                    className="group bg-gray-200 hover:bg-gray-300"
                                >
                                    <PlusIcon className="size-4 text-gray-500 group-hover:text-gray-700" />
                                </Button>
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {showDatetimePicker && (
                    <FormField
                        control={form.control}
                        name="datetime"
                        render={({ field }) => (
                            <DatetimePicker value={field.value} onChange={field.onChange} />
                        )}
                    />
                )}
            </form>
        </Form>
    );
}
