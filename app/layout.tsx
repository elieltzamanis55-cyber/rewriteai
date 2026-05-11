import type { Metadata } from "next";
import AuthProvider from "@/components/AuthProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "RewriteAI — Transforme ton texte instantanément",
  description:
    "Reformule, corrige, traduis et adapte ton texte en un clic grâce à l'IA. Professionnel, casual, académique, email, tweet et plus encore.",
  keywords: "rewrite, reformuler, IA, texte, email, professionnel, traduction",
  openGraph: {
    title: "RewriteAI — Transforme ton texte instantanément",
    description: "Reformule, corrige et adapte ton texte en un clic grâce à l'IA.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
