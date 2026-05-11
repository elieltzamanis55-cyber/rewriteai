import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ remaining: 5, plan: "FREE", loggedIn: false });
    }

    const userId = (session.user as any).id;
    const plan = (session.user as any).plan;

    if (plan === "PRO") {
      return NextResponse.json({ remaining: -1, plan: "PRO", loggedIn: true });
    }

    const today = new Date().toISOString().split("T")[0];
    const usage = await prisma.dailyUsage.findUnique({
      where: { userId_date: { userId, date: today } },
    });

    return NextResponse.json({
      remaining: Math.max(0, 5 - (usage?.count || 0)),
      plan: "FREE",
      loggedIn: true,
    });
  } catch (error) {
    console.error("Usage error:", error);
    return NextResponse.json({ remaining: 5, plan: "FREE", loggedIn: false });
  }
}
