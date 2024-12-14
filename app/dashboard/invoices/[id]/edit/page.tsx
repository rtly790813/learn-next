/** @format */

import Form from "@/app/ui/invoices/edit-form";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import { fetchInvoiceById, fetchCustomers } from "@/app/lib/data";
import { notFound } from "next/navigation";

export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = params.id;
    const [invoice, customers] = await Promise.all([fetchInvoiceById(id), fetchCustomers()]);

    // 由於使用者可能隨意輸入 id 來進入此頁面，就會導致資料顯示錯誤，直接被 error.tsx catch 到，如果希望將這種情境處理為「找不到」時，可以透過 notFound 來顯示沒有改筆資料的錯誤訊息
    if (!invoice) {
        notFound();
    }

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: "Invoices", href: "/dashboard/invoices" },
                    {
                        label: "Edit Invoice",
                        href: `/dashboard/invoices/${id}/edit`,
                        active: true,
                    },
                ]}
            />
            <Form invoice={invoice} customers={customers} />
        </main>
    );
}
