import { getTranslations, setRequestLocale } from "next-intl/server";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Education } from "@/components/sections/Education";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { siteConfig } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("hero");
  const tm = await getTranslations("meta");

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: t("name"),
    alternateName: siteConfig.name,
    jobTitle: t("title"),
    description: tm("description"),
    url: `${siteConfig.url}/${locale}`,
    image: `${siteConfig.url}/images/profile.jpg`,
    address: { "@type": "PostalAddress", addressLocality: "Sfax", addressCountry: "TN" },
    worksFor: { "@type": "Organization", name: "Exadev" },
    alumniOf: [
      { "@type": "CollegeOrUniversity", name: "International Institute of Technology of Sfax" },
      { "@type": "CollegeOrUniversity", name: "ISIMS — Higher Institute of Computer Science and Multimedia of Sfax" },
    ],
    knowsAbout: ["Laravel", "React", "React Native", "FastAPI", "REST APIs", "MySQL", "Agile Scrum"],
    sameAs: [siteConfig.linkedin, siteConfig.github],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\u003c") }}
      />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Education />
      <Contact />
    </>
  );
}
