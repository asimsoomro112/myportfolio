import type {Metadata} from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-heading',
});

export const metadata: Metadata = {
  title: 'Muhammad Asim | Software Engineer',
  description: 'Software Engineer building e-commerce storefronts, dashboards, AI tools, and business web apps from Karachi.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="bg-[#F6F8FB] text-slate-950 font-sans antialiased overflow-x-hidden selection:bg-cyan-200" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
