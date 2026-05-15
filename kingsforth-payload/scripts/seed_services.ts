import { getPayload } from 'payload';
import configPromise from '../src/payload.config';

// Helper to wrap a plain string as a valid Lexical richText object
function makeLexicalDoc(text: string) {
  return {
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,
      children: [
        {
          type: 'paragraph',
          format: '',
          indent: 0,
          version: 1,
          children: [
            {
              type: 'text',
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text,
              version: 1,
            },
          ],
          direction: 'ltr',
          textFormat: 0,
          textStyle: '',
        },
      ],
      direction: 'ltr',
    },
  };
}

async function seedServices() {
  const payload = await getPayload({ config: configPromise });

  const servicesData = [
    {
      title: 'Frictionless Attendance',
      slug: 'frictionless-attendance',
      subtitle: 'Zero-touch biometric check-in at walking speed',
      description: makeLexicalDoc('Zero-touch biometric check-in at walking speed. Our system identifies personnel at full walking pace with sub-second latency, eliminating queues and manual check-ins entirely.'),
      category: 'automation',
      icon: 'Fingerprint',
      orderIndex: 1,
      isPublished: true,
      metaTitle: 'Frictionless Attendance | Kingseye',
      metaDescription: 'Eliminate bottlenecks at entry points with AI-driven, zero-touch biometric attendance tracking.'
    },
    {
      title: 'Big Data Forensic',
      slug: 'big-data-forensic',
      subtitle: 'Search terabytes of footage in seconds',
      description: makeLexicalDoc('Search terabytes of security footage in seconds. Our forensic engine uses AI-powered indexing to let investigators locate suspects, vehicles, or events across months of archived video instantly.'),
      category: 'forensic',
      icon: 'Database',
      orderIndex: 2,
      isPublished: true,
      metaTitle: 'Big Data Forensic Analysis | Kingseye',
      metaDescription: 'Turn raw security footage into searchable intelligence. Find suspects, vehicles, or events across terabytes of data instantly.'
    },
    {
      title: 'Voice to Text Parsing',
      slug: 'voice-to-text-parsing',
      subtitle: 'Multilingual real-time audio transcription',
      description: makeLexicalDoc('Multilingual real-time audio transcription for compliance and security auditing. Capture and index every spoken word across security channels, dispatch lines, and public spaces.'),
      category: 'other',
      icon: 'Mic',
      orderIndex: 3,
      isPublished: true,
      metaTitle: 'Real-time Voice to Text Parsing | Kingseye',
      metaDescription: 'Capture and transcribe spoken interactions in real-time across multiple languages for compliance and security auditing.'
    },
    {
      title: 'Crowd Sentiment Analysis',
      slug: 'crowd-sentiment-analysis',
      subtitle: 'Reading the room — autonomously',
      description: makeLexicalDoc('Measure the emotional and behavioral state of a crowd in real-time using passive optical sensors. Predict and preempt escalating situations before they become incidents.'),
      category: 'surveillance',
      icon: 'Activity',
      orderIndex: 4,
      isPublished: true,
      metaTitle: 'Crowd Sentiment Analysis | Kingseye',
      metaDescription: 'Measure the mood of a crowd in real-time using passive optical sensors to predict and preempt escalating situations.'
    },
    {
      title: 'Incident Detection Systems',
      slug: 'incident-detection-systems',
      subtitle: 'Automated hazard awareness in under 40ms',
      description: makeLexicalDoc('Automated hazard detection with sub-40ms response time. Our platform flags fights, falls, weapons, and unauthorized access instantaneously, routing alerts to the nearest responders.'),
      category: 'iot',
      icon: 'AlertTriangle',
      orderIndex: 5,
      isPublished: true,
      metaTitle: 'Automated Incident Detection | Kingseye',
      metaDescription: 'The Kingseye platform flags fights, falls, weapons, and unauthorized access instantaneously, routing alerts to the nearest responders.'
    },
    {
      title: 'Theft & Shrink Detection',
      slug: 'theft-shrink-detection',
      subtitle: 'Proactive loss prevention powered by behavioral AI',
      description: makeLexicalDoc('Proactive loss prevention powered by behavioral AI. Detect suspicious movements and potential shoplifting events before the merchandise leaves the premises — with zero false alarm fatigue.'),
      category: 'surveillance',
      icon: 'Crosshair',
      orderIndex: 6,
      isPublished: true,
      metaTitle: 'Theft & Shrink Detection | Kingseye',
      metaDescription: 'Utilize behavioral AI to detect suspicious movements and potential shoplifting events before the merchandise leaves the premises.'
    }
  ];

  console.log('Fixing services with proper richText descriptions...');
  for (const sData of servicesData) {
    const existing = await payload.find({
      collection: 'services',
      where: { slug: { equals: sData.slug } },
      depth: 0,
    });

    if (existing.docs.length > 0) {
      console.log('Updating: ' + sData.title);
      await payload.update({
        collection: 'services',
        id: existing.docs[0].id,
        data: sData as any,
      });
    } else {
      console.log('Creating: ' + sData.title);
      await payload.create({
        collection: 'services',
        data: sData as any,
      });
    }
  }

  console.log('Done! All services now have valid Lexical richText descriptions.');
  process.exit(0);
}

seedServices().catch(console.error);
