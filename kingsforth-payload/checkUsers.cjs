const http = require('http');

function makeRequest(options, body) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try { resolve({ status: res.statusCode, data: JSON.parse(data) }); }
        catch(e) { resolve({ status: res.statusCode, data: data.substring(0, 500) }); }
      });
    });
    req.on('error', reject);
    req.setTimeout(15000, () => { req.destroy(); reject(new Error('timeout')); });
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

async function main() {
  // Step 1: Try to create admin user (if it doesn't exist)
  console.log('--- Step 1: Create admin user ---');
  try {
    const createAdmin = await makeRequest({
      hostname: 'localhost', port: 3000,
      path: '/api/users',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, {
      email: 'admin@kingsforth.net',
      password: 'Admin@123456',
      name: 'Admin User',
      role: 'SUPER_ADMIN'
    });
    console.log('Create admin result:', createAdmin.status, JSON.stringify(createAdmin.data).substring(0, 300));
  } catch(e) { console.log('Create admin error:', e.message); }

  // Step 2: Login as admin
  console.log('\n--- Step 2: Login as admin ---');
  let token;
  try {
    const login = await makeRequest({
      hostname: 'localhost', port: 3000,
      path: '/api/users/login',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, { email: 'admin@kingsforth.net', password: 'Admin@123456' });
    console.log('Login status:', login.status);
    token = login.data?.token;
    console.log('Token:', token ? 'YES' : 'NO');
    if (!token) console.log('Login response:', JSON.stringify(login.data).substring(0, 300));
  } catch(e) { console.log('Login error:', e.message); }

  if (!token) {
    console.log('FATAL: Cannot get admin token. Stopping.');
    return;
  }

  // Step 3: List all users
  console.log('\n--- Step 3: List all users ---');
  try {
    const users = await makeRequest({
      hostname: 'localhost', port: 3000,
      path: '/api/users?limit=100',
      method: 'GET',
      headers: { 'Authorization': 'JWT ' + token }
    });
    console.log('Users found:', users.data?.totalDocs);
    users.data?.docs?.forEach(u => {
      console.log('  -', u.email, '| role:', u.role, '| id:', u.id);
    });
  } catch(e) { console.log('List error:', e.message); }

  // Step 4: Check if fktihum03@gmail.com exists, if so upgrade to SUPER_ADMIN
  console.log('\n--- Step 4: Check fktihum03@gmail.com ---');
  try {
    const search = await makeRequest({
      hostname: 'localhost', port: 3000,
      path: '/api/users?where[email][equals]=fktihum03@gmail.com',
      method: 'GET',
      headers: { 'Authorization': 'JWT ' + token }
    });
    if (search.data?.docs?.length > 0) {
      const user = search.data.docs[0];
      console.log('Found user:', user.email, '| role:', user.role, '| id:', user.id);
      
      if (user.role !== 'SUPER_ADMIN') {
        console.log('Upgrading to SUPER_ADMIN...');
        const update = await makeRequest({
          hostname: 'localhost', port: 3000,
          path: '/api/users/' + user.id,
          method: 'PATCH',
          headers: { 'Authorization': 'JWT ' + token, 'Content-Type': 'application/json' }
        }, { role: 'SUPER_ADMIN' });
        console.log('Update result:', update.status, update.data?.doc?.role);
      } else {
        console.log('Already SUPER_ADMIN!');
      }
    } else {
      console.log('User not found. Creating...');
      const create = await makeRequest({
        hostname: 'localhost', port: 3000,
        path: '/api/users',
        method: 'POST',
        headers: { 'Authorization': 'JWT ' + token, 'Content-Type': 'application/json' }
      }, {
        email: 'fktihum03@gmail.com',
        password: 'Admin@123456',
        name: 'Super Admin',
        role: 'SUPER_ADMIN'
      });
      console.log('Create result:', create.status, JSON.stringify(create.data).substring(0, 300));
    }
  } catch(e) { console.log('Error:', e.message); }
}

main();
