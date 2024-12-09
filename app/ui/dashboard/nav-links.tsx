/** @format */

"use client";

import { UserGroupIcon, HomeIcon, DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";
import styled from "styled-components";
import Link from "next/link";
import React from "react";
import clsx from "clsx";
import { useRouter } from "next/navigation";

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
    { name: "Home", href: "/dashboard", icon: HomeIcon },
    {
        name: "Invoices",
        href: "/dashboard/invoices",
        icon: DocumentDuplicateIcon,
    },
    { name: "Customers", href: "/dashboard/customers", icon: UserGroupIcon },
    { name: "About", href: "/about", icon: UserGroupIcon },
];

// This creates a custom component that wraps an <a> tag
const RedLink = styled.a`
    color: red;
`;

// Define the props type for MyButton
type MyButtonProps = {
    onClick?: React.MouseEventHandler<HTMLAnchorElement>;
    href?: string;
    className?: string;
} & PropsWithChildren;

// Use React.ForwardRefRenderFunction to properly type the forwarded ref
const MyButton: React.ForwardRefRenderFunction<HTMLAnchorElement, MyButtonProps> = (
    { onClick, href, children, className },
    ref
) => {
    return (
        <>
            1
            <a href={href} onClick={onClick} ref={ref} className={className}>
                {children}
            </a>
        </>
    );
};

// Use React.forwardRef to wrap the component
const ForwardedMyButton = React.forwardRef(MyButton);

export default function NavLinks() {
    // 使用 usePathname 來取得當前所在 path，但使用 usePathname 的元件必須是 client component，因此必須在元件程式中第一行加上 "use client" 來宣告這個元件事 client component
    const pathname = usePathname();
    const { push } = useRouter();

    const handleClick = () => {
        // window.history.replaceState({ name: "yang" }, "", `/dashboard/customers`);
        push("/dashboard/customers");
    };

    return (
        <>
            {links.map((link) => {
                const LinkIcon = link.icon;
                return (
                    <div key={link.name}>
                        {/* Default */}
                        <Link
                            href={link.href}
                            className={clsx(
                                "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
                                {
                                    "bg-sky-100 text-blue-600": pathname === link.href,
                                }
                            )}
                            scroll={true}>
                            <LinkIcon className="w-6" />
                            <p className="hidden md:block">{link.name}</p>
                        </Link>

                        {/*   
                            Style component 必須加入 passHref & legacyBehavior 
                            但 legacyBehavior 並不能將 props 傳給 style component，因 style component 沒有添加 forwardRef  
                        */}
                        {/* <Link
                            key={link.name}
                            href={link.href}
                            passHref
                            legacyBehavior
                            className={clsx(
                                "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
                            )}
                            onClick={() => {
                                console.log("hello");
                            }}>
                            <RedLink>{link.name}</RedLink>
                        </Link> */}

                        {/* With function component */}
                        {/* <Link href={link.href} passHref legacyBehavior>
                            <ForwardedMyButton
                                onClick={() => {
                                    console.log("hello");
                                }}>
                                {link.name}
                            </ForwardedMyButton>
                        </Link> */}
                    </div>
                );
            })}
            <button onClick={() => handleClick()}>Custom with window pushState</button>
        </>
    );
}
