import { llmsTxt } from '../lib/ai-text';
export const GET = () => new Response(llmsTxt(), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
