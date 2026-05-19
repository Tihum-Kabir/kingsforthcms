export interface SolutionFeatureSection {
  title: string;
  description: string;
  points: string[];
}

export interface SolutionFAQ {
  question: string;
  answer: string;
}

export interface SolutionStat {
  value: string;
  label: string;
}

export interface Solution {
  slug: string;
  title: string;
  subtitle: string;
  category: 'industry' | 'use-case';
  heroTagline: string;
  shortDescription: string;
  longDescription: string;
  gradient: string;
  accentColor: string;
  keyBenefits: { title: string; description: string }[];
  stats: SolutionStat[];
  featureSections: SolutionFeatureSection[];
  relevantServices: string[];
  faqs: SolutionFAQ[];
}

export const INDUSTRY_SOLUTIONS: Solution[] = [
  {
    slug: 'education',
    title: 'Education',
    subtitle: 'Protect Students and Faculty with Real-Time Threat Intelligence',
    category: 'industry',
    heroTagline: 'AI-powered campus safety that acts before threats escalate',
    gradient: 'from-violet-500 to-purple-700',
    accentColor: 'violet',
    shortDescription:
      'K-12 schools and higher education institutions face uniquely complex security environments. KTL delivers purpose-built AI surveillance, automated emergency response, and forensic intelligence for academic campuses.',
    longDescription: `Educational institutions carry a profound responsibility: the safety of thousands of students and staff in environments designed to be open, welcoming, and conducive to learning — fundamentally at odds with a fortress security posture.

KTL's Education solution resolves this tension. Our AI-powered platform monitors your campus continuously without the intrusion of constant human security presence. Behavioral detection algorithms identify threats at the moment they emerge, before they escalate. Automated response protocols execute emergency procedures in seconds. And privacy-by-default design ensures student and faculty privacy is protected throughout.

Whether you are securing a single K-12 campus or a distributed university system, KTL's platform scales to your environment and integrates with your existing infrastructure.`,
    stats: [
      { value: '73%', label: 'Faster Emergency Response' },
      { value: '< 2s', label: 'Threat Detection Latency' },
      { value: '0.3%', label: 'False Positive Rate' },
      { value: '24/7', label: 'Continuous Monitoring' },
    ],
    keyBenefits: [
      {
        title: 'Protect Your Campus',
        description:
          'Detect weapons, violent behavior, and unauthorized access the moment they occur — giving your security team actionable intelligence, not just footage.',
      },
      {
        title: 'Speed Up Emergency Response',
        description:
          'Automated lockdown protocols, emergency notifications, and first-responder location sharing execute in under 8 seconds — far faster than any manual process.',
      },
      {
        title: 'Protect Student Privacy',
        description:
          'AI monitors the campus environment, not individual identities. Privacy-by-default design with configurable facial recognition controls meets FERPA, GDPR, and institutional privacy policies.',
      },
    ],
    featureSections: [
      {
        title: 'Behavioral Threat Detection',
        description:
          'KTL\'s Cognitive Surveillance engine continuously analyzes video feeds from your campus cameras — detecting the behavioral signals that precede incidents before they become emergencies.',
        points: [
          'Weapons detection across all monitored areas',
          'Fighting, bullying, and aggressive behavior detection',
          'Unauthorized perimeter breach and tailgating alerts',
          'Crowd formation and escalation detection',
          'After-hours and restricted-zone access monitoring',
          'Real-time threat scoring with confidence indicators',
        ],
      },
      {
        title: 'Automated Emergency Response',
        description:
          'When a threat is detected, our Autonomous Field Ops platform executes your emergency protocols automatically — every second counts in a campus emergency.',
        points: [
          'Zone-specific and campus-wide lockdown in under 8 seconds',
          'Automated PA system announcements',
          'Real-time incident location sharing with first responders',
          'Drone deployment for aerial situational awareness',
          'Emergency services auto-notification (configurable)',
          'Dynamic evacuation route guidance',
        ],
      },
      {
        title: 'Visitor & Access Management',
        description:
          'Intelligent visitor management and access control integration keeps unauthorized individuals out while maintaining the welcoming environment educational institutions require.',
        points: [
          'Visitor identity verification and watchlist screening',
          'Access control integration with existing badge systems',
          'Contractor and vendor access management',
          'Real-time occupancy tracking by zone',
          'Sex offender and person-of-interest watchlist integration',
          'Audit-ready visitor log with full visit history',
        ],
      },
      {
        title: 'Incident Investigation & Forensics',
        description:
          'When incidents occur, our Big Data Forensic engine enables rapid reconstruction of exactly what happened across every data source — supporting administrative review, law enforcement, and legal proceedings.',
        points: [
          'Natural language search across all campus camera footage',
          'Multi-camera individual tracking and timeline reconstruction',
          'Audio anomaly detection and analysis',
          'Court-admissible evidence packaging with chain of custody',
          'Automated incident report generation',
          'Integration with student information systems for context',
        ],
      },
    ],
    relevantServices: ['cognitive-surveillance', 'autonomous-field-ops', 'big-data-forensic', 'iot-orchestration'],
    faqs: [
      {
        question: 'Can the system work with our existing campus camera infrastructure?',
        answer:
          'Yes. KTL\'s Cognitive Surveillance engine integrates with virtually any IP camera system via RTSP/ONVIF protocols. There is no need to replace existing hardware. Our edge appliances are installed alongside your current VMS, adding AI analysis capability without disrupting existing recording and monitoring workflows.',
      },
      {
        question: 'How does the system handle student privacy under FERPA?',
        answer:
          'The system is designed with privacy-by-default principles. Facial recognition features are disabled by default and require explicit configuration by authorized administrators. Behavioral analysis does not require individual identification — the system detects events and actions, not identities. All data access is logged, and retention policies can be configured to meet institutional requirements.',
      },
      {
        question: 'What is the typical deployment timeline for a K-12 campus?',
        answer:
          'For a typical K-12 campus with existing camera infrastructure, initial deployment takes 2–4 weeks. This includes edge appliance installation, camera integration, system calibration to your campus baseline, protocol configuration, and staff training. The AI calibration phase (typically 48–72 hours) is required before behavioral detection reaches optimal accuracy.',
      },
      {
        question: 'How are emergency protocols configured and tested?',
        answer:
          'Emergency protocols are configured collaboratively with your security administrators and school leadership using KTL\'s visual protocol builder. Every protocol is reviewed, approved, and test-executed in simulation mode before going live. Annual protocol reviews and fire drill integrations are standard. No automated action occurs without prior administrator approval of the protocol.',
      },
      {
        question: 'Is special pricing available for public schools?',
        answer:
          'Yes. KTL offers dedicated pricing structures for public K-12 institutions, including grant-eligible configurations and phased deployment options that align with typical school budget cycles. Contact us to discuss your institution\'s specific budget context and requirements.',
      },
    ],
  },

  {
    slug: 'corporate',
    title: 'Corporate',
    subtitle: 'Enterprise Facility Protection and Operational Intelligence',
    category: 'industry',
    heroTagline: 'Unified AI security across your entire enterprise estate',
    gradient: 'from-cyan-500 to-blue-700',
    accentColor: 'cyan',
    shortDescription:
      'Protect complex, multi-site corporate environments with unified AI surveillance, automated threat response, operational forensics, and IoT orchestration — all managed from a single command platform.',
    longDescription: `Corporate security environments are defined by complexity: dozens or hundreds of facilities, thousands of employees, a mix of owned and leased spaces, and an ever-expanding perimeter driven by hybrid work, supply chain access, and technology infrastructure.

KTL's Corporate solution is built for this complexity. Our platform unifies security intelligence across your entire enterprise estate — every camera, every sensor, every access point — into a single operational picture. Threats are detected before they escalate. Responses are automated to eliminate the delay between detection and action. Historical data becomes instantly searchable when incidents require investigation.

For senior security leadership, KTL delivers something previously impossible: genuine operational visibility across a distributed enterprise, with the intelligence to act proactively rather than reactively.`,
    stats: [
      { value: '85%', label: 'Reduction in Security Incidents (Year 1)' },
      { value: '47+', label: 'Sites Managed from One Platform' },
      { value: '< 2s', label: 'Threat-to-Alert Response' },
      { value: '99.9%', label: 'Platform Uptime SLA' },
    ],
    keyBenefits: [
      {
        title: 'Multi-Site Unification',
        description:
          'Eliminate security silos across locations. One platform, one operational view, one command interface — regardless of how many facilities you operate.',
      },
      {
        title: 'Executive & Asset Protection',
        description:
          'Dedicated protection workflows for executive movement, high-value asset tracking, and critical infrastructure monitoring with real-time location intelligence.',
      },
      {
        title: 'Operational Intelligence',
        description:
          'Security data becomes a strategic asset. Analyze foot traffic patterns, compliance adherence, incident trends, and facility utilization to drive operational improvements beyond security.',
      },
    ],
    featureSections: [
      {
        title: 'Enterprise-Wide Surveillance Intelligence',
        description:
          'A unified AI surveillance layer across all corporate facilities — standardizing security quality regardless of local security staffing levels.',
        points: [
          'Centralized camera management across unlimited sites',
          'Behavioral threat detection with per-site calibration',
          'Executive protection tracking and escort coordination',
          'After-hours and restricted-zone monitoring',
          'Contractor and visitor behavioral monitoring',
          'Cross-site incident correlation and pattern analysis',
        ],
      },
      {
        title: 'Automated Incident Response',
        description:
          'Pre-approved response protocols execute automatically when threats are detected — from site-level lockdowns to security team dispatch and executive notifications.',
        points: [
          'Site-specific and estate-wide lockdown protocols',
          'Automated security dispatch and routing',
          'Executive security team alert workflows',
          'Third-party security service integration',
          'Asset tracking with geofence breach automation',
          'Full audit trail for all automated responses',
        ],
      },
      {
        title: 'IoT Infrastructure Integration',
        description:
          'Connect your building management systems, environmental sensors, and security hardware into a unified operational fabric for true enterprise situational awareness.',
        points: [
          'Building management system integration (HVAC, lighting, access)',
          'Environmental sensor monitoring and alerting',
          'Energy management and consumption analytics',
          'Maintenance request automation from sensor anomalies',
          'Real-time occupancy and space utilization data',
          'Digital twin of your physical infrastructure',
        ],
      },
      {
        title: 'Corporate Forensics & Compliance',
        description:
          'When incidents occur — from security breaches to HR investigations — rapid forensic capability protects the organization and satisfies regulatory and legal requirements.',
        points: [
          'Natural language search across all facility footage and logs',
          'Insider threat behavioral pattern detection',
          'HR investigation support with audit-compliant evidence',
          'Compliance monitoring (safety procedures, access policies)',
          'Regulatory audit evidence packaging',
          'Integration with corporate security information systems',
        ],
      },
    ],
    relevantServices: ['cognitive-surveillance', 'big-data-forensic', 'autonomous-field-ops', 'iot-orchestration', 'ai-agentic-saas'],
    faqs: [
      {
        question: 'How does the platform handle our mix of owned, leased, and partner facility types?',
        answer:
          'KTL\'s platform is designed for heterogeneous corporate real estate. Each facility type has configurable security policies, access levels, and data retention rules. Leased facilities can operate with data segregation to protect landlord privacy. Partner facilities with shared spaces can participate in appropriate platform features while maintaining data boundaries. Our implementation team designs the access control architecture during onboarding.',
      },
      {
        question: 'What integration does the platform have with corporate identity and access management systems?',
        answer:
          'The platform integrates with all major enterprise identity providers via SAML 2.0 and LDAP/Active Directory. Employee access authorizations are synchronized from your HR system, ensuring access rights reflect current employment status. The platform can also feed security events back into your SIEM and SOAR tools via standard APIs.',
      },
      {
        question: 'How is the platform managed at the enterprise level versus the site level?',
        answer:
          'The platform has a hierarchical management model. Global security leadership has visibility and control over the entire estate. Regional managers have visibility and control over their geographic scope. Site security personnel have visibility of their facility only. Alert routing, escalation paths, and response authorities are all configurable by management level.',
      },
      {
        question: 'What cybersecurity standards does the platform meet for enterprise procurement?',
        answer:
          'The platform is SOC 2 Type II certified and ISO 27001 compliant. Data in transit and at rest is AES-256 encrypted. The platform supports deployment in private cloud, public cloud (AWS, Azure, GCP), and on-premise configurations. Full security questionnaire responses and penetration test reports are available under NDA for enterprise procurement teams.',
      },
    ],
  },

  {
    slug: 'cities-government',
    title: 'Cities & Government',
    subtitle: 'Public Sector Safety and Infrastructure Intelligence',
    category: 'industry',
    heroTagline: 'Sovereign-grade intelligence for critical public infrastructure',
    gradient: 'from-emerald-500 to-teal-700',
    accentColor: 'emerald',
    shortDescription:
      'Protect public spaces, critical infrastructure, and government facilities with AI surveillance, autonomous field operations, and real-time situational awareness built for the demands of public sector deployment.',
    longDescription: `Public sector security environments present challenges unique in scope and consequence: vast geographic coverage, critical infrastructure protection, public safety obligations, strict regulatory frameworks, and the requirement to serve diverse populations while maintaining civil liberties.

KTL's Cities & Government solution is engineered for this operating environment. Our platform has been designed with sovereignty, data governance, and public accountability as foundational requirements — not afterthoughts. AI capabilities are deployed to enhance, not replace, public safety decision-making.

From smart city surveillance infrastructure to critical facility protection to emergency response coordination, KTL provides the intelligence layer that enables government agencies to fulfill their public safety mandate with the resources available.`,
    stats: [
      { value: '60%', label: 'Faster Emergency Response Coordination' },
      { value: '200+', label: 'Camera Feeds per Command Center' },
      { value: '99.95%', label: 'Critical Infrastructure Uptime' },
      { value: '40+', label: 'Agency Integration Protocols' },
    ],
    keyBenefits: [
      {
        title: 'Critical Infrastructure Protection',
        description:
          'AI monitoring of utilities, transport hubs, government buildings, and public spaces — with automated perimeter response and coordinated emergency services integration.',
      },
      {
        title: 'Public Space Safety',
        description:
          'Behavior-based threat detection in public areas that identifies safety concerns without mass surveillance overreach — balancing protection with civil liberty considerations.',
      },
      {
        title: 'Emergency Services Integration',
        description:
          'Direct integration with police, fire, and emergency medical services dispatch systems for coordinated multi-agency response to any incident.',
      },
    ],
    featureSections: [
      {
        title: 'Smart City Surveillance Infrastructure',
        description:
          'A scalable AI surveillance backbone for public spaces, transportation hubs, and government facilities — providing real-time situational awareness across the urban environment.',
        points: [
          'City-scale camera network management',
          'Crowd density and flow monitoring',
          'Abandoned object and suspicious package detection',
          'Traffic incident detection and reporting',
          'Public disturbance and crowd escalation detection',
          'ANPR (Automatic Number Plate Recognition)',
        ],
      },
      {
        title: 'Critical Infrastructure Protection',
        description:
          'Comprehensive protection for power facilities, water treatment plants, transport infrastructure, and government buildings against physical threats.',
        points: [
          'Perimeter security with drone patrol integration',
          'Insider threat behavioral monitoring',
          'Unauthorized access and tailgating detection',
          'Environmental anomaly monitoring (chemical, thermal)',
          'Critical system tamper detection',
          'Supply chain access management',
        ],
      },
      {
        title: 'Emergency Response Coordination',
        description:
          'Integrated emergency management platform connecting detection, dispatch, and response across multiple agencies and jurisdictions.',
        points: [
          'Multi-agency command center integration',
          'Real-time incident location sharing with first responders',
          'Dynamic evacuation route planning and guidance',
          'Resource deployment tracking and optimization',
          'Inter-agency communication integration',
          'Post-incident forensic support for investigations',
        ],
      },
      {
        title: 'IoT Municipal Infrastructure',
        description:
          'Connect municipal IoT deployments — environmental sensors, traffic systems, utility monitors, and public safety hardware — into a unified city operations platform.',
        points: [
          'Environmental quality monitoring (air, noise, water)',
          'Smart traffic management integration',
          'Public lighting and energy management',
          'Utility infrastructure monitoring and alerting',
          'Smart parking and city logistics data',
          'Real-time city operations dashboard',
        ],
      },
    ],
    relevantServices: ['cognitive-surveillance', 'autonomous-field-ops', 'iot-orchestration', 'big-data-forensic'],
    faqs: [
      {
        question: 'Can the platform be deployed on government-approved sovereign cloud infrastructure?',
        answer:
          'Yes. KTL supports deployment on approved government cloud infrastructure including on-premise government data centers, sovereign cloud instances, and government-certified commercial cloud (where applicable in your jurisdiction). We work with your IT governance and security teams to ensure the deployment architecture meets all data sovereignty and classification requirements.',
      },
      {
        question: 'How does the platform address civil liberties concerns with public surveillance?',
        answer:
          'KTL\'s public deployment configurations include configurable privacy controls: automatic face blurring for non-investigation contexts, defined data retention limits (typically 30 days for non-incident footage), strict access control with full audit trails, and policy-driven limitations on cross-reference with other government databases. All deployment configurations can be documented for public accountability reporting.',
      },
      {
        question: 'What certifications and compliance standards does the platform meet for government procurement?',
        answer:
          'The platform has been designed to meet government procurement requirements including ISO 27001, NIST 800-53, and common criteria security standards. Country-specific certifications are available for procurement in Bangladesh, India, and GCC markets. Our pre-sales team provides full compliance documentation packages for government tender submissions.',
      },
      {
        question: 'How does the platform integrate with existing police and emergency services dispatch systems?',
        answer:
          'KTL integrates with CAD (Computer-Aided Dispatch) systems through standard law enforcement integration protocols including NIEM conformant APIs. Emergency alerts from the platform can populate directly into CAD systems with location data, incident type, and visual context. We have prior integration experience with CAD vendors including Motorola PremierOne, Tyler New World, and Hexagon.',
      },
    ],
  },
];

