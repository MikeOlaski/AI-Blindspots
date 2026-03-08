import type {Metadata} from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css'; // Global styles

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
});

export const metadata: Metadata = {
  title: 'Decoder.Rehabit AI',
  description: 'An AI Blindspot Decoder for determining objectively what your beliefs are telling you about AI in your life, the world and your business.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} dark`}>
      <body suppressHydrationWarning className="bg-zinc-950 text-zinc-50 font-sans antialiased min-h-screen selection:bg-indigo-500/30">
        {children}
      </body>
    </html>
  );
}
