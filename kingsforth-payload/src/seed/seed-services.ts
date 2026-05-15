import { getPayload } from 'payload';
import configPromise from '@payload-config';
import 'dotenv/config';

const lex = (text: string) => ({
    root: {
        type: 'root', format: '' as const, indent: 0, version: 1, direction: null,
        children: [{
            type: 'paragraph', format: '' as const, indent: 0, version: 1, direction: null,
            children: [{ mode: 'normal', text, type: 'text', style: '', detail: 0, format: 0, version: 1 }]
        }]
    }
});

const makePlans = (base: [number, number, number]) => [
    {
        name: 'Plus',
        monthlyPrice: base[0],
        semiAnnualPrice: Math.round(base[0] * 6 * 0.9),
        annualPrice: Math.round(base[0] * 12 * 0.8),
        description: 'Essential capabilities for smaller operations.',
        isPopular: false, badge: '',
        planFeatures: [
            { feature: 'Up to 16 nodes', included: true },
            { feature: 'Standard analytics', included: true },
            { feature: 'Email support (48h SLA)', included: true },
            { feature: 'Cloud dashboard', included: true },
            { feature: 'Real-time alerts', included: false },
            { feature: 'Custom integrations', included: false },
            { feature: 'Dedicated account manager', included: false },
        ]
    },
    {
        name: 'Pro',
        monthlyPrice: base[1],
        semiAnnualPrice: Math.round(base[1] * 6 * 0.85),
        annualPrice: Math.round(base[1] * 12 * 0.75),
        description: 'Advanced capabilities for growing teams.',
        isPopular: true, badge: 'Most Popular',
        planFeatures: [
            { feature: 'Up to 64 nodes', included: true },
            { feature: 'Advanced analytics', included: true },
            { feature: 'Priority support (12h SLA)', included: true },
            { feature: 'Cloud + Edge dashboard', included: true },
            { feature: 'Real-time alerts', included: true },
            { feature: 'API access', included: true },
            { feature: 'Dedicated account manager', included: false },
        ]
    },
    {
        name: 'Enterprise',
        monthlyPrice: base[2],
        semiAnnualPrice: Math.round(base[2] * 6 * 0.8),
        annualPrice: Math.round(base[2] * 12 * 0.7),
        description: 'Unlimited scale with custom deployment.',
        isPopular: false, badge: 'Best Value',
        planFeatures: [
            { feature: 'Unlimited nodes', included: true },
            { feature: 'Custom analytics', included: true },
            { feature: '24/7 dedicated support', included: true },
            { feature: 'On-premise + Cloud + Edge', included: true },
            { feature: 'Instant multi-channel alerts', included: true },
            { feature: 'Full API + Webhook integrations', included: true },
            { feature: 'Dedicated account manager', included: true },
        ]
    }
];

