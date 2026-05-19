import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { HelpCircle } from 'lucide-react';
import { FAQAccordion } from './_FAQAccordion';

export const metadata = {
    title: 'FAQs | Kingsforth',
    description: 'Find answers about our technology, integration process, and enterprise support.',
};

const fallbackFaqs = [
    { question: 'What is Kingsforth Technologies?', answer: 'Kingsforth is an enterprise AI intelligence company that builds cognitive security infrastructure. We convert raw sensor data, video feeds, and operational inputs into autonomous decisions through services like Big Data Forensics, Cognitive Surveillance, and AI Agentic SaaS.' },
    { question: 'How does your AI surveillance system work?', answer: 'Our Cognitive Surveillance platform processes video streams in real-time using proprietary neural networks trained on millions of security scenarios. It detects anomalies, identifies threats, and triggers autonomous responses all within sub-2ms latency.' },
    { question: 'What industries do you serve?', answer: 'We serve cities and government, corporate enterprise, healthcare, education, financial services, and critical infrastructure sectors. Our modular architecture adapts to any environment requiring high-fidelity autonomous security.' },
    { question: 'Is the platform GDPR and data privacy compliant?', answer: 'Yes. Kingsforth operates with privacy-by-design principles. All data processing can be configured for on-premise or hybrid cloud deployment. We hold SOC 2 Type II, ISO 27001, and GDPR compliance certifications.' },
    { question: 'What is your implementation timeline?', answer: 'Most enterprise deployments go live within 6–12 weeks. Our rapid deployment framework includes hardware provisioning, AI model fine-tuning, integration testing, and team training. We offer 24/7 deployment support.' },
    { question: 'Do you offer a proof of concept or trial?', answer: 'Yes. We offer a structured 30-day proof of concept for qualified enterprise prospects. This includes a fully operational pilot deployment at your site with live performance benchmarking.' },
    { question: 'How does pricing work?', answer: 'Kingsforth uses a node-based subscription model. Pricing depends on the number of active sensors, data throughput, selected services, and support tier. Contact our team for a custom quote tailored to your environment.' },
    { question: 'What makes Kingsforth different from traditional security vendors?', answer: "Traditional vendors provide reactive tools. Kingsforth delivers proactive autonomous intelligence. Our systems don't just alert — they analyze, decide, and act. We combine AI, IoT orchestration, and big data forensics into a unified cognitive platform." },
];

export default async function FAQsPage() {
    let faqs: { question: string; answer: string }[] = [];
    try {
        const payload = await getPayload({ config: configPromise });
        try {
            const result = await payload.find({ collection: 'faqs', sort: 'sortOrder', limit: 100 });
            faqs = result.docs.map((doc: any) => ({ question: doc.question, answer: doc.answer }));
        } catch {}
    } catch {}

    if (faqs.length === 0) faqs = fallbackFaqs;

    return (
        <main className="min-h-screen text-foreground relative z-10 pt-32 pb-24">
            <div className="max-w-4xl mx-auto px-6">
                {/* Hero */}
                <div className="text-center mb-16 bg-white/70 dark:bg-black/75 rounded-3xl shadow-2xl border border-white/50 dark:border-white/10 p-12 transition-colors duration-700">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 shadow-lg mb-6">
                        <HelpCircle className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                        <span className="text-sm font-semibold text-slate-800 dark:text-gray-200 tracking-wide uppercase">Support Center</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 dark:text-white mb-6 transition-colors duration-700">
                        Frequently Asked{' '}
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-600 to-indigo-600 dark:from-cyan-400 dark:to-indigo-400">
                            Questions
                        </span>
                    </h1>
                    <p className="text-xl text-slate-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed font-light transition-colors duration-700">
                        Find answers about our technology, integration process, and enterprise support.
                    </p>
                </div>

                <FAQAccordion faqs={faqs} />
            </div>
        </main>
    );
}
