const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({ connectionString: process.env.DATABASE_URI });

async function inspectAndSeed() {
  const client = await pool.connect();
  try {
    // Check if main site_settings has a row
    const settingsRows = await client.query('SELECT id, "updatedAt" FROM site_settings LIMIT 5');
    console.log('site_settings rows:', settingsRows.rows);

    if (settingsRows.rows.length === 0) {
      console.log('\n⚠️  No site_settings row exists yet.');
      console.log('Payload creates it on first admin save. Please:');
      console.log('1. Go to http://localhost:3000/admin');
      console.log('2. Navigate to Site Settings');
      console.log('3. Click Save');
      console.log('4. Run this script again');
      return;
    }

    const parentId = settingsRows.rows[0].id;
    console.log('\nParent site_settings id:', parentId);

    // Check llm_links table columns
    const cols = await client.query(`
      SELECT column_name, data_type FROM information_schema.columns 
      WHERE table_name = 'site_settings_llm_links' ORDER BY ordinal_position
    `);
    console.log('\nsite_settings_llm_links columns:', cols.rows.map(r => r.column_name).join(', '));

    // Check existing LLM links
    const existing = await client.query('SELECT * FROM site_settings_llm_links LIMIT 10');
    console.log('Existing LLM links:', existing.rows);

    // Also check site_settings_rels or similar
    const allLlmCols = cols.rows.map(r => r.column_name);
    console.log('\nAll columns:', allLlmCols);

  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    client.release();
    pool.end();
  }
}

inspectAndSeed();
