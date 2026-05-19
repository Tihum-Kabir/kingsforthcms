export interface ServiceFeature {
  title: string;
  description: string;
}

export interface ServiceStep {
  step: number;
  title: string;
  description: string;
}

export interface ServiceUseCase {
  title: string;
  description: string;
}

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface ServicePlan {
  name: 'Plus' | 'Pro' | 'Enterprise';
  price: number | 'Custom';
  features: string[];
  isRecommended?: boolean;
  badge?: string;
  cta: string;
  tagline: string;
}

export interface Service {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  shortDescription: string;
  longDescription: string;
  gradient: string;
  accentColor: string;
  keyMetrics: { value: string; label: string }[];
  features: ServiceFeature[];
  howItWorks: ServiceStep[];
  useCases: ServiceUseCase[];
  faqs: ServiceFAQ[];
  defaultPlans: ServicePlan[];
}

export const SERVICES: Service[] = [
  {
    slug: 'big-data-forensic',
    title: 'Big Data Forensic',
    subtitle: 'Search Terabytes. Uncover Truth. In Seconds.',
    category: 'Forensic Intelligence',
    gradient: 'from-cyan-500 to-blue-600',
    accentColor: 'cyan',
    shortDescription:
      'Our forensic engine enables natural language queries across terabytes of video, audio, and sensor data — surfacing evidence in seconds, not days.',
    longDescription: `KTL's Big Data Forensic engine transforms how enterprises investigate incidents, conduct compliance audits, and extract intelligence from their data archives. Traditional forensic tools require hours of manual scrubbing through recordings and logs. Our platform ingests structured and unstructured data at scale and makes it instantly queryable through natural language.

Powered by a multi-modal AI core, the forensic engine processes video streams, audio recordings, IoT sensor logs, and enterprise data feeds simultaneously. Security teams, compliance officers, and investigators can query the entire archive in plain English — "Show me all instances of tailgating in Building B last month" or "Find audio anomalies in the server room between 2AM and 4AM" — and receive ranked, evidence-grade results in seconds.`,
    keyMetrics: [
      { value: '< 3s', label: 'Average Query Response' },
      { value: '99.7%', label: 'Pattern Recognition Accuracy' },
      { value: '10TB+', label: 'Data Processed per Day' },
      { value: '50+', label: 'Data Source Types Supported' },
    ],
    features: [
      {
        title: 'Natural Language Search',
        description:
          'Query terabytes of historical data in plain English. No SQL, no coding required. Ask complex multi-modal questions spanning video, audio, and sensor logs simultaneously and receive results ranked by confidence.',
      },
      {
        title: 'Pattern Recognition',
        description:
          'Advanced AI models trained on operational data detect behavioral patterns, anomalies, and correlations across disparate data sources — uncovering what human analysts would take weeks to identify.',
      },
      {
        title: 'Evidence Export',
        description:
          'Package and export forensic findings in court-admissible formats with full chain-of-custody metadata, timestamps, and cryptographic signatures for regulatory compliance across 40+ jurisdictions.',
      },
      {
        title: 'Multi-Modal Fusion',
        description:
          'Simultaneously search across video, audio, RFID, access control, and IoT sensor data. The engine correlates signals across sources to reconstruct a complete picture of any incident.',
      },
      {
        title: 'Automated Timeline Reconstruction',
        description:
          'The system automatically stitches together fragmented data points into a coherent incident timeline — showing exactly what happened, where, and in what sequence.',
      },
      {
        title: 'Compliance Audit Trail',
        description:
          'Every query, access, and export is logged in an immutable audit trail. Meet GDPR, HIPAA, and industry-specific regulatory requirements with built-in compliance reporting.',
      },
    ],
    howItWorks: [
      {
        step: 1,
        title: 'Ingest & Index',
        description:
          'The forensic engine connects to your existing infrastructure — NVRs, DVRs, cloud storage, IoT hubs, and enterprise databases — and continuously indexes all data in real time using distributed vector embeddings.',
      },
      {
        step: 2,
        title: 'Query in Natural Language',
        description:
          'Investigators submit queries through the KTL command interface in plain English. The AI parses intent, generates multi-modal search parameters, and executes across all indexed data simultaneously.',
      },
      {
        step: 3,
        title: 'AI-Powered Analysis',
        description:
          'Pattern recognition models analyze results, surface correlations, and rank findings by relevance and confidence score. Anomalies that human analysts would miss are automatically flagged with supporting evidence.',
      },
      {
        step: 4,
        title: 'Export & Certify',
        description:
          'Export findings as encrypted packages with cryptographic chain-of-custody records. Generate compliance reports ready for regulators, courts, or internal audits in minutes.',
      },
    ],
    useCases: [
      {
        title: 'Incident Investigation',
        description:
          'Reconstruct the exact sequence of events in any security incident — from initial breach to final impact — in minutes rather than days.',
      },
      {
        title: 'Compliance Auditing',
        description:
          'Automatically generate evidence packages for regulatory audits across GDPR, HIPAA, SOC 2, and industry-specific frameworks.',
      },
      {
        title: 'Fraud Detection',
        description:
          'Correlate behavioral patterns across data sources to identify fraudulent activities that span multiple systems and time periods.',
      },
      {
        title: 'Operational Intelligence',
        description:
          'Extract actionable insights from historical operational data to optimize processes and prevent future incidents proactively.',
      },
    ],
    faqs: [
      {
        question: 'What data sources can the forensic engine connect to?',
        answer:
          'The engine supports 50+ data source types including IP cameras (RTSP/ONVIF), NVRs, DVRs, cloud storage (AWS S3, Azure Blob, GCS), enterprise databases, IoT hubs (MQTT, CoAP), access control systems, RFID readers, and audio devices. Custom connectors are available for proprietary systems.',
      },
      {
        question: 'How does the natural language query system work?',
        answer:
          'Our query engine uses a fine-tuned large language model that translates natural language questions into structured multi-modal search parameters. It understands context, temporal relationships, and spatial references. Queries like "Who entered the data center after 10 PM last Tuesday who was not on the approved access list?" are decomposed into simultaneous searches across access control logs, video feeds, and personnel databases.',
      },
      {
        question: 'How long does it take to get results on a terabyte-scale query?',
        answer:
          'Most queries return results in under 3 seconds regardless of archive size. This is achieved through our distributed indexing architecture, pre-computed embeddings, and GPU-accelerated inference. Initial indexing of existing archives varies by volume — typically 1–4 hours per terabyte depending on data type.',
      },
      {
        question: 'Is the evidence export format admissible in legal proceedings?',
        answer:
          'Yes. Our evidence packages include cryptographic hash verification, chain-of-custody metadata, timestamps with sub-millisecond precision, and digital signatures from our certified forensic infrastructure. We work with legal teams to ensure exports meet jurisdictional requirements in 40+ countries.',
      },
      {
        question: 'Can the system integrate with our existing SIEM or investigation platforms?',
        answer:
          'Absolutely. The forensic engine has native integrations with Splunk, IBM QRadar, Microsoft Sentinel, and all major SIEM platforms via STIX/TAXII. Our REST API allows custom integrations with any investigation workflow or case management system.',
      },
    ],
    defaultPlans: [
      {
        name: 'Plus',
        price: 799,
        tagline: 'For growing security operations',
        features: [
          'Up to 50TB archive storage',
          'Natural language search',
          'Pattern recognition (standard)',
          'Basic evidence export',
          '5 analyst seats',
          'Email support',
          'Standard 99.5% SLA',
        ],
        isRecommended: false,
        cta: 'Deploy Plus',
      },
      {
        name: 'Pro',
        price: 2499,
        tagline: 'For enterprise security teams',
        features: [
          'Up to 500TB archive storage',
          'Advanced multi-modal queries',
          'Full pattern recognition suite',
          'Court-ready evidence export',
          '25 analyst seats',
          'REST API access',
          'Up to 5 custom connectors',
          '24/7 priority support',
          'Compliance reporting suite',
        ],
        isRecommended: true,
        badge: 'Most Deployed',
        cta: 'Deploy Pro',
      },
      {
        name: 'Enterprise',
        price: 'Custom',
        tagline: 'For mission-critical deployments',
        features: [
          'Unlimited archive storage',
          'Dedicated AI model training',
          'White-label deployment option',
          'Unlimited analyst seats',
          'On-premise deployment',
          'Unlimited custom connectors',
          'Dedicated forensics team',
          'Up to 99.99% SLA',
        ],
        isRecommended: false,
        cta: 'Contact Sales',
      },
    ],
  },

  {
    slug: 'cognitive-surveillance',
    title: 'Cognitive Surveillance',
    subtitle: 'Beyond Recording. Real-Time Threat Intelligence.',
    category: 'AI Video Analytics',
    gradient: 'from-violet-500 to-purple-700',
    accentColor: 'violet',
    shortDescription:
      'KingsEye analyzes video feeds in real-time to detect threats, compliance violations, and operational inefficiencies before they escalate — transforming passive cameras into active intelligence agents.',
    longDescription: `Traditional CCTV is reactive — it records what happened. KTL's Cognitive Surveillance platform, powered by KingsEye, makes your cameras proactive. Every frame from every feed is analyzed in real time by specialized neural networks trained on thousands of hours of security-relevant scenarios.

KingsEye identifies threats at the moment they emerge — not after the damage is done. Whether it's an unauthorized individual entering a restricted zone, a compliance violation on the production floor, or an early behavioral indicator of violence, the system dispatches alerts with precise location data, visual evidence, and recommended response protocols within seconds. Your security team acts on intelligence, not recordings.`,
    keyMetrics: [
      { value: '< 2s', label: 'Threat Detection Latency' },
      { value: '98.4%', label: 'Detection Accuracy' },
      { value: '0.3%', label: 'False Positive Rate' },
      { value: '24/7', label: 'Continuous Monitoring' },
    ],
    features: [
      {
        title: 'Anomaly Detection',
        description:
          'Behavioral AI models establish baseline patterns for every monitored zone and instantly flag deviations — unusual dwell times, crowd formations, perimeter breaches, and after-hours activity — before they become incidents.',
      },
      {
        title: 'Facial Recognition',
        description:
          'Privacy-compliant facial recognition identifies persons of interest, verifies authorized personnel, and cross-references against watchlists in real time. Configurable blurring protects bystander privacy by default.',
      },
      {
        title: 'Safety Compliance',
        description:
          'Automated monitoring of PPE usage, restricted-zone access, social distancing protocols, and procedural compliance. Non-compliance events trigger instant alerts to floor supervisors with timestamped visual proof.',
      },
      {
        title: 'Multi-Camera Tracking',
        description:
          'Track an individual or object of interest seamlessly across hundreds of camera feeds without manual switching. The system hands off tracking automatically as subjects move through your facility.',
      },
      {
        title: 'Predictive Threat Scoring',
        description:
          'Assign dynamic threat scores to monitored scenarios based on behavioral signals, historical patterns, and contextual factors. Security teams prioritize response resources based on real risk, not intuition.',
      },
      {
        title: 'Instant Alert Dispatch',
        description:
          'Configurable alert workflows dispatch notifications via SMS, email, radio integration, and in-app push within 2 seconds of detection. Each alert includes visual context, location data, and recommended actions.',
      },
    ],
    howItWorks: [
      {
        step: 1,
        title: 'Connect Existing Cameras',
        description:
          'KingsEye integrates with your existing IP camera infrastructure via RTSP/ONVIF. No rip-and-replace required. Connect hundreds of cameras across multiple sites through a single deployment in hours.',
      },
      {
        step: 2,
        title: 'Train on Your Environment',
        description:
          'During a brief calibration phase, the AI learns your facility\'s normal patterns — shift schedules, authorized zones, typical traffic flows. This context dramatically reduces false positives from day one.',
      },
      {
        step: 3,
        title: 'Detect & Analyze in Real Time',
        description:
          'Every video frame is processed by specialized neural networks for threat detection, behavior analysis, and compliance monitoring simultaneously. Results are generated with sub-2-second latency.',
      },
      {
        step: 4,
        title: 'Alert & Respond',
        description:
          'Verified threat events trigger automated alert workflows. Security teams receive actionable intelligence — not raw footage — with precise location, visual context, and recommended response protocols.',
      },
    ],
    useCases: [
      {
        title: 'Perimeter Protection',
        description:
          'Detect unauthorized perimeter breaches, vehicle intrusions, and tailgating events at access points the moment they occur.',
      },
      {
        title: 'Workplace Safety',
        description:
          'Monitor PPE compliance, restricted-zone access, and procedural adherence across manufacturing, construction, and industrial environments.',
      },
      {
        title: 'Retail Loss Prevention',
        description:
          'Identify shoplifting behavior patterns, monitor high-value asset zones, and detect unusual customer behavior before incidents escalate.',
      },
      {
        title: 'Campus Security',
        description:
          'Protect educational and corporate campuses with behavior-based threat detection, emergency lockdown integration, and real-time crowd analytics.',
      },
    ],
    faqs: [
      {
        question: 'Does KingsEye work with our existing camera hardware?',
        answer:
          'Yes. KingsEye is hardware-agnostic and connects to any IP camera that supports RTSP or ONVIF protocols — which includes virtually all cameras manufactured in the last decade. There is no need to replace or upgrade existing hardware. The AI processing happens on KTL\'s edge appliances or cloud infrastructure, not on the cameras themselves.',
      },
      {
        question: 'How does the system handle privacy regulations like GDPR?',
        answer:
          'KingsEye is designed with privacy-by-default principles. Bystander faces are automatically blurred unless identification is specifically authorized. All facial recognition features require explicit configuration and access control. The system maintains detailed logs of all identification events for regulatory compliance. We provide GDPR, CCPA, and PDPA compliance documentation.',
      },
      {
        question: 'What is the false positive rate?',
        answer:
          'After the calibration phase (typically 48–72 hours), the false positive rate is below 0.3% for most deployment environments. This is achieved through contextual AI that understands your specific environment rather than applying generic detection rules. The system continuously improves accuracy through operator feedback loops.',
      },
      {
        question: 'Can the system operate in low-light or adverse weather conditions?',
        answer:
          'Yes. KingsEye includes specialized models optimized for low-light, infrared, and thermal camera feeds. The platform automatically selects the appropriate detection model based on the camera type and ambient conditions. For critical perimeter applications, we recommend supplementing with thermal cameras for 24/7 all-weather coverage.',
      },
      {
        question: 'How does KingsEye integrate with our existing VMS or access control system?',
        answer:
          'KingsEye has native integrations with Genetec, Milestone, Avigilon, Honeywell Pro-Watch, Lenel, and 30+ other VMS and access control platforms. Events from KingsEye appear directly in your existing operator interface. Our REST API enables custom integration with any security management system.',
      },
    ],
    defaultPlans: [
      {
        name: 'Plus',
        price: 599,
        tagline: 'For single-site deployments',
        features: [
          'Up to 30 camera feeds',
          'Anomaly detection',
          'Safety compliance monitoring',
          'Standard alert dispatch',
          '3 operator seats',
          'Email & SMS alerts',
          '99.5% uptime SLA',
        ],
        isRecommended: false,
        cta: 'Deploy Plus',
      },
      {
        name: 'Pro',
        price: 1999,
        tagline: 'For multi-site enterprise operations',
        features: [
          'Up to 200 camera feeds',
          'Facial recognition (privacy-compliant)',
          'Predictive threat scoring',
          'Multi-camera tracking',
          'Custom alert workflows',
          '20 operator seats',
          'VMS & access control integration',
          '24/7 priority support',
          '99.9% uptime SLA',
        ],
        isRecommended: true,
        badge: 'Most Popular',
        cta: 'Deploy Pro',
      },
      {
        name: 'Enterprise',
        price: 'Custom',
        tagline: 'For large-scale deployments',
        features: [
          'Unlimited camera feeds',
          'Dedicated AI model training',
          'Custom detection scenarios',
          'Unlimited operator seats',
          'On-premise deployment',
          'VSOC integration',
          'Dedicated support team',
          '99.99% uptime SLA',
        ],
        isRecommended: false,
        cta: 'Contact Sales',
      },
    ],
  },

  {
    slug: 'autonomous-field-ops',
    title: 'Autonomous Field Ops',
    subtitle: 'Remove Human Latency. Deploy at Machine Speed.',
    category: 'Robotic Process Automation',
    gradient: 'from-rose-500 to-pink-700',
    accentColor: 'rose',
    shortDescription:
      'Robotic Process Automation for critical physical response protocols — from drone dispatch to automated lockdown procedures. We remove human latency from the equation.',
    longDescription: `The window between threat detection and effective response is measured in seconds. Human relay chains — detection, radio call, dispatch, physical response — introduce latency that can be the difference between containment and crisis. KTL's Autonomous Field Ops removes the human from routine response execution.

Our RPA platform connects your security intelligence layer directly to physical response assets — autonomous drones, access control actuators, emergency systems, and asset tracking hardware. When a threat is detected and response protocols are triggered, the system executes with machine precision: doors lock, drones deploy, alerts cascade through command structures, and asset locations are logged — all within the response window that matters.`,
    keyMetrics: [
      { value: '< 8s', label: 'Average Response Deployment' },
      { value: '85%', label: 'Reduction in Response Latency' },
      { value: '99.9%', label: 'Protocol Execution Reliability' },
      { value: '360°', label: 'Asset Coverage' },
    ],
    features: [
      {
        title: 'Drone Command & Dispatch',
        description:
          'Autonomous drone deployment triggered by threat detection events. Pre-programmed flight patterns, real-time video relay to command centers, and automatic return-to-base upon mission completion. No pilot required for standard protocols.',
      },
      {
        title: 'Automated Lockdowns',
        description:
          'Zone-specific or facility-wide lockdown execution in under 8 seconds. Access control actuators, emergency doors, elevator controls, and announcement systems are orchestrated simultaneously through a single command.',
      },
      {
        title: 'Asset Tracking',
        description:
          'Real-time location intelligence for high-value assets, vehicles, personnel, and equipment. GPS, RFID, and BLE beacon integration provides continuous chain-of-custody across complex facility environments.',
      },
      {
        title: 'Protocol Automation Engine',
        description:
          'Define custom response protocols using our visual workflow builder. If-then logic chains connect detection events to physical responses — no coding required. Protocols are version-controlled and audit-logged.',
      },
      {
        title: 'Command Override',
        description:
          'Human operators can override, pause, or redirect automated responses at any point via the command interface. Full audit logs capture every automated action and every human override for post-incident review.',
      },
      {
        title: 'Cross-System Orchestration',
        description:
          'Coordinate responses across access control, building management systems, fire suppression, PA systems, and third-party security services from a single orchestration layer. Eliminate fragmented response silos.',
      },
    ],
    howItWorks: [
      {
        step: 1,
        title: 'Map Your Assets & Systems',
        description:
          'KTL engineers integrate your physical security infrastructure — drones, access control, building systems, and tracking hardware — into the Autonomous Field Ops orchestration layer during a structured onboarding process.',
      },
      {
        step: 2,
        title: 'Define Response Protocols',
        description:
          'Using the visual protocol builder, security commanders define response playbooks: what assets deploy, in what sequence, triggered by which detection events. Protocols are tested in simulation before going live.',
      },
      {
        step: 3,
        title: 'Detection Triggers Execution',
        description:
          'When the intelligence layer detects a qualifying event, the orchestration engine evaluates applicable protocols and begins execution within milliseconds. Human command is notified simultaneously.',
      },
      {
        step: 4,
        title: 'Monitor, Override & Review',
        description:
          'Operators monitor automated responses in real time through the command dashboard. Every action is logged for post-incident analysis, protocol refinement, and regulatory compliance reporting.',
      },
    ],
    useCases: [
      {
        title: 'Perimeter Breach Response',
        description:
          'Automatic drone deployment and access lockdown upon perimeter breach detection — zero delay from alert to physical response.',
      },
      {
        title: 'Emergency Evacuation',
        description:
          'Coordinate building-wide evacuation protocols including PA announcements, door releases, elevator recalls, and emergency services notification in a single automated sequence.',
      },
      {
        title: 'Asset Security',
        description:
          'Automatic lockdown of asset storage areas and tracking alert escalation when high-value assets move outside authorized zones.',
      },
      {
        title: 'Incident Containment',
        description:
          'Zone-specific lockdown execution that contains an incident to the affected area while maintaining normal operations in unaffected zones.',
      },
    ],
    faqs: [
      {
        question: 'What types of drones does the Autonomous Field Ops platform support?',
        answer:
          'The platform supports most commercially available enterprise security drones including DJI Dock, Percepto, Airobotics, and Skydio Dock platforms. Drones are integrated via our DJI Cloud API and third-party SDK adapters. Custom drone integrations are available for Enterprise customers. We recommend drones with return-to-base capability for fully autonomous operation.',
      },
      {
        question: 'How are automated response protocols approved and audited?',
        answer:
          'All protocols must be defined and approved by authorized security commanders before activation. The protocol builder generates a human-readable specification document for review. Every protocol execution is logged with full event trace, timestamp, asset IDs involved, and outcome status. Protocols can be version-controlled and rolled back if needed.',
      },
      {
        question: 'What happens if an automated response makes an incorrect decision?',
        answer:
          'Human override is always available throughout any automated response. Operators receive real-time notifications for every protocol execution and can pause, redirect, or abort at any point. The system is designed as human-in-the-loop by default — automation accelerates execution of human-approved protocols, it does not replace human judgment for ambiguous situations.',
      },
      {
        question: 'Can the platform integrate with our existing access control infrastructure?',
        answer:
          'Yes. The Autonomous Field Ops platform integrates with all major access control systems including Genetec, Lenel, Software House, Honeywell Pro-Watch, and ASSA ABLOY platforms. Integration is achieved through our hardware abstraction layer, which normalizes commands across different vendor APIs.',
      },
      {
        question: 'What are the regulatory requirements for autonomous drone deployment?',
        answer:
          'Regulatory requirements vary by jurisdiction. In most markets, drone deployment on private property within designated airspace does not require individual flight permits, but site-specific permits and airspace authorizations are required in some regions. KTL\'s implementation team handles regulatory assessment and documentation as part of Enterprise onboarding.',
      },
    ],
    defaultPlans: [
      {
        name: 'Plus',
        price: 999,
        tagline: 'For single-facility operations',
        features: [
          'Up to 5 response assets',
          'Automated lockdown protocols',
          'Asset tracking (RFID/BLE)',
          'Standard protocol library',
          'Incident logging',
          'Email & SMS command alerts',
          'Business hours support',
        ],
        isRecommended: false,
        cta: 'Deploy Plus',
      },
      {
        name: 'Pro',
        price: 3499,
        tagline: 'For multi-site enterprise response',
        features: [
          'Up to 25 response assets',
          'Drone dispatch & command',
          'Custom protocol builder',
          'Cross-system orchestration',
          'Real-time command dashboard',
          'Full audit trail',
          'API access',
          '24/7 priority support',
          '99.9% uptime SLA',
        ],
        isRecommended: true,
        badge: 'Recommended',
        cta: 'Deploy Pro',
      },
      {
        name: 'Enterprise',
        price: 'Custom',
        tagline: 'For critical infrastructure',
        features: [
          'Unlimited response assets',
          'Custom drone fleet integration',
          'Advanced simulation & testing',
          'Regulatory compliance package',
          'Dedicated operations team',
          'On-premise deployment',
          'White-label command interface',
          '99.99% SLA',
        ],
        isRecommended: false,
        cta: 'Contact Sales',
      },
    ],
  },

  {
    slug: 'ai-agentic-saas',
    title: 'AI Agentic SaaS',
    subtitle: 'Agents That Think, Learn, and Act — Without You.',
    category: 'Enterprise AI Automation',
    gradient: 'from-emerald-500 to-teal-700',
    accentColor: 'emerald',
    shortDescription:
      'Self-evolving software agents that manage enterprise workflows autonomously. Our agents learn from your operational data to predict bottlenecks and execute solutions without human intervention.',
    longDescription: `Most enterprise software requires humans to operate it. KTL's AI Agentic SaaS flips this model: intelligent software agents operate your enterprise workflows, with humans setting objectives rather than executing tasks.

Our agents are purpose-built for enterprise operational domains — IT infrastructure, supply chain, customer service, HR workflows, and compliance management. Each agent ingests your historical operational data, builds a predictive model of your processes, and begins autonomously managing assigned workflow domains. When bottlenecks are predicted, agents pre-emptively reallocate resources. When code fails, self-healing agents diagnose and remediate. When anomalies appear, agents escalate with full context and recommended actions.

Unlike static RPA tools, KTL agents continuously improve. Every operational decision is evaluated against outcomes, refining the agent's decision model over time. Your workflows become progressively more efficient without any manual tuning.`,
    keyMetrics: [
      { value: '73%', label: 'Average Workflow Efficiency Gain' },
      { value: '< 30min', label: 'Mean Time to Autonomous Remediation' },
      { value: '99.2%', label: 'Prediction Accuracy (90-day baseline)' },
      { value: '10x', label: 'Faster Incident Response vs. Manual' },
    ],
    features: [
      {
        title: 'Predictive Maintenance',
        description:
          'Agents continuously monitor infrastructure health metrics and predict component failures before they occur. Maintenance is scheduled and executed during low-impact windows automatically, eliminating unplanned downtime.',
      },
      {
        title: 'Workflow Automation',
        description:
          'Map your enterprise workflows once using our visual process designer. Agents take ownership of execution — routing tasks, managing approvals, escalating exceptions, and enforcing SLAs without human coordination.',
      },
      {
        title: 'Self-Healing Code',
        description:
          'Infrastructure and application agents detect runtime errors, diagnose root causes, and deploy remediation patches autonomously. For complex failures, agents prepare a full diagnostic report with recommended fixes for human review.',
      },
      {
        title: 'Intelligent Resource Allocation',
        description:
          'Agents dynamically allocate compute, storage, and human resources based on predicted demand patterns. Cloud infrastructure scales proactively, not reactively — preventing performance degradation before users notice it.',
      },
      {
        title: 'Anomaly Escalation',
        description:
          'When agents encounter scenarios outside their confidence threshold, they escalate to human operators with full context: what was observed, what was tried, what the agent recommends. Nothing falls through the cracks.',
      },
      {
        title: 'Continuous Learning',
        description:
          'Every decision an agent makes is evaluated against outcomes and used to refine its operational model. Agents improve autonomously over time — no retraining or manual parameter tuning required.',
      },
    ],
    howItWorks: [
      {
        step: 1,
        title: 'Connect & Observe',
        description:
          'Agents are integrated into your enterprise systems via API and begin a passive observation phase, ingesting historical operational data and learning the patterns, rhythms, and dependencies of your processes.',
      },
      {
        step: 2,
        title: 'Model & Predict',
        description:
          'Using the operational baseline established in the observation phase, agents build predictive models of your workflows — identifying bottleneck patterns, failure signatures, and optimization opportunities.',
      },
      {
        step: 3,
        title: 'Execute Autonomously',
        description:
          'Agents begin managing assigned workflow domains. Routine decisions are executed automatically within defined parameters. Edge cases and high-stakes decisions are escalated to human operators with full context.',
      },
      {
        step: 4,
        title: 'Refine & Improve',
        description:
          'Every autonomous decision is evaluated against operational outcomes, refining the agent\'s model. Performance dashboards give operators full visibility into agent activity and cumulative efficiency gains.',
      },
    ],
    useCases: [
      {
        title: 'IT Operations (AIOps)',
        description:
          'Autonomous monitoring, incident detection, root cause analysis, and remediation across your entire IT infrastructure stack.',
      },
      {
        title: 'Supply Chain Optimization',
        description:
          'Agents manage inventory levels, supplier communications, logistics routing, and demand forecasting autonomously.',
      },
      {
        title: 'Compliance Management',
        description:
          'Automated compliance monitoring, evidence collection, and reporting across regulatory frameworks — reducing audit preparation from weeks to hours.',
      },
      {
        title: 'Customer Service Automation',
        description:
          'Intelligent routing agents triage support requests, resolve common issues autonomously, and escalate complex cases with full context to human agents.',
      },
    ],
    faqs: [
      {
        question: 'How long does it take for agents to become effective?',
        answer:
          'The observation phase typically takes 2–4 weeks, during which agents build their operational baseline. After this period, agents begin taking limited autonomous actions with high-confidence predictions. Full autonomous operation typically begins within 6–8 weeks. Prediction accuracy continues to improve for the first 90 days as the agent\'s model matures.',
      },
      {
        question: 'What limits are placed on agent autonomous decision-making?',
        answer:
          'Every agent has a configurable autonomy scope that defines which actions it can take independently and which require human approval. Scope boundaries are defined during implementation and can be adjusted by authorized administrators at any time. By default, agents operate conservatively — escalating when uncertain — and autonomy is expanded as confidence and track record are established.',
      },
      {
        question: 'How do agents handle situations they have not encountered before?',
        answer:
          'When an agent encounters a scenario outside its confidence threshold, it enters escalation mode: it pauses autonomous action, prepares a full contextual report (what was observed, what similar patterns suggest, what options exist), and routes to an appropriate human decision-maker. The human decision and its outcome are fed back to the agent as a learning event.',
      },
      {
        question: 'What enterprise systems can agents connect to?',
        answer:
          'Agents connect via REST APIs, SOAP services, JDBC/ODBC database connections, and event streams (Kafka, RabbitMQ). We have pre-built connectors for Salesforce, SAP, ServiceNow, Jira, Azure DevOps, AWS, GCP, and 100+ enterprise platforms. Custom connectors are developed as part of Enterprise onboarding.',
      },
      {
        question: 'How is agent activity audited and monitored?',
        answer:
          'Every agent decision — including the data inputs considered, the reasoning applied, and the action taken — is logged in an immutable audit trail. Compliance dashboards provide summaries by agent, by workflow domain, and by time period. All logs are exportable in standard formats for integration with enterprise audit tools.',
      },
    ],
    defaultPlans: [
      {
        name: 'Plus',
        price: 1299,
        tagline: 'For targeted workflow automation',
        features: [
          'Up to 3 agent domains',
          'Standard workflow automation',
          'Predictive monitoring',
          'Basic self-healing',
          'Compliance reporting (standard)',
          '5 administrator seats',
          'Business hours support',
        ],
        isRecommended: false,
        cta: 'Deploy Plus',
      },
      {
        name: 'Pro',
        price: 3999,
        tagline: 'For enterprise-wide agent deployment',
        features: [
          'Up to 15 agent domains',
          'Full workflow automation suite',
          'Predictive maintenance & AIOps',
          'Self-healing code & infrastructure',
          'Custom agent training',
          'Advanced compliance reporting',
          'REST API & webhook access',
          '24/7 priority support',
          '99.9% SLA',
        ],
        isRecommended: true,
        badge: 'Recommended',
        cta: 'Deploy Pro',
      },
      {
        name: 'Enterprise',
        price: 'Custom',
        tagline: 'For large-scale agent operations',
        features: [
          'Unlimited agent domains',
          'Dedicated agent model training',
          'Custom AI architecture',
          'On-premise deployment',
          'White-label agent platform',
          'Dedicated AI engineering team',
          'Advanced security & compliance',
          '99.99% SLA',
        ],
        isRecommended: false,
        cta: 'Contact Sales',
      },
    ],
  },

  {
    slug: 'iot-orchestration',
    title: 'IoT Orchestration',
    subtitle: 'One Nervous System. Infinite Sensors.',
    category: 'IoT & Edge Computing',
    gradient: 'from-amber-500 to-orange-600',
    accentColor: 'amber',
    shortDescription:
      'Unifying fragmented hardware sensors into a single, responsive digital nervous system. KTL\'s orchestration layer brings legacy hardware into the modern age with millisecond-latency communication.',
    longDescription: `Most enterprise IoT deployments are a patchwork of incompatible sensors, proprietary protocols, and fragmented data streams. Valuable operational intelligence is trapped in hardware silos, visible in vendor-specific dashboards that don't communicate with each other.

KTL's IoT Orchestration platform dissolves these silos. Our universal orchestration layer connects every sensor — environmental monitors, industrial equipment sensors, security hardware, energy systems, HVAC controls, and custom IoT devices — into a unified data fabric. Legacy hardware that predates modern IoT standards is brought into the network through our edge gateway appliances, which translate proprietary protocols into the orchestration fabric in real time.

The result is a single pane of glass for your entire physical infrastructure: millisecond-latency telemetry, unified alerting, cross-device automation, and a continuous data stream that feeds AI analytics, compliance systems, and digital twin platforms.`,
    keyMetrics: [
      { value: '< 10ms', label: 'Sensor-to-Platform Latency' },
      { value: '200+', label: 'Supported Hardware Protocols' },
      { value: '99.95%', label: 'Data Delivery Reliability' },
      { value: '1M+', label: 'Messages per Second per Gateway' },
    ],
    features: [
      {
        title: 'Sensor Fusion',
        description:
          'Aggregate data streams from disparate sensor types — environmental, industrial, security, energy, and custom devices — into a unified, normalized data model. Cross-sensor correlation surfaces insights invisible in siloed data.',
      },
      {
        title: 'Edge Computing',
        description:
          'KTL edge gateway appliances perform local AI inference, protocol translation, and data filtering at the source — reducing cloud bandwidth requirements by up to 95% while maintaining sub-10ms local response times.',
      },
      {
        title: 'Real-Time Telemetry',
        description:
          'Continuous, millisecond-precision telemetry streams from every connected device. Operational dashboards reflect the live state of your physical infrastructure with no meaningful delay between event and display.',
      },
      {
        title: 'Legacy Hardware Integration',
        description:
          'Edge gateways support 200+ hardware communication protocols including Modbus, BACnet, OPC-UA, PROFINET, and proprietary vendor protocols. Existing hardware investments are preserved and extended rather than replaced.',
      },
      {
        title: 'Cross-Device Automation',
        description:
          'Define automation rules that span device types and manufacturers. "If environmental sensor in Server Room A exceeds 28°C, trigger HVAC unit B and alert facilities manager" — all in a single rule without custom code.',
      },
      {
        title: 'Digital Twin Feed',
        description:
          'Every connected device contributes to a real-time digital twin of your physical infrastructure. Asset states, operational parameters, and spatial relationships are continuously synchronized for simulation and planning.',
      },
    ],
    howItWorks: [
      {
        step: 1,
        title: 'Deploy Edge Gateways',
        description:
          'KTL edge gateway appliances are installed at strategic points in your physical infrastructure. Each gateway discovers local devices, negotiates protocols, and begins collecting sensor data within hours of deployment.',
      },
      {
        step: 2,
        title: 'Normalize & Enrich',
        description:
          'Raw sensor data is normalized into a unified telemetry schema at the edge. Device metadata, spatial context, and operational parameters are enriched locally before transmission to the orchestration fabric.',
      },
      {
        step: 3,
        title: 'Orchestrate & Automate',
        description:
          'The orchestration layer evaluates incoming telemetry against defined rules and automation policies. Cross-device actions are triggered with sub-10ms latency, coordinated across manufacturers and protocol types.',
      },
      {
        step: 4,
        title: 'Analyze & Visualize',
        description:
          'Unified telemetry streams feed the KTL analytics platform, operational dashboards, digital twin systems, and third-party tools via API. Every sensor, everywhere, visible in one place.',
      },
    ],
    useCases: [
      {
        title: 'Smart Building Management',
        description:
          'Unify HVAC, lighting, access control, energy, and security sensors into a single platform for intelligent building operation.',
      },
      {
        title: 'Industrial IoT',
        description:
          'Connect manufacturing equipment, quality sensors, and environmental monitors for real-time production intelligence and predictive maintenance.',
      },
      {
        title: 'Energy Management',
        description:
          'Aggregate consumption data from across your facility, identify waste patterns, and automate energy-saving interventions.',
      },
      {
        title: 'Environmental Compliance',
        description:
          'Continuous monitoring of environmental parameters with automated regulatory reporting and threshold alert escalation.',
      },
    ],
    faqs: [
      {
        question: 'Can the platform connect to our legacy equipment that doesn\'t have IoT capabilities?',
        answer:
          'Yes. KTL edge gateways support 200+ industrial and building automation protocols including Modbus RTU/TCP, BACnet MS/TP and IP, OPC-UA, PROFINET, DNP3, and many proprietary vendor protocols. Older equipment with serial or analog outputs can be connected through appropriate signal converters. Our implementation team handles protocol-specific integration challenges during onboarding.',
      },
      {
        question: 'How does edge computing reduce cloud bandwidth requirements?',
        answer:
          'Raw sensor data from dense IoT deployments can generate enormous data volumes — environmental sensors alone might produce thousands of readings per minute per device. KTL edge gateways apply local filtering, aggregation, and compression rules that transmit only meaningful delta changes and alerts to the cloud, reducing bandwidth by 80–95% while maintaining full local response capability.',
      },
      {
        question: 'What is the maximum scale the platform supports?',
        answer:
          'The orchestration platform is designed for enterprise scale. A single edge gateway handles up to 1 million messages per second. The cloud orchestration fabric scales horizontally and has been tested with deployments of 500,000+ concurrent devices. There is no practical upper limit for enterprise deployments.',
      },
      {
        question: 'How is device security handled?',
        answer:
          'Every device connection is authenticated via mutual TLS certificates. Data transmission between edge and cloud is end-to-end encrypted. Devices that fail authentication are quarantined automatically. The platform maintains a device registry with full audit trail of authentication events, configuration changes, and data access.',
      },
      {
        question: 'Can we build custom dashboards for our operational teams?',
        answer:
          'Yes. The platform includes a drag-and-drop dashboard builder for operational teams who need custom views of specific sensor groups, geographic areas, or device types. For more complex needs, the unified telemetry API supports integration with Grafana, Power BI, Tableau, and any tool that can consume time-series REST or WebSocket feeds.',
      },
    ],
    defaultPlans: [
      {
        name: 'Plus',
        price: 699,
        tagline: 'For single-site IoT deployments',
        features: [
          'Up to 500 connected devices',
          '2 edge gateway appliances',
          'Standard protocol library (50+)',
          'Unified telemetry dashboard',
          'Basic automation rules (10)',
          'Data retention: 90 days',
          'Standard support',
        ],
        isRecommended: false,
        cta: 'Deploy Plus',
      },
      {
        name: 'Pro',
        price: 2299,
        tagline: 'For multi-site enterprise IoT',
        features: [
          'Up to 10,000 connected devices',
          '10 edge gateway appliances',
          'Full protocol library (200+)',
          'Digital twin feed',
          'Unlimited automation rules',
          'Cross-device orchestration',
          'Data retention: 2 years',
          'API & webhook access',
          '24/7 priority support',
        ],
        isRecommended: true,
        badge: 'Most Deployed',
        cta: 'Deploy Pro',
      },
      {
        name: 'Enterprise',
        price: 'Custom',
        tagline: 'For large-scale industrial IoT',
        features: [
          'Unlimited connected devices',
          'Custom edge infrastructure',
          'On-premise deployment option',
          'Custom protocol development',
          'Dedicated IoT engineering team',
          'SLA up to 99.99%',
          'Unlimited data retention',
          'Advanced security & compliance',
        ],
        isRecommended: false,
        cta: 'Contact Sales',
      },
    ],
  },

  {
    slug: 'go-to-market-expert',
    title: 'Go-to-Market Expert',
    subtitle: 'Strategy That Launches. Growth That Compounds.',
    category: 'Strategic Advisory',
    gradient: 'from-indigo-500 to-blue-700',
    accentColor: 'indigo',
    shortDescription:
      'Strategic guidance to launch your technology product successfully. We align your solution with market needs, build your go-to-market engine, and ensure rapid adoption and sustainable growth.',
    longDescription: `Building a great technology product is only half the equation. Most enterprise technology fails not because the product is flawed, but because the go-to-market strategy is. Kingsforth Technologies brings the same systematic rigor to market strategy that we apply to AI infrastructure — because how you enter the market is as important as what you bring to it.

Our Go-to-Market Expert service combines deep enterprise technology market knowledge, data-driven positioning frameworks, and hands-on execution support. Whether you are launching a new SaaS platform, expanding into a new vertical, or repositioning an existing product, we build the market entry strategy and then work alongside your team to execute it.

Kingsforth's GTM advisors have hands-on experience across AI, IoT, cybersecurity, and enterprise software markets across APAC, MENA, and South Asian markets — giving you market intelligence that generalist consultants simply cannot provide.`,
    keyMetrics: [
      { value: '3.2x', label: 'Average Revenue Growth (Year 1)' },
      { value: '60%', label: 'Reduction in Sales Cycle Length' },
      { value: '40+', label: 'Successful Product Launches' },
      { value: '12', label: 'Markets Covered' },
    ],
    features: [
      {
        title: 'Market Analysis',
        description:
          'Data-driven analysis of your target market: size, segmentation, competitive landscape, buyer personas, and key purchase drivers. We identify where your product wins and where it does not before you spend on sales and marketing.',
      },
      {
        title: 'Launch Strategy',
        description:
          'A structured market entry plan including sequenced target segments, channel strategy, pricing architecture, partnership approach, and milestone-based execution roadmap. Built for speed-to-revenue, not theoretical completeness.',
      },
      {
        title: 'Growth Hacking',
        description:
          'Systematic experimentation across acquisition, activation, retention, and referral channels to identify the highest-leverage growth levers for your specific product and market. We run experiments, measure outcomes, and double down on what works.',
      },
      {
        title: 'Sales Enablement',
        description:
          'Develop the sales collateral, discovery frameworks, competitive battle cards, and objection-handling playbooks your team needs to execute the GTM strategy. Training sessions ensure full team alignment.',
      },
      {
        title: 'Partner & Channel Development',
        description:
          'Identify, recruit, and onboard strategic channel partners, resellers, and technology alliances. We build partner programs that create distribution leverage beyond direct sales capacity.',
      },
      {
        title: 'Performance Tracking',
        description:
          'GTM dashboards that track leading indicators of market traction — pipeline velocity, win rates by segment, channel ROI, and cohort-based retention — giving you early signals when strategy adjustments are needed.',
      },
    ],
    howItWorks: [
      {
        step: 1,
        title: 'Discovery & Diagnosis',
        description:
          'We conduct a structured assessment of your product, competitive position, existing customer base (if any), and market context. This produces a clear-eyed picture of your current GTM readiness and the largest gaps to address.',
      },
      {
        step: 2,
        title: 'Strategy Design',
        description:
          'Based on the discovery findings, we design a market entry or growth strategy: target segment prioritization, positioning, pricing, channel mix, and 90-day execution roadmap. Delivered as a working strategy document, not a presentation.',
      },
      {
        step: 3,
        title: 'Execution Support',
        description:
          'Our advisors work alongside your team during execution — reviewing sales conversations, refining messaging based on market feedback, accelerating partner development, and making tactical adjustments as the market responds.',
      },
      {
        step: 4,
        title: 'Measure & Iterate',
        description:
          'GTM performance dashboards track leading indicators weekly. Monthly strategy reviews assess progress against milestones and identify required pivots. The strategy is treated as a living document, not a fixed plan.',
      },
    ],
    useCases: [
      {
        title: 'New Product Launch',
        description:
          'Structure and execute the market entry for a new technology product from positioning through first revenue milestones.',
      },
      {
        title: 'Market Expansion',
        description:
          'Enter new geographic markets or industry verticals with a locally-informed strategy and execution support.',
      },
      {
        title: 'Repositioning',
        description:
          'Reposition an existing product for a new buyer, segment, or competitive environment to unlock growth that has stalled.',
      },
      {
        title: 'Sales Acceleration',
        description:
          'Diagnose and fix a broken or underperforming sales motion through process redesign, enablement, and channel development.',
      },
    ],
    faqs: [
      {
        question: 'What types of technology companies do you work with?',
        answer:
          'We specialize in enterprise and B2B technology companies — particularly in AI, IoT, cybersecurity, SaaS, and deep-tech sectors. Our GTM advisors have direct operating experience in these categories, which means we understand the specific sales dynamics, procurement processes, and competitive considerations that generalist GTM consultants miss. We primarily work with companies at Series A–C stage or corporate innovation units launching new products.',
      },
      {
        question: 'How long does a typical GTM engagement run?',
        answer:
          'Engagements typically run 3–9 months depending on scope. The Discovery & Strategy phase takes 3–4 weeks. Execution support runs for as long as needed to reach agreed milestones. Some clients engage us on a retainer basis for ongoing GTM advisory as their market evolves.',
      },
      {
        question: 'Do you offer support for markets in Bangladesh and South Asia?',
        answer:
          'Yes — this is a particular strength. Kingsforth has deep relationships with enterprise buyers, government procurement channels, and technology distributors across Bangladesh, India, Pakistan, and the broader SAARC region. For clients looking to enter or expand in these markets, we offer market introductions and channel partner facilitation in addition to strategy work.',
      },
      {
        question: 'What deliverables should we expect at the end of the strategy phase?',
        answer:
          'The strategy deliverable package includes: (1) Market sizing and segmentation analysis, (2) Buyer persona profiles with validated purchase criteria, (3) Competitive positioning map, (4) Pricing architecture recommendation, (5) Channel strategy and partner target list, (6) 90-day execution roadmap with milestones and owners, (7) Sales messaging framework. All documents are working files designed for team use, not presentation decks.',
      },
      {
        question: 'How do you measure success?',
        answer:
          'We agree on outcome milestones at the start of each engagement — typically a combination of pipeline created, qualified opportunities, partnerships signed, and first revenue closed within defined timeframes. GTM dashboards track leading indicators weekly so that we can identify and address underperformance early rather than at the end of an engagement.',
      },
    ],
    defaultPlans: [
      {
        name: 'Plus',
        price: 4999,
        tagline: 'For focused GTM strategy work',
        features: [
          'Market analysis & sizing',
          'Competitive positioning',
          'Buyer persona development',
          'Go-to-market strategy document',
          '90-day execution roadmap',
          '2 advisory sessions per month',
          '3-month engagement',
        ],
        isRecommended: false,
        cta: 'Engage Plus',
      },
      {
        name: 'Pro',
        price: 9999,
        tagline: 'For full strategy + execution support',
        features: [
          'Full market analysis suite',
          'Pricing architecture design',
          'Channel & partner strategy',
          'Sales enablement package',
          'GTM performance dashboard',
          'Weekly advisory sessions',
          'Execution support (embedded)',
          '6-month engagement',
        ],
        isRecommended: true,
        badge: 'Most Comprehensive',
        cta: 'Engage Pro',
      },
      {
        name: 'Enterprise',
        price: 'Custom',
        tagline: 'For large-scale market programs',
        features: [
          'Multi-market strategy',
          'Dedicated GTM team',
          'Partner recruitment & onboarding',
          'Market introduction facilitation',
          'Ongoing retainer option',
          'Board-level reporting',
          'Custom engagement scope',
          'Success-linked pricing option',
        ],
        isRecommended: false,
        cta: 'Contact Sales',
      },
    ],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
