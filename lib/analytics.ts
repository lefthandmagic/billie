'use client';

type EventProperties = Record<string, string | number | boolean>;

export function trackEvent(event: string, properties?: EventProperties) {
  if (typeof window === 'undefined') return;
  try {
    // @ts-expect-error posthog loaded via provider
    if (window.posthog) window.posthog.capture(event, properties);
  } catch {}
}

export function identifyUser(email: string) {
  if (typeof window === 'undefined') return;
  try {
    // @ts-expect-error posthog loaded via provider
    if (window.posthog) {
      window.posthog.identify(email, { email });
    }
  } catch {}
}
