import { getPayload } from 'payload';
import configPromise from '@payload-config';
import 'dotenv/config';
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

async function run() {
    console.log('Connecting to Payload...');
    const payload = await getPayload({ config: configPromise });

    console.log('Deleting all existing solutions...');
    let page;
    do {
        page = await payload.find({ collection: 'solutions', limit: 100, overrideAccess: true });
        for (const doc of page.docs) {
            await payload.delete({ collection: 'solutions', id: doc.id, overrideAccess: true });
        }
    } while (page.hasNextPage);
    console.log('All solutions deleted.');

    console.log(`Creating ${ALL_SOLUTIONS.length} solutions...`);
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
                longDescription: lex(sol.longDescription) as any,
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
        console.log(`  ✓ ${sol.title}`);
    }

    console.log(`\nDone. ${ALL_SOLUTIONS.length} solutions seeded.`);
    process.exit(0);
}

run().catch((err) => { console.error(err); process.exit(1); });
