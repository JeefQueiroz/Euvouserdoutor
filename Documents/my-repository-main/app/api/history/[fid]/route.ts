import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/src/server/supabase';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

export async function GET(_req: Request, { params }: { params: { fid: string } }) {
  try {
    const fid = Number(params.fid);
    if (!fid || Number.isNaN(fid)) {
      return NextResponse.json({ error: 'Invalid FID.' }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from('point_transactions')
      .select('event_type, points_earned, event_date, meta, created_at')
      .eq('fid', fid)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[GET /api/history] Supabase error:', error);
      return NextResponse.json({ error: 'Failed to fetch history.' }, { status: 500 });
    }

    return NextResponse.json(data || []);
  } catch (error) {
    console.error('[GET /api/history] Unexpected error:', error);
    const message = error instanceof Error ? error.message : 'Internal error.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
