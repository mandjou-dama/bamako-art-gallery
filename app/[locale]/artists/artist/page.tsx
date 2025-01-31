import { redirect } from "next/navigation";
import { useLocale } from "next-intl";

export default function ArtistPage() {
  const locale = useLocale();
  redirect(`/${locale}/artists`); // Redirect to the artists listing page
}
