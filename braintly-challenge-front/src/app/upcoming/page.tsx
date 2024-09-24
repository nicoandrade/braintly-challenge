import { type Metadata } from "next";

import TodoListUpcoming from "@/components/TodoListUpcoming";
import { env } from "@/env";
import { companyName } from "@/lib/config";

export const metadata: Metadata = {
    title: `Upcoming - ${companyName}`,
    metadataBase: new URL(env.NEXT_PUBLIC_SITE_URL),
};

export default function Page() {
    return (
        <main className="mx-auto flex max-w-xl items-center justify-between px-4 py-6 sm:px-6 md:px-8">
            <TodoListUpcoming />
        </main>
    );
}
