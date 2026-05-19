import { Hero } from "@/components/marketing/Hero";
import { ParadigmShift } from "@/components/marketing/ParadigmShift";
import { ProductShowcase } from "@/components/marketing/ProductShowcase";
import { HowItWorks } from "@/components/marketing/HowItWorks";
import { CoreCapabilities } from "@/components/marketing/CoreCapabilities";
import { StatsSection } from "@/components/marketing/StatsSection";
import { FinalCTA } from "@/components/marketing/FinalCTA";

import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { unstable_cache } from 'next/cache';

export const dynamic = 'force-dynamic';

const getHomePageData = unstable_cache(
  async () => {
    let siteSettings: any = null;
    let partnerLogos: any[] = [];
    try {
      const payload = await getPayload({ config: configPromise });
      try {
        siteSettings = await payload.findGlobal({ slug: 'site-settings', depth: 2 });
      } catch {}
      try {
        const logosResult = await payload.find({
          collection: 'partner-logos',
          where: { isActive: { equals: true } },
          sort: 'displayOrder',
          limit: 20,
          depth: 1,
        });
        partnerLogos = logosResult.docs || [];
      } catch {}
    } catch {}
    return { siteSettings, partnerLogos };
  },
  ['home-page-data'],
  { revalidate: 30 }
);

export default async function Home() {
  const { siteSettings, partnerLogos } = await getHomePageData();


  // Extract hero settings from site settings
  const heroSettings = siteSettings ? {
    heroImageDay: siteSettings.heroImageDay,
    heroImageNight: siteSettings.heroImageNight,
    heroHeadline: siteSettings.heroHeadline,
    heroHighlightText: siteSettings.heroHighlightText,
    heroSubtitle: siteSettings.heroSubtitle,
    heroSubtitleSize: siteSettings.heroSubtitleSize,
    heroCTAText: siteSettings.heroCTAText,
    heroCTALink: siteSettings.heroCTALink,
    heroSecondaryCTAText: siteSettings.heroSecondaryCTAText,
    heroSecondaryCTALink: siteSettings.heroSecondaryCTALink,
  } : undefined;

  // Extract homepage sections from site settings
  const whyKingsforthSection = siteSettings?.whyKingsforthSection;
  const productShowcaseSection = siteSettings?.productShowcaseSection;
  const statsSection = siteSettings?.statsSection;
  const howItWorksSection = siteSettings?.howItWorksSection;
  const coreCapabilitiesSection = siteSettings?.coreCapabilitiesSection;
  const finalCtaSection = siteSettings?.finalCtaSection;

  const logoScrollSettings = siteSettings?.partnerLogosSection;

  return (
    <main>
      <Hero
        partnerLogos={partnerLogos}
        heroSettings={heroSettings}
        logoScrollSettings={logoScrollSettings}
      />
      <ParadigmShift settings={whyKingsforthSection} />
      <ProductShowcase settings={productShowcaseSection} />
      <StatsSection settings={statsSection} />
      <HowItWorks settings={howItWorksSection} steps={howItWorksSection?.steps} />
      <CoreCapabilities settings={coreCapabilitiesSection} />
      <FinalCTA settings={finalCtaSection} />
    </main>
  );
}
