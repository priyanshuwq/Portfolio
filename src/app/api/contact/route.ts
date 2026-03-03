import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const TO_EMAIL = "priyanshuofficial2004@gmail.com";

// ── Layer 1: In-memory rate limiter (per IP, max 3 per 10 min) ──────────────
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const IS_DEV = process.env.NODE_ENV === "development";

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT) return false;
  entry.count++;
  return true;
}

// ── Layer 2: Spam signal scoring ─────────────────────────────────────────────
const SPAM_PATTERNS = [
  /https?:\/\//gi,                          // URLs in message
  /\b(click here|buy now|free offer|make money|earn \$|casino|crypto|bitcoin|nft|investment opportunity)\b/gi,
  /(.)\1{6,}/g,                             // repeated chars (aaaaaaa)
  /[A-Z\s]{30,}/g,                          // long all-caps stretches
  /\b\d{10,}\b/g,                           // long raw number strings
];

function spamScore(text: string): number {
  return SPAM_PATTERNS.reduce((score, pattern) => {
    const matches = text.match(pattern);
    return score + (matches ? matches.length : 0);
  }, 0);
}

// ── Layer 3: Blocked disposable/throwaway email domains ───────────────────────
const BLOCKED_DOMAINS = [
  "mailinator.com","guerrillamail.com","tempmail.com","10minutemail.com",
  "throwam.com","yopmail.com","sharklasers.com","trashmail.com","fakeinbox.com",
  "dispostable.com","maildrop.cc","mailnull.com","spamgourmet.com",
];

function isDisposableEmail(email: string): boolean {
  const domain = email.split("@")[1]?.toLowerCase() ?? "";
  return BLOCKED_DOMAINS.includes(domain);
}

// ── Layer 4: Basic profanity / inappropriate content ──────────────────────────
const BAD_WORDS = /\b(spam|scam|phish|porn|xxx|nsfw|hack|exploit)\b/gi;

function hasBadContent(text: string): boolean {
  return BAD_WORDS.test(text);
}

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      req.headers.get("x-real-ip") ??
      "unknown";

    // Rate limit check (skipped in dev)
    if (!IS_DEV && !checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many messages. Please try again in a few minutes." },
        { status: 429 }
      );
    }

    const { from, subject, message, website } = await req.json();

    // Honeypot: bots fill hidden `website` field, humans don't
    if (website) {
      // Silently pretend success — don't let bots know they were caught
      return NextResponse.json({ success: true });
    }

    // Required field validation
    if (!from || !subject || !message) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    // Length guards
    if (subject.length > 200) {
      return NextResponse.json({ error: "Subject is too long." }, { status: 400 });
    }
    if (message.length < 10) {
      return NextResponse.json({ error: "Message is too short." }, { status: 400 });
    }
    if (message.length > 3000) {
      return NextResponse.json({ error: "Message is too long (max 3000 chars)." }, { status: 400 });
    }

    // Email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(from)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    // Disposable email check
    if (isDisposableEmail(from)) {
      return NextResponse.json(
        { error: "Disposable email addresses are not accepted." },
        { status: 400 }
      );
    }

    // Spam score — reject if too spammy
    const score = spamScore(subject + " " + message);
    if (score >= 3) {
      return NextResponse.json(
        { error: "Your message looks like spam. Please revise and try again." },
        { status: 400 }
      );
    }

    // Inappropriate content
    if (hasBadContent(subject + " " + message)) {
      return NextResponse.json(
        { error: "Message contains inappropriate content." },
        { status: 400 }
      );
    }

    const { error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: TO_EMAIL,
      replyTo: from,
      subject: `[Portfolio] ${subject}`,
      text: `From: ${from}\n\n${message}`,
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:24px;color:#111">
          <p style="font-size:12px;color:#888;margin-bottom:24px;text-transform:uppercase;letter-spacing:0.08em">
            New message via portfolio contact form
          </p>
          <h2 style="font-size:18px;font-weight:600;margin:0 0 4px">${subject}</h2>
          <p style="font-size:13px;color:#666;margin:0 0 24px">From: <a href="mailto:${from}" style="color:#111">${from}</a></p>
          <div style="border-top:1px solid #eee;padding-top:20px;font-size:14px;line-height:1.7;white-space:pre-wrap">${message}</div>
          <p style="margin-top:32px;font-size:12px;color:#aaa">
            Hit Reply to respond directly to ${from}
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("[Contact API] Resend error:", error);
      return NextResponse.json({ error: "Failed to send. Try again." }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[Contact API] Error:", err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
