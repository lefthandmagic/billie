import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { PostHogProvider } from '@/components/PostHogProvider';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Billie — Beautiful superbills for therapists',
  description: 'Generate professional superbills in 60 seconds. No EHR required. Free, private, and everything stays in your browser.',
  keywords: 'superbill generator, therapist superbill, out-of-network billing, LCSW superbill, LPC superbill',
  openGraph: {
    title: 'Billie — Beautiful superbills for therapists',
    description: 'Generate professional superbills in 60 seconds. No EHR required.',
    url: 'https://billie.fyi',
    siteName: 'Billie',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen antialiased bg-white text-slate-900 font-sans">
        <PostHogProvider>
          {children}
        </PostHogProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
