/** @format */

"use client";

import { useEffect, useState } from "react";
import liff from "@line/liff";

const LiffComponent = () => {
    const [isLoggin, setIsLoggin] = useState(false);
    useEffect(() => {
        // 初始化 LIFF
        liff.init({ liffId: "2004572750-pLKB2nPg" })
            .then(() => {
                console.log(window.location.href);
            })
            .then(() => {
                if (!liff.isLoggedIn()) {
                    liff.login({ redirectUri: window.location.href });
                }
            })
            .then(() => console.log("Done"))
            .catch((err) => {
                console.error("LIFF 初始化失敗:", err);
            });
    }, []);

    const handleClick = () => {
        liff.shareTargetPicker([
            {
                type: "text",
                text: "你要分享的訊息",
            },
        ]).catch((error) => {
            console.error("分享失敗:", error);
        });
    };

    return (
        <div>
            {isLoggin ? " LIFF 未登入" : "已登入"}
            {isLoggin && <button onClick={handleClick}>分享</button>}
        </div>
    );
};

export default LiffComponent;
