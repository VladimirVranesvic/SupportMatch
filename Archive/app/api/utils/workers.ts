// Helper functions for processing worker data

const ALLOWED_REGIONS = [
  "Sydney", "Melbourne", "Brisbane", "Adelaide", "Perth",
  "Canberra", "Hobart", "Darwin",
  "Gold Coast", "Sunshine Coast", "Newcastle", "Wollongong", "Geelong"
] as const;

export function titleCase(s: string): string {
  return s
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * Formats a name to have proper capitalization: first letter of first and last name
 * Examples: "john smith" -> "John Smith", "MARY JANE" -> "Mary Jane"
 */
export function formatName(name: string): string {
  if (!name) return "";
  
  return name
    .trim()
    .split(/\s+/)
    .map((part) => {
      // Handle hyphenated names like "Mary-Jane"
      return part
        .split("-")
        .map((segment) => {
          // Capitalize first letter, lowercase the rest
          return segment.charAt(0).toUpperCase() + segment.slice(1).toLowerCase();
        })
        .join("-");
    })
    .join(" ");
}

export function cleanRegion(raw: unknown): string {
  if (raw == null) return "";
  
  let s = String(raw);
  s = s.split(/[,/|-]/)[0].trim();
  s = titleCase(s);
  
  // Map state abbreviations to cities
  const stateMap: Record<string, string> = {
    nsw: "Sydney",
    vic: "Melbourne",
    qld: "Brisbane",
    sa: "Adelaide",
    wa: "Perth",
    act: "Canberra",
    tas: "Hobart",
    nt: "Darwin",
  };
  
  const normalized = s.toLowerCase();
  if (stateMap[normalized]) {
    return stateMap[normalized];
  }
  
  return ALLOWED_REGIONS.includes(s as typeof ALLOWED_REGIONS[number]) ? s : "";
}

export function parseBoolean(value: unknown): boolean {
  return /^(true|yes|y|1)$/i.test(String(value ?? ""));
}

export function parseNumber(value: unknown): number {
  return Number(value ?? 0) || 0;
}