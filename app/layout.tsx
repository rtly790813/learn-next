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
            <body className={`${inter.className} antialiased`}>{children}</body>
        </html>
    );
}
