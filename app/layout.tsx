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
  title: 'Aasim | Digital Experiences',
  description: 'Crafting Digital Experiences from Karachi',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="bg-slate-950 text-slate-50 font-sans antialiased overflow-x-hidden selection:bg-cyan-500/30" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
