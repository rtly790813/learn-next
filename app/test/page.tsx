/** @format */
"use client";

import { usePathname } from "next/navigation";
import React from "react";

const Page = () => {
    const pathname = usePathname();

    return <div className="h-[2000px]">{pathname} test</div>;
};

export default Page;
