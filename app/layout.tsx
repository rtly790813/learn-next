/** @format */

import Link from "next/link";

import "@/app/ui/global.css";
import { inter } from "@/app/ui/fonts";
import styles from "@/app/ui/home.module.css";

import AcmeLogo from "./ui/acme-logo";
import NavLinks from "./ui/dashboard/nav-links";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={`${inter.variable}  antialiased`}>
                <main className="flex min-h-screen flex-col p-6">
                    <div
                        className={` flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52`}>
                        <AcmeLogo />
                        <div className={styles.shape} />
                        <NavLinks />
                        <ul>
                            {/* <li>
                                <a href="/">Home</a>
                            </li>
                            <li>
                                <a href="/about">About</a>
                            </li> */}
                            {/* <li>
                                <Link href="/">Home</Link>
                            </li> */}
                            {/* <li>
                                <Link href="/about">About</Link>
                            </li> */}
                        </ul>
                    </div>
                    <div className="mt-4 flex grow flex-col gap-4 md:flex-row">{children}</div>
                </main>
            </body>
        </html>
    );
}
