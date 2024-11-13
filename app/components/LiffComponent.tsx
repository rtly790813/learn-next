/** @format */

"use client";

import { useEffect } from "react";
import liff from "@line/liff";

const LiffComponent = () => {
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
            LIFF 已載入
            <button onClick={handleClick}>分享</button>
        </div>
    );
};

export default LiffComponent;
