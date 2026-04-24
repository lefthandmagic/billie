'use client';
import { useEffect } from 'react';
import posthog from 'posthog-js';

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    const host = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? 'https://eu.i.posthog.com';
    if (!key) return;
    posthog.init(key, {
      api_host: host,
      capture_pageview: true,
      capture_pageleave: true,
      persistence: 'localStorage',
    });
    // Ensure a consistent global reference for downstream event helpers
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (globalThis as any).posthog = posthog;
  }, []);

  return <>{children}</>;
}
