/** @format */

import React, { PropsWithChildren } from "react";

const Page = ({ children }: PropsWithChildren) => {
    return (
        <div>
            <div>
                Dashboard
                <div>{children}</div>
            </div>
        </div>
    );
};

export default Page;
