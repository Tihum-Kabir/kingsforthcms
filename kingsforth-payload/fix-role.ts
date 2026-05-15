import { getPayload } from 'payload'
import configPromise from './src/payload.config'

async function run() {
  try {
    const payload = await getPayload({ config: configPromise })
    
    // Find all users
    const users = await payload.find({ collection: 'users' });
    console.log(`Found ${users.docs.length} users`);
    
    for (const user of users.docs) {
        await payload.update({
            collection: 'users',
            id: user.id,
            data: { role: 'SUPER_ADMIN' },
        });
        console.log(`Updated user ${user.email} to SUPER_ADMIN`);
    }
    
  } catch (err) {
    console.error(err);
  }
  process.exit(0)
}

run()
