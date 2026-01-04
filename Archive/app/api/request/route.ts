import { NextResponse } from "next/server";
import { Resend } from "resend";
import type { RequestRequestBody, RequestResponse } from "../../Types/api";
import { isValidEmail } from "../../Types/api";

export const runtime = "nodejs";

function validateRequest(body: unknown): body is RequestRequestBody {
  if (!body || typeof body !== "object") return false;
  const b = body as Record<string, unknown>;
  return (
    typeof b.name === "string" &&
    b.name.trim().length > 0 &&
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

    // Parse and validate request body
    const body = (await req.json()) as unknown;
    
    if (!validateRequest(body)) {
      return NextResponse.json(
        { ok: false, error: "Invalid request: name and email are required" } as RequestResponse,
        { status: 400 }
      );
    }

    // Initialize Resend
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Format email content
    const emailText = formatEmailBody(body);
    const replyTo = isValidEmail(body.email) ? body.email : undefined;

    // Send email
    await resend.emails.send({
      from: "Support Match <admin@supportmatch.com.au>",
      to: process.env.TO_EMAIL,
      replyTo,
      subject: "New support request",
      text: emailText,
    });

    return NextResponse.json({ ok: true } as RequestResponse);
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