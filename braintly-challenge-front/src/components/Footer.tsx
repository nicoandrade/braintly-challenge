import Link from "next/link";

import { companyName } from "@/lib/config";

export default function Footer() {
    return (
        <footer aria-labelledby="footer-heading" className="mt-6">
            <h2 id="footer-heading" className="sr-only">
                Footer
            </h2>
            <div className="mx-auto flex max-w-xl flex-col gap-4 px-4 sm:px-6 md:px-8 lg:gap-8">
                <div className="flex items-center justify-between py-3">
                    <div className="flex items-center justify-center space-x-6 text-sm text-gray-400">
                        <p>
                            © {companyName} by{" "}
                            <Link
                                href="https://nicoandrade.com"
                                className="hover:text-gray-800"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Nico Andrade
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
