import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../globals.css";

const poppins = Poppins({
  weight: ["200", "300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Bamako Art Gallery",
  description:
    " Fondée en 2018 par Kadiatou Sylla, Bamako Art Gallery (BAG) est un lieu d’échanges artistiques dédié à l’art contemporain, antique, au design et à l’artisanat d’Afrique de l’Ouest. BAG valorise la créativité malienne avec une approche éthique axée sur le développement des talents artistiques et la promotion de la conscience culturelle.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={`${poppins.className}`}>{children}</body>
    </html>
  );
}
