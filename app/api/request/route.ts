import { NextResponse } from "next/server";
import { Resend } from "resend";
import { supabaseAdmin } from "../../lib/supabase";
import type { RequestRequestBody, RequestResponse } from "../../Types/api";
import { isValidEmail } from "../../Types/api";
import { checkRateLimit, getClientIP } from "../utils/rateLimit";
import { isValidEmailFormat, hasValidDomain } from "../utils/emailValidation";

export const runtime = "nodejs";

function validateRequest(body: unknown): body is RequestRequestBody {
  if (!body || typeof body !== "object") return false;
  const b = body as Record<string, unknown>;
  
  // Check honeypot field (should be empty or undefined)
  if (b.website && typeof b.website === "string" && b.website.trim().length > 0) {
    // Bot detected - silently reject
    return false;
  }
  
  return (
    typeof b.name === "string" &&
    b.name.trim().length > 0 &&
    b.name.trim().length <= 100 && // Reasonable name length
    typeof b.email === "string" &&
    b.email.trim().length > 0
  );
}

function formatEmailBody(body: RequestRequestBody): string {
  return `
Name: ${body.name}
Email: ${body.email}
Company: ${body.company || "Not provided"}
Location: ${body.location || "Not provided"}
Role: ${body.role || "Not provided"}
Phone: ${body.phone || "Not provided"}
Supports / Needs:
${body.needs || "Not provided"}
  `.trim();
}

export async function POST(req: Request) {
  try {
    // Validate environment variables
    if (!process.env.RESEND_API_KEY) {
      console.error("[/api/request] RESEND_API_KEY is not set");
      return NextResponse.json(
        { ok: false, error: "Server configuration error" } as RequestResponse,
        { status: 500 }
      );
    }

    if (!process.env.TO_EMAIL) {
      console.error("[/api/request] TO_EMAIL is not set");
      return NextResponse.json(
        { ok: false, error: "Server configuration error" } as RequestResponse,
        { status: 500 }
      );
    }

    // Rate limiting
    const clientIP = getClientIP(req);
    const rateLimit = checkRateLimit(clientIP, 5, 60 * 60 * 1000); // 5 requests per hour
    
    if (!rateLimit.allowed) {
      const resetDate = new Date(rateLimit.resetAt);
      return NextResponse.json(
        { 
          ok: false, 
          error: `Too many requests. Please try again after ${resetDate.toLocaleTimeString()}.` 
        } as RequestResponse,
        { 
          status: 429,
          headers: {
            "X-RateLimit-Limit": "5",
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": rateLimit.resetAt.toString(),
            "Retry-After": Math.ceil((rateLimit.resetAt - Date.now()) / 1000).toString(),
          },
        }
      );
    }

    // Parse and validate request body
    const body = (await req.json()) as unknown;
    
    if (!validateRequest(body)) {
      // Don't reveal honeypot detection - just return generic error
      return NextResponse.json(
        { ok: false, error: "Invalid request: name and email are required" } as RequestResponse,
        { status: 400 }
      );
    }

    // Enhanced email validation
    const email = body.email.trim().toLowerCase();
    if (!isValidEmailFormat(email)) {
      return NextResponse.json(
        { ok: false, error: "Please provide a valid email address" } as RequestResponse,
        { status: 400 }
      );
    }

    if (!hasValidDomain(email)) {
      return NextResponse.json(
        { ok: false, error: "Please provide a valid email address" } as RequestResponse,
        { status: 400 }
      );
    }

    // Additional validation
    if (body.name.trim().length < 2) {
      return NextResponse.json(
        { ok: false, error: "Name must be at least 2 characters" } as RequestResponse,
        { status: 400 }
      );
    }

    // Save to database first (before email, so we have a record even if email fails)
    const { data: dbData, error: dbError } = await supabaseAdmin
      .from('requests')
      .insert({
        name: body.name.trim(),
        email: email,
        company: body.company?.trim() || null,
        location: body.location?.trim() || null,
        role: body.role?.trim() || null,
        phone: body.phone?.trim() || null,
        needs: body.needs?.trim() || null,
        user_id: null, // Will be set when auth is implemented
      })
      .select()
      .single();

    if (dbError) {
      console.error("[/api/request] Database error:", dbError);
      // Continue anyway - try to send email even if DB fails
    } else {
      console.log("[/api/request] Saved to database:", dbData?.id);
    }

    // Initialize Resend
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Format email content
    const emailText = formatEmailBody(body);
    const replyTo = isValidEmail(body.email) ? body.email : undefined;

    // Send email
    let emailResult: { data?: { id: string }; error?: { message: string } };
    try {
      emailResult = await resend.emails.send({
        from: "Support Match <admin@supportmatch.com.au>",
        to: process.env.TO_EMAIL,
        replyTo,
        subject: "New support request",
        text: emailText,
      });
    } catch (emailError) {
      console.error("[/api/request] Email send failed:", emailError);
      const message =
        emailError instanceof Error ? emailError.message : "Email service error";
      return NextResponse.json(
        {
          ok: false,
          error: "Email could not be sent. Please try again later.",
          debug: process.env.NODE_ENV === "development" ? message : undefined,
        } as RequestResponse & { debug?: string },
        { status: 503 }
      );
    }

    if (emailResult?.error) {
      console.error("[/api/request] Resend API error:", emailResult.error);
      return NextResponse.json(
        {
          ok: false,
          error: "Email could not be sent. Please try again later.",
          debug:
            process.env.NODE_ENV === "development"
              ? emailResult.error.message
              : undefined,
        } as RequestResponse & { debug?: string },
        { status: 503 }
      );
    }

    console.log("[/api/request] Email sent successfully", emailResult?.data?.id);

    return NextResponse.json(
      { ok: true } as RequestResponse,
      {
        headers: {
          "X-RateLimit-Limit": "5",
          "X-RateLimit-Remaining": rateLimit.remaining.toString(),
          "X-RateLimit-Reset": rateLimit.resetAt.toString(),
        },
      }
    );
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : typeof err === "string" ? err : "Unknown error";
    console.error("[/api/request] send failed:", err);
    return NextResponse.json(
      { ok: false, error: message } as RequestResponse,
      { status: 500 }
    );
  }
}