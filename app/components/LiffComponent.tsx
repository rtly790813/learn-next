/** @format */

"use client";

import { useEffect, useState } from "react";
import liff from "@line/liff";

const LiffComponent = () => {
    const [isLoggin, setIsLoggin] = useState(false);
    const [loginStr, setLoginStr] = useState("000");

    useEffect(() => {
        // 初始化 LIFF
        liff.init({ liffId: "2004572750-pLKB2nPg", withLoginOnExternalBrowser: true })
            .then(() => {
                if (!liff.isLoggedIn()) {
                    setLoginStr("unlogin");

                    const queryString = window.location.search;
                    if (queryString) {
                        localStorage.setItem("queryString", queryString);
                    }
                }
                if (liff.isLoggedIn()) {
                    console.log();
                    setLoginStr(
                        `querystring:${localStorage.getItem("queryString")}, state: ${
                            liff.state
                        }, referrer: ${liff.referrer}`
                    );
                    setIsLoggin(true);
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
            {isLoggin ? "LIFF 已登入" : "未登入"}
            {loginStr}
            {isLoggin && <button onClick={handleClick}>分享</button>}
        </div>
    );
};

export default LiffComponent;
