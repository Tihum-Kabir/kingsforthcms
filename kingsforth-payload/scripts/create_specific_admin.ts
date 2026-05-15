import { getPayload } from 'payload';
import configPromise from '@payload-config';
import 'dotenv/config';

async function run() {
    const payload = await getPayload({ config: configPromise });

    // Ensure fktihum03@gmail.com exists and is SUPER_ADMIN
    const email = 'fktihum03@gmail.com';
    const password = 'kingsforthAdmin123!';

    try {
        const { docs } = await payload.find({
            collection: 'users',
            where: { email: { equals: email } }
        });

        if (docs.length > 0) {
            console.log(`User ${email} already exists. Updating password and ensuring SUPER_ADMIN role...`);
            await payload.update({
                collection: 'users',
                id: docs[0].id,
                data: {
                    password,
                    role: 'SUPER_ADMIN'
                }
            });
            console.log(`Updated successfully.`);
        } else {
            console.log(`Creating user ${email} as SUPER_ADMIN...`);
            await payload.create({
                collection: 'users',
                data: {
                    name: 'FK Tihum',
                    email,
                    password,
                    role: 'SUPER_ADMIN'
                }
            });
            console.log(`Created successfully.`);
        }

        console.log(`\nCREDENTIALS:`);
        console.log(`Email: ${email}`);
        console.log(`Password: ${password}`);

    } catch (e) {
        console.error('Error:', e);
    }

    process.exit(0);
}

run();
