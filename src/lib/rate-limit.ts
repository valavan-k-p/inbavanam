/**
 * Small fixed-window limiter for public forms. State lives in the server
 * instance's memory, so on serverless hosting each instance counts
 * separately: it slows casual abuse but is not a hard guarantee. For
 * stronger limits, back this with a shared store (see docs/ARCHITECTURE.md).
 */
const hits = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(
  key: string,
  limit = 5,
  windowMs = 10 * 60 * 1000,
  now = Date.now(),
): boolean {
  const entry = hits.get(key);
  if (!entry || entry.resetAt <= now) {
    hits.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (entry.count >= limit) return false;
  entry.count += 1;
  return true;
}

export function resetRateLimit() {
  hits.clear();
}
