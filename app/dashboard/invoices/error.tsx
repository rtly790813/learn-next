/** @format */

"use client";

import { useEffect } from "react";

// Error.tsx 可以幫助開發者找到潛在的問題，並且讓應用程式不會因 Error 整個崩壞，還可以持續的操作
export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Optionally log the error to an error reporting service
        console.error("error form Error page", error.message);
        console.error("error digest", error.digest);
    }, [error]);

    return (
        <main className="flex h-full flex-col items-center justify-center">
            <h2 className="text-center">Something went wrong!</h2>
            <button
                className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
                onClick={
                    // Attempt to recover by trying to re-render the invoices route
                    () => reset()
                }>
                Try again
            </button>
        </main>
    );
}
