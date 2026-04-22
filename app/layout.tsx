import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RoleModel AI — UX Designer Futures",
  description:
    "Model the evolution of the UX Designer role in an AI-augmented world. Configure competency weights and generate your future role profile.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-100">
        {children}
      </body>
    </html>
  );
}
