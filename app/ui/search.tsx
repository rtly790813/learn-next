/** @format */

"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function Search({ placeholder }: { placeholder: string }) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace, refresh } = useRouter();

    const handleSearch = useDebouncedCallback((term: string) => {
        // 使用原生的 URLSearchParams 來更新 search params，原因是 next 提供的 searchParams 為 read only 不可執行更新寫入的動作
        // console.log("next get:", searchParams.get("test"));
        // console.log("next getAll:", searchParams.getAll("test"));
        // console.log("next has:", searchParams.has("test"));
        // for (const value of searchParams.values()) {
        //     console.log("next value for of:", value);
        // }
        // for (const key of searchParams.keys()) {
        //     console.log("next keys for of:", key);
        // }
        // searchParams.forEach((value) => console.log("next forEach:", value));

        const params = new URLSearchParams(searchParams);
        // 當使用者確認搜尋之後，頁面要重新設定為 1
        params.set("page", "1");

        if (term) {
            params.set("query", term);
        } else {
            params.delete("query");
        }
        console.log("pathname", pathname);

        replace(`${pathname}?${params.toString()}`);
    }, 300);

    return (
        <>
            <div className="relative flex flex-1 flex-shrink-0">
                <label htmlFor="search" className="sr-only">
                    Search
                </label>
                <input
                    className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                    placeholder={placeholder}
                    onChange={(e) => {
                        handleSearch(e.target.value);
                    }}
                    // 將 searchParams 的值填入作為 initial 畫面的預設值，input 才能跟 url 同步
                    defaultValue={`${searchParams.get("query")}`}
                />
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div>
                <button onClick={() => refresh()}>refresh</button>
            </div>
        </>
    );
}
