import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { PostHogProvider } from '@/components/PostHogProvider';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  metadataBase: new URL('https://billie.fyi'),
  title: {
    default: 'Billie — Free Superbill Generator for Therapists',
    template: '%s | Billie',
  },
  description: 'Generate professional superbills in 60 seconds. Free superbill generator for out-of-network therapists — LCSWs, LMFTs, LPCs, Psychologists. No EHR required. Nothing uploaded.',
  keywords: [
    'superbill generator',
    'free superbill generator',
    'therapist superbill',
    'out-of-network billing',
    'LCSW superbill',
    'LMFT superbill',
    'LPC superbill',
    'psychologist superbill',
    'OON superbill',
    'superbill template therapy',
    'how to create a superbill',
    'mental health superbill',
    'private practice superbill',
  ],
  authors: [{ name: 'Billie' }],
  creator: 'Billie',
  alternates: {
    canonical: 'https://billie.fyi',
  },
  openGraph: {
    title: 'Billie — Free Superbill Generator for Therapists',
    description: 'Generate a professional superbill in 60 seconds. Free, private, no account needed. Built for out-of-network therapists.',
    url: 'https://billie.fyi',
    siteName: 'Billie',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Billie — Free Superbill Generator for Therapists',
    description: 'Generate a professional superbill in 60 seconds. Free, private, no account needed.',
    creator: '@billiefyi',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
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
