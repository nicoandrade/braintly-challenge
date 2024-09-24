"use client";

import { fetcher } from "@/lib/utils";
import { SWRConfig, type SWRConfiguration } from "swr";

export const SWRProvider = ({
    children,
    config,
}: {
    children: React.ReactNode;
    config: SWRConfiguration;
}) => {
    return <SWRConfig value={{ ...config, fetcher }}>{children}</SWRConfig>;
};
