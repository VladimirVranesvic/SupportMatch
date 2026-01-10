import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../lib/supabase";
import type { RequestsResponse, Request as RequestRecord } from "../../../Types/api";

export const runtime = "nodejs";

// Simple API key authentication
function isAuthorized(req: Request): boolean {
  const authHeader = req.headers.get("authorization");
  const apiKey = process.env.ADMIN_API_KEY;

  if (!apiKey) {
    console.warn("ADMIN_API_KEY not set - allowing access (not recommended for production)");
    return true; // Allow if not set (for development)
  }

  if (!authHeader) return false;

  // Support "Bearer <key>" or just the key
  const providedKey = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7)
    : authHeader;

  return providedKey === apiKey;
}

export async function GET(req: Request) {
  try {
    // Check authorization
    if (!isAuthorized(req)) {
      return NextResponse.json(
        { ok: false, error: "Unauthorized" } as RequestsResponse,
        { status: 401 }
      );
    }

    // Get query parameters
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get("limit") || "50", 10);
    const offset = parseInt(searchParams.get("offset") || "0", 10);
    const email = searchParams.get("email");

    // Build query
    let query = supabaseAdmin
      .from("requests")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    // Filter by email if provided
    if (email) {
      query = query.eq("email", email.toLowerCase());
    }

    const { data, error, count } = await query;

    if (error) {
      throw error;
    }

    return NextResponse.json({
      ok: true,
      requests: (data || []) as RequestRecord[],
      count: count || 0,
    } as RequestsResponse);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to fetch requests";
    console.error("[/api/admin/requests] error:", err);
    return NextResponse.json(
      { ok: false, error: message } as RequestsResponse,
      { status: 500 }
    );
  }
}