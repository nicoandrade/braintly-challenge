"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { navigation } from "@/lib/config";
import { cn } from "@/lib/utils";

export default function Navigation() {
    const pathname = usePathname();

    return (
        <>
            {navigation.map((item) => (
                <Button
                    variant="ghost"
                    asChild
                    className={cn(
                        "group relative inline-flex items-center gap-2 px-3 py-1 text-sm font-medium leading-6 text-gray-500 transition-colors hover:bg-gray-200 hover:text-gray-700",
                        pathname === item.href && "bg-gray-200 text-gray-700"
                    )}
                    key={item.name}
                >
                    <Link href={item.href}>
                        {item.icon && (
                            <item.icon className="size-4 text-gray-500 group-hover:text-gray-600" />
                        )}
                        {item.name}
                    </Link>
                </Button>
            ))}
        </>
    );
}
