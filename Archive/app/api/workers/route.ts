import { NextResponse } from 'next/server';
import { supabase } from '../../lib/supabase';
import type { Candidate, WorkersErrorResponse } from '../../Types/api';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('workers')
      .select('*')
      .order('experience_years', { ascending: false });

    if (error) {
      throw error;
    }

    // Transform to match your Candidate type
    const workers: Candidate[] = (data || []).map((w) => ({
      id: w.id,
      name: w.name,
      region: w.region,
      is_australian: w.is_australian,
      experience_years: w.experience_years,
      qualification: w.qualification,
      previous_role: w.previous_role,
      previous_work_place: w.previous_work_place,
      name_lc: w.name_lc,
    }));

    return NextResponse.json(workers, {
      headers: { 'Cache-Control': 'no-store' },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to load workers';
    console.error('[/api/workers] error:', err);
    return NextResponse.json(
      { error: message } as WorkersErrorResponse,
      { status: 500 }
    );
  }
}