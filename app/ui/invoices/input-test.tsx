/** @format */

"use client";

import React from "react";
import { InvoiceForm } from "@/app/lib/definitions";

const InputTest = ({ invoice }: { invoice: InvoiceForm }) => {
    return (
        <input
            onChange={(e) => {
                console.log("input Event", e.currentTarget.form?.requestSubmit);
            }}
            id="amount"
            name="amount"
            type="number"
            step="0.01"
            defaultValue={invoice.amount}
            placeholder="Enter USD amount"
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
        />
    );
};

export default InputTest;
