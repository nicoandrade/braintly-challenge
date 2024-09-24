import { type Metadata } from "next";

export const metadata: Metadata = {
    title: "Brainly Challenge Back-End",
    description: "Brainly Challenge Back-End",
    icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
