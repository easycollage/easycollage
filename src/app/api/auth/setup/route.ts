import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { hashPassword } from "@/lib/auth";

export async function GET(req: Request) {
  // IMPORTANT: This route should only be used once to create the initial admin account.
  // In a real app, you would secure this or remove it after setup.
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
  const password = searchParams.get("password");

  if (!email || !password) {
    return NextResponse.json({ error: "Provide ?email=...&password=... in the URL" }, { status: 400 });
  }

  try {
    const existingAdmins = await prisma.admin.count();
    
    if (existingAdmins > 0) {
      return NextResponse.json({ error: "Admin already exists. Cannot use setup route anymore." }, { status: 403 });
    }

    const hashedPassword = await hashPassword(password);

    const admin = await prisma.admin.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json({ success: true, email: admin.email, message: "Admin created successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create admin" }, { status: 500 });
  }
}
