/** @format */
"use client";
import React from "react";

// 用來作為捕捉 root layout 以內發生的全域錯誤，包含 http://{domain}/ 這個頁面
const error = () => {
    return <div>Not root error</div>;
};

export default error;
