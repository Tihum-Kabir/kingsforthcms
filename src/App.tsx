import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { TrustBanner } from './components/TrustBanner';
import { WhyUs } from './components/WhyUs';
import { HowItWorks } from './components/HowItWorks';
import { ServicesGrid } from './components/ServicesGrid';
import { SolutionsGrid } from './components/SolutionsGrid';
import { ResourceLibrary } from './components/ResourceLibrary';
import { Pricing } from './components/Pricing';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { SolutionsPage } from './pages/SolutionsPage';
import { SolutionDetailPage } from './pages/SolutionDetailPage';

function HomePage() {
  return (
    <main>
      <Hero />
      <TrustBanner />
      <WhyUs />
      <HowItWorks />
      <ServicesGrid />
      <SolutionsGrid />
      <ResourceLibrary />
      <Pricing />
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-black dark">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:slug" element={<ServiceDetailPage />} />
          <Route path="/solutions" element={<SolutionsPage />} />
          <Route path="/solutions/:slug" element={<SolutionDetailPage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
