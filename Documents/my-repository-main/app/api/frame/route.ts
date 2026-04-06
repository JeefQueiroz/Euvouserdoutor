import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.redirect('https://x-rayv2.vercel.app', { status: 302 });
}

export async function GET() {
  return NextResponse.json({ ok: true, route: '/api/frame', note: 'Use mini app UI for X-RAY generation.' });
}
