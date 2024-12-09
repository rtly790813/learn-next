/** @format */
import React, { Suspense } from "react";

import CardWrapper, { Card } from "@/app/ui/dashboard/cards";
import RevenueChart from "@/app/ui/dashboard/revenue-chart";
import LatestInvoices from "@/app/ui/dashboard/latest-invoices";
// import { fetchCardData } from "@/app/lib/data";
// import { fetchRevenue } from "@/app/lib/data";
import { CardSkeleton, LatestInvoicesSkeleton, RevenueChartSkeleton } from "@/app/ui/skeletons";
/**
 * 目前這樣的撰寫方式仍有一些問題
 * 1. 會導致 request waterfall，請求會互相的阻塞
 * 2. 且 Next 為了提高效能採用 preredners route，也稱為 static rendering，這時候如果資料有改變，前端的畫面並不會跟著有反應
 */
export default async function Page() {
    // const [
    //     latestInvoices,
    //     { numberOfInvoices, numberOfCustomers, totalPaidInvoices, totalPendingInvoices },
    // ] = await Promise.all([fetchLatestInvoices(), fetchCardData()]);
    // const revenue = await fetchRevenue();
    // const latestInvoices = await fetchLatestInvoices();
    // const { numberOfInvoices, numberOfCustomers, totalPaidInvoices, totalPendingInvoices } =
    //     await fetchCardData();

    return (
        <main>
            <h1 className={` mb-4 text-xl md:text-2xl`}>Dashboard</h1>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <Suspense fallback={<CardSkeleton />}>
                    <CardWrapper />
                </Suspense>
                {/* <Card title="Collected" value={totalPaidInvoices} type="collected" />
                <Card title="Pending" value={totalPendingInvoices} type="pending" />
                <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
                <Card title="Total Customers" value={numberOfCustomers} type="customers" /> */}
            </div>

            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
                {/* 加入 React 本身的 Suspense 來細膩度的控制載入順序，讓畫面可以局部呈現 */}
                <Suspense fallback={<RevenueChartSkeleton />}>
                    <RevenueChart />
                </Suspense>
                <Suspense fallback={<LatestInvoicesSkeleton />}>
                    <LatestInvoices />
                </Suspense>
            </div>
        </main>
    );
}
