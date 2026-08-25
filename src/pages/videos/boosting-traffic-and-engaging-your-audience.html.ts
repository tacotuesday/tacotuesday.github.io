import type { APIContext } from 'astro';
import { redirectDocument } from '../../lib/redirect-document';

export function GET({ site }: APIContext) {
  return new Response(
    redirectDocument(
      '/archive/#retired-theme-content',
      'The theme video has been retired',
      site as URL,
    ),
    { headers: { 'Content-Type': 'text/html; charset=utf-8' } },
  );
}
