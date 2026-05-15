import { getPayload } from 'payload';
import configPromise from '@payload-config';
import 'dotenv/config';

const RESOURCES = [
  {
    title: 'Why AI Surveillance Is Transforming Enterprise Security in Bangladesh',
    slug: 'ai-surveillance-transforming-enterprise-security-bangladesh',
    category: 'Blog',
    summary: 'Traditional CCTV systems generate mountains of footage that nobody watches. KingsEye changes the equation — learn how Bangladeshi enterprises are shifting from passive recording to active intelligence.',
    publishedAt: '2026-03-09T10:00:00.000Z',
    isPublished: true,
    tags: [{ tag: 'AI Surveillance' }, { tag: 'Corporate' }],
  },
  {
    title: 'KingsEye: How Computer Vision Detects Threats in Real-Time',
    slug: 'kingseye-computer-vision-real-time-threat-detection',
    category: 'Documentation',
    summary: 'A technical deep-dive into KingsEye\'s multi-stream inference engine — how it processes 64 simultaneous camera feeds at sub-200ms latency and flags anomalies before they become incidents.',
    publishedAt: '2026-03-07T09:00:00.000Z',
    isPublished: true,
    tags: [{ tag: 'AI Surveillance' }, { tag: 'Threat Detection' }],
  },
  {
    title: 'Customer Success: NSU Campus Reduces Security Incidents by 73%',
    slug: 'nsu-campus-security-incidents-reduced-73-percent',
    category: 'Customer Story',
    summary: 'North South University deployed Kingsforth\'s VSOC platform across 38 buildings. Twelve months later, security incidents dropped 73% and response times improved from 8 minutes to under 40 seconds.',
    publishedAt: '2026-02-28T08:00:00.000Z',
    isPublished: true,
    tags: [{ tag: 'VSOC' }, { tag: 'Education' }],
  },
  {
    title: 'Weapons Detection AI: How Kingsforth Protects Schools and Public Venues',
    slug: 'weapons-detection-ai-schools-public-venues',
    category: 'Blog',
    summary: 'KingsEye\'s weapons detection model was trained on 4.2 million annotated frames across 18 weapon categories. Here\'s how it achieves 99.1% precision in real-world deployments — and what that means for school safety.',
    publishedAt: '2026-02-19T11:00:00.000Z',
    isPublished: true,
    tags: [{ tag: 'Weapons Detection' }, { tag: 'Education' }],
  },
  {
    title: 'Building a 24/7 SOC with Kingsforth\'s VSOC Platform',
    slug: 'building-soc-kingsforth-vsoc-platform',
    category: 'Documentation',
    summary: 'A step-by-step guide to deploying a Virtual Security Operations Center with Kingsforth. Covers camera ingestion, alert routing, escalation policies, and integration with existing physical security teams.',
    publishedAt: '2026-02-12T09:30:00.000Z',
    isPublished: true,
    tags: [{ tag: 'VSOC' }, { tag: 'Corporate' }],
  },
  {
    title: 'The 5-Second Threat Response: KingsAI Behavioral Analytics Explained',
    slug: 'kingai-behavioral-analytics-5-second-response',
    category: 'Blog',
    summary: 'KingsAI\'s behavioral engine doesn\'t wait for an incident — it learns what "normal" looks like in your facility and flags deviations in real time. We break down the attention mechanism behind sub-5-second alerting.',
    publishedAt: '2026-02-11T10:00:00.000Z',
    isPublished: true,
    tags: [{ tag: 'Analytics' }, { tag: 'AI Surveillance' }],
  },
  {
    title: 'Footfall Analytics and Behavioral Insights with KingsAI',
    slug: 'footfall-analytics-behavioral-insights-kingsai',
    category: 'Library',
    summary: 'KingsAI\'s occupancy intelligence suite gives facilities managers real-time heatmaps, dwell-time analysis, and queue detection — turning your camera network into a retail and operations intelligence platform.',
    publishedAt: '2026-02-04T08:00:00.000Z',
    isPublished: true,
    tags: [{ tag: 'Analytics' }, { tag: 'Retail' }],
  },
  {
    title: 'AI-Driven Access Control: Replacing Cards and PINs with Intelligence',
    slug: 'ai-driven-access-control-replace-cards-pins',
    category: 'Blog',
    summary: 'Physical access credentials are the weakest link in enterprise security. Kingsforth\'s facial-recognition access control integrates directly with your HR system — no cards, no PINs, no tailgating.',
    publishedAt: '2026-01-28T09:00:00.000Z',
    isPublished: true,
    tags: [{ tag: 'Access Control' }, { tag: 'Corporate' }],
  },
  {
    title: 'Kingsforth Platform Security Whitepaper 2026',
    slug: 'kingsforth-platform-security-whitepaper-2026',
    category: 'White Paper',
    summary: 'Data residency, encryption standards, SOC 2 alignment, and penetration testing results for the Kingsforth Intelligence Platform. Published January 2026.',
    publishedAt: '2026-01-20T07:00:00.000Z',
    isPublished: true,
    tags: [{ tag: 'Compliance' }, { tag: 'Corporate' }],
  },
  {
    title: 'Perimeter Security in High-Risk Environments: A Kingsforth Case Study',
    slug: 'perimeter-security-high-risk-environments-case-study',
    category: 'Case Study',
    summary: 'An industrial manufacturing client needed 24/7 perimeter monitoring across 18 hectares with zero false-positive shutdowns. How Kingsforth deployed multi-sensor AI fusion to achieve it.',
    publishedAt: '2026-01-12T09:00:00.000Z',
    isPublished: true,
    tags: [{ tag: 'Perimeter Security' }, { tag: 'Manufacturing' }],
  },
  {
    title: 'Understanding KingsEye Facial Recognition: Accuracy, Ethics, and Compliance',
    slug: 'kingseye-facial-recognition-accuracy-ethics-compliance',
    category: 'Documentation',
    summary: 'How KingsEye achieves 99.2% identification accuracy under adverse lighting — and the privacy-by-design architecture that keeps your deployment compliant with data protection regulations in Bangladesh and beyond.',
    publishedAt: '2025-12-18T10:00:00.000Z',
    isPublished: true,
    tags: [{ tag: 'AI Surveillance' }, { tag: 'Compliance' }],
  },
  {
    title: 'Kingsforth vs. Traditional CCTV: A Security Operations Comparison',
    slug: 'kingsforth-vs-traditional-cctv-comparison',
    category: 'Library',
    summary: 'Side-by-side comparison of response times, total cost of ownership, and false-positive rates between a legacy CCTV deployment and Kingsforth\'s AI-native platform across three client sites.',
    publishedAt: '2025-12-05T09:00:00.000Z',
    isPublished: true,
    tags: [{ tag: 'AI Surveillance' }, { tag: 'Corporate' }],
  },
];

async function seedResources() {
  const payload = await getPayload({ config: configPromise });

  console.log('\n── Seeding Resources ──────────────────────────────');

  for (const resource of RESOURCES) {
    try {
      const existing = await payload.find({
        collection: 'resources',
        where: { slug: { equals: resource.slug } },
        limit: 1,
      });

      if (existing.docs.length > 0) {
        console.log(`  SKIP  ${resource.slug} (exists)`);
        continue;
      }

      await payload.create({ collection: 'resources', data: resource as any });
      console.log(`  OK    ${resource.slug}`);
    } catch (err) {
      console.error(`  FAIL  ${resource.slug}:`, err);
    }
  }

  console.log('── Done ───────────────────────────────────────────\n');
  process.exit(0);
}

seedResources().catch(err => {
  console.error(err);
  process.exit(1);
});
