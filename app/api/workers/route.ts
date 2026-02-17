import { NextResponse } from 'next/server';
import { supabase } from '../../lib/supabase';
import type { Candidate, WorkersErrorResponse } from '../../Types/api';
import { calculateTier } from '../utils/tierCalculation';
import { formatName } from '../utils/workers';

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

    // Transform to match your Candidate type (DB columns: "ID", "Full Name")
    const workers: Candidate[] = (data || []).map((w) => {
      const fullName = (w['Full Name'] ?? '') as string;
      const worker = {
        id: w['ID'] ?? w.id,
        name: formatName(fullName),
        region: w.region,
        is_australian: w.is_australian,
        experience_years: w.experience_years,
        qualification: w.qualification || '',
        previous_role: w.previous_role || '',
        previous_work_place: w.previous_work_place || '',
        name_lc: fullName.toLowerCase(),
      };

      // Calculate tier based on missing fields
      const tier = calculateTier({
        qualification: worker.qualification,
        previous_role: worker.previous_role,
        previous_work_place: worker.previous_work_place,
      });

      return {
        ...worker,
        tier,
      };
    });

    // Sort by tier first (lower is better), then by experience
    workers.sort((a, b) => {
      if (a.tier !== b.tier) {
        return a.tier - b.tier; // Lower tier first
      }
      return b.experience_years - a.experience_years; // Higher experience first
    });

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