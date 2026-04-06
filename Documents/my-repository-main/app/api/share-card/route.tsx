import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

function sanitizeText(value: string | null, fallback: string, max = 42) {
  if (!value) return fallback;
  return value.trim().slice(0, max) || fallback;
}

function parseNumber(value: string | null, fallback: number) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = sanitizeText(searchParams.get('username'), 'specimen');
  const score = Math.max(0, parseNumber(searchParams.get('score'), 0));
  const badge = sanitizeText(searchParams.get('badge'), 'GHOST', 28).toUpperCase();
  const nftCount = Math.max(0, Math.floor(parseNumber(searchParams.get('nftCount'), 0)));
  const rankRaw = searchParams.get('rank');
  const rank = rankRaw ? Math.max(1, Math.floor(parseNumber(rankRaw, 0))) : null;
  const pfp = searchParams.get('pfp');
  const fid = sanitizeText(searchParams.get('fid'), '-', 14);

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          position: 'relative',
          color: '#F0F6FF',
          background:
            'radial-gradient(circle at 20% 0%, rgba(60,242,255,0.25), transparent 45%), radial-gradient(circle at 92% 100%, rgba(94,114,255,0.36), transparent 52%), #0A0A0F',
          fontFamily:
            'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial',
          overflow: 'hidden',
          padding: '48px',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.09,
            backgroundImage:
              'radial-gradient(rgba(60,242,255,0.8) 1px, transparent 1px)',
            backgroundSize: '18px 18px',
          }}
        />

        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 36,
            border: '1px solid rgba(76,214,255,0.35)',
            background:
              'linear-gradient(180deg, rgba(10,16,28,0.86), rgba(7,11,20,0.92))',
            display: 'flex',
            flexDirection: 'column',
            padding: '34px 38px',
            justifyContent: 'space-between',
            boxShadow: '0 0 44px rgba(0,150,255,0.2)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: 22, letterSpacing: '0.2em', fontWeight: 700, color: '#98A8C8' }}>X-RAY PROTOCOL</span>
              <span style={{ fontSize: 16, letterSpacing: '0.1em', color: '#AAB7CF' }}>Radiographic Identity</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'right', gap: 4 }}>
              <span style={{ fontSize: 16, color: '#B8C7E3' }}>Base Network</span>
              <span style={{ fontSize: 16, color: '#8FA5CC' }}>{rank ? `Rank #${rank}` : 'Rank pending'}</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
            <div
              style={{
                width: 180,
                height: 180,
                borderRadius: '9999px',
                border: '3px solid rgba(60,242,255,0.8)',
                overflow: 'hidden',
                boxShadow: '0 0 32px rgba(60,242,255,0.45)',
                display: 'flex',
              }}
            >
              {pfp ? (
                // `next/og` render pipeline uses raw `img` elements.
                // eslint-disable-next-line @next/next/no-img-element
                <img src={pfp} alt={username} width={180} height={180} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', fontSize: 68 }}>
                  ☠️
                </div>
              )}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: 26, color: '#B8C6E0' }}>@{username}</span>
              <span style={{ fontSize: 128, fontWeight: 900, lineHeight: 1, color: '#F3F7FF' }}>{score}</span>
              <div
                style={{
                  marginTop: 8,
                  fontSize: 28,
                  color: '#3CF2FF',
                  border: '1px solid rgba(60,242,255,0.46)',
                  backgroundColor: 'rgba(60,242,255,0.12)',
                  borderRadius: 999,
                  padding: '8px 20px',
                  fontWeight: 800,
                }}
              >
                {badge}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span style={{ fontSize: 18, color: '#B6C7E5' }}>{nftCount} NFTs Detected</span>
              <span style={{ fontSize: 16, color: '#889CC2' }}>FID #{fid}</span>
            </div>
            <span style={{ fontSize: 20, color: '#9AB0D6' }}>x-rayv2.vercel.app</span>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: { 'Cache-Control': 'public, max-age=60' },
    }
  );
}
