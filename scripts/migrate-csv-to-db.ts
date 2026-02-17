import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';
import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';  // ← Changed: import createClient directly
import { cleanRegion, parseBoolean, parseNumber, formatName } from '../app/api/utils/workers';

// Load environment variables from .env.local FIRST
config({ path: path.join(process.cwd(), '.env.local') });

interface CSVRow {
  "Full Name"?: string;
  region?: string;
  is_australian?: string | boolean | number;
  experience_years?: string | number;
  qualification?: string;
  previous_role?: string;
  previous_work_place?: string;
}

async function migrate() {
  console.log('Starting migration...');
  
  // Verify environment variables are loaded
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  if (!supabaseUrl || !supabaseServiceRoleKey) {
    console.error('❌ Missing Supabase environment variables!');
    console.error('Make sure .env.local exists with:');
    console.error('  - NEXT_PUBLIC_SUPABASE_URL');
    console.error('  - SUPABASE_SERVICE_ROLE_KEY');
    console.error('\nCurrent values:');
    console.error(`  NEXT_PUBLIC_SUPABASE_URL: ${supabaseUrl ? '✓' : '✗'}`);
    console.error(`  SUPABASE_SERVICE_ROLE_KEY: ${supabaseServiceRoleKey ? '✓' : '✗'}`);
    process.exit(1);
  }

  // Create Supabase client directly here (after env vars are loaded)
  const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
  
  const filePath = path.join(process.cwd(), 'public', 'support_workers_clean.csv');
  const csv = fs.readFileSync(filePath, 'utf8');

  const parsed = Papa.parse<CSVRow>(csv, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (h) => h.replace(/^\uFEFF/, '').trim(),
  });

  console.log(`Total CSV rows: ${parsed.data.length}`);

  const workers = parsed.data
  .map((row) => {
    const name = formatName((row["Full Name"] ?? '').trim());
    const region = cleanRegion(row.region);

    if (!region || !name) return null;

    return {
      name,
      region,
      is_australian: parseBoolean(row.is_australian),
      experience_years: parseNumber(row.experience_years),
      qualification: row.qualification ?? '',
      previous_role: row.previous_role ?? '',
      previous_work_place: row.previous_work_place ?? '',
      name_lc: name.toLowerCase(),
    };
  })
  .filter((w): w is NonNullable<typeof w> => w !== null);

  console.log(`Valid workers to insert: ${workers.length}`);

  // Insert in batches of 1000 (Supabase limit)
  const batchSize = 1000;
  let inserted = 0;

  for (let i = 0; i < workers.length; i += batchSize) {
    const batch = workers.slice(i, i + batchSize);
    const { error } = await supabaseAdmin.from('workers').insert(batch);
    
    if (error) {
      console.error(`Error inserting batch ${Math.floor(i / batchSize) + 1}:`, error);
    } else {
      inserted += batch.length;
      console.log(`✓ Inserted batch ${Math.floor(i / batchSize) + 1} (${batch.length} workers) - Total: ${inserted}/${workers.length}`);
    }
  }

  console.log(`\n✅ Migration complete! Inserted ${inserted} workers.`);
}

migrate().catch(console.error);