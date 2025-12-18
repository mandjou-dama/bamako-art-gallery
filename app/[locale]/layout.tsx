import { Poppins } from "next/font/google";
import type { Metadata } from "next";
import "../globals.css";

import { getMessages } from "next-intl/server";
import { ToastContainer } from "react-toastify";
import { useNewsletterStore } from "@/store/useNewsletter";

import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";
import pick from "lodash/pick";

// components
import Navbar from "@/components/navbar/navbar";
import Menu from "@/components/menu/menu";
import Cursor from "@/components/cursor/cursor";
import Footer from "@/components/footer/footer";
import NewsletterPopup from "@/components/newsletter/newsletter_popup";
import { Suspense } from "react";
import Loading from "./loading";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bamakoartgallery.com"),
  title: {
    default: "Bamako Art Gallery",
    template: "%s | Bamako Art Gallery",
  },
  description:
    "Fondée en 2018 par Kadiatou Sylla, Bamako Art Gallery (BAG) est un lieu d’échanges artistiques dédié à l’art contemporain, antique, au design et à l’artisanat d’Afrique de l’Ouest. BAG valorise la créativité malienne avec une approche éthique axée sur le développement des talents artistiques et la promotion de la conscience culturelle.",
  openGraph: {
    title: "Bamako Art Gallery",
    description:
      "Bamako Art Gallery valorise la créativité malienne avec une approche éthique axée sur le développement des talents artistiques et la promotion de la conscience culturelle.",
    url: "https://bamakoartgallery.com",
    siteName: "Bamako Art Gallery",
    images: [
      {
        url: "https://bamakoartgallery.com/opengraph-image.jpg",
        width: 1200,
        height: 600,
      },
    ],
    locale: "fr-FR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  referrer: "origin-when-cross-origin",
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

// Provide all possible locales for static generation of the route `/[locale]`
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Providing all messages to the client
  // side is the easiest way to get started

  const messages = await getMessages();

  // console.log(JSON.stringify(messages, null, 2));

  return (
    <html lang={locale}>
      <body className={`${poppins.className}`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Suspense fallback={<Loading />}>
            <NewsletterPopup />
            <Navbar />
            <Cursor />
            <ToastContainer position="top-left" theme="dark" />
            <div className="container">
              <Menu />
              {children}
              <Footer />
            </div>
          </Suspense>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
