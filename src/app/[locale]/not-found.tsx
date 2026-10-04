import { ArrowLeft } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { buttonClasses } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <section className="relative isolate flex min-h-[80svh] items-center overflow-hidden pt-[var(--header-h)]">
      <div aria-hidden="true" className="bg-grid mask-radial absolute inset-0 -z-10 opacity-70" />
      <div className="container-page text-center">
        <p className="text-gradient font-display text-[clamp(5rem,18vw,10rem)] font-semibold leading-none tracking-tighter">
          {t("code")}
        </p>
        <h1 className="mt-6 font-display text-3xl font-semibold tracking-tight text-fg sm:text-4xl">{t("title")}</h1>
        <p className="mx-auto mt-4 max-w-md text-muted">{t("text")}</p>
        <Link href="/" className={buttonClasses("primary", "md", "mt-10")}>
          <ArrowLeft className="size-4 rtl:-scale-x-100" aria-hidden="true" />
          {t("cta")}
        </Link>
      </div>
    </section>
  );
}
