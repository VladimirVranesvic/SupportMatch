// Simple in-memory rate limiter
// For production, consider using Redis or Supabase for persistence

interface RateLimitEntry {
    count: number;
    resetAt: number;
  }
  
  const rateLimitStore = new Map<string, RateLimitEntry>();
  
  // Clean up old entries every 5 minutes
  setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of rateLimitStore.entries()) {
      if (entry.resetAt < now) {
        rateLimitStore.delete(key);
      }
    }
  }, 5 * 60 * 1000);
  
  /**
   * Check if an IP address has exceeded the rate limit
   * @param ip - IP address to check
   * @param maxRequests - Maximum number of requests allowed
   * @param windowMs - Time window in milliseconds
   * @returns true if rate limit exceeded, false otherwise
   */
  export function checkRateLimit(
    ip: string,
    maxRequests: number = 5,
    windowMs: number = 60 * 60 * 1000 // 1 hour
  ): { allowed: boolean; remaining: number; resetAt: number } {
    const now = Date.now();
    const entry = rateLimitStore.get(ip);
  
    // If no entry or reset time passed, create new entry
    if (!entry || entry.resetAt < now) {
      rateLimitStore.set(ip, {
        count: 1,
        resetAt: now + windowMs,
      });
      return {
        allowed: true,
        remaining: maxRequests - 1,
        resetAt: now + windowMs,
      };
    }
  
    // Increment count
    entry.count += 1;
  
    // Check if limit exceeded
    if (entry.count > maxRequests) {
      return {
        allowed: false,
        remaining: 0,
        resetAt: entry.resetAt,
      };
    }
  
    return {
      allowed: true,
      remaining: maxRequests - entry.count,
      resetAt: entry.resetAt,
    };
  }
  
  /**
   * Get client IP address from request
   */
  export function getClientIP(req: Request): string {
    // Try various headers (for proxies, load balancers, etc.)
    const forwarded = req.headers.get("x-forwarded-for");
    if (forwarded) {
      return forwarded.split(",")[0].trim();
    }
  
    const realIP = req.headers.get("x-real-ip");
    if (realIP) {
      return realIP;
    }
  
    // Fallback (won't work in serverless, but good for development)
    return "unknown";
  }