/** @format */
// export const dynamic = "force-dynamic";

import React from "react";
import axios from "axios";
import Search from "@/app/ui/search";
import HistoryTest from "./components/HistoryTest";

const CustomerPage = async ({
    params,
    searchParams,
}: {
    params: Promise<{ slug: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
    const getParams = await params;
    const getSearchParams = await searchParams;
    const { data } = await axios.get("https://jsonplaceholder.typicode.com/todos");

    console.log("server component params", getParams);
    console.log("server component searchParams", getSearchParams);

    return (
        <div>
            {/* Test client component use useSearchParams in the dynamic render */}
            <HistoryTest />
            <Search placeholder="Search invoices..." />
            <h1 className="text-xl font-medium">CustomerPage</h1>
            {data.map((item: { id: string; title: string }) => {
                return (
                    <h1 key={item.id} className="text-sm">
                        {item.id}. {item.title}
                    </h1>
                );
            })}
        </div>
    );
};

export default CustomerPage;
