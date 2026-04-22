import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono, DM_Serif_Display } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "Role Model · Field Guide",
  description:
    "Model the evolution of the UX Designer role in an AI-augmented world.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} ${dmSerif.variable} h-full`}
    >
      <body className="h-full" style={{ fontFamily: "var(--font-space), system-ui, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
