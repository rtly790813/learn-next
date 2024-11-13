/** @format */

"use client";

import { useEffect } from "react";
import liff from "@line/liff";

const LiffComponent = () => {
    useEffect(() => {
        // 初始化 LIFF
        liff.init({ liffId: "2004572750-pLKB2nPg" })
            .then(() => {
                const queryString = window.location.search;
                if (queryString) {
                    sessionStorage.setItem("queryString", queryString);
                }
            })
            .then(() => {
                if (!liff.isLoggedIn()) {
                    liff.login();
                    return;
                }

                const savedQueryString = sessionStorage.getItem("queryString");
                if (savedQueryString) {
                    window.history.replaceState(
                        null,
                        "",
                        window.location.pathname + savedQueryString
                    );
                    sessionStorage.removeItem("queryString"); // 清理儲存
                }
            })
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
            <a onClick={handleClick}>分享</a>
        </div>
    );
};

export default LiffComponent;
