'use server'

// 在這個檔案中標記了 use server 表示這個 file 是 server action，接著就可以在 server 或 client component 中使用檔案中的 function

// 課程中雖然是將 action 的檔案額外拉出來，不過在 server component 中也可以直接在 async function 中第一行添加 'use server'，不需要額外拉檔案

 
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

/** Schema */
const FormSchema = z.object({
  id: z.string(),
  customerId: z.union([z.string({required_error: '請選擇'}), z.null().refine(() => false, { message: "請選擇"})]),
  // coerce => 可以用輸入的資料強制轉換為期望的類型並進行驗證，例如字串轉為數值
  amount: z.coerce.number({required_error: '請輸入金額'}),
  status: z.enum(['pending', 'paid']),
  date: z.string(),
});
 
/** Create */
const CreateInvoice = FormSchema.omit({ id: true, date: true });  // omit 可以忽略某些值不被驗證
export async function createInvoice(formData: FormData) {
    // parse() 當驗證出錯時會直接 throw error，因此頁面中如果沒有寫 error.tsx 或是 Error Boundary 的話，就會直接讓應用程式毀滅
    const { customerId, amount, status } = CreateInvoice.parse({
      customerId: formData.get('customerId'),
      amount: formData.get('amount'),
      status: formData.get('status'),
    });

    // 當欄位很多時可以改寫為 
    // const rowFormDaat2 = Object.fromEntries(formData.entries())

    const amountInCents = amount * 100;
    const date = new Date().toISOString().split('T')[0];
 
    // 使用 try catch 來捕捉 SQL 失敗的 Error，並 return 相對應的訊息
    try {
      await sql`
          INSERT INTO invoices (customer_id, amount, status, date)
          VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
      `;

      // 
      revalidatePath('/dashboard/invoices');
      redirect('/dashboard/invoices');
    } catch (error) {
      return {
        message: "Database Error: Failed to Create Invoice"
      }
    }


  }

// 測試寫 validate with useFormState
// export async function createInvoice(prevState: unknown, formData: FormData) {
//     const validatedFields = CreateInvoice.safeParse({
//       customerId: formData.get('customerId'),
//       amount: formData.get('amount'),
//       status: formData.get('status'),
//     });

//     if(!validatedFields.success) {
//         return {
//             errors: validatedFields.error.flatten().fieldErrors
//         }
//     }

//     const { amount, customerId, status } = validatedFields.data
//     const amountInCents = amount * 100;
//     const date = new Date().toISOString().split('T')[0];
 
//     await sql`
//         INSERT INTO invoices (customer_id, amount, status, date)
//         VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
//     `;

//     revalidatePath('/dashboard/invoices');
//     redirect('/dashboard/invoices');
//   }

/** UpdateInvoice */
const UpdateInvoice = FormSchema.omit({ id: true, date: true });
export async function updateInvoice(id: string, formData: FormData) {
    const { customerId, amount, status } = UpdateInvoice.parse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    });

    const amountInCents = amount * 100;

    try {
      await sql`
        UPDATE invoices
        SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
        WHERE id = ${id}
      `;

      revalidatePath('/dashboard/invoices');
      redirect('/dashboard/invoices');
    } catch( error) {
      return {
            message: "Database Error: Failed to Update Invoice"
      }
    }

}

/** Delete */
export async function deleteInvoice(id: string) {
  // 測試 throw error 顯示的畫面
  // throw new Error('Failed to Delete Invoice');
  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath('/dashboard/invoices');
    return { message: 'Deleted Invoice.' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Invoice.' };
  }
}