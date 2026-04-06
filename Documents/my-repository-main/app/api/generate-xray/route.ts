import { POST as workerPost } from '../xray/worker/route';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 300;

export const POST = workerPost;
