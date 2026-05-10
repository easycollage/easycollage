import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface LeadPayload {
  name: string;
  phone: string;
  rank: number;
  category?: string;
  gender?: string;
}

function validateLead(body: unknown): { valid: boolean; error?: string; data?: LeadPayload } {
  if (typeof body !== "object" || body === null) {
    return { valid: false, error: "Invalid request body" };
  }

  const b = body as Record<string, unknown>;

  if (typeof b.name !== "string" || b.name.trim().length < 2) {
    return { valid: false, error: "Name must be at least 2 characters" };
  }

  if (typeof b.phone !== "string" || !/^[6-9]\d{9}$/.test(b.phone)) {
    return { valid: false, error: "Invalid Indian mobile number" };
  }

  const rank = Number(b.rank);
  if (isNaN(rank) || !Number.isInteger(rank) || rank < 1 || rank > 200000) {
    return { valid: false, error: "Rank must be between 1 and 2,00,000" };
  }

  return {
    valid: true,
    data: { name: b.name.trim(), phone: b.phone, rank, category: b.category as string, gender: b.gender as string },
  };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validation = validateLead(body);

    if (!validation.valid || !validation.data) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const lead = await prisma.lead.create({
      data: {
        name: validation.data.name,
        phone: validation.data.phone,
        rank: validation.data.rank,
        category: validation.data.category,
        gender: validation.data.gender,
      },
    });

    console.log(`[Lead] ${lead.name} | ${lead.phone} | Rank: ${lead.rank}`);

    return NextResponse.json({ success: true, id: lead.id }, { status: 201 });
  } catch (error) {
    console.error("Failed to save lead:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// Optional: GET endpoint to view leads (protect this in production with auth)
export async function GET() {
  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({
    total: leads.length,
    leads,
  });
}
