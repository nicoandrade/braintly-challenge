import Link from "next/link";

import { MenuIcon, XMarkIcon } from "@/components/Icons";
import Logo from "@/components/Logo";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { companyName, navigation } from "@/lib/config";

export default async function Header() {
    return (
        <header>
            <nav
                className="mx-auto flex max-w-xl items-center justify-between px-4 py-6 sm:px-6 md:px-8"
                aria-label="Global"
            >
                <Button
                    variant="ghost"
                    asChild
                    className="text-primary hover:text-primary h-8 w-auto p-0 transition-colors hover:bg-transparent"
                >
                    <Link href="/">
                        <span className="sr-only">{companyName}</span>
                        <Logo className="h-8 w-auto" />
                    </Link>
                </Button>
                <div className="flex lg:hidden">
                    <Drawer>
                        <DrawerTrigger>
                            <MenuIcon className="size-6 text-gray-500" aria-hidden="true" />
                        </DrawerTrigger>
                        <DrawerContent>
                            <DrawerHeader>
                                <DrawerClose asChild className="absolute right-4 top-4">
                                    <Button variant="ghost">
                                        <span className="sr-only">Close menu</span>
                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                    </Button>
                                </DrawerClose>
                                <DrawerTitle>Menu</DrawerTitle>
                            </DrawerHeader>
                            <div className="grid grid-cols-1 gap-3 pb-3">
                                <div className="grid grid-cols-1 gap-2 px-4">
                                    {navigation.map((item) => (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            className="hover:text-primary dark:hover:text-primary relative flex items-center gap-2 py-1 text-base font-medium text-gray-500"
                                        >
                                            {item.icon && (
                                                <item.icon className="size-5 text-gray-500 group-hover:text-gray-600" />
                                            )}
                                            {item.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </DrawerContent>
                    </Drawer>
                </div>
                <div className="hidden items-center lg:flex lg:gap-x-6">
                    <Navigation />
                </div>
            </nav>
        </header>
    );
}
