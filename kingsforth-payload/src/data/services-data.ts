// Raw service data — no Payload imports. Used by auto-seed and seed scripts.

export type PlanFeature = { feature: string; included: boolean };

export interface PlanData {
    name: string;
    monthlyPrice: number;
    annualPrice: number;
    description: string;
    isPopular: boolean;
    badge: string;
    discountNote: string;
    ctaLabel: string;
    planFeatures: PlanFeature[];
}

export interface HowItWorksStep {
    step: number;
    title: string;
    description: string;
    iconName: string;
}

export interface ServiceData {
    slug: string;
    title: string;
    subtitle: string;
    descriptionText: string;
    category: string;
    colorTheme: string;
    orderIndex: number;
    isPublished: boolean;
    iconName: string;
    stats: { value: string; label: string }[];
    howItWorks: HowItWorksStep[];
    features: { title: string; description: string }[];
    plans: PlanData[];
}

function makePlans(
    plusBase: number,
    proBase: number,
    plusFeatures: PlanFeature[],
    proFeatures: PlanFeature[],
    enterpriseFeatures: PlanFeature[],
): PlanData[] {
    return [
        {
            name: 'Plus',
            monthlyPrice: plusBase,
            annualPrice: Math.round(plusBase * 12 * 0.8),
            description: 'Essential capabilities for smaller operations.',
            isPopular: false,
            badge: '',
            discountNote: '',
            ctaLabel: 'Get Started',
            planFeatures: plusFeatures,
        },
        {
            name: 'Pro',
            monthlyPrice: proBase,
            annualPrice: Math.round(proBase * 12 * 0.75),
            description: 'Advanced capabilities for growing teams.',
            isPopular: true,
            badge: 'Most Popular',
            discountNote: '',
            ctaLabel: 'Get Started',
            planFeatures: proFeatures,
        },
        {
            name: 'Enterprise',
            monthlyPrice: 0,
            annualPrice: 0,
            description: 'Unlimited scale with custom deployment and dedicated support.',
            isPopular: false,
            badge: '',
            discountNote: '',
            ctaLabel: 'Contact Sales',
            planFeatures: enterpriseFeatures,
        },
    ];
}

