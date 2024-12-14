/** @format */

// 當使用者隨意輸入 URL，且無法匹配到 route segment 時，將會返回 root 的 not-found.tsx，即便子層有放置對應的 not-found.tsx 也是一樣
import Link from "next/link";
import { FaceFrownIcon } from "@heroicons/react/24/outline";

export default function NotFound() {
    return (
        <main className="flex h-full flex-col items-center justify-center gap-2">
            <FaceFrownIcon className="w-10 text-gray-400" />
            <h2 className="text-xl font-semibold">404 Not Found</h2>
            <p>Could not find the requested invoice.</p>
            <Link
                href="/dashboard/invoices"
                className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400">
                Go Back
            </Link>
        </main>
    );
}
