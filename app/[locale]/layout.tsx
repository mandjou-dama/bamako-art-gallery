import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../globals.css";

//
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

// components
import Navbar from "@/components/navbar/navbar";
import Menu from "@/components/menu/menu";
import Cursor from "@/components/cursor/cursor";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Bamako Art Gallery",
  description:
    "Fondée en 2018 par Kadiatou Sylla, Bamako Art Gallery (BAG) est un lieu d’échanges artistiques dédié à l’art contemporain, antique, au design et à l’artisanat d’Afrique de l’Ouest. BAG valorise la créativité malienne avec une approche éthique axée sur le développement des talents artistiques et la promotion de la conscience culturelle.",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${poppins.className}`}>
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <div className="container">
            <Menu />
            {children}
            <Cursor />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
