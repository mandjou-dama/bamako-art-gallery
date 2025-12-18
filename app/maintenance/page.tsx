import Countdown from "@/components/countdown/countdown";

import Image from "next/image";
import Logo from "@/public/logo.png";

import "./page.css";

export default function Maintenance() {
  const targetDate = new Date("2025-02-20T23:59:59");
  return (
    <div className="maintenance_page">
      <Image width={225} src={Logo} alt="Bamako Art Gallery Logo" />
      <h1>🚧 Site en construction 🚧</h1>
      <p>Nous travaillons actuellement sur notre site. Revenez bientôt !</p>
      <Countdown targetDate={targetDate} />
    </div>
  );
}
