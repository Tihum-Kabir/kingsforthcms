const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({ connectionString: process.env.DATABASE_URI });

const DEFAULT_LLM_LINKS = [
  {
    id: 'llm-chatgpt',
    name: 'ChatGPT',
    description: 'Start a conversation about Kingsforth with ChatGPT.',
    url: 'https://chatgpt.com/?q=Tell+me+about+Kingsforth+AI+security+platform',
    iconColor: '#10a37f',
    iconLetter: 'G',
    enabled: true,
  },
  {
    id: 'llm-claude',
    name: 'Claude',
    description: 'Start a conversation about Kingsforth with Claude.',
    url: 'https://claude.ai/new?q=What+is+Kingsforth+AI+security+platform',
    iconColor: '#d97706',
    iconLetter: 'C',
    enabled: true,
  },
  {
    id: 'llm-gemini',
    name: 'Gemini',
    description: 'Start a conversation about Kingsforth with Gemini.',
    url: 'https://gemini.google.com/app?q=Kingsforth+AI+surveillance+platform',
    iconColor: '#4285f4',
    iconLetter: 'G',
    enabled: true,
  },
];

async function seedLLMLinks() {
  const client = await pool.connect();
  try {
    // Check what table site_settings uses
    const tableCheck = await client.query(`
      SELECT table_name FROM information_schema.tables 
      WHERE table_schema = 'public' AND table_name LIKE '%site%'
    `);
    console.log('Site tables found:', tableCheck.rows.map(r => r.table_name));

    // Try to get current site settings
    const tables = tableCheck.rows.map(r => r.table_name);
    const settingsTable = tables.find(t => t.includes('site')) || 'site_settings';

    const existing = await client.query(`SELECT id FROM "${settingsTable}" LIMIT 1`);
    
    if (existing.rows.length === 0) {
      console.log('No site settings row found. Will be created by Payload on first load.');
      console.log('Run npm run dev and visit /admin to initialize settings, then run this seed again.');
      return;
    }

    const id = existing.rows[0].id;
    console.log('Found site settings row id:', id);

    // Update llmLinks and llmSectionHeading
    await client.query(`
      UPDATE "${settingsTable}"
      SET data = jsonb_set(
        jsonb_set(
          COALESCE(data, '{}'),
          '{llmLinks}',
          $1::jsonb
        ),
        '{llmSectionHeading}',
        $2::jsonb
      )
      WHERE id = $3
    `, [
      JSON.stringify(DEFAULT_LLM_LINKS),
      JSON.stringify('Start a conversation to research Kingsforth on LLMs:'),
      id
    ]);

    console.log('✅ Successfully seeded LLM links!');
    console.log('Links seeded:', DEFAULT_LLM_LINKS.map(l => l.name).join(', '));

  } catch (err) {
    console.error('Error:', err.message);
    
    // Try alternative approach - find the table
    try {
      const allTables = await client.query(`
        SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name
      `);
      console.log('All tables:', allTables.rows.map(r => r.table_name).join(', '));
    } catch (e2) {
      console.error('Could not list tables:', e2.message);
    }
  } finally {
    client.release();
    pool.end();
  }
}

seedLLMLinks();
