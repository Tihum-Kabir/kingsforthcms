// Auto-seed module — called from payload.config.ts onInit.
// No @payload-config import → no circular dependency.
import type { Payload } from 'payload';
import { SERVICES_DATA } from '../data/services-data';
import { ALL_SOLUTIONS } from '../data/solutions-data';

function lex(text: string) {
    return {
        root: {
            type: 'root', format: '' as const, indent: 0, version: 1, direction: null,
            children: text.split('\n\n').filter(Boolean).map((para) => ({
                type: 'paragraph', format: '' as const, indent: 0, version: 1, direction: null,
                children: [{ mode: 'normal', text: para.trim(), type: 'text', style: '', detail: 0, format: 0, version: 1 }],
            })),
        },
    };
}

export async function autoSeedAll(payload: Payload) {
    try {
        // ── SERVICES ──────────────────────────────────────────────────
        const { totalDocs: serviceCount } = await payload.count({
            collection: 'services',
            overrideAccess: true,
        });

        if (serviceCount === 0) {
            payload.logger.info('[auto-seed] No services found — seeding...');
            for (const svc of SERVICES_DATA) {
                await payload.create({
                    collection: 'services',
                    overrideAccess: true,
                    data: {
                        slug: svc.slug,
                        title: svc.title,
                        subtitle: svc.subtitle,
                        description: lex(svc.descriptionText),
                        category: svc.category as any,
                        colorTheme: svc.colorTheme as any,
                        orderIndex: svc.orderIndex,
                        isPublished: svc.isPublished,
                        features: svc.features,
                        plans: svc.plans as any,
                    } as any,
                });
            }
            payload.logger.info(`[auto-seed] Seeded ${SERVICES_DATA.length} services.`);
        }

        // ── SOLUTIONS ─────────────────────────────────────────────────
        const { totalDocs: solutionCount } = await payload.count({
            collection: 'solutions',
            overrideAccess: true,
        });

        if (solutionCount === 0) {
            payload.logger.info('[auto-seed] No solutions found — seeding...');
            for (const sol of ALL_SOLUTIONS) {
                await payload.create({
                    collection: 'solutions',
                    overrideAccess: true,
                    data: {
                        slug: sol.slug,
                        title: sol.title,
                        category: sol.category as any,
                        isPublished: true,
                        subtitle: sol.subtitle,
                        shortDescription: sol.shortDescription,
                        longDescription: lex(sol.longDescription),
                        keyBenefits: sol.keyBenefits.map((b) => ({
                            title: b.title,
                            description: b.description,
                        })),
                        stats: sol.stats.map((s) => ({
                            value: s.value,
                            label: s.label,
                        })),
                        featureSections: sol.featureSections.map((fs) => ({
                            title: fs.title,
                            description: fs.description,
                            points: fs.points.map((p) => ({ point: p })),
                        })),
                        faqs: sol.faqs.map((f) => ({
                            question: f.question,
                            answer: f.answer,
                        })),
                    } as any,
                });
            }
            payload.logger.info(`[auto-seed] Seeded ${ALL_SOLUTIONS.length} solutions.`);
        }
        // ── TEAM MEMBERS ───────────────────────────────────────
        const { totalDocs: teamCount } = await payload.count({
            collection: 'team-members',
            overrideAccess: true,
        });

        if (teamCount === 0) {
            payload.logger.info('[auto-seed] No team members found — seeding...');
            const TEAM = [
                {
                    name: 'Asif Mahbub',
                    role: 'Co-Founder & CEO',
                    motto: 'Intelligence without action is just observation.',
                    bio: 'Leading Kingsforth\'s vision for autonomous enterprise intelligence. Deep expertise in cognitive AI systems, enterprise security architecture, and scalable infrastructure across South Asia.',
                    sortOrder: 1,
                },
                {
                    name: 'Shoaib Bin Noor',
                    role: 'Co-Founder & CTO',
                    motto: 'The best security system is one that never sleeps.',
                    bio: 'Architect of Kingsforth\'s core AI inference engine. Specialist in real-time video analytics, distributed sensor networks, and edge computing deployments.',
                    sortOrder: 2,
                },
                {
                    name: 'Arifin Islam',
                    role: 'Co-Founder & COO',
                    motto: 'Execution separates vision from reality.',
                    bio: 'Overseeing enterprise client deployments, partner integrations, and operational excellence across all active Kingsforth installations in the region.',
                    sortOrder: 3,
                },
            ];
            for (const member of TEAM) {
                await payload.create({ collection: 'team-members', overrideAccess: true, data: member as any });
            }
            payload.logger.info(`[auto-seed] Seeded ${TEAM.length} team members.`);
        }

        // ── FAQS ──────────────────────────────────────────────
        const { totalDocs: faqCount } = await payload.count({
            collection: 'faqs',
            overrideAccess: true,
        });

        if (faqCount === 0) {
            payload.logger.info('[auto-seed] No FAQs found — seeding...');
            const FAQS = [
                { question: 'What is Kingsforth Technologies?', answer: 'Kingsforth is an enterprise AI intelligence company that builds cognitive security infrastructure. We convert raw sensor data, video feeds, and operational inputs into autonomous decisions through services like Big Data Forensics, Cognitive Surveillance, and AI Agentic SaaS.', category: 'General', sortOrder: 1 },
                { question: 'How does your AI surveillance system work?', answer: 'Our Cognitive Surveillance platform processes video streams in real-time using proprietary neural networks trained on millions of security scenarios. It detects anomalies, identifies threats, and triggers autonomous responses — all within sub-2ms latency.', category: 'Product', sortOrder: 2 },
                { question: 'What industries do you serve?', answer: 'We serve cities and government, corporate enterprise, healthcare, education, financial services, and critical infrastructure sectors. Our modular architecture adapts to any environment requiring high-fidelity autonomous security.', category: 'General', sortOrder: 3 },
                { question: 'Is the platform GDPR and data privacy compliant?', answer: 'Yes. Kingsforth operates with privacy-by-design principles. All data processing can be configured for on-premise or hybrid cloud deployment. We hold SOC 2 Type II, ISO 27001, and GDPR compliance certifications.', category: 'Compliance', sortOrder: 4 },
                { question: 'What is your implementation timeline?', answer: 'Most enterprise deployments go live within 6–12 weeks. Our rapid deployment framework includes hardware provisioning, AI model fine-tuning, integration testing, and team training. We offer 24/7 deployment support.', category: 'Technical', sortOrder: 5 },
                { question: 'Do you offer a proof of concept or trial?', answer: 'Yes. We offer a structured 30-day proof of concept for qualified enterprise prospects. This includes a fully operational pilot deployment at your site with live performance benchmarking.', category: 'Sales', sortOrder: 6 },
                { question: 'How does pricing work?', answer: 'Kingsforth uses a node-based subscription model. Pricing depends on the number of active sensors, data throughput, selected services, and support tier. Contact our team for a custom quote tailored to your environment.', category: 'Billing', sortOrder: 7 },
                { question: 'What makes Kingsforth different from traditional security vendors?', answer: "Traditional vendors provide reactive tools. Kingsforth delivers proactive autonomous intelligence. Our systems don't just alert — they analyze, decide, and act. We combine AI, IoT orchestration, and big data forensics into a unified cognitive platform.", category: 'General', sortOrder: 8 },
                { question: 'Can the platform integrate with our existing infrastructure?', answer: 'Yes. Kingsforth provides REST and gRPC APIs, webhook support, and pre-built connectors for major SIEM, PSIM, and access control systems. Our integration team handles custom adaptors for legacy infrastructure at no additional cost.', category: 'Technical', sortOrder: 9 },
                { question: 'What level of support is included?', answer: 'All enterprise plans include a dedicated account manager, 24/7 NOC monitoring, and a 99.95% uptime SLA. The Plus and Pro tiers include business-hours support with 4-hour response SLAs. Enterprise tier includes a dedicated on-site support engineer during deployment.', category: 'Support', sortOrder: 10 },
            ];
            for (const faq of FAQS) {
                await payload.create({ collection: 'faqs', overrideAccess: true, data: faq as any });
            }
            payload.logger.info(`[auto-seed] Seeded ${FAQS.length} FAQs.`);
        }

    } catch (err) {
        payload.logger.error('[auto-seed] Error: ' + String(err));
    }
}
