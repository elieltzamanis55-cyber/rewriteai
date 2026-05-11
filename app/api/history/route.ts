import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const plan = (session.user as any).plan;

    if (plan !== "PRO") {
      return NextResponse.json(
        { error: "L'historique est réservé au plan Pro" },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = 20;
    const skip = (page - 1) * limit;

    const [transformations, total] = await Promise.all([
      prisma.transformation.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
        select: {
          id: true,
          sourceText: true,
          resultText: true,
          modes: true,
          createdAt: true,
        },
      }),
      prisma.transformation.count({ where: { userId } }),
    ]);

    return NextResponse.json({
      transformations,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("History error:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération de l'historique" },
      { status: 500 }
    );
  }
}