export const SERVICES_DATA: ServiceData[] = [
    {
        slug: 'big-data-forensic',
        title: 'Big Data Forensic',
        subtitle: 'Search terabytes of footage in seconds',
        descriptionText: 'What takes human investigators days, Kingsforth does in seconds. Supply a semantic query like "Find the red truck at the north gate at 3AM" and our LLM-backed video parser isolates all relevant timestamps. Every visual object is indexed into searchable database metrics upon recording, enabling natural language search across video, audio, and sensor logs.',
        category: 'forensic',
        colorTheme: 'cyan',
        orderIndex: 1,
        isPublished: true,
        iconName: 'search',
        stats: [
            { value: '< 3s', label: 'Search Across 1TB Footage' },
            { value: '99.2%', label: 'Object Detection Accuracy' },
            { value: '10×', label: 'Faster Than Manual Review' },
            { value: '100%', label: 'Court-Admissible Output' },
        ],
        howItWorks: [
            { step: 1, title: 'Index on Record', description: 'Every frame from every camera is parsed in real-time on ingestion. Objects, faces, vehicles, and events are tagged and stored in a searchable index automatically.', iconName: 'database' },
            { step: 2, title: 'Natural Language Query', description: 'Investigators describe what they are looking for in plain English. The LLM engine translates the query into a multi-dimensional search across video, audio, and sensor metadata.', iconName: 'search' },
            { step: 3, title: 'Export Evidence', description: 'Matching clips, timestamps, and audit trails are packaged into court-ready evidence bundles with cryptographic chain-of-custody verification.', iconName: 'file-check' },
        ],
        features: [
            { title: 'Natural Language Search', description: 'Query footage using plain English — no technical knowledge required. Describe what you are looking for and the system finds it across months of archived video in seconds.' },
            { title: 'Pattern Recognition', description: 'AI models detect recurring visual patterns across months of archived footage instantly. Identify behavioral trends, repeat offenders, and operational anomalies automatically.' },
            { title: 'Evidence Export', description: 'Generate court-ready evidence packages with timestamp verification, chain of custody logs, and cryptographic signing to ensure admissibility in legal proceedings.' },
        ],
        plans: makePlans(
            159, 399,
            [
                { feature: 'Up to 16 camera nodes', included: true },
                { feature: 'Natural language video search', included: true },
                { feature: 'Standard analytics dashboard', included: true },
                { feature: 'Evidence export (PDF)', included: true },
                { feature: 'Email support (48h SLA)', included: true },
                { feature: 'Real-time pattern alerts', included: false },
                { feature: 'Custom integrations & API', included: false },
            ],
            [
                { feature: 'Up to 64 camera nodes', included: true },
                { feature: 'Natural language video search', included: true },
                { feature: 'Advanced analytics + heatmaps', included: true },
                { feature: 'Evidence export (PDF + video clips)', included: true },
                { feature: 'Priority support (12h SLA)', included: true },
                { feature: 'Real-time pattern alerts', included: true },
                { feature: 'Custom integrations & API', included: false },
            ],
            [
                { feature: 'Unlimited camera nodes', included: true },
                { feature: 'Natural language video search', included: true },
                { feature: 'Custom analytics & reporting', included: true },
                { feature: 'Court-ready evidence packages', included: true },
                { feature: '24/7 dedicated support', included: true },
                { feature: 'Real-time pattern alerts', included: true },
                { feature: 'Custom integrations & API', included: true },
            ],
        ),
    },
    {
        slug: 'cognitive-surveillance',
        title: 'Cognitive Surveillance',
        subtitle: 'Beyond recording — real-time video intelligence',
        descriptionText: 'Kingsforth analyzes video feeds in real-time to detect threats, compliance violations, and operational inefficiencies before they escalate. Our AI models process thousands of frames per second, identifying anomalies that human operators would miss. From retail environments to critical infrastructure, Cognitive Surveillance transforms passive cameras into active security agents.',
        category: 'surveillance',
        colorTheme: 'violet',
        orderIndex: 2,
        isPublished: true,
        iconName: 'eye',
        stats: [
            { value: '< 200ms', label: 'Threat Detection Latency' },
            { value: '0.3%', label: 'False Positive Rate' },
            { value: '24/7', label: 'Autonomous Monitoring' },
            { value: '8,000+', label: 'Frames/Second Processed' },
        ],
        howItWorks: [
            { step: 1, title: 'Connect Cameras', description: 'Integrate any IP camera via RTSP/ONVIF — no hardware replacement required. Our edge appliances install alongside your existing VMS in hours.', iconName: 'camera' },
            { step: 2, title: 'AI Analyzes Live', description: 'Computer vision models run on every frame, continuously comparing behavior against trained baselines. Anomalies are scored in real-time by threat severity and context.', iconName: 'cpu' },
            { step: 3, title: 'Alert & Act', description: 'High-confidence threats trigger instant operator alerts, automatic logging, and optionally chain into Autonomous Field Ops response protocols.', iconName: 'bell' },
        ],
        features: [
            { title: 'Anomaly Detection', description: 'Instantly flags unusual behavior patterns, unauthorized access, and policy violations across all camera feeds. Customizable sensitivity per zone and time of day.' },
            { title: 'Facial Recognition', description: 'Identity verification for access control, VIP recognition, and watchlist alerting with privacy-compliant processing that meets GDPR and regional standards.' },
            { title: 'Safety Compliance', description: 'Automated PPE verification, safety zone monitoring, and protocol adherence checks in industrial environments reduce liability and improve workforce safety outcomes.' },
        ],
        plans: makePlans(
            149, 399,
            [
                { feature: 'Up to 16 live feeds', included: true },
                { feature: 'Motion & intrusion detection', included: true },
                { feature: 'Basic anomaly alerting', included: true },
                { feature: 'Cloud dashboard', included: true },
                { feature: 'Email support (48h SLA)', included: true },
                { feature: 'Facial recognition', included: false },
                { feature: 'Compliance reporting', included: false },
            ],
            [
                { feature: 'Up to 64 live feeds', included: true },
                { feature: 'Motion, intrusion & behavior detection', included: true },
                { feature: 'Advanced anomaly + threat alerting', included: true },
                { feature: 'Cloud + Edge dashboard', included: true },
                { feature: 'Priority support (12h SLA)', included: true },
                { feature: 'Facial recognition', included: true },
                { feature: 'Compliance reporting', included: false },
            ],
            [
                { feature: 'Unlimited live feeds', included: true },
                { feature: 'Full behavioral AI suite', included: true },
                { feature: 'Multi-channel threat alerting', included: true },
                { feature: 'On-premise + Cloud + Edge', included: true },
                { feature: '24/7 dedicated support', included: true },
                { feature: 'Facial recognition + watchlists', included: true },
                { feature: 'Full compliance reporting', included: true },
            ],
        ),
    },
    {
        slug: 'autonomous-field-ops',
        title: 'Autonomous Field Ops',
        subtitle: 'Physical response without human latency',
        descriptionText: 'Robotic Process Automation that handles critical physical response protocols. From drone dispatch to automated lockdown procedures, Autonomous Field Ops eliminates human latency from security response. Integrate with physical infrastructure — doors, barriers, drones, alarms — to execute predefined response sequences the moment a threat is classified.',
        category: 'automation',
        colorTheme: 'emerald',
        orderIndex: 3,
        isPublished: true,
        iconName: 'zap',
        stats: [
            { value: '< 8s', label: 'Full Lockdown Execution' },
            { value: '0', label: 'Human Latency in Response' },
            { value: '50+', label: 'Integrated Hardware Types' },
            { value: '99.8%', label: 'Protocol Execution Reliability' },
        ],
        howItWorks: [
            { step: 1, title: 'Threat Classified', description: 'Cognitive Surveillance or a human operator classifies a threat and triggers a response protocol. Classification happens in under 200ms.', iconName: 'shield-alert' },
            { step: 2, title: 'Protocol Executes', description: 'Pre-approved response sequences fire automatically — zone lockdowns, drone dispatch, barrier activation, PA announcements — all in parallel, within seconds.', iconName: 'zap' },
            { step: 3, title: 'Full Audit Trail', description: 'Every automated action is logged with timestamps, triggering event data, and operator overrides — providing a complete forensic record for review and compliance.', iconName: 'clipboard-list' },
        ],
        features: [
            { title: 'Drone Command', description: 'Automatic drone dispatch to incident coordinates with live video relay to command center. Pre-programmed flight paths for patrol routes and emergency response scenarios.' },
            { title: 'Automated Lockdowns', description: 'Zone-specific lockdowns triggered on threat classification — doors, barriers, and alarms managed automatically. Configurable per-zone protocols reviewed and approved by your security leadership.' },
            { title: 'Asset Tracking', description: 'Real-time GPS and visual tracking of vehicles, personnel, and high-value assets across facilities. Geofence breach alerts and automated response triggers for out-of-bounds events.' },
        ],
        plans: makePlans(
            299, 749,
            [
                { feature: 'Up to 5 automated response zones', included: true },
                { feature: 'Scheduled drone patrols', included: true },
                { feature: 'Basic access control automation', included: true },
                { feature: 'Asset GPS tracking', included: true },
                { feature: 'Email support (48h SLA)', included: true },
                { feature: 'Threat-triggered response sequences', included: false },
                { feature: 'Custom integration (barriers/alarms)', included: false },
            ],
            [
                { feature: 'Up to 20 automated response zones', included: true },
                { feature: 'AI-dispatched drone response', included: true },
                { feature: 'Full access control automation', included: true },
                { feature: 'Asset GPS + visual tracking', included: true },
                { feature: 'Priority support (12h SLA)', included: true },
                { feature: 'Threat-triggered response sequences', included: true },
                { feature: 'Custom integration (barriers/alarms)', included: false },
            ],
            [
                { feature: 'Unlimited response zones', included: true },
                { feature: 'Full autonomous drone fleet control', included: true },
                { feature: 'Enterprise access control suite', included: true },
                { feature: 'Real-time multi-asset tracking', included: true },
                { feature: '24/7 dedicated support', included: true },
                { feature: 'Custom threat-response playbooks', included: true },
                { feature: 'Custom integration (barriers/alarms)', included: true },
            ],
        ),
    },
    {
        slug: 'ai-agentic-saas',
        title: 'AI Agentic SaaS',
        subtitle: 'Self-evolving agents that run your workflows',
        descriptionText: 'Self-evolving software agents manage enterprise workflows autonomously. Our agents learn from your operational data to predict bottlenecks and execute solutions without human intervention. Deploy purpose-built AI agents for procurement, compliance, IT ops, and security reporting — each agent adapts to your specific environment and improves over time.',
        category: 'automation',
        colorTheme: 'amber',
        orderIndex: 4,
        isPublished: true,
        iconName: 'brain',
        stats: [
            { value: '60%', label: 'Reduction in Manual Ops Tasks' },
            { value: '< 24h', label: 'Agent Deployment Time' },
            { value: '99.9%', label: 'Workflow Execution Reliability' },
            { value: '∞', label: 'Concurrent Agents Possible' },
        ],
        howItWorks: [
            { step: 1, title: 'Deploy Agent', description: 'Select from purpose-built agent templates or define a custom agent specification. Agents are deployed to your environment in under 24 hours with zero infrastructure work.', iconName: 'bot' },
            { step: 2, title: 'Agent Learns', description: 'Each agent observes your operational data and workflows, building a contextual model of your environment. Accuracy improves continuously without manual retraining.', iconName: 'brain' },
            { step: 3, title: 'Autonomous Execution', description: 'Agents execute tasks, trigger other agents, escalate edge cases to human operators, and log every action — giving you full visibility with minimal intervention.', iconName: 'workflow' },
        ],
        features: [
            { title: 'Predictive Maintenance', description: 'Agents monitor system health metrics and initiate maintenance tasks before failures occur. Reduce unplanned downtime across your security infrastructure by up to 60%.' },
            { title: 'Workflow Automation', description: 'Multi-step business processes executed autonomously with full audit trails and rollback capability. From compliance reporting to incident escalation — agents handle it without manual intervention.' },
            { title: 'Self-Healing Code', description: 'Agents detect runtime anomalies in your software stack and apply patches without downtime. Continuous monitoring of security platform components ensures operational continuity.' },
        ],
        plans: makePlans(
            199, 499,
            [
                { feature: 'Up to 3 active AI agents', included: true },
                { feature: 'Pre-built workflow templates', included: true },
                { feature: 'Audit trail & logs', included: true },
                { feature: 'Cloud deployment', included: true },
                { feature: 'Email support (48h SLA)', included: true },
                { feature: 'Custom agent training', included: false },
                { feature: 'Self-healing & auto-patch', included: false },
            ],
            [
                { feature: 'Up to 15 active AI agents', included: true },
                { feature: 'Pre-built + custom workflow templates', included: true },
                { feature: 'Full audit trail & rollback', included: true },
                { feature: 'Cloud + Edge deployment', included: true },
                { feature: 'Priority support (12h SLA)', included: true },
                { feature: 'Custom agent training', included: true },
                { feature: 'Self-healing & auto-patch', included: false },
            ],
            [
                { feature: 'Unlimited active AI agents', included: true },
                { feature: 'Fully custom agent architecture', included: true },
                { feature: 'Enterprise audit trail & compliance', included: true },
                { feature: 'On-premise + Cloud + Edge', included: true },
                { feature: '24/7 dedicated support', included: true },
                { feature: 'Custom agent training', included: true },
                { feature: 'Self-healing & auto-patch', included: true },
            ],
        ),
    },
    {
        slug: 'iot-orchestration',
        title: 'IoT Orchestration',
        subtitle: 'Unify every sensor into one intelligent nervous system',
        descriptionText: 'Unifying fragmented hardware sensors into a single, responsive nervous system. Our orchestration layer brings legacy hardware into the modern age with millisecond-latency communication. Connect cameras, access controls, environmental sensors, and industrial IoT devices under one cognitive platform — enabling cross-device correlation and coordinated autonomous response.',
        category: 'iot',
        colorTheme: 'rose',
        orderIndex: 5,
        isPublished: true,
        iconName: 'network',
        stats: [
            { value: '< 1ms', label: 'Edge Inference Latency' },
            { value: '10,000+', label: 'Devices per Deployment' },
            { value: '60+', label: 'Supported Protocols' },
            { value: '100%', label: 'Offline-Capable Edge Nodes' },
        ],
        howItWorks: [
            { step: 1, title: 'Connect Everything', description: 'Any sensor, camera, access reader, or industrial device connects via native protocol support or our universal adapter layer — including legacy hardware from any manufacturer.', iconName: 'plug' },
            { step: 2, title: 'Fuse & Correlate', description: 'Data streams from all connected devices are normalized and fused into a unified telemetry model. Cross-device events are correlated in real-time to identify patterns invisible in isolated streams.', iconName: 'network' },
            { step: 3, title: 'Orchestrate Response', description: 'Define cross-device automation rules: when sensor A detects X and camera B sees Y, trigger actions on device C. Complex physical responses coordinated by a single intelligent platform.', iconName: 'settings' },
        ],
        features: [
            { title: 'Sensor Fusion', description: 'Combines data streams from heterogeneous sensors into unified situational awareness. Cross-correlate video, access control, environmental, and telemetry data to build a complete operational picture.' },
            { title: 'Edge Computing', description: 'On-device inference reduces latency to sub-millisecond and operates independently of cloud connectivity. Critical detection runs locally — network outages do not compromise security.' },
            { title: 'Real-Time Telemetry', description: 'Continuous health monitoring and data streaming from all connected devices to central dashboard. Predictive failure alerts keep your infrastructure online and your security coverage intact.' },
        ],
        plans: makePlans(
            179, 449,
            [
                { feature: 'Up to 50 connected devices', included: true },
                { feature: 'Real-time telemetry dashboard', included: true },
                { feature: 'Standard protocol support (MQTT, HTTP)', included: true },
                { feature: 'Cloud data storage (30 days)', included: true },
                { feature: 'Email support (48h SLA)', included: true },
                { feature: 'Edge compute deployment', included: false },
                { feature: 'Cross-device automation rules', included: false },
            ],
            [
                { feature: 'Up to 500 connected devices', included: true },
                { feature: 'Real-time telemetry + alerting', included: true },
                { feature: 'Full protocol support + custom adapters', included: true },
                { feature: 'Cloud data storage (1 year)', included: true },
                { feature: 'Priority support (12h SLA)', included: true },
                { feature: 'Edge compute deployment', included: true },
                { feature: 'Cross-device automation rules', included: false },
            ],
            [
                { feature: 'Unlimited connected devices', included: true },
                { feature: 'Real-time telemetry + predictive alerts', included: true },
                { feature: 'Custom protocol development', included: true },
                { feature: 'Unlimited data storage + archiving', included: true },
                { feature: '24/7 dedicated support', included: true },
                { feature: 'Full edge compute suite', included: true },
                { feature: 'Cross-device automation rules', included: true },
            ],
        ),
    },
    {
        slug: 'go-to-market-expert',
        title: 'Go-to-Market Expert',
        subtitle: 'Strategic guidance for technology launch and growth',
        descriptionText: 'Strategic guidance to launch your security technology product successfully. We align your technology with market needs to ensure rapid adoption and sustainable growth. Our consultants bring deep expertise in enterprise security markets — from positioning and pricing strategy to partnership development and channel sales — turning your innovation into revenue.',
        category: 'consulting',
        colorTheme: 'indigo',
        orderIndex: 6,
        isPublished: true,
        iconName: 'trending-up',
        stats: [
            { value: '3×', label: 'Average Pipeline Acceleration' },
            { value: '< 6mo', label: 'Typical First Revenue Milestone' },
            { value: '40+', label: 'Enterprise Security Launches' },
            { value: '$2B+', label: 'Client Revenue Generated' },
        ],
        howItWorks: [
            { step: 1, title: 'Research & Position', description: 'Deep-dive into your product, competitive landscape, and target buyer profiles. We define the positioning, messaging, and pricing strategy that wins in your specific market.', iconName: 'search' },
            { step: 2, title: 'Build the Playbook', description: 'Deliver a complete go-to-market playbook: channel strategy, sales scripts, battle cards, marketing calendar, and partner development plan ready for immediate execution.', iconName: 'book-open' },
            { step: 3, title: 'Execute & Scale', description: 'Work alongside your team to execute launch activities, optimize based on real pipeline data, and scale the channels generating best return on investment.', iconName: 'trending-up' },
        ],
        features: [
            { title: 'Market Analysis', description: 'Comprehensive competitive landscape analysis and target segment identification for your security product. Understand where you win, where you lose, and how to position against incumbents.' },
            { title: 'Launch Strategy', description: 'End-to-end go-to-market playbook covering messaging, channel selection, and launch sequencing. Built on proven frameworks from enterprise security market launches.' },
            { title: 'Growth Hacking', description: 'Data-driven growth experiments to accelerate enterprise pipeline and reduce customer acquisition cost. Identify and scale the channels delivering highest ROI for your specific product.' },
        ],
        plans: makePlans(
            99, 249,
            [
                { feature: '1 dedicated consultant', included: true },
                { feature: 'Market analysis report', included: true },
                { feature: 'GTM strategy document', included: true },
                { feature: 'Monthly strategy calls (2/month)', included: true },
                { feature: 'Email support', included: true },
                { feature: 'Competitive battle cards', included: false },
                { feature: 'Partnership & channel development', included: false },
            ],
            [
                { feature: '2 dedicated consultants', included: true },
                { feature: 'Full market analysis + ICP profiling', included: true },
                { feature: 'GTM playbook + sales scripts', included: true },
                { feature: 'Weekly strategy calls', included: true },
                { feature: 'Priority support', included: true },
                { feature: 'Competitive battle cards', included: true },
                { feature: 'Partnership & channel development', included: false },
            ],
            [
                { feature: 'Dedicated expert team', included: true },
                { feature: 'Custom research & analyst access', included: true },
                { feature: 'Full GTM execution support', included: true },
                { feature: 'Unlimited strategy sessions', included: true },
                { feature: '24/7 dedicated support', included: true },
                { feature: 'Competitive intelligence program', included: true },
                { feature: 'Partnership & channel development', included: true },
            ],
        ),
    },
];
