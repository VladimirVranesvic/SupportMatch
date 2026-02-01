import type { Candidate } from "../../Types/api";

/**
 * Calculate tier based on missing optional fields
 * Tier 1 = all optional fields present
 * Tier 2 = 1 field missing
 * Tier 3 = 2 fields missing
 * Tier 4 = 3+ fields missing
 */
export function calculateTier(worker: {
  qualification: string;
  previous_role: string;
  previous_work_place: string;
}): number {
  const optionalFields = [
    worker.qualification?.trim(),
    worker.previous_role?.trim(),
    worker.previous_work_place?.trim(),
  ];

  // Count how many fields are missing (empty or just whitespace)
  const missingCount = optionalFields.filter(
    (field) => !field || field === "" || field.toLowerCase() === "not specified"
  ).length;

  // Tier 1 = 0 missing, Tier 2 = 1 missing, Tier 3 = 2 missing, Tier 4 = 3 missing
  return missingCount + 1;
}