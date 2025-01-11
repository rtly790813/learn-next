/** @format */
"use client";

import Image from "next/image";
import AcmeLogo from "@/app/ui/logo/acme-logo";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import styles from "@/app/ui/home.module.css";
import styles2 from "@/app/ui/style.module.css";
import profilePic from "../public/hero-desktop.png";
// import LiffComponent from "./components/LiffComponent";

const loaderImage = ({
    src,
    width,
    quality = 75,
}: {
    src: string;
    width: number;
    quality?: number;
}) => {
    return `https://www.astralweb.com.tw/wp-content/uploads/2018/12/${src}?w=${width}&q=${quality}`;
};
// https://www.astralweb.com.tw/wp-content/uploads/2018/12/Cloudinary-Introduction-4-768x362.png
export default function Page() {
    // throw new Error("root page error");
    return (
        <>
            <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52">
                <AcmeLogo />
            </div>
            {/* <LiffComponent /> */}
            <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
                <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
                    {/* 測試不同 css module 編譯後的 class name 會不一樣，都是 {檔案名稱開頭}_{className}_{random} */}
                    <div className={styles.shape}></div>
                    <div className={styles2.shape}></div>
                    <p className={`text-xl text-gray-800 md:text-3xl md:leading-normal`}>
                        <strong>Welcome to Acme.</strong> This is the example for the
                        <a href="https://nextjs.org/learn/" className="text-blue-500">
                            Next.js Learn Course
                        </a>
                        <a href="https://nextjs.org/learn/" className=" font-sans text-blue-500">
                            Next.js Learn Course
                        </a>
                        , brought to you by Vercel.
                    </p>
                    <Link
                        href="/login"
                        className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base">
                        <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
                    </Link>
                </div>
                <div className="items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12 relative">
                    {/* width、height 實際上是 img 本身提供的，主要目的就是為了在圖片尚未載入完之前在網頁上預留空間減少 CLS */}
                    <img
                        src="/hero-desktop.png"
                        width="640"
                        height="360"
                        alt="Puppy with balloons"></img>
                    {/* 
                        http://localhost:3000/hero-desktop.png 原始圖檔，使用 import 載入圖檔 
                        自動提供 width, height, 並且可以為 placeholder 自動建立 blurDataURL
                    */}
                    <Image
                        src={profilePic}
                        alt="Screenshots of the dashboard project showing desktop version"
                        style={{ border: "1px solid red" }}
                        placeholder="blur"
                        priority
                    />

                    {/* 
                        http://localhost:3000/hero-desktop.png 原始圖檔，直接在 src 中添加
                        想要使用 placeholder 就必須手動建立 blurDataURL
                        
                        如果設定的 width 跟實際 render 落差過大，例如故有尺寸設定太小，渲染尺寸過大會造成解析度過差問題
                    */}
                    {/* <Image
                        src="/hero-desktop.png"
                        width={200}
                        height={200}
                        alt="Screenshots of the dashboard project showing desktop version"
                        className="w-[1000px]"
                        style={{ border: "1px solid red" }}
                        // fill={false}
                        placeholder="blur" // will display error
                    /> */}
                    {/*
                        add mobile image here
                        http://localhost:3000/hero-mobile.png 原始圖檔  
                    */}
                    {/* <Image
                        src="/hero-mobile.png"
                        width={375}
                        height={812}
                        className="block md:hidden"
                        alt="Screenshots of the dashboard project showing mobile version"
                    /> */}

                    {/*  Load remote image with Optimizing - 想要透過 image 進行優化的話就必須在 src 撰寫絕對路徑，且搭配 next.config.js 中的 remotePatterns 來保護應用程式的安全及允許 */}
                    {/* <Image
                        src="https://www.astralweb.com.tw/wp-content/uploads/2018/12/Cloudinary-Introduction-4-768x362.png"
                        width={500}
                        height={200}
                        alt="Screenshots of the dashboard project showing desktop version"
                    /> */}

                    {/* Create a loader image here - need use client */}
                    <Image
                        loader={loaderImage}
                        src="Cloudinary-Introduction-4-768x362.png"
                        // width={500}
                        // height={200}
                        fill
                        className="hidden md:block object-contain"
                        alt="Screenshots of the dashboard project showing desktop version"
                    />
                </div>
            </div>
            {/* Fill 屬性測試 - 使用 fill 一定要在父層添加 relative，而 image 會自動的依據父層的寬高自動填滿 */}
            <div className="relative h-7">
                <Image
                    loader={loaderImage}
                    src="Cloudinary-Introduction-4-768x362.png"
                    fill
                    className="hidden md:block relative object-cover"
                    alt="Screenshots of the dashboard project showing desktop version"
                />
            </div>
            {/* Preload test */}
            <Link href="/about">About</Link>
        </>
    );
}
