import { type Metadata } from "next";
import type { Viewport } from "next";

import { SWRProvider } from "@/app/swr-provider";
import Header from "@/components/Header";
import { env } from "@/env";
import { getTodos } from "@/lib/api-helpers";
import { companyName, homePageDescription } from "@/lib/config";
import "@/styles/globals.css";
import { GeistSans } from "geist/font/sans";

export const metadata: Metadata = {
    title: companyName,
    description: homePageDescription,
    icons: [{ rel: "icon", url: "/favicon.ico" }],
    metadataBase: new URL(env.NEXT_PUBLIC_SITE_URL),
};
export const viewport: Viewport = {
    themeColor: "#F9FAFB",
};
export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    // Prefetch todos
    const todos = await getTodos();
    return (
        <html lang="en" className={`${GeistSans.variable}`}>
            <body className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
                <SWRProvider config={{ fallback: { "/api/todos": todos } }}>
                    <Header />
                    {children}
                </SWRProvider>
            </body>
        </html>
    );
}
