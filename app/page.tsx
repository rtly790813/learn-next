/** @format */
import Image from "next/image";
import AcmeLogo from "@/app/ui/logo/acme-logo";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import styles from "@/app/ui/home.module.css";
import styles2 from "@/app/ui/style.module.css";

const loaderImage = ({ src }: { src: string }) => {
    return `https://www.astralweb.com.tw/wp-content/uploads/2018/12/${src}`;
};
// https://www.astralweb.com.tw/wp-content/uploads/2018/12/Cloudinary-Introduction-4-768x362.png
export default function Page() {
    return (
        <>
            <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52">
                <AcmeLogo />
            </div>
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
                <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
                    <Image
                        src="/hero-desktop.png"
                        width={500}
                        height={100}
                        alt="Screenshots of the dashboard project showing desktop version"
                        className=" w-[1000px]"
                        style={{ border: "1px solid red" }}
                        fill={false}
                    />
                    {/* add mobile image here */}
                    <Image
                        src="/hero-mobile.png"
                        width={375}
                        height={812}
                        className="block md:hidden"
                        alt="Screenshots of the dashboard project showing mobile version"
                    />
                    <Link href="/about">About</Link>
                    {/* Create a loader image here */}
                    {/* <Image
                        loader={loaderImage}
                        src="Cloudinary-Introduction-4-768x362.png"
                        width={1000}
                        height={760}
                        className="hidden md:block"
                        alt="Screenshots of the dashboard project showing desktop version"
                    /> */}
                </div>
            </div>
        </>
    );
}
