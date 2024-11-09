/** @format */

import React, { PropsWithChildren } from "react";
import SideNav from "@/app/ui/dashboard/sidenav";
import AcmeLogo from "../ui/logo/acme-logo";

const Layout = ({ children }: PropsWithChildren) => {
    return (
        <>
            <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52">
                <AcmeLogo />
            </div>
            <div className="flex h-screen flex-col md:flex-row">
                <div className="w-full flex-none md:w-64">
                    <div className="h-[1000px]"></div>
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
