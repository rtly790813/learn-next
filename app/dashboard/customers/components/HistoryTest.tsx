/** @format */
"use client";

export default function HistoryTest() {
    const historyState = history.state;

    console.log("historyState", historyState);

    return <div className="w-full">{JSON.stringify(historyState)}</div>;
}
