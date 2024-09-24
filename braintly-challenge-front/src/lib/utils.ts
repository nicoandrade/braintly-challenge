import { env } from "@/env";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const fetcher = (url: string | URL, args?: RequestInit) =>
    fetch(`${env.NEXT_PUBLIC_API_URL}${url}`, { ...args }).then((res) => res.json());
