'use client';

import { sdk } from '@farcaster/miniapp-sdk';

export type FarcasterContext = {
  user?: {
    fid: number;
    username?: string;
    displayName?: string;
    pfpUrl?: string;
    verifiedAddresses?: {
      ethAddresses?: string[];
    };
    custodyAddress?: string;
  };
  client?: {
    platformType?: 'web' | 'mobile';
    clientFid?: number;
    added?: boolean;
    notificationDetails?: {
      url: string;
      token: string;
    };
  };
  notificationDetails?: {
    url: string;
    token: string;
  };
};

export function getNotificationDetailsFromContext(
  context: FarcasterContext
): { url: string; token: string } | null {
  const details =
    (context as any)?.client?.notificationDetails ||
    (context as any)?.notificationDetails ||
    null;

  if (!details?.url || !details?.token) return null;
  return { url: details.url, token: details.token };
}

export async function registerNotificationDetails(
  context: FarcasterContext
): Promise<boolean> {
  const details = getNotificationDetailsFromContext(context);
  if (!details) return false;

  try {
    const res = await sdk.quickAuth.fetch('/api/notifications/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ notificationDetails: details }),
    });
    return res.ok;
  } catch {
    return false;
  }
}
