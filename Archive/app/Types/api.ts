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

  export interface Request {
    id: string;
    name: string;
    email: string;
    company: string | null;
    location: string | null;
    role: string | null;
    phone: string | null;
    needs: string | null;
    user_id: string | null;
    created_at: string;
    updated_at: string;
  }
  
  export interface RequestsResponse {
    ok: boolean;
    requests?: Request[];
    error?: string;
    count?: number;
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
    tier: number; // 1 = all fields, 2 = 1 missing, 3 = 2 missing, etc.
  }

  // API Request/Response Types
  export interface RequestRequestBody {
    name: string;
    email: string;
    company?: string;
    location?: string;
    role?: string;
    phone?: string;
    needs?: string;
    website?: string; // Honeypot field - should always be empty
  }

  export interface RequestResponse {
    ok: boolean;
    error?: string;
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