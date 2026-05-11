import prisma from "@/lib/prisma";

const FREE_DAILY_LIMIT = 5;
const FREE_CHAR_LIMIT = 500;
const PRO_CHAR_LIMIT = 5000;

// Modes that require Pro
const PRO_MODES = [
  "enthousiaste", "diplomatique", "empathique",
  "linkedin", "lettre", "slack", "presentation",
  "resumer", "reformuler", "structurer",
  "persuasif", "creatif", "humoristique", "poetique", "journalistique", "storytelling",
  "arabe", "allemand", "portugais", "italien", "chinois", "japonais",
];

export type UsageCheckResult = {
  allowed: boolean;
  reason?: string;
  remaining?: number;
};

export async function checkUsage(
  userId: string,
  plan: "FREE" | "PRO",
  textLength: number,
  modes: string[]
): Promise<UsageCheckResult> {
  // Check char limit
  const charLimit = plan === "PRO" ? PRO_CHAR_LIMIT : FREE_CHAR_LIMIT;
  if (textLength > charLimit) {
    return {
      allowed: false,
      reason: `Limite de ${charLimit.toLocaleString()} caractères${plan === "FREE" ? " (passe au Pro pour 5 000)" : ""}`,
    };
  }

  // Check pro modes on free plan
  if (plan === "FREE") {
    const usedProModes = modes.filter((m) => PRO_MODES.includes(m));
    if (usedProModes.length > 0) {
      return {
        allowed: false,
        reason: `Les modes ${usedProModes.join(", ")} sont réservés au plan Pro`,
      };
    }
  }

  // Check daily limit for free users
  if (plan === "FREE") {
    const today = new Date().toISOString().split("T")[0]; // "2026-05-11"

    const usage = await prisma.dailyUsage.upsert({
      where: { userId_date: { userId, date: today } },
      create: { userId, date: today, count: 0 },
      update: {},
    });

    if (usage.count >= FREE_DAILY_LIMIT) {
      return {
        allowed: false,
        reason: "Tu as atteint ta limite de 5 transformations aujourd'hui. Passe au Pro pour un accès illimité.",
        remaining: 0,
      };
    }

    return { allowed: true, remaining: FREE_DAILY_LIMIT - usage.count };
  }

  // Pro = unlimited
  return { allowed: true };
}

export async function incrementUsage(userId: string): Promise<void> {
  const today = new Date().toISOString().split("T")[0];

  await prisma.dailyUsage.upsert({
    where: { userId_date: { userId, date: today } },
    create: { userId, date: today, count: 1 },
    update: { count: { increment: 1 } },
  });
}
