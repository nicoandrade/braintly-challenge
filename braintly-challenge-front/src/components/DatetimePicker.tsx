"use client";

import { useState } from "react";

import { UpcomingIcon } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

export default function DatetimePicker({
    value,
    onChange,
}: {
    value: Date | undefined;
    onChange: (value: Date | undefined) => void;
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [time, setTime] = useState<string>("05:00");
    const [date, setDate] = useState<Date | null>(null);

    return (
        <div className="flex w-full gap-3">
            <div className="flex w-full flex-col">
                <label className="mb-1 text-sm text-gray-500">Date</label>
                <Popover open={isOpen} onOpenChange={setIsOpen}>
                    <PopoverTrigger asChild>
                        <div>
                            <Button
                                variant={"outline"}
                                className={cn(
                                    "w-full font-normal",
                                    !value && "text-muted-foreground"
                                )}
                                type="button"
                            >
                                {value ? (
                                    `${format(value, "PPP")}, ${time}`
                                ) : (
                                    <span>Pick a date</span>
                                )}
                                <UpcomingIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                        </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            mode="single"
                            captionLayout="dropdown"
                            selected={date ?? value}
                            onSelect={(selectedDate) => {
                                const [hours, minutes] = time?.split(":");
                                selectedDate?.setHours(Number(hours), Number(minutes));
                                setDate(selectedDate!);
                                onChange(selectedDate);
                            }}
                            onDayClick={() => setIsOpen(false)}
                            fromYear={2000}
                            toYear={new Date().getFullYear()}
                            disabled={(date) =>
                                Number(date) < Date.now() - 1000 * 60 * 60 * 24 ||
                                Number(date) > Date.now() + 1000 * 60 * 60 * 24 * 30
                            }
                        />
                    </PopoverContent>
                </Popover>
            </div>

            <div className="flex flex-col">
                <label className="mb-1 text-sm text-gray-500">Time</label>
                <Select
                    defaultValue={time}
                    onValueChange={(e) => {
                        setTime(e);
                        if (date) {
                            const [hours, minutes] = e.split(":");
                            const newDate = new Date(date.getTime());
                            newDate.setHours(Number(hours), Number(minutes));
                            setDate(newDate);
                            onChange(newDate);
                        }
                    }}
                >
                    <SelectTrigger className="w-[120px] font-normal focus:ring-0">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <ScrollArea className="h-[15rem]">
                            {Array.from({ length: 96 }).map((_, i) => {
                                const hour = Math.floor(i / 4)
                                    .toString()
                                    .padStart(2, "0");
                                const minute = ((i % 4) * 15).toString().padStart(2, "0");
                                return (
                                    <SelectItem key={i} value={`${hour}:${minute}`}>
                                        {hour}:{minute}
                                    </SelectItem>
                                );
                            })}
                        </ScrollArea>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}
