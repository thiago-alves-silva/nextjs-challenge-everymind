import "./globals.css";
import type { Metadata } from "next";
import { Lato } from "next/font/google";

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | EveryMind",
    default: "EveryMind",
  },
  description: "Plataforma de recrutamento incluso",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className={lato.className}>{children}</body>
    </html>
  );
}
