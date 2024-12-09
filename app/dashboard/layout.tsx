/** @format */
// export const experimental_ppr = true;
// "use client";

import React, { PropsWithChildren } from "react";
import SideNav from "@/app/ui/dashboard/sidenav";
import AcmeLogo from "../ui/logo/acme-logo";
// import { useSearchParams } from "next/navigation";

const Layout = ({ children }: PropsWithChildren) => {
    // layout 無法在 prop 中取得 searchParams，因此如果希望可以拿到的話，就必須使用 useSearchParams 來取得
    // const searchParams = useSearchParams();
    // for (const value of searchParams.values()) {
    //     console.log("layout value for of:", value);
    // }

    console.log("layout render");

    return (
        <>
            <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52">
                <AcmeLogo />
            </div>
            <div className="flex h-screen flex-col md:flex-row">
                <div className="w-full flex-none md:w-64">
                    <SideNav />
                </div>
                <div className="flex-grow p-6 md:overflow-y-auto md:p-12 border-lime-900 border scroll-mt-10">
                    {children}
                </div>
            </div>
        </>
    );
};

export default Layout;
