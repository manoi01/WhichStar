import type { Metadata } from 'next';
import { Noto_Sans_Thai, Noto_Serif_Thai } from 'next/font/google';
import './globals.css';

const notoSansThai = Noto_Sans_Thai({
  variable: '--font-noto-sans-thai',
  subsets: ['thai'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const notoSerifThai = Noto_Serif_Thai({
  variable: '--font-noto-serif-thai',
  subsets: ['thai'],
  weight: ['400', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'WhichStar - คุณคือดาวดวงไหน?',
  description: 'ค้นพบจุดแข็งที่ซ่อนอยู่ในตัวคุณผ่านการเดินทางในจักรวาล',
  openGraph: {
    title: 'WhichStar - คุณคือดาวดวงไหน?',
    description: 'ค้นพบดาวที่ซ่อนอยู่ในตัวคุณ',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="th"
      className={`${notoSansThai.variable} ${notoSerifThai.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
