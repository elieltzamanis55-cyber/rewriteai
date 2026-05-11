import { NextRequest, NextResponse } from "next/server";

const MODE_PROMPTS: Record<string, string> = {
  professionnel: "Adopte un ton professionnel et formel, adapté au monde du travail.",
  casual: "Adopte un ton décontracté et naturel, comme entre amis.",
  soutenu: "Adopte un registre soutenu et académique, vocabulaire riche.",
  direct: "Va droit au but, sans fioritures ni formules de politesse excessives.",
  enthousiaste: "Adopte un ton enthousiaste et dynamique, plein d'énergie.",
  diplomatique: "Adopte un ton diplomatique, mesuré et nuancé.",
  empathique: "Adopte un ton bienveillant, chaleureux et empathique.",
  email: "Structure en email pro avec objet, formule d'appel, corps et signature.",
  tweet: "Condense en 280 caractères max, percutant et direct.",
  linkedin: "Formate en post LinkedIn engageant avec hook, corps et CTA.",
  sms: "Reformule en message texte court et direct.",
  lettre: "Structure en lettre formelle avec en-tête, objet, corps et formule de clôture.",
  bullet: "Transforme en liste de points clés, structurés et hiérarchisés.",
  slack: "Reformule en message Slack concis et clair, adapté au contexte pro.",
  presentation: "Reformule en points clés pour des slides de présentation.",
  corriger: "Corrige orthographe, grammaire et ponctuation sans changer le style.",
  simplifier: "Simplifie pour un lecteur de 12 ans. Mots simples, phrases courtes.",
  allonger: "Développe avec détails, exemples et nuances. Double la longueur minimum.",
  reduire: "Réduis au strict minimum, 30% de la longueur originale.",
  resumer: "Résume en 2-3 phrases l'essentiel du texte.",
  reformuler: "Reformule entièrement en gardant le même sens mais avec des mots différents.",
  structurer: "Réorganise avec structure logique : intro, développement, conclusion.",
  neutre: "Réécris de manière neutre, objective et factuelle.",
  clair: "Réécris de façon claire et concise, sans ambiguïté.",
  engageant: "Réécris de manière engageante, qui capte l'attention du lecteur.",
  persuasif: "Rends le texte persuasif et convaincant. Urgence, bénéfices, appel à l'action.",
  creatif: "Réécris avec style littéraire, métaphores et rythme soigné.",
  humoristique: "Réécris avec humour et légèreté tout en gardant le message.",
  poetique: "Réécris de façon poétique, avec rythme, images et musicalité.",
  journalistique: "Réécris comme un article de presse : accroche, pyramide inversée, factuel.",
  storytelling: "Transforme en récit narratif captivant avec un arc dramatique.",
  anglais: "Traduis en anglais idiomatique et naturel.",
  francais: "Traduis en français naturel et idiomatique.",
  espagnol: "Traduis en espagnol naturel et idiomatique.",
  arabe: "Traduis en arabe standard moderne, naturel.",
  allemand: "Traduis en allemand naturel et idiomatique.",
  portugais: "Traduis en portugais naturel et idiomatique.",
  italien: "Traduis en italien naturel et idiomatique.",
  chinois: "Traduis en chinois simplifié, naturel et idiomatique.",
  japonais: "Traduis en japonais naturel et poli.",
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text, modes } = body;

    if (!text?.trim()) {
      return NextResponse.json({ error: "Texte requis" }, { status: 400 });
    }

    if (!modes || !Array.isArray(modes) || modes.length === 0) {
      return NextResponse.json({ error: "Sélectionne au moins un mode" }, { status: 400 });
    }

    // Check text length
    if (text.length > 5000) {
      return NextResponse.json({ error: "Limite de 5 000 caractères" }, { status: 400 });
    }

    // Check Groq key
    if (!process.env.GROQ_API_KEY) {
      console.error("GROQ_API_KEY is not set");
      return NextResponse.json({ error: "Configuration serveur manquante" }, { status: 500 });
    }

    // Build combined prompt
    const instructions = modes
      .map((m: string) => MODE_PROMPTS[m])
      .filter(Boolean);
    
    const systemPrompt =
      (instructions.length > 0 ? instructions.join("\n") : "Réécris de manière claire et professionnelle.") +
      (instructions.length > 1 ? "\n\nCombine toutes ces instructions de façon cohérente." : "") +
      "\n\nRéponds UNIQUEMENT avec le texte transformé. Pas d'intro, pas d'explication, pas de guillemets.";

    // Call Groq
    const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: text },
        ],
        max_tokens: 2048,
        temperature: 0.7,
      }),
    });

    const groqData = await groqResponse.json();

    if (!groqResponse.ok) {
      console.error("Groq error:", JSON.stringify(groqData));
      return NextResponse.json(
        { error: `Erreur Groq: ${groqData?.error?.message || "Réessaie."}` },
        { status: 500 }
      );
    }

    const resultText = groqData.choices?.[0]?.message?.content || "";

    return NextResponse.json({ result: resultText });
  } catch (error: any) {
    console.error("API Error:", error?.message || error);
    return NextResponse.json(
      { error: `Erreur serveur: ${error?.message || "Réessaie."}` },
      { status: 500 }
    );
  }
}
