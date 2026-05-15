const { Client } = require('pg');

async function main() {
  const c = new Client({ connectionString: 'postgresql://postgres:admin123@localhost:5432/kingsforth_payload' });
  await c.connect();
  
  const result = await c.query(
    "UPDATE users SET role = 'SUPER_ADMIN' WHERE email IN ('admin@kingsforth.net', 'fktihum03@gmail.com')"
  );
  console.log('Updated', result.rowCount, 'users to SUPER_ADMIN');
  
  const check = await c.query('SELECT id, email, role FROM users');
  console.log('All users now:');
  check.rows.forEach(u => console.log('  -', u.email, '| role:', u.role));
  
  await c.end();
}

main().catch(e => console.error(e));
