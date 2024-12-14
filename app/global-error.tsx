/** @format */

"use client"; // Error boundaries must be Client Components

// 用來捕捉 root layout 發生的錯誤，但是 global-error 僅會在 production 的時候顯示
export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        // global-error must include html and body tags
        <html>
            <body>
                <h2>Something went wrong!</h2>
                <button onClick={() => reset()}>Try again</button>
            </body>
        </html>
    );
}
