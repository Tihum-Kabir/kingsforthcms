import { getPayload } from 'payload';
import configPromise from '@payload-config';
import 'dotenv/config';
import { SERVICES_DATA } from '../data/services-data';

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

    console.log('Deleting all existing services...');
    let page;
    do {
        page = await payload.find({ collection: 'services', limit: 100, overrideAccess: true });
        for (const doc of page.docs) {
            await payload.delete({ collection: 'services', id: doc.id, overrideAccess: true });
        }
    } while (page.hasNextPage);
    console.log('All services deleted.');

    console.log(`Creating ${SERVICES_DATA.length} services...`);
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
        console.log(`  ✓ ${svc.title}`);
    }

    console.log(`\nDone. ${SERVICES_DATA.length} services seeded.`);
    process.exit(0);
}

run().catch((err) => { console.error(err); process.exit(1); });
