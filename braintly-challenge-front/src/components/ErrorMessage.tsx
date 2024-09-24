import { XMarkIcon } from "@/components/Icons";

export default function ErrorMessage({ children }: { children: React.ReactNode }) {
    return (
        <div className="rounded-md bg-red-50 p-4">
            <div className="flex items-center gap-3">
                <div className="flex-shrink-0">
                    <XMarkIcon aria-hidden="true" className="h-5 w-5 text-red-400" />
                </div>

                <div className="text-sm text-red-700">{children}</div>
            </div>
        </div>
    );
}
