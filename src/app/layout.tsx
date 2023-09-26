import { Lato } from "next/font/google";
import { Metadata } from "next";
import "./globals.css";
import "./notification.css";

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