const SERVICES = [
    {
        slug: 'big-data-forensic',
        title: 'Big Data Forensic',
        subtitle: 'Search terabytes of footage in seconds',
        description: lex('What takes human investigators days, Kingsforth does in seconds. Supply a semantic query like "Find the red truck at the north gate at 3AM" and our LLM-backed video parser isolates all relevant timestamps. Every visual object is indexed into searchable database metrics upon recording, enabling natural language search across video, audio, and sensor logs.'),
        category: 'forensic' as any,
        orderIndex: 1,
        isPublished: true,
        features: [
            { title: 'Natural Language Search', description: 'Query footage using plain English — no technical knowledge required.' },
            { title: 'Pattern Recognition', description: 'AI models detect recurring visual patterns across months of archived footage instantly.' },
            { title: 'Evidence Export', description: 'Generate court-ready evidence packages with timestamp verification and chain of custody logs.' },
        ],
        plans: makePlans([159, 399, 999]),
    },
    {
        slug: 'cognitive-surveillance',
        title: 'Cognitive Surveillance',
        subtitle: 'Beyond recording — real-time video intelligence',
        description: lex('Kingsforth analyzes video feeds in real-time to detect threats, compliance violations, and operational inefficiencies before they escalate. Our AI models process thousands of frames per second, identifying anomalies that human operators would miss. From retail environments to critical infrastructure, Cognitive Surveillance transforms passive cameras into active security agents.'),
        category: 'surveillance' as any,
        orderIndex: 2,
        isPublished: true,
        features: [
            { title: 'Anomaly Detection', description: 'Instantly flags unusual behavior patterns, unauthorized access, and policy violations across all camera feeds.' },
            { title: 'Facial Recognition', description: 'Identity verification for access control, VIP recognition, and watchlist alerting with privacy-compliant processing.' },
            { title: 'Safety Compliance', description: 'Automated PPE verification, safety zone monitoring, and protocol adherence checks in industrial environments.' },
        ],
        plans: makePlans([149, 399, 999]),
    },
    {
        slug: 'autonomous-field-ops',
        title: 'Autonomous Field Ops',
        subtitle: 'Physical response without human latency',
        description: lex('Robotic Process Automation that handles critical physical response protocols. From drone dispatch to automated lockdown procedures, Autonomous Field Ops eliminates human latency from security response. Integrate with physical infrastructure — doors, barriers, drones, alarms — to execute predefined response sequences the moment a threat is classified.'),
        category: 'automation' as any,
        orderIndex: 3,
        isPublished: true,
        features: [
            { title: 'Drone Command', description: 'Automatic drone dispatch to incident coordinates with live video relay to command center.' },
            { title: 'Automated Lockdowns', description: 'Zone-specific lockdowns triggered on threat classification — doors, barriers, and alarms managed automatically.' },
            { title: 'Asset Tracking', description: 'Real-time GPS and visual tracking of vehicles, personnel, and high-value assets across facilities.' },
        ],
        plans: makePlans([299, 749, 1499]),
    },
    {
        slug: 'ai-agentic-saas',
        title: 'AI Agentic SaaS',
        subtitle: 'Self-evolving agents that run your workflows',
        description: lex('Self-evolving software agents manage enterprise workflows autonomously. Our agents learn from your operational data to predict bottlenecks and execute solutions without human intervention. Deploy purpose-built AI agents for procurement, compliance, IT ops, and security reporting — each agent adapts to your specific environment and improves over time.'),
        category: 'automation' as any,
        orderIndex: 4,
        isPublished: true,
        features: [
            { title: 'Predictive Maintenance', description: 'Agents monitor system health metrics and initiate maintenance tasks before failures occur.' },
            { title: 'Workflow Automation', description: 'Multi-step business processes executed autonomously with full audit trails and rollback capability.' },
            { title: 'Self-Healing Code', description: 'Agents detect runtime anomalies in your software stack and apply patches without downtime.' },
        ],
        plans: makePlans([199, 499, 1299]),
    },
    {
        slug: 'iot-orchestration',
        title: 'IoT Orchestration',
        subtitle: 'Unify every sensor into one intelligent nervous system',
        description: lex('Unifying fragmented hardware sensors into a single, responsive nervous system. Our orchestration layer brings legacy hardware into the modern age with millisecond-latency communication. Connect cameras, access controls, environmental sensors, and industrial IoT devices under one cognitive platform — enabling cross-device correlation and coordinated autonomous response.'),
        category: 'iot' as any,
        orderIndex: 5,
        isPublished: true,
        features: [
            { title: 'Sensor Fusion', description: 'Combines data streams from heterogeneous sensors into unified situational awareness.' },
            { title: 'Edge Computing', description: 'On-device inference reduces latency to sub-millisecond and operates independently of cloud connectivity.' },
            { title: 'Real-Time Telemetry', description: 'Continuous health monitoring and data streaming from all connected devices to central dashboard.' },
        ],
        plans: makePlans([179, 449, 1099]),
    },
    {
        slug: 'go-to-market-expert',
        title: 'Go-to-Market Expert',
        subtitle: 'Strategic guidance for technology launch and growth',
        description: lex('Strategic guidance to launch your security technology product successfully. We align your technology with market needs to ensure rapid adoption and sustainable growth. Our consultants bring deep expertise in enterprise security markets — from positioning and pricing strategy to partnership development and channel sales — turning your innovation into revenue.'),
        category: 'consulting' as any,
        orderIndex: 6,
        isPublished: true,
        features: [
            { title: 'Market Analysis', description: 'Comprehensive competitive landscape analysis and target segment identification for your security product.' },
            { title: 'Launch Strategy', description: 'End-to-end go-to-market playbook covering messaging, channel selection, and launch sequencing.' },
            { title: 'Growth Hacking', description: 'Data-driven growth experiments to accelerate enterprise pipeline and reduce customer acquisition cost.' },
        ],
        plans: makePlans([99, 249, 699]),
    },
];

async function run() {
    console.log('Connecting to Payload...');
    const payload = await getPayload({ config: configPromise });

    console.log('Deleting all existing services...');
    let page;
    do {
        page = await payload.find({ collection: 'services', limit: 100, overrideAccess: true });
        for (const doc of page.docs) {
            await payload.delete({ collection: 'services', id: doc.id, overrideAccess: true });
        }
    } while (page.hasNextPage);
    console.log('All services deleted.');

    console.log('Creating 6 canonical services...');
    for (const svc of SERVICES) {
        await payload.create({ collection: 'services', data: svc, overrideAccess: true });
        console.log(`  ✓ ${svc.title}`);
    }

    console.log('\nDone. 6 services seeded.');
    process.exit(0);
}

run().catch((err) => { console.error(err); process.exit(1); });
