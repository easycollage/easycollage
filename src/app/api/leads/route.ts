import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";
import { verifySession } from "@/lib/session";

interface LeadPayload {
  name: string;
  phone: string;
  rank: number;
  category?: string;
  gender?: string;
  course?: string;
}

const NAME_PATTERN = /^[A-Za-z]+(?:\s+[A-Za-z]+)*$/;
const MAX_NAME_LENGTH = 70;

function validateLead(body: unknown): { valid: boolean; error?: string; data?: LeadPayload } {
  if (typeof body !== "object" || body === null) {
    return { valid: false, error: "Invalid request body" };
  }

  const b = body as Record<string, unknown>;

  if (typeof b.name !== "string") {
    return { valid: false, error: "Name is required" };
  }

  const name = b.name.trim();
  if (name.length < 2) {
    return { valid: false, error: "Name must be at least 2 characters" };
  }

  if (name.length > MAX_NAME_LENGTH) {
    return { valid: false, error: "Name must be 70 characters or less" };
  }

  if (!NAME_PATTERN.test(name)) {
    return { valid: false, error: "Name can contain only letters and spaces" };
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
    data: {
      name,
      phone: b.phone,
      rank,
      category: typeof b.category === "string" ? b.category : undefined,
      gender: typeof b.gender === "string" ? b.gender : undefined,
      course: typeof b.course === "string" ? b.course : undefined,
    },
  };
}

async function requireAdmin() {
  const sessionCookie = cookies().get("admin_session");
  if (!sessionCookie?.value) return false;

  const payload = await verifySession(sessionCookie.value);
  return Boolean(payload);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validation = validateLead(body);

    if (!validation.valid || !validation.data) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const lead = await (prisma.lead as any).create({
      data: {
        name: validation.data.name,
        phone: validation.data.phone,
        rank: validation.data.rank,
        category: validation.data.category,
        gender: validation.data.gender,
        course: validation.data.course,
      },
    });

    console.log(`[Lead] ${lead.name} | ${lead.phone} | Rank: ${lead.rank}`);

    return NextResponse.json({ success: true, id: lead.id }, { status: 201 });
  } catch (error) {
    console.error("Failed to save lead:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET() {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const leads = await (prisma.lead as any).findMany({
    orderBy: [{ isRead: "asc" }, { createdAt: "desc" }],
  });
  return NextResponse.json({
    total: leads.length,
    leads,
  });
}

export async function PATCH(req: NextRequest) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();

    if (
      typeof body !== "object" ||
      body === null ||
      typeof body.id !== "string" ||
      typeof body.isRead !== "boolean"
    ) {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    const lead = await (prisma.lead as any).update({
      where: { id: body.id },
      data: { isRead: body.isRead },
    });

    return NextResponse.json({ success: true, lead });
  } catch (error) {
    console.error("Failed to update lead:", error);
    return NextResponse.json({ error: "Failed to update lead" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();

    if (
      typeof body !== "object" ||
      body === null ||
      typeof body.id !== "string"
    ) {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    await prisma.lead.delete({
      where: { id: body.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete lead:", error);
    return NextResponse.json({ error: "Failed to delete lead" }, { status: 500 });
  }
}
