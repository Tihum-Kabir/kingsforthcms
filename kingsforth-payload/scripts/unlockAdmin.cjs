const { Pool } = require('pg');
require('dotenv').config();
const p = new Pool({ connectionString: process.env.DATABASE_URI });
p.query("UPDATE users SET lock_until=null, login_attempts=0 WHERE email='fktihum03@gmail.com'")
  .then(r => { console.log('Unlocked rows:', r.rowCount); p.end(); })
  .catch(e => { console.error(e.message); p.end(); });
