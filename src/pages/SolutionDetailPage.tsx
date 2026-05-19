import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Check, ChevronDown, ChevronRight, Images } from 'lucide-react';
import { INDUSTRY_SOLUTIONS, USECASE_SOLUTIONS } from '../data/solutions';
import { SERVICES } from '../data/services';
import { Button } from '../components/ui/button';
import { usePayloadMedia, getYouTubeEmbedUrl } from '../hooks/usePayloadMedia';

function NotFound() {
  return (
    <div className="min-h-screen pt-32 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Solution Not Found</h1>
        <Link to="/solutions" className="text-violet-400 hover:text-violet-300">← Back to Solutions</Link>
      </div>
    </div>
  );
}

// ── Payload media section ─────────────────────────────────────────────────────
function MediaSection({ slug, gradient }: { slug: string; gradient: string }) {
  const { data, loading } = usePayloadMedia('solutions', slug);

  if (loading) return null;
  const hasContent =
    data?.heroImageUrl || data?.heroVideoUrl || (data?.galleryImages?.length ?? 0) > 0;
  if (!hasContent) return null;

  return (
    <section className="py-12 bg-black">
      <div className="max-w-[1300px] mx-auto px-8 lg:px-12 space-y-10">
        {data?.heroImageUrl && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative overflow-hidden rounded-3xl border border-white/[0.07]"
          >
            <img
              src={data.heroImageUrl}
              alt="Solution overview"
              className="w-full h-auto object-cover max-h-[560px]"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent pointer-events-none" />
          </motion.div>
        )}

        {data?.heroVideoUrl && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className={`h-1 rounded-full bg-linear-to-r ${gradient} mb-8 w-24`} />
            <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/[0.07] shadow-2xl shadow-black/50">
              <iframe
                src={getYouTubeEmbedUrl(data.heroVideoUrl) ?? ''}
                title="Solution overview video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </motion.div>
        )}

        {(data?.galleryImages?.length ?? 0) > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-7">
              <Images className="w-4 h-4 text-gray-500" strokeWidth={2} />
              <span className="text-[13px] font-semibold text-gray-500 uppercase tracking-widest">Gallery</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {data!.galleryImages.map((img, i) => (
                <div key={i} className="group overflow-hidden rounded-2xl border border-white/[0.07]">
                  <img
                    src={img.url}
                    alt={img.caption ?? `Gallery image ${i + 1}`}
                    className="w-full h-[220px] object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {img.caption && (
                    <p className="text-[12px] text-gray-500 text-center py-2 px-3 bg-white/[0.02]">
                      {img.caption}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────
export function SolutionDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const solution = [...INDUSTRY_SOLUTIONS, ...USECASE_SOLUTIONS].find((s) => s.slug === slug);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  if (!solution) return <NotFound />;

  const relatedServices = SERVICES.filter((s) => solution.relevantServices.includes(s.slug));

  return (
    <div className="bg-black">
      {/* Hero */}
      <section className="relative pt-36 pb-28 overflow-hidden">
        <div className={`absolute inset-0 bg-linear-to-br ${solution.gradient} opacity-[0.07]`} />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[60px_60px] pointer-events-none" />

        <div className="relative max-w-[1300px] mx-auto px-8 lg:px-12">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            {/* Back */}
            <Link
              to="/solutions"
              className="inline-flex items-center gap-2 text-[14px] text-gray-500 hover:text-gray-300 transition-colors mb-12"
            >
              <ArrowLeft className="w-4 h-4" strokeWidth={2} />
              All Solutions
            </Link>

            {/* Category badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.07] border border-white/[0.12] mb-8 text-[12px] font-bold text-gray-300 uppercase tracking-widest">
              {solution.category === 'industry' ? 'Industry Solution' : 'Use Case Solution'}
            </div>

            <h1 className="text-6xl md:text-7xl lg:text-[90px] font-bold text-white mb-6 tracking-tight leading-none">
              {solution.title}
            </h1>
            <p className="text-2xl md:text-3xl text-gray-300 mb-8 font-light max-w-[700px] leading-relaxed">
              {solution.subtitle}
            </p>
            <p className="text-[18px] text-gray-400 max-w-[680px] leading-relaxed mb-14">
              {solution.heroTagline}
            </p>

            {/* Key benefits as pills */}
            <div className="flex flex-wrap gap-4 mb-14">
              {solution.keyBenefits.map((b) => (
                <div
                  key={b.title}
                  className="flex items-center gap-2.5 px-5 py-3 rounded-full bg-white/[0.05] border border-white/[0.1] text-[14px] font-medium text-white"
                >
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" strokeWidth={2.5} />
                  {b.title}
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <a href="mailto:info@kingsforth.net">
                <Button className={`h-14 px-8 text-[16px] font-semibold bg-linear-to-r ${solution.gradient} hover:opacity-90 text-white shadow-lg`}>
                  Book a Demo
                </Button>
              </a>
              <a href="mailto:info@kingsforth.net">
                <Button variant="outline" className="h-14 px-8 text-[16px] font-medium border-white/[0.12] text-gray-300 hover:bg-white/[0.05] hover:text-white hover:border-white/20 transition-all">
                  Contact Sales
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="py-16 border-y border-white/[0.06]">
        <div className="max-w-[1300px] mx-auto px-8 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {solution.stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="p-8 rounded-2xl bg-white/[0.03] border border-white/[0.07] text-center"
              >
                <div className={`text-[40px] lg:text-[48px] font-bold mb-2 bg-linear-to-r ${solution.gradient} bg-clip-text text-transparent leading-none`}>
                  {stat.value}
                </div>
                <div className="text-[14px] text-gray-500">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Long description */}
      <section className="py-28">
        <div className="max-w-[900px] mx-auto px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {solution.longDescription.split('\n\n').map((para, i) => (
              <p key={i} className="text-[18px] text-gray-300 leading-relaxed mb-6 last:mb-0">
                {para}
              </p>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Payload media: hero image, video, gallery */}
      <MediaSection slug={solution.slug} gradient={solution.gradient} />

      {/* Feature sections */}
      <section className="py-28 bg-linear-to-b from-zinc-950/40 to-black">
        <div className="max-w-[1300px] mx-auto px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-5 tracking-tight">
              Platform Capabilities
            </h2>
            <p className="text-xl text-gray-400 font-light">
              Purpose-built for {solution.title}
            </p>
          </motion.div>

          <div className="space-y-10">
            {solution.featureSections.map((section, i) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="grid lg:grid-cols-2 gap-10 p-10 rounded-3xl bg-linear-to-br from-white/[0.04] to-transparent border border-white/[0.07] hover:border-white/[0.12] transition-all duration-300"
              >
                <div>
                  <div className={`inline-flex items-center px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wider mb-6 bg-linear-to-r ${solution.gradient} text-white`}>
                    0{i + 1}
                  </div>
                  <h3 className="text-[28px] font-bold text-white mb-5 tracking-tight leading-snug">
                    {section.title}
                  </h3>
                  <p className="text-[17px] text-gray-400 leading-relaxed">
                    {section.description}
                  </p>
                </div>
                <div>
                  <ul className="space-y-3.5">
                    {section.points.map((point) => (
                      <li key={point} className="flex items-start gap-3.5">
                        <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" strokeWidth={2.5} />
                        <span className="text-[15px] text-gray-300 leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Related services — the underlying KTL products powering this solution */}
      {relatedServices.length > 0 && (
        <section className="py-28">
          <div className="max-w-[1300px] mx-auto px-8 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                Underlying Services
              </h2>
              <p className="text-[18px] text-gray-400 font-light">
                The KTL capabilities powering this solution
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedServices.map((svc, i) => (
                <motion.div
                  key={svc.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                  className="group"
                >
                  <Link to={`/services/${svc.slug}`}>
                    <div className="h-full p-7 rounded-2xl bg-linear-to-br from-white/[0.04] to-transparent border border-white/[0.07] hover:border-white/[0.14] transition-all duration-300 hover:-translate-y-1">
                      <div className={`h-1 rounded-full bg-linear-to-r ${svc.gradient} mb-6`} />
                      <h3 className="text-[17px] font-bold text-white mb-2 tracking-tight">{svc.title}</h3>
                      <p className="text-[13px] text-gray-500 mb-4 leading-relaxed line-clamp-2">{svc.shortDescription}</p>
                      <div className="flex items-center gap-1.5 text-[13px] text-violet-400 group-hover:text-violet-300 transition-colors">
                        Explore service <ChevronRight className="w-3.5 h-3.5" strokeWidth={2} />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="py-28 bg-linear-to-b from-zinc-950/40 to-black">
        <div className="max-w-[860px] mx-auto px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-5 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className={`text-[18px] font-light bg-linear-to-r ${solution.gradient} bg-clip-text text-transparent`}>
              Common questions about the {solution.title} solution
            </p>
          </motion.div>

          <div className="space-y-3">
            {solution.faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              >
                <button
                  type="button"
                  onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                  className="w-full text-left p-7 rounded-2xl bg-linear-to-br from-white/[0.04] to-transparent border border-white/[0.08] hover:border-white/[0.14] transition-all duration-200 group"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-[18px] font-semibold text-white group-hover:text-violet-300 transition-colors leading-snug">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-500 shrink-0 transition-transform duration-300 ${openFAQ === i ? 'rotate-180' : ''}`}
                      strokeWidth={2}
                    />
                  </div>
                  <AnimatePresence>
                    {openFAQ === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <p className="mt-5 text-[16px] text-gray-400 leading-relaxed pr-8">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 border-t border-white/[0.05]">
        <div className="max-w-[700px] mx-auto px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              Deploy for {solution.title}
            </h2>
            <p className="text-[17px] text-gray-400 mb-10 leading-relaxed">
              Our team designs and deploys tailored implementations for your specific environment and requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="mailto:info@kingsforth.net">
                <Button className={`h-14 px-10 text-[16px] font-semibold bg-linear-to-r ${solution.gradient} hover:opacity-90 text-white shadow-lg`}>
                  Book a Demo
                </Button>
              </a>
              <Link to="/solutions">
                <Button variant="outline" className="h-14 px-10 text-[16px] border-white/[0.12] text-gray-300 hover:bg-white/[0.05] hover:border-white/20 hover:text-white transition-all">
                  All Solutions
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
