import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Check, ChevronDown, ChevronRight, Tag, Images } from 'lucide-react';
import { SERVICES, type Service } from '../data/services';
import { Button } from '../components/ui/button';
import { usePayloadMedia, getYouTubeEmbedUrl } from '../hooks/usePayloadMedia';

function NotFound() {
  return (
    <div className="min-h-screen pt-32 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Service Not Found</h1>
        <Link to="/services" className="text-violet-400 hover:text-violet-300">← Back to Services</Link>
      </div>
    </div>
  );
}

// ── Media section — renders Payload-managed hero image, video, and gallery ──
function MediaSection({ slug, gradient }: { slug: string; gradient: string }) {
  const { data, loading } = usePayloadMedia('services', slug);

  if (loading) return null;
  const hasContent =
    data?.heroImageUrl || data?.heroVideoUrl || (data?.galleryImages?.length ?? 0) > 0;
  if (!hasContent) return null;

  return (
    <section className="py-12 bg-black">
      <div className="max-w-[1300px] mx-auto px-8 lg:px-12 space-y-10">
        {/* Hero Image */}
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
              alt="Service overview"
              className="w-full h-auto object-cover max-h-[560px]"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent pointer-events-none" />
          </motion.div>
        )}

        {/* YouTube Video */}
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
                title="Service overview video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </motion.div>
        )}

        {/* Gallery */}
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

