import { getPayload } from 'payload'
import config from '@payload-config'
import { NextResponse } from 'next/server'

// Helper for basic lexical rich text
function createLexicalParagraph(text: string) {
  return {
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,
      direction: null,
      children: [
        {
          type: 'paragraph',
          format: '',
          indent: 0,
          version: 1,
          direction: null,
          children: [
            {
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text,
              type: 'text',
              version: 1,
            },
          ],
        },
      ],
    },
  } as any;
}

export async function GET() {
  const payload = await getPayload({ config })
  
  try {
    console.log('--- STARTING SEED ---')

    // 1. SERVICES
    const services = [
      {
        slug: 'big-data-forensic',
        title: 'Big Data Forensic',
        subtitle: 'Search terabytes of historical data in seconds',
        description: createLexicalParagraph('Search, analyze, and extract insights from terabytes of historical data in mere seconds.'),
        icon: 'search',
        category: 'forensic',
        orderIndex: 1,
        isPublished: true,
        features: [
          { icon: 'search', title: 'Rapid Search', description: 'Search terabytes of data in seconds' },
          { icon: 'shield', title: 'Forensic Analysis', description: 'Conduct in-depth forensic analysis' }
        ],
        plans: []
      },
      {
        slug: 'cognitive-surveillance',
        title: 'Cognitive Surveillance',
        subtitle: 'Real-time video analysis and threat detection',
        description: createLexicalParagraph('Transform your security operations with AI-powered cognitive surveillance.'),
        icon: 'eye',
        category: 'surveillance',
        orderIndex: 2,
        isPublished: true,
        features: [
          { icon: 'eye', title: 'Real-time Analysis', description: 'Analyze video feeds in real-time' }
        ],
        plans: []
      },
      {
        slug: 'autonomous-field-ops',
        title: 'Autonomous Field Ops',
        subtitle: 'Robotic process automation for critical response',
        description: createLexicalParagraph('Deploy autonomous robotic systems for critical field operations'),
        icon: 'cpu',
        category: 'automation',
        orderIndex: 3,
        isPublished: true,
        features: [
          { icon: 'cpu', title: 'Autonomous Operations', description: 'Fully autonomous robots' }
        ],
        plans: []
      },
      {
        slug: 'ai-agentic-saas',
        title: 'AI Agentic SaaS',
        subtitle: 'Self-evolving software agents for workflows',
        description: createLexicalParagraph('Experience the future of workflow automation with our AI Agentic SaaS platform.'),
        icon: 'bot',
        category: 'automation',
        orderIndex: 4,
        isPublished: true,
        features: [
          { icon: 'bot', title: 'Intelligent Agents', description: 'AI agents that learn and improve' }
        ],
        plans: []
      },
      {
        slug: 'iot-orchestration',
        title: 'IoT Orchestration',
        subtitle: 'Unifying fragmented hardware sensors',
        description: createLexicalParagraph('Bring order to the chaos of IoT devices with our comprehensive orchestration platform.'),
        icon: 'network',
        category: 'iot',
        orderIndex: 5,
        isPublished: true,
        features: [
          { icon: 'network', title: 'Unified Platform', description: 'Connect and manage all IoT devices' }
        ],
        plans: []
      },
      {
        slug: 'go-to-market-expert',
        title: 'Go-to-Market Expert',
        subtitle: 'Strategic guidance for product launch',
        description: createLexicalParagraph('Launch your product with confidence using our expert go-to-market consulting services.'),
        icon: 'trending-up',
        category: 'consulting',
        orderIndex: 6,
        isPublished: true,
        features: [
          { icon: 'trending-up', title: 'Market Strategy', description: 'Develop comprehensive GTM strategies' }
        ],
        plans: []
      }
    ]

    for (const data of services) {
      await payload.create({ collection: 'services', data: data as any })
    }
    console.log('Seeded Services')

    // 2. SOLUTIONS
    const solutions = [
      {
        slug: 'education',
        title: 'Education',
        category: 'Industry',
        subtitle: 'K-12 and Higher Education Safety',
        description: createLexicalParagraph('Transform your existing security cameras into a proactive 24/7 monitoring network.'),
        isPublished: true,
      },
      {
        slug: 'corporate',
        title: 'Corporate',
        category: 'Industry',
        subtitle: 'Enterprise Security Intelligence',
        description: createLexicalParagraph('Secure your corporate campus with next-generation AI.'),
        isPublished: true,
      },
      {
        slug: 'cities-government',
        title: 'Cities & Government',
        category: 'Industry',
        subtitle: 'Public Safety Infrastructure',
        description: createLexicalParagraph('Enhance public safety in smart cities.'),
        isPublished: true,
      },
      {
        slug: 'perimeter-security',
        title: 'Perimeter Security',
        category: 'Use Case',
        subtitle: 'Real-time Threat Detection',
        description: createLexicalParagraph('Stop threats at the edge.'),
        isPublished: true,
      },
      {
        slug: 'medical-emergencies',
        title: 'Medical Emergencies',
        category: 'Use Case',
        subtitle: 'Instant Medical Response',
        description: createLexicalParagraph('Detect falls, slip-and-trip accidents.'),
        isPublished: true,
      },
      {
        slug: 'weapons-detection',
        title: 'Weapons Detection',
        category: 'Use Case',
        subtitle: 'AI-Powered Identification',
        description: createLexicalParagraph('Detect visible firearms in real-time.'),
        isPublished: true,
      },
      {
        slug: 'vsoc',
        title: 'VSOC',
        category: 'Use Case',
        subtitle: 'Virtual Security Operations',
        description: createLexicalParagraph('Centralized commmand and control.'),
        isPublished: true,
      }
    ]

    for (const data of solutions) {
      await payload.create({ collection: 'solutions', data: data as any })
    }
    console.log('Seeded Solutions')

    // 3. PRODUCT FEATURES
    const productFeatures = [
      {
        title: 'Cognitive Analytics',
        description: 'Identifies anomalies in real-time.',
        featuresList: [{ feature: 'Real-time threat detection' }],
        displayOrder: 1,
        imagePosition: 'left' as 'left'
      },
      {
        title: 'Forensic Search',
        description: 'Search terabytes of footage in seconds.',
        featuresList: [{ feature: 'Natural language queries' }],
        displayOrder: 2,
        imagePosition: 'right' as 'right'
      },
      {
        title: 'Automated Compliance',
        description: 'Ensures safety zone adherence.',
        featuresList: [{ feature: 'Protocol compliance tracking' }],
        displayOrder: 3,
        imagePosition: 'left' as 'left'
      }
    ]

    for (const data of productFeatures) {
      await payload.create({ collection: 'product-features', data: data as any })
    }
    console.log('Seeded Product Features')

    // 4. HOW IT WORKS
    const howItWorks = [
      { title: 'The Event', description: 'Detects unauthorized entry', stepNumber: '01', sortOrder: 1 },
      { title: 'The Analysis', description: 'Processes threat level', stepNumber: '02', sortOrder: 2 },
      { title: 'The Action', description: 'Initiates response protocol', stepNumber: '03', sortOrder: 3 },
      { title: 'The Result', description: 'Threat neutralized', stepNumber: '04', sortOrder: 4 }
    ]

    for (const data of howItWorks) {
      await payload.create({ collection: 'how-it-works-steps', data })
    }
    console.log('Seeded How It Works')

    // 5. FAQS
    const faqs = [
      { question: 'What is Kingsforth?', answer: 'Kingsforth is an advanced intelligence system provider.', category: 'General', sortOrder: 1 },
      { question: 'How do I integrate KTL?', answer: 'System seamlessly integrates with existing IP cameras.', category: 'Technical', sortOrder: 2 }
    ]

    for (const data of faqs) {
      await payload.create({ collection: 'faqs', data })
    }
    console.log('Seeded FAQs')

    // 6. TEAM
    const team = [
      { name: 'Asif Mahbub', role: 'Co-Founder & CEO', bio: 'The visionary architect', sortOrder: 1 },
      { name: 'Shoaib Bin Noor', role: 'Co-Founder & CTO', bio: 'Engineers the backbone', sortOrder: 2 },
      { name: 'Arifin Islam', role: 'Co-Founder & COO', bio: 'Governs operational velocity', sortOrder: 3 }
    ]

    for (const data of team) {
      await payload.create({ collection: 'team-members', data })
    }
    console.log('Seeded Team Members')

    return NextResponse.json({ success: true, message: 'All data seeded successfully' })
  } catch (error: any) {
    console.error('Seed Error:', error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
