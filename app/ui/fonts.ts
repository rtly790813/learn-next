import { Inter, Noto_Sans_TC } from 'next/font/google'
//  https://nextjs.org/docs/app/building-your-application/optimizing/fonts#with-tailwind-css
export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})
 
export const roboto_mono = Noto_Sans_TC({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
})