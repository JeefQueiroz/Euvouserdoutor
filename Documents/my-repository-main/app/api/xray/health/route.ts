import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    ok: true,
    service: 'xray-core-engine',
    timestamp: new Date().toISOString(),
    providers: ['pollinations-free-tier'],
  });
}
