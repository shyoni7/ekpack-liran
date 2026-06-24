import type { Metadata } from "next";
import { Heebo } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import ChatWidget from "@/components/chat/ChatWidget";

const heebo = Heebo({
  variable: "--font-heebo",
  subsets: ["hebrew", "latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "E.K.PACK — פנסיון ומעון יום לכלבים",
    template: "%s | E.K.PACK",
  },
  description:
    "פנסיון ומעון יום לכלבים המתמחה באילוף ותיקון התנהגות. סביבה חמה, ביתית ומקצועית לכלב שלכם.",
  openGraph: {
    title: "E.K.PACK — פנסיון ומעון יום לכלבים",
    description:
      "פנסיון ומעון יום לכלבים המתמחה באילוף ותיקון התנהגות.",
    locale: "he_IL",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl" className={`${heebo.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
        <ChatWidget />
      </body>
    </html>
  );
}
