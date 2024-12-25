// next auth setting file
// https://authjs.dev/getting-started/installation#configure
import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import type { User } from '@/app/lib/definitions';
import bcrypt from 'bcrypt';

async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  // provider : next auth 中的 provider 可以放置不同的登入方式選項，例如 google, github, 雙重認證 ...etc
  // Credentials : next auth 提供的 credntials 是允許使用自定義的認證方式，例如一般的帳號密碼登入，但官方建議可以使用安全性較高的 OAuth, Email magic links ...etc 其他登入方式 (為何建議的原因 https://authjs.dev/getting-started/authentication)
  providers: [Credentials({
    // 
    async authorize(credentials, request) {
      // 在這邊一樣可以使用 zod 來進行驗證
      const parsedCredentials = z
        .object({ email: z.string().email(), password: z.string().min(6) })
        .safeParse(credentials);

 
        if (parsedCredentials.success) {
          // 驗證成功之後，透過 getUser 確認資料庫中是否有該使用者，沒有就 return null
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) return null;

          // 確認有使用者在進一步比對輸入的密馬是否與資料庫相同
          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) return user;
        }
 
        // 上面步驟如果沒有 return user 就會是驗證失敗
        console.log('Invalid credentials');
        return null;
    },
  })],
}); 