// ── Pricing section ──────────────────────────────────────────────────────────
function PricingSection({ service }: { service: Service }) {
  const [discounts, setDiscounts] = useState<Record<string, number>>({ Plus: 0, Pro: 0, Enterprise: 0 });
  const [editingDiscount, setEditingDiscount] = useState<string | null>(null);
  const [discountInput, setDiscountInput] = useState('');

  const applyDiscount = (planName: string) => {
    const val = Math.min(90, Math.max(0, Number(discountInput) || 0));
    setDiscounts((prev) => ({ ...prev, [planName]: val }));
    setEditingDiscount(null);
    setDiscountInput('');
  };

  const discountedPrice = (price: number | 'Custom', planName: string): string => {
    if (price === 'Custom') return 'Custom';
    const disc = discounts[planName] ?? 0;
    if (disc === 0) return `$${price.toLocaleString()}`;
    return `$${Math.round(price * (1 - disc / 100)).toLocaleString()}`;
  };

  return (
    <section className="py-28 bg-linear-to-b from-black via-zinc-950/60 to-black">
      <div className="max-w-[1200px] mx-auto px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-5 tracking-tight">
            Choose Your Plan
          </h2>
          <p className="text-xl text-gray-400 font-light">
            Billed monthly. Cancel or upgrade anytime.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {service.defaultPlans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              className={`relative ${plan.isRecommended ? 'md:-mt-6 md:mb-6' : ''}`}
            >
              {plan.badge && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-10">
                  <div className={`px-5 py-1.5 rounded-full bg-linear-to-r ${service.gradient} text-[11px] font-bold text-white uppercase tracking-widest shadow-lg`}>
                    {plan.badge}
                  </div>
                </div>
              )}

              <div className={`relative h-full p-10 rounded-3xl backdrop-blur-sm transition-all duration-300 flex flex-col ${
                plan.isRecommended
                  ? 'bg-linear-to-br from-white/[0.07] to-white/[0.02] border-2 border-white/20 shadow-2xl'
                  : 'bg-linear-to-br from-white/[0.04] to-transparent border border-white/[0.08] hover:border-white/[0.14]'
              }`}>
                {plan.isRecommended && (
                  <div className={`absolute inset-0 rounded-3xl bg-linear-to-br ${service.gradient} opacity-[0.05] blur-3xl`} />
                )}

                <div className="relative flex-1">
                  <h3 className="text-[32px] font-bold text-white mb-1 tracking-tight">{plan.name}</h3>
                  <p className="text-[14px] text-gray-500 mb-8">{plan.tagline}</p>

                  <div className="mb-8">
                    {plan.price === 'Custom' ? (
                      <div className="text-[42px] font-bold text-white leading-none">Custom</div>
                    ) : (
                      <>
                        {(discounts[plan.name] ?? 0) > 0 && (
                          <div className="flex items-center gap-3 mb-1">
                            <span className="text-[18px] text-gray-600 line-through">${(plan.price as number).toLocaleString()}</span>
                            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-linear-to-r ${service.gradient} text-white`}>
                              <Tag className="w-3 h-3" />{discounts[plan.name]}% OFF
                            </span>
                          </div>
                        )}
                        <div className="flex items-baseline gap-2">
                          <span className="text-[48px] font-bold text-white leading-none">
                            {discountedPrice(plan.price, plan.name)}
                          </span>
                          <span className="text-[16px] text-gray-500">/month</span>
                        </div>
                      </>
                    )}
                  </div>

                  {plan.price !== 'Custom' && (
                    <div className="mb-8">
                      {editingDiscount === plan.name ? (
                        <div className="flex items-center gap-2">
                          <input
                            type="number" min="0" max="90"
                            value={discountInput}
                            onChange={(e) => setDiscountInput(e.target.value)}
                            placeholder="0–90"
                            className="w-24 h-9 px-3 rounded-lg bg-white/[0.06] border border-white/10 text-white text-[14px] focus:outline-none focus:border-violet-500/50"
                            autoFocus
                          />
                          <span className="text-gray-500 text-[13px]">% off</span>
                          <button
                            type="button"
                            onClick={() => applyDiscount(plan.name)}
                            className={`px-4 py-1.5 rounded-lg text-[12px] font-semibold text-white bg-linear-to-r ${service.gradient}`}
                          >Apply</button>
                          <button type="button" onClick={() => setEditingDiscount(null)} className="text-gray-600 text-[12px] hover:text-gray-400">Cancel</button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => { setEditingDiscount(plan.name); setDiscountInput(String(discounts[plan.name] ?? 0)); }}
                          className="flex items-center gap-1.5 text-[13px] text-gray-500 hover:text-gray-300 transition-colors"
                        >
                          <Tag className="w-3.5 h-3.5" />
                          {(discounts[plan.name] ?? 0) > 0 ? `Discount: ${discounts[plan.name]}% — Edit` : 'Set Discount'}
                        </button>
                      )}
                    </div>
                  )}

                  <ul className="space-y-3.5 mb-10">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" strokeWidth={2.5} />
                        <span className="text-[15px] text-gray-300 leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a href="mailto:info@kingsforth.net" className="block">
                  <Button className={`w-full h-13 text-[15px] font-semibold tracking-wide transition-all duration-200 ${
                    plan.isRecommended
                      ? `bg-linear-to-r ${service.gradient} hover:opacity-90 text-white shadow-lg`
                      : 'bg-white/[0.05] hover:bg-white/[0.09] text-white border border-white/[0.1]'
                  }`}>
                    {plan.cta}
                  </Button>
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-[13px] text-gray-600 mt-10">
          All plans include secure data encryption and onboarding support. Enterprise SLAs available on request.
        </p>
      </div>
    </section>
  );
}

// ── FAQ accordion ─────────────────────────────────────────────────────────────
function FAQSection({ faqs, gradient }: { faqs: Service['faqs']; gradient: string }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-28 bg-black">
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
          <p className={`text-[18px] font-light bg-linear-to-r ${gradient} bg-clip-text text-transparent`}>
            Common questions answered clearly.
          </p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <button
                type="button"
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full text-left p-7 rounded-2xl bg-linear-to-br from-white/[0.04] to-transparent border border-white/[0.08] hover:border-white/[0.14] transition-all duration-200 group"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[18px] font-semibold text-white group-hover:text-violet-300 transition-colors leading-snug">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 shrink-0 transition-transform duration-300 ${open === i ? 'rotate-180' : ''}`}
                    strokeWidth={2}
                  />
                </div>
                <AnimatePresence>
                  {open === i && (
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
  );
}

// ── Main export ───────────────────────────────────────────────────────────────
export function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const service = SERVICES.find((s) => s.slug === slug);

  if (!service) return <NotFound />;

  return (
    <div className="bg-black">
      {/* Hero */}
      <section className="relative pt-36 pb-28 overflow-hidden">
        <div className={`absolute inset-0 bg-linear-to-br ${service.gradient} opacity-[0.07]`} />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[60px_60px] pointer-events-none" />

        <div className="relative max-w-[1300px] mx-auto px-8 lg:px-12">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            {/* Back */}
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-[14px] text-gray-500 hover:text-gray-300 transition-colors mb-12"
            >
              <ArrowLeft className="w-4 h-4" strokeWidth={2} />
              All Services
            </Link>

            {/* Category badge */}
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r ${service.gradient} opacity-90 mb-8 text-[12px] font-bold text-white uppercase tracking-widest`}>
              {service.category}
            </div>

            <h1 className="text-6xl md:text-7xl lg:text-[90px] font-bold text-white mb-6 tracking-tight leading-none">
              {service.title}
            </h1>
            <p className="text-2xl md:text-3xl text-gray-300 mb-8 font-light max-w-[700px] leading-relaxed">
              {service.subtitle}
            </p>
            <p className="text-[18px] text-gray-400 max-w-[680px] leading-relaxed mb-14">
              {service.shortDescription}
            </p>

            <div className="flex flex-wrap gap-4">
              <a href="mailto:info@kingsforth.net">
                <Button className={`h-14 px-8 text-[16px] font-semibold bg-linear-to-r ${service.gradient} hover:opacity-90 text-white shadow-lg`}>
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

      {/* Key metrics bar */}
      <section className="py-16 border-y border-white/[0.06]">
        <div className="max-w-[1300px] mx-auto px-8 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {service.keyMetrics.map((metric, i) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="p-8 rounded-2xl bg-white/[0.03] border border-white/[0.07] text-center"
              >
                <div className={`text-[40px] lg:text-[48px] font-bold mb-2 bg-linear-to-r ${service.gradient} bg-clip-text text-transparent leading-none`}>
                  {metric.value}
                </div>
                <div className="text-[14px] text-gray-500">{metric.label}</div>
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
            {service.longDescription.split('\n\n').map((para, i) => (
              <p key={i} className="text-[18px] text-gray-300 leading-relaxed mb-6 last:mb-0">
                {para}
              </p>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Payload media: hero image, video, gallery */}
      <MediaSection slug={service.slug} gradient={service.gradient} />

      {/* Capabilities grid */}
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
              Capabilities
            </h2>
            <p className="text-xl text-gray-400 font-light">
              Everything included in {service.title}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
            {service.features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.07 }}
                className="p-8 rounded-2xl bg-linear-to-br from-white/[0.05] to-white/[0.01] border border-white/[0.08] hover:border-white/[0.14] transition-all duration-300 group"
              >
                <div className={`w-10 h-10 rounded-xl bg-linear-to-br ${service.gradient} mb-6 flex items-center justify-center opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300`}>
                  <Check className="w-5 h-5 text-white" strokeWidth={2.5} />
                </div>
                <h3 className="text-[20px] font-bold text-white mb-3 tracking-tight">{feature.title}</h3>
                <p className="text-[15px] text-gray-400 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-28">
        <div className="max-w-[1100px] mx-auto px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-5 tracking-tight">
              How It Works
            </h2>
            <p className="text-xl text-gray-400 font-light">
              From deployment to full operational capability
            </p>
          </motion.div>

          <div className="space-y-8">
            {service.howItWorks.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="flex gap-8 items-start"
              >
                <div className={`shrink-0 w-16 h-16 rounded-2xl bg-linear-to-br ${service.gradient} flex items-center justify-center text-[22px] font-bold text-white shadow-lg`}>
                  {step.step}
                </div>
                <div className="flex-1 p-8 rounded-2xl bg-linear-to-br from-white/[0.04] to-transparent border border-white/[0.07]">
                  <h3 className="text-[22px] font-bold text-white mb-3 tracking-tight">{step.title}</h3>
                  <p className="text-[16px] text-gray-400 leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use cases */}
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
              Use Cases
            </h2>
            <p className="text-xl text-gray-400 font-light">
              Where {service.title} creates impact
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {service.useCases.map((uc, i) => (
              <motion.div
                key={uc.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.07 }}
                className="p-8 rounded-2xl bg-linear-to-br from-white/[0.04] to-transparent border border-white/[0.07] hover:border-white/[0.12] transition-all duration-200 flex gap-5"
              >
                <ChevronRight className={`w-6 h-6 shrink-0 mt-0.5 bg-linear-to-r ${service.gradient} bg-clip-text text-transparent`} strokeWidth={2.5} />
                <div>
                  <h3 className="text-[19px] font-bold text-white mb-2 tracking-tight">{uc.title}</h3>
                  <p className="text-[15px] text-gray-400 leading-relaxed">{uc.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <PricingSection service={service} />

      {/* FAQ */}
      <FAQSection faqs={service.faqs} gradient={service.gradient} />

      {/* Final CTA */}
      <section className="py-24 bg-linear-to-b from-zinc-950/30 to-black border-t border-white/[0.05]">
        <div className="max-w-[700px] mx-auto px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              Ready to deploy {service.title}?
            </h2>
            <p className="text-[17px] text-gray-400 mb-10 leading-relaxed">
              Our implementation team can have you operational within weeks. Contact us to begin your deployment assessment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="mailto:info@kingsforth.net">
                <Button className={`h-14 px-10 text-[16px] font-semibold bg-linear-to-r ${service.gradient} hover:opacity-90 text-white shadow-lg`}>
                  Book a Demo
                </Button>
              </a>
              <Link to="/services">
                <Button variant="outline" className="h-14 px-10 text-[16px] border-white/[0.12] text-gray-300 hover:bg-white/[0.05] hover:border-white/20 hover:text-white transition-all">
                  Explore All Services
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
