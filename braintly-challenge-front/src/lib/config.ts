import { type ElementType } from "react";

import { HomeIcon, LogbookIcon, UpcomingIcon } from "@/components/Icons";

export type LinkItem = {
    name: string;
    href: string;
    icon?: ElementType;
};

export const companyName = "Braintly ToDo App";
export const homePageDescription = "Brantly Challenge ToDo App";

export const navigation: Array<LinkItem> = [
    {
        name: "Home",
        href: "/",
        icon: HomeIcon,
    },
    {
        name: "Upcoming",
        href: "/upcoming",
        icon: UpcomingIcon,
    },
    {
        name: "Logbook",
        href: "/logbook",
        icon: LogbookIcon,
    },
];