export const USECASE_SOLUTIONS: Solution[] = [
  {
    slug: 'perimeter-security',
    title: 'Perimeter Security',
    subtitle: 'Advanced Boundary Intelligence and Intrusion Prevention',
    category: 'use-case',
    heroTagline: 'Detect, verify, and respond to perimeter threats before they become breaches',
    gradient: 'from-rose-500 to-pink-700',
    accentColor: 'rose',
    shortDescription:
      'AI-powered perimeter detection that identifies intrusion attempts, vehicle threats, and unauthorized access the moment they occur — with automated response protocols that eliminate the gap between detection and action.',
    longDescription: `Perimeter security is the first line of defense for any facility. Traditionally, it has relied on passive barriers, periodic patrols, and reactive responses to breaches after the fact. KTL's AI-powered approach transforms perimeter security from passive to active — detecting threats at the boundary before they penetrate your facility.

Our perimeter security solution combines Cognitive Surveillance's behavior-based video analysis with IoT Orchestration's sensor fusion and Autonomous Field Ops' automated response capability. The result is a perimeter that doesn't just record intrusions — it detects attempts, verifies threats, and responds before damage is done.`,
    stats: [
      { value: '< 2s', label: 'Detection to Alert' },
      { value: '98%', label: 'Intrusion Detection Rate' },
      { value: '0.3%', label: 'False Positive Rate' },
      { value: '360°', label: 'Coverage with Drone Patrol' },
    ],
    keyBenefits: [
      {
        title: 'Detect Before Breach',
        description:
          'Behavioral AI detects intrusion attempts — ladder placement, perimeter climbing, fence cutting — before physical breach occurs. Alert before the threat is inside.',
      },
      {
        title: 'Automated Response',
        description:
          'Drone deployment, guard dispatch, and access lockdown execute automatically within seconds of a verified perimeter threat. No relay chain delay.',
      },
      {
        title: 'Reduce Patrol Costs',
        description:
          'AI monitoring at 100% of the perimeter 24/7 replaces costly physical patrol schedules without reducing coverage quality.',
      },
    ],
    featureSections: [
      {
        title: 'AI Perimeter Monitoring',
        description:
          'Continuous AI analysis of video feeds covering your entire perimeter — detecting intrusion attempts, unauthorized access, and suspicious behavior in real time.',
        points: [
          'Perimeter line-cross detection with sub-2-second alert',
          'Intrusion attempt behavior detection (ladder placement, climbing)',
          'Vehicle intrusion and forced-entry detection',
          'Tailgating and anti-passback detection at access points',
          'Loitering and pre-attack reconnaissance detection',
          'Low-light and thermal camera support for 24/7 coverage',
        ],
      },
      {
        title: 'Sensor-Enhanced Detection',
        description:
          'Combine video analytics with ground sensors, vibration detectors, and thermal imaging for a multi-layer detection approach that eliminates blind spots.',
        points: [
          'Microwave, PIR, and vibration sensor integration',
          'Ground radar for outdoor open-area coverage',
          'Thermal imaging for darkness and adverse weather',
          'Sensor fusion with AI-driven false alarm reduction',
          'Environmental condition monitoring (fog, rain adjustments)',
          'GPS-coordinated sensor and camera coverage mapping',
        ],
      },
      {
        title: 'Rapid Response Integration',
        description:
          'Verified perimeter threats trigger coordinated physical responses — drone deployment, guard dispatch, and facility lockdown — with no manual relay required.',
        points: [
          'Autonomous drone deployment to threat location',
          'Guard dispatch with GPS-directed routing',
          'Automated facility lockdown by zone',
          'External security service integration',
          'Police/emergency services notification (configurable)',
          'Real-time response status tracking in command dashboard',
        ],
      },
    ],
    relevantServices: ['cognitive-surveillance', 'autonomous-field-ops', 'iot-orchestration'],
    faqs: [
      {
        question: 'What perimeter lengths can the system cover effectively?',
        answer:
          'The system scales to any perimeter length. A single edge appliance supports up to 32 camera feeds, which can cover several kilometers of perimeter depending on camera placement. For large industrial or infrastructure perimeters, multiple appliances are deployed in a coordinated network. Drone patrol supplements fixed camera coverage for very large or complex perimeters.',
      },
      {
        question: 'How does the system perform in adverse weather conditions?',
        answer:
          'For all-weather operation, we recommend a combination of standard IP cameras supplemented with thermal imaging cameras. Thermal cameras are unaffected by darkness, rain, and fog. The AI detection models are specifically trained on thermal imagery and automatically switch detection modes based on ambient conditions and camera type.',
      },
      {
        question: 'Can the system distinguish between animals and human intruders to reduce false alarms?',
        answer:
          'Yes. The AI classification models are trained to distinguish humans, vehicles, and animals with high accuracy. Animal detections are configurable — they can generate a log entry without triggering an alert, or can be routed to lower-priority notification channels. The false positive rate for human intrusion detection is below 0.3% after the calibration phase.',
      },
    ],
  },

  {
    slug: 'medical-emergencies',
    title: 'Medical Emergencies',
    subtitle: 'Rapid Detection and Response for Health Incidents',
    category: 'use-case',
    heroTagline: 'Detect falls, medical events, and health incidents before someone has to call for help',
    gradient: 'from-amber-500 to-orange-600',
    accentColor: 'amber',
    shortDescription:
      'AI detection of falls, medical events, and health emergencies enables faster response when every second matters — reducing the time between incident and assistance for staff, students, and visitors in your facilities.',
    longDescription: `Medical emergencies in facility environments are often not witnessed directly. Falls in stairwells, cardiac events in remote areas, and health crises in individual offices may go undetected for critical minutes while a person waits for someone to find them. Every minute of delay in a cardiac event reduces survival probability significantly.

KTL's Medical Emergency detection capability uses behavioral AI to identify the visual signatures of medical events — sudden falls, collapse, loss of mobility, and distress behavior — across your facility camera network. When a potential medical event is detected, alerts are dispatched immediately with location data and visual context, enabling response before someone calls for help.`,
    stats: [
      { value: '< 15s', label: 'Fall Detection to Alert' },
      { value: '94%', label: 'Medical Event Detection Rate' },
      { value: '3-4min', label: 'Average Response Time Reduction' },
      { value: '24/7', label: 'Continuous Monitoring Coverage' },
    ],
    keyBenefits: [
      {
        title: 'Immediate Detection',
        description:
          'AI detects falls, collapse, and medical distress behavior across all monitored areas — including areas where human witnesses are unlikely.',
      },
      {
        title: 'Faster Response',
        description:
          'Alerts dispatch with precise location data, routing the nearest available responder directly to the incident in seconds.',
      },
      {
        title: 'No Call Required',
        description:
          'Detection and alerting happen automatically. Victims who are incapacitated and unable to call for help receive a response triggered by the AI, not by a bystander finding them.',
      },
    ],
    featureSections: [
      {
        title: 'Fall and Collapse Detection',
        description:
          'Specialized AI models trained on thousands of genuine medical event scenarios identify the visual signatures of health emergencies across your camera feeds.',
        points: [
          'Sudden fall detection across all monitored areas',
          'Collapse and loss-of-mobility event detection',
          'Extended stationary person detection in active zones',
          'Distress behavior pattern recognition',
          'Differentiation between intentional and emergency falls',
          'Low-light and thermal support for monitoring high-risk areas',
        ],
      },
      {
        title: 'Emergency Response Coordination',
        description:
          'Detected medical events trigger immediate, coordinated response with precise location data and visual confirmation for responders.',
        points: [
          'Instant alert dispatch with GPS room/zone location',
          'Nearest qualified responder routing',
          'AED location guidance in alert notifications',
          'Elevator pre-emption for emergency response routing',
          'Emergency services notification with incident details',
          'Real-time video relay to responding personnel',
        ],
      },
      {
        title: 'High-Risk Area Coverage',
        description:
          'Prioritize monitoring resources for areas where medical emergencies are most likely or most dangerous — from elderly care areas to industrial work zones.',
        points: [
          'Configurable priority zones with enhanced monitoring',
          'Lone worker detection and wellness check integration',
          'Hazardous area monitoring for workplace accidents',
          'Stairwell and isolated area coverage',
          'Slippery surface and environmental hazard monitoring',
          'Post-incident footage access for medical review',
        ],
      },
    ],
    relevantServices: ['cognitive-surveillance', 'autonomous-field-ops', 'iot-orchestration'],
    faqs: [
      {
        question: 'How does the system differentiate between a genuine medical fall and someone sitting down or tripping?',
        answer:
          'The AI model evaluates multiple factors: the dynamics of the fall (speed, trajectory, impact), the post-fall position, and critically, subsequent behavior. A person who trips and immediately gets up is not flagged. A person who falls and remains stationary for more than a configurable threshold (typically 20–30 seconds) generates an alert. The model has been trained on thousands of genuine medical events and is validated against behavioral datasets.',
      },
      {
        question: 'Does monitoring in areas like bathrooms or private offices raise privacy concerns?',
        answer:
          'Camera monitoring in bathrooms or private offices is not appropriate and KTL does not configure this. For bathrooms and other private spaces where monitoring is not possible, lone worker wellness check protocols can be configured — periodic automated check-ins where no response triggers an alert to a duty supervisor.',
      },
      {
        question: 'Can the system work in environments with industrial protective equipment?',
        answer:
          'Yes. AI detection models are trained across a range of facility types including industrial environments where workers wear PPE. The models detect medical events based on movement dynamics and positional patterns, not facial recognition or skin detection, so PPE does not materially affect detection accuracy.',
      },
    ],
  },

  {
    slug: 'weapons-violence',
    title: 'Weapons & Violence Detection',
    subtitle: 'Real-Time Threat Detection and Neutralization',
    category: 'use-case',
    heroTagline: 'Identify weapons and violent behavior in seconds — before incidents escalate',
    gradient: 'from-red-600 to-rose-700',
    accentColor: 'red',
    shortDescription:
      'AI-powered detection of weapons and violent behavior gives security teams precious seconds to respond before incidents escalate — protecting people in schools, corporate facilities, and public spaces.',
    longDescription: `The difference between effective violence prevention and reactive response is measured in seconds. KTL's Weapons & Violence Detection capability continuously analyzes your security camera feeds for the visual signatures of weapons and violent behavior — detecting threats the moment they become visible, before they escalate to their maximum potential harm.

Our detection models are trained on extensive datasets of real-world violent incident footage, weapons across many categories, and the behavioral precursors that distinguish genuine threat signatures from benign activities. The result is a detection system that provides genuine early warning — not just confirmation of an event already in progress.`,
    stats: [
      { value: '< 3s', label: 'Detection to Alert Dispatch' },
      { value: '96%', label: 'Weapon Detection Accuracy' },
      { value: '0.4%', label: 'False Positive Rate' },
      { value: 'Real-Time', label: 'Threat Tracking Across Cameras' },
    ],
    keyBenefits: [
      {
        title: 'Detect Before Escalation',
        description:
          'Weapon display and aggressive behavior are detected at the moment they occur — giving responders seconds of warning before a situation escalates.',
      },
      {
        title: 'Continuous Coverage',
        description:
          'AI monitors every camera feed simultaneously, 24/7. No fatigue, no distraction, no blind spots in your monitored environment.',
      },
      {
        title: 'Coordinated Response',
        description:
          'Verified threat detection triggers your response protocols automatically — lockdown, guard dispatch, emergency services — while responders receive real-time tracking of the threat.',
      },
    ],
    featureSections: [
      {
        title: 'Weapon Detection',
        description:
          'Specialized computer vision models detect firearms, edged weapons, and improvised weapons in video feeds with industry-leading accuracy and minimal false positives.',
        points: [
          'Firearm detection (handguns, long guns, concealed weapons)',
          'Edged weapon detection (knives, machetes)',
          'Weapon display vs. concealment distinction',
          'Bystander weapon notification behavior detection',
          'Vehicle as weapon detection in exterior areas',
          'Works with existing camera infrastructure',
        ],
      },
      {
        title: 'Violent Behavior Detection',
        description:
          'Behavioral AI identifies the actions and precursor signals of violent incidents — enabling pre-emptive response before a situation reaches its peak.',
        points: [
          'Physical assault and fighting detection',
          'Threatening and aggressive behavior patterns',
          'Crowd violence and mob formation detection',
          'Robbery and forced-entry behavior detection',
          'Behavioral precursor signals (agitated pacing, confrontational positioning)',
          'Real-time threat level scoring with confidence indicators',
        ],
      },
      {
        title: 'Response Coordination',
        description:
          'Threat detections trigger instant, coordinated response workflows — giving your security team and emergency services everything they need to respond effectively.',
        points: [
          'Instant multi-channel alert dispatch (SMS, radio, app)',
          'Real-time threat location and multi-camera tracking',
          'Automated lockdown of affected zones',
          'Emergency services notification with incident details and location',
          'Response team real-time video feed access',
          'Dynamic evacuation routing away from threat location',
        ],
      },
    ],
    relevantServices: ['cognitive-surveillance', 'autonomous-field-ops', 'big-data-forensic'],
    faqs: [
      {
        question: 'What is the false positive rate and how is it managed?',
        answer:
          'The false positive rate for weapon detection is below 0.4% after the calibration phase. We manage false positives through a two-stage detection pipeline: initial AI detection triggers an operator alert, while simultaneous automated tracking continues. For Enterprise deployments, a second AI validation stage can be configured before physical response protocols are triggered. Operators can confirm or dismiss alerts through the mobile command app.',
      },
      {
        question: 'Can the system detect concealed weapons?',
        answer:
          'The system detects weapons when they become visible — either drawn and displayed, or briefly visible through clothing movement. For concealed weapon screening at entry points, we recommend integration with dedicated millimeter-wave or X-ray screening technology, which KTL can integrate into the platform\'s alert management system.',
      },
      {
        question: 'How does the system perform in crowded environments like event venues?',
        answer:
          'Crowded environment detection performance depends on camera coverage density and positioning. For event venues, we recommend a combination of fixed wide-angle cameras and PTZ cameras that can be directed to areas of interest. Detection accuracy in crowd conditions is optimized through camera positioning recommendations provided by our implementation team during site assessment.',
      },
    ],
  },

  {
    slug: 'vsoc',
    title: 'VSOC Integration',
    subtitle: 'Virtual Security Operations Center Connectivity',
    category: 'use-case',
    heroTagline: 'Your entire security ecosystem, unified in a sovereign command platform',
    gradient: 'from-indigo-500 to-blue-700',
    accentColor: 'indigo',
    shortDescription:
      'Connect every security system, sensor, and response asset into a unified Virtual Security Operations Center — giving your team the situational awareness and command capability to manage security across your entire estate from a single platform.',
    longDescription: `A Security Operations Center is only as powerful as the data it can access and the systems it can control. Most enterprise SOCs are hindered by siloed tools, fragmented data feeds, and manual workflows that introduce latency and increase the risk of events falling through the cracks.

KTL's VSOC Integration transforms your security operations by connecting every component of your security ecosystem — AI surveillance feeds, access control systems, IoT sensors, incident management tools, and physical response assets — into a single, unified command platform. Your security team operates with complete situational awareness, automated workflow support, and direct command of physical response systems.`,
    stats: [
      { value: '1 Platform', label: 'All Security Systems Unified' },
      { value: '80%', label: 'Reduction in Alert-to-Action Time' },
      { value: '60+', label: 'Security System Integrations' },
      { value: '24/7', label: 'Autonomous Monitoring Coverage' },
    ],
    keyBenefits: [
      {
        title: 'Complete Situational Awareness',
        description:
          'Every camera, sensor, and system in a single operational view. See everything, understand context, and respond decisively without switching between tools.',
      },
      {
        title: 'Autonomous Monitoring',
        description:
          'AI continuously monitors all feeds and routes only actionable alerts to operators — dramatically reducing alert fatigue and ensuring genuine threats receive immediate attention.',
      },
      {
        title: 'Unified Command',
        description:
          'Issue lockdowns, dispatch response teams, activate drone assets, and coordinate with emergency services — all from the VSOC command interface without touching a separate system.',
      },
    ],
    featureSections: [
      {
        title: 'Unified Security Intelligence',
        description:
          'A single operational picture combining AI video intelligence, access control events, IoT sensor data, and incident management in one command interface.',
        points: [
          'Multi-site, multi-feed video wall management',
          'AI-curated alert queue with priority scoring',
          'Access control event integration and visualization',
          'IoT sensor status and anomaly feed',
          'Incident management and case tracking',
          'Unified search across all connected systems',
        ],
      },
      {
        title: 'Automated Security Workflows',
        description:
          'Define and deploy automated security workflows that reduce manual coordination and ensure consistent response across your security estate.',
        points: [
          'Alert routing and escalation automation',
          'Automated response protocol execution',
          'Cross-system event correlation and pattern detection',
          'Scheduled report generation and distribution',
          'Compliance monitoring and exception tracking',
          'SLA monitoring for response time requirements',
        ],
      },
      {
        title: 'Advanced Analytics & Intelligence',
        description:
          'Transform security event data into operational intelligence with dashboards, trend analysis, and forensic capability that supports both daily operations and strategic planning.',
        points: [
          'Real-time security event dashboards',
          'Incident trend analysis and pattern identification',
          'Natural language search across all historical event data',
          'Predictive risk scoring by location and time',
          'Regulatory compliance reporting',
          'Executive security posture dashboards',
        ],
      },
      {
        title: 'Open Integration Architecture',
        description:
          'KTL\'s VSOC platform is designed to be the integration hub for your security ecosystem — not a closed system that creates new silos.',
        points: [
          '60+ native security system integrations',
          'Standard API (REST, WebSocket) for custom integrations',
          'SIEM integration (Splunk, QRadar, Sentinel)',
          'SOAR platform connectivity',
          'Physical security information management (PSIM) compatibility',
          'Emergency services CAD system integration',
        ],
      },
    ],
    relevantServices: ['cognitive-surveillance', 'big-data-forensic', 'autonomous-field-ops', 'iot-orchestration', 'ai-agentic-saas'],
    faqs: [
      {
        question: 'How long does VSOC integration deployment typically take?',
        answer:
          'Deployment timeline depends on the number and type of systems being integrated. A typical single-site VSOC integration covering cameras, access control, and primary IoT systems takes 3–6 weeks. Multi-site enterprise deployments with complex system portfolios typically run 2–4 months. KTL provides a detailed integration timeline during the scoping phase.',
      },
      {
        question: 'Can the VSOC platform replace our existing VMS?',
        answer:
          'KTL\'s VSOC platform can serve as the primary operator interface for all video management, while your existing VMS continues to handle recording and storage in the background. Alternatively, for organizations looking to consolidate, KTL\'s integrated VMS can replace existing VMS software. The approach is determined based on your infrastructure, investment, and operational requirements.',
      },
      {
        question: 'How does the platform manage alert fatigue for security operators?',
        answer:
          'Alert fatigue is a core design consideration. KTL\'s AI layer filters events through a two-stage pipeline — initial detection by specialized models followed by contextual validation against operational patterns, time of day, and historical baselines. Operators receive only alerts that exceed a configurable confidence threshold. Alert queues are prioritized by threat level, ensuring the most critical situations receive immediate attention. Typical deployments reduce total alert volume by 70–90% compared to raw alarm feeds.',
      },
      {
        question: 'What redundancy and failover does the VSOC platform provide?',
        answer:
          'The platform is designed for operational continuity. Core detection and response functions run on edge appliances that operate independently if cloud connectivity is lost. The cloud platform is deployed with geographic redundancy and is backed by a 99.99% uptime SLA for Enterprise deployments. Failover procedures are tested during implementation and documented for your operations team.',
      },
    ],
  },
];

export function getSolutionBySlug(slug: string): Solution | undefined {
  return [...INDUSTRY_SOLUTIONS, ...USECASE_SOLUTIONS].find((s) => s.slug === slug);
}
