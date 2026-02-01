/**
 * Enhanced email validation
 */
export function isValidEmailFormat(email: string): boolean {
    if (!email || typeof email !== "string") return false;
    
    const trimmed = email.trim().toLowerCase();
    
    // Basic format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmed)) return false;
    
    // Check for common spam patterns
    const spamPatterns = [
      /^test@/i,
      /^admin@/i,
      /^noreply@/i,
      /@example\./i,
      /@test\./i,
      /@mailinator\./i,
      /@guerrillamail\./i,
      /@10minutemail\./i,
      /@tempmail\./i,
      /@throwaway\./i,
    ];
    
    if (spamPatterns.some(pattern => pattern.test(trimmed))) {
      return false;
    }
    
    // Check for suspicious patterns
    const suspiciousPatterns = [
      /^[a-z0-9]{1,3}@/, // Very short local part
      /@[a-z0-9]{1,3}\./, // Very short domain
      /\.{2,}/, // Multiple consecutive dots
      /@{2,}/, // Multiple @ symbols
    ];
    
    if (suspiciousPatterns.some(pattern => pattern.test(trimmed))) {
      return false;
    }
    
    // Check length (reasonable limits)
    if (trimmed.length > 254) return false; // RFC 5321 limit
    if (trimmed.length < 5) return false; // a@b.c minimum
    
    // Split and validate parts
    const [localPart, domain] = trimmed.split("@");
    if (!localPart || !domain) return false;
    
    // Local part validation
    if (localPart.length > 64) return false; // RFC 5321 limit
    if (localPart.startsWith(".") || localPart.endsWith(".")) return false;
    
    // Domain validation
    if (domain.length > 253) return false;
    if (!domain.includes(".")) return false;
    if (domain.startsWith(".") || domain.endsWith(".")) return false;
    
    // Check for valid TLD (at least 2 characters)
    const parts = domain.split(".");
    if (parts.length < 2) return false;
    const tld = parts[parts.length - 1];
    if (tld.length < 2) return false;
    
    return true;
  }
  
  /**
   * Check if email domain is valid (has MX records)
   * Note: This is a basic check. For production, consider using a service
   * that actually checks DNS records.
   */
  export function hasValidDomain(email: string): boolean {
    const domain = email.split("@")[1];
    if (!domain) return false;
    
    // Block known disposable email domains
    const disposableDomains = [
      "tempmail.com",
      "mailinator.com",
      "guerrillamail.com",
      "10minutemail.com",
      "throwaway.email",
    ];
    
    if (disposableDomains.some(d => domain.includes(d))) {
      return false;
    }
    
    return true;
  }