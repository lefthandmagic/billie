'use client';

import posthog from 'posthog-js';

type EventProperties = Record<string, string | number | boolean>;

export function trackEvent(event: string, properties?: EventProperties) {
  if (typeof window === 'undefined') return;
  try {
    posthog.capture(event, properties);
  } catch {}
}

export function identifyUser(email: string) {
  if (typeof window === 'undefined') return;
  try {
    posthog.identify(email, { email });
  } catch {}
}
