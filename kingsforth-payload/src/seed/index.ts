import { getPayload } from 'payload';
import configPromise from '@payload-config';
import 'dotenv/config';

const createLexical = (text: string) => ({
    root: {
        type: 'root',
        format: '' as const,
        indent: 0,
        version: 1,
        direction: null,
        children: [
            {
                type: 'paragraph',
                format: '' as const,
                indent: 0,
                version: 1,
                direction: null,
                children: [
                    { mode: 'normal', text, type: 'text', style: '', detail: 0, format: 0, version: 1 }
                ]
            }
        ]
    }
});

// Shared feature sets for Plus / Pro / Enterprise

const makePlans = (basePrices: [number, number, number]) => [
    {
        name: 'Plus',
        monthlyPrice: basePrices[0],
        semiAnnualPrice: Math.round(basePrices[0] * 6 * 0.9),
        annualPrice: Math.round(basePrices[0] * 12 * 0.8),
        description: 'Essential monitoring with standard capabilities.',
        isPopular: false,
        badge: '',
        planFeatures: [
            { feature: 'Up to 16 camera streams (1080p)', included: true },
            { feature: 'Hourly analytics updates', included: true },
            { feature: 'Basic report generation (weekly)', included: true },
            { feature: 'Email support (48h SLA)', included: true },
            { feature: 'Cloud dashboard access', included: true },
            { feature: 'Real-time alerts', included: false },
            { feature: 'Custom integrations', included: false },
            { feature: 'Dedicated account manager', included: false },
        ]
    },
    {
        name: 'Pro',
        monthlyPrice: basePrices[1],
        semiAnnualPrice: Math.round(basePrices[1] * 6 * 0.85),
        annualPrice: Math.round(basePrices[1] * 12 * 0.75),
        description: 'Advanced capabilities for growing operations.',
        isPopular: true,
        badge: 'Most Popular',
        planFeatures: [
            { feature: 'Up to 64 camera streams (4K)', included: true },
            { feature: '5-minute analytics updates', included: true },
            { feature: 'Advanced report generation (daily)', included: true },
            { feature: 'Priority support (12h SLA)', included: true },
            { feature: 'Cloud + Edge dashboard', included: true },
            { feature: 'Real-time SMS/email alerts', included: true },
            { feature: 'API access (high-rate)', included: true },
            { feature: 'Dedicated account manager', included: false },
        ]
    },
    {
        name: 'Enterprise',
        monthlyPrice: basePrices[2],
        semiAnnualPrice: Math.round(basePrices[2] * 6 * 0.8),
        annualPrice: Math.round(basePrices[2] * 12 * 0.7),
        description: 'Unlimited scale with custom deployment.',
        isPopular: false,
        badge: 'Best Value',
        planFeatures: [
            { feature: 'Unlimited camera streams (8K ready)', included: true },
            { feature: 'Real-time continuous analytics', included: true },
            { feature: 'Custom report generation (on-demand)', included: true },
            { feature: '24/7 dedicated support', included: true },
            { feature: 'On-premise + Cloud + Edge', included: true },
            { feature: 'Instant multi-channel alerts', included: true },
            { feature: 'Full API + Webhook integrations', included: true },
            { feature: 'Dedicated account manager', included: true },
        ]
    }
];

