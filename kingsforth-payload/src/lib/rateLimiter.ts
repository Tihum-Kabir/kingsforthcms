const attempts = new Map<string, { count: number; resetAt: number }>();

/** Returns true if the key has exceeded maxAttempts within windowMs. */
export function isRateLimited(key: string, maxAttempts = 10, windowMs = 60_000): boolean {
    const now = Date.now();
    const entry = attempts.get(key);

    if (!entry || now > entry.resetAt) {
        attempts.set(key, { count: 1, resetAt: now + windowMs });
        return false;
    }

    entry.count += 1;
    if (entry.count > maxAttempts) return true;

    return false;
}

export function getRateLimitKey(prefix: string, identifier: string): string {
    return `${prefix}:${identifier}`;
}
