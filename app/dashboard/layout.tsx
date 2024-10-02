/** @format */

import React from "react";

const Layout = ({ children }: PropsWithChildren) => {
    return (
        <div>
            <p>Dashbard Layout</p>
            {children}
        </div>
    );
};

export default Layout;
