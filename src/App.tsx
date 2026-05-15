import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { TrustBanner } from './components/TrustBanner';
import { WhyUs } from './components/WhyUs';
import { HowItWorks } from './components/HowItWorks';
import { SolutionsGrid } from './components/SolutionsGrid';
import { ResourceLibrary } from './components/ResourceLibrary';
import { Pricing } from './components/Pricing';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-black dark">
      <Navigation />
      <main>
        <Hero />
        <TrustBanner />
        <WhyUs />
        <HowItWorks />
        <SolutionsGrid />
        <ResourceLibrary />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}
