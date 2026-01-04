// API Request/Response Types

export interface RequestRequestBody {
    name: string;
    email: string;
    company?: string;
    location?: string;
    role?: string;
    phone?: string;
    needs?: string;
  }
  
  export interface RequestResponse {
    ok: boolean;
    error?: string;
  }
  
  // CSV Row type (for parsing workers CSV)
  export interface WorkersCSVRow {
    name?: string;
    region?: string;
    is_australian?: string | boolean | number;
    experience_years?: string | number;
    qualification?: string;
    previous_role?: string;
    previous_work_place?: string;
  }
  
  // Worker/Candidate type (used by API, hooks, and components)
  export interface Candidate {
    id: string;
    name: string;
    region: string;
    is_australian: boolean;
    experience_years: number;
    qualification: string;
    previous_role: string;
    previous_work_place: string;
    name_lc: string;
  }
  
  // Alias for API responses (same as Candidate)
  export type WorkersResponse = Candidate;
  
  export interface WorkersErrorResponse {
    error: string;
  }
  
  // Helper type guard for email validation
  export function isValidEmail(s: string | undefined): s is string {
    if (!s) return false;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
  }