/**
 * Utility to generate clean, public-accessible URLs for sharing and referral.
 *
 * CRITICAL FIX FOR 403 FORBIDDEN:
 * In Google AI Studio, the development URL has the format:
 * `https://ais-dev-<hash>-<project>.run.app`
 * This dev URL is private and returns HTTP 403 Forbidden to any external visitor!
 * The publicly accessible preview URL is:
 * `https://ais-pre-<hash>-<project>.run.app`
 *
 * This utility ensures all share buttons, clipboard copies, QR codes, and invites
 * ALWAYS produce the public preview link so friends and participants never encounter a 403 error.
 */

export const PUBLIC_APP_FALLBACK_URL = 'https://ais-pre-otqufkdjgbek4673qk7rgy-662332277898.europe-west2.run.app';

/**
 * Resolves the public, unauthenticated base URL for the app.
 */
export function getPublicBaseUrl(configuredUrl?: string): string {
  if (typeof window === 'undefined') {
    return configuredUrl || PUBLIC_APP_FALLBACK_URL;
  }

  const hostname = window.location.hostname;
  const protocol = window.location.protocol;
  const port = window.location.port ? `:${window.location.port}` : '';

  // 1. If running on internal AI Studio dev domain, convert ais-dev- to ais-pre-
  if (hostname.includes('ais-dev-')) {
    const publicHostname = hostname.replace('ais-dev-', 'ais-pre-');
    return `${protocol}//${publicHostname}${port}`;
  }

  // 2. If running on localhost or empty origin, use the configured public preview URL
  if (hostname === 'localhost' || hostname === '127.0.0.1' || !hostname) {
    return configuredUrl || PUBLIC_APP_FALLBACK_URL;
  }

  // 3. If running on ais-pre or custom public domain, use the actual origin
  return window.location.origin;
}

/**
 * Checks if the current browser window is viewing the private development container.
 */
export function isInternalDevUrl(): boolean {
  if (typeof window === 'undefined') return false;
  return window.location.hostname.includes('ais-dev-');
}

/**
 * Builds a shareable link with optional parameters (e.g. ?ref=HP-1234&campaign=humanitarian-job-creation)
 */
export function buildShareableUrl(params: Record<string, string | undefined> = {}, configuredUrl?: string): string {
  const baseUrl = getPublicBaseUrl(configuredUrl);
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, val]) => {
    if (val !== undefined && val !== null && val !== '') {
      searchParams.set(key, val);
    }
  });

  const query = searchParams.toString();
  return query ? `${baseUrl}?${query}` : baseUrl;
}