async function runSeed() {
    console.log('🚀 Seeding Database with Complete Kingsforth Data...');
    const payload = await getPayload({ config: configPromise });

    // CLEAR
    console.log('Clearing old data...');
    for (const collection of ['services', 'solutions'] as const) {
        let items;
        do {
            items = await payload.find({ collection, limit: 100 });
            for (const doc of items.docs) {
                await payload.delete({ collection, id: doc.id });
            }
        } while (items.hasNextPage);
    }

    // ═══════════════════════════════════════
    // SERVICES
    // ═══════════════════════════════════════
    console.log('📦 Seeding Services...');
    const servicesData = [
        {
            slug: 'cognitive-surveillance',
            title: 'Cognitive Surveillance',
            subtitle: 'Beyond recording — real-time video intelligence',
            description: createLexical('Kingseye analyzes video feeds in real-time to detect threats, compliance violations, and operational inefficiencies before they escalate. Our AI models process thousands of frames per second, identifying anomalies that human operators would miss. From retail environments to critical infrastructure, Cognitive Surveillance transforms passive cameras into active security agents.'),
            icon: 'eye',
            category: 'surveillance' as any,
            orderIndex: 1,
            isPublished: true,
            features: [
                { icon: 'eye', title: 'Anomaly Detection', description: 'Instantly flags unusual behavior patterns, unauthorized access, and policy violations across all camera feeds.' },
                { icon: 'shield', title: 'Safety Compliance', description: 'Automated PPE verification, safety zone monitoring, and protocol adherence checks in industrial environments.' },
                { icon: 'search', title: 'Facial Recognition', description: 'Identity verification for access control, VIP recognition, and watchlist alerting with privacy-compliant processing.' }
            ],
            plans: makePlans([149, 399, 999])
        },
        {
            slug: 'unique-footfall-tracking',
            title: 'Unique Footfall Tracking',
            subtitle: 'Precision crowd analytics without privacy violations',
            description: createLexical('Understand your spaces like never before. Our spatial algorithms detect, count, and differentiate unique individuals traversing your zones. Analyze peak hours, optimize retail layouts, monitor venue capacities, and generate granular heatmaps — all while respecting global privacy regulations through anonymous fingerprinting technology.'),
            icon: 'users',
            category: 'surveillance' as any,
            orderIndex: 2,
            isPublished: true,
            features: [
                { icon: 'activity', title: 'Spatial Heatmaps', description: 'Real-time rendering of spatial occupation densities across your facility.' },
                { icon: 'users', title: 'Anonymous Fingerprinting', description: 'Classifies unique traits without logging PII to respect privacy laws.' },
                { icon: 'bar-chart', title: 'Occupancy Analytics', description: 'Live and historical occupancy data for capacity management and planning.' }
            ],
            plans: makePlans([99, 249, 699])
        },
        {
            slug: 'theft-detection',
            title: 'Theft & Shrink Detection',
            subtitle: 'Proactive loss prevention powered by behavioral AI',
            description: createLexical('Stop losses before they happen. Our AI monitors behavioral micro-kinetics — suspicious loitering, concealment gestures, and anomalous hand-to-pocket dynamics — to alert your loss prevention team in real-time. Reduce shrinkage by up to 60% and empower your team to intervene preemptively rather than reacting to missing inventory.'),
            icon: 'shield-alert',
            category: 'surveillance' as any,
            orderIndex: 3,
            isPublished: true,
            features: [
                { icon: 'eye', title: 'Behavioral Micro-Kinetics', description: 'Monitors subtle physical movements correlated with theft behavior.' },
                { icon: 'bell', title: 'Instant LP Alerting', description: 'Silent push notifications directly to loss prevention devices and dashboards.' }
            ],
            plans: makePlans([129, 349, 899])
        },
        {
            slug: 'incident-detection',
            title: 'Incident Detection Systems',
            subtitle: 'Automated hazard awareness in under 40ms',
            description: createLexical('From slips and falls in corporate campuses to weapon detection or aggressive altercations, Kingsforth Incident Detection categorizes threats in under 40 milliseconds. Our models recognize firearms, bladed weapons, fire hazards, and catastrophic falls — automatically dispatching alerts to security teams and emergency services.'),
            icon: 'siren',
            category: 'surveillance' as any,
            orderIndex: 4,
            isPublished: true,
            features: [
                { icon: 'crosshair', title: 'Weapon Classification', description: 'Trained to recognize firearms and bladed hazards instantly across environments.' },
                { icon: 'users', title: 'Fall Detection', description: 'Recognizes human falls and deploys medical alerts procedurally.' },
                { icon: 'siren', title: 'Fire & Smoke Detection', description: 'Visual detection of fire and smoke anomalies across camera feeds.' }
            ],
            plans: makePlans([179, 449, 1099])
        },
        {
            slug: 'sentiment-analysis',
            title: 'Crowd Sentiment Analysis',
            subtitle: 'Reading the room — autonomously',
            description: createLexical('Understand the collective mood of any space. Our systems assess macroscopic facial tension patterns, vocal frequencies, and physical clustering behavior to determine aggregate emotion — predicting unrest, dissatisfaction, or escalation before it manifests. Ideal for public venues, retail, and event management.'),
            icon: 'smile',
            category: 'surveillance' as any,
            orderIndex: 5,
            isPublished: true,
            features: [
                { icon: 'bar-chart', title: 'Tension Index', description: 'Real-time graphs displaying overall hostility or satisfaction metrics for any monitored space.' }
            ],
            plans: makePlans([199, 499, 1199])
        },
        {
            slug: 'voice-to-text',
            title: 'Voice to Text Parsing',
            subtitle: 'Multilingual real-time audio transcription',
            description: createLexical('Synchronize visual surveillance with intelligent audio transcription. Filter ambient noise to isolate critical keywords (e.g., "help", "emergency") or systematically transcribe and archive audio for forensic querying. Supports 50+ languages with enterprise-grade accuracy.'),
            icon: 'mic',
            category: 'surveillance' as any,
            orderIndex: 6,
            isPublished: true,
            features: [
                { icon: 'mic', title: 'Acoustic Denoising', description: 'Cuts through industrial and crowd noise to extract clear human speech.' },
                { icon: 'search', title: 'Keyword Triggering', description: 'Automated lockdown when defined verbal threat cues are detected.' }
            ],
            plans: makePlans([119, 299, 799])
        },
        {
            slug: 'forensic-video',
            title: 'Big Data Forensic',
            subtitle: 'Search terabytes of footage in seconds',
            description: createLexical('What takes human investigators years, Kingsforth does in seconds. Supply a semantic query like "Find the red truck at the north gate at 3AM" and our LLM-backed video parser isolates all relevant timestamps. Every visual object is indexed into searchable database metrics upon recording, enabling natural language search across video, audio, and sensor logs.'),
            icon: 'search',
            category: 'surveillance' as any,
            orderIndex: 7,
            isPublished: true,
            features: [
                { icon: 'database', title: 'Semantic Indexing', description: 'Every visual object converted into searchable database metrics upon recording.' },
                { icon: 'search', title: 'Natural Language Search', description: 'Query footage using plain English — no technical knowledge required.' }
            ],
            plans: makePlans([159, 399, 999])
        },
        {
            slug: 'smart-attendance',
            title: 'Frictionless Attendance',
            subtitle: 'Zero-touch biometric check-in at walking speed',
            description: createLexical('Replace RFID badges and keycards entirely. The moment an authorized person enters the geofence, the system logs their arrival — calculating shift durations, overtime, and flagging unauthorized access, all without any physical interaction. Anti-spoofing technology rejects photos, masks, and digital twin attacks.'),
            icon: 'calendar-check',
            category: 'surveillance' as any,
            orderIndex: 8,
            isPublished: true,
            features: [
                { icon: 'clock', title: 'Sub-second Verification', description: 'Logs hundreds of people flowing through turnstiles at full walking speed.' },
                { icon: 'shield', title: 'Anti-Spoofing', description: 'Rejects photos, masks, and digital twin spoofing attempts.' }
            ],
            plans: makePlans([89, 229, 599])
        },
    ];

    for (const svc of servicesData) {
        await payload.create({ collection: 'services', data: svc as any });
    }

    // ═══════════════════════════════════════
    // SOLUTIONS
    // ═══════════════════════════════════════
    console.log('🏛️ Seeding Solutions...');
    const solutionsData = [
        {
            slug: 'cities-government',
            category: 'Industry' as any,
            title: 'Cities & Government',
            subtitle: 'Redefining Public Safety & Civic Infrastructure',
            description: createLexical('Modern cities face unprecedented challenges: traffic deadlocks, fragmented emergency response, and localized unrest. Kingsforth deploys interconnected AI networks across metropolitan environments to address these complexities. Our infrastructure synchronizes traffic management based on footfall models, routes emergency responders to high-probability incidents before 911 calls, and flags anomalous crowd formations to prevent civic emergencies. With Cognitive Surveillance covering public spaces and Incident Detection protecting critical infrastructure, entire city grids become intelligent, responsive ecosystems.'),
            isPublished: true,
            stats: [
                { label: 'Crime Reduction', value: '42%', iconName: 'TrendingDown' },
                { label: 'Response Time', value: '3x Faster', iconName: 'Activity' },
                { label: 'False Alarms', value: '<1%', iconName: 'ShieldCheck' }
            ],
            contentBlocks: [
                {
                    title: 'Intelligent Traffic Management',
                    content: 'Our footfall and vehicle tracking systems feed real-time data into traffic control infrastructure, dynamically adjusting signal timing, routing emergency vehicles, and predicting congestion patterns before they form.',
                    align: 'right' as const,
                    listItems: [
                        { item: 'Dynamic signal optimization based on real-time flow' },
                        { item: 'Emergency vehicle priority routing' },
                        { item: 'Congestion prediction and prevention' }
                    ]
                },
                {
                    title: 'Proactive Public Safety',
                    content: 'Sentiment Analysis and Incident Detection work in concert to identify escalating situations in public spaces — from crowd unrest at events to weapon threats in transit hubs — enabling authorities to respond before incidents fully develop.',
                    align: 'left' as const,
                    listItems: [
                        { item: 'Crowd mood monitoring at public events' },
                        { item: 'Weapon detection across transit networks' },
                        { item: 'Automated emergency service dispatch' }
                    ]
                }
            ],
            faqs: [
                { question: 'How does Kingsforth protect citizen privacy?', answer: 'All analytics use anonymized fingerprinting technology. No personally identifiable information is stored or processed. Our systems are compliant with GDPR, CCPA, and local data protection regulations.' },
                { question: 'Can this integrate with existing city camera networks?', answer: 'Yes. Kingsforth is hardware-agnostic and works with all major IP camera protocols. We overlay our AI layer on your existing infrastructure — no camera replacement needed.' }
            ]
        },
        {
            slug: 'education-systems',
            category: 'Industry' as any,
            title: 'Education & Campus Security',
            subtitle: 'Protecting Learning Environments with Intelligent Surveillance',
            description: createLexical('Academic institutions must balance openness with security. Kingsforth addresses unauthorized campus access, student altercations, and active threat scenarios without relying solely on reactive human guards. Frictionless Attendance silently maps authorized students, Incident Detection spots altercations near dormitories instantly, and zero-latency weapon classification interfaces directly with regional police dispatch — all while preserving student privacy through anonymized processing.'),
            isPublished: true,
            stats: [
                { label: 'Intrusion Detection', value: '99.9%', iconName: 'ShieldCheck' },
                { label: 'False Alarms', value: '<1%', iconName: 'CheckCircle' },
                { label: 'Response Improvement', value: '5x', iconName: 'Activity' }
            ],
            contentBlocks: [
                {
                    title: 'Campus Perimeter Intelligence',
                    content: 'Automated monitoring of entry points, parking areas, and perimeter fencing. Unauthorized access attempts trigger instant alerts to campus security with precise location data and visual confirmation.',
                    align: 'right' as const,
                    listItems: [
                        { item: 'Geofenced access zones with biometric verification' },
                        { item: 'After-hours intrusion detection' },
                        { item: 'Vehicle tracking across campus lots' }
                    ]
                }
            ],
            faqs: [
                { question: 'Is facial recognition used on students?', answer: 'No. Our Frictionless Attendance system uses anonymized biometric signatures — it verifies authorization status without identifying individuals by name or storing facial data.' },
                { question: 'How quickly are threats detected?', answer: 'Our Incident Detection system classifies threats in under 40 milliseconds, with alerts reaching security personnel within 2 seconds of detection.' }
            ]
        },
        {
            slug: 'vsoc',
            category: 'Use Case' as any,
            title: 'Virtual Security Operations (VSOC)',
            subtitle: 'Centralized Omni-Channel Command',
            description: createLexical('When monitoring thousands of cameras across multiple sites, operator fatigue guarantees missed threats. The Kingsforth VSOC solution eliminates cognitive overload by letting our AI digest 99% of the noise. The VSOC acts as an operational funnel — highlighting only verified anomalous incidents, parsing live voice-to-text transcripts for threat keywords, and enabling operators to dispatch responses via a unified dashboard. One operator can now effectively monitor what previously required a team of twenty.'),
            isPublished: true,
            stats: [
                { label: 'Operator Fatigue', value: '-85%', iconName: 'Brain' },
                { label: 'Coverage Increase', value: '20x', iconName: 'Activity' }
            ],
            contentBlocks: [],
            faqs: [
                { question: 'How many cameras can one VSOC operator manage?', answer: 'With Kingsforth AI pre-filtering, a single operator can effectively monitor up to 2,000 camera feeds — the AI handles pattern analysis and only escalates verified anomalies requiring human judgment.' }
            ]
        }
    ];

    for (const sol of solutionsData) {
        await payload.create({ collection: 'solutions', data: sol });
    }

    console.log('✅ Seeding Complete! All services and solutions are now populated.');
    process.exit(0);
}

runSeed().catch((err) => {
    console.error('❌ Seeding Error:', err);
    process.exit(1);
});
