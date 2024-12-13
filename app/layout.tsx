/** @format */

// 載入全域 scss
import "@/app/ui/global.scss";
// import { headers } from "next/headers";

//
import { inter } from "@/app/ui/fonts";
// import styles from "@/app/ui/home.module.css";
// import Link from "next/link";

// import AcmeLogo from "./ui/acme-logo";
import NavLinks from "./ui/dashboard/nav-links";
import Script from "next/script";

if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
    require("../mocks");
}

/*
    Next 中有一些預設的元件類型，其中一個就是 Layout
    Layout
        - 只要檔案名稱是 layout.tsx，他的主要目的就會是 share 該 layout 給相同層級路由以下的頁面使用
        - 再換頁的時候，相同的部分就不會再重新 render，且可以保留狀態
        - layout 必須要接收一個 children 的 props，會在渲染期間將 page 帶入

    Root Layout (required) https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#root-layout-required
        - 整個專案中一定會有一個 Root layout，主要放置 html & body tag
        - 與 Root Layout `相同層級` page.tsx 網址就會是 http://localhost:3000/
 */
export default async function RootLayout({ children }: { children: React.ReactNode }) {
    // const nonce = (await headers()).get("x-nonce") || "";
    // console.log(nonce);

    return (
        <html lang="en">
            {/* <head>
                <Script
                    src="https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js"
                    // nonce="nonce"
                />
            </head> */}
            <body className={`${inter.className} antialiased`}>
                <main>{children}</main>
            </body>
        </html>
    );
}
