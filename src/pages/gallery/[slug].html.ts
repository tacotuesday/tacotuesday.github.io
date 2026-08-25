import type { APIContext } from 'astro';
import { redirectDocument } from '../../lib/redirect-document';

export function getStaticPaths() {
  return ['hobby', 'hawaii', 'california', 'memories'].map((slug) => ({ params: { slug } }));
}

export function GET({ site }: APIContext) {
  return new Response(
    redirectDocument(
      '/archive/#retired-theme-content',
      'The theme gallery has been retired',
      site as URL,
    ),
    { headers: { 'Content-Type': 'text/html; charset=utf-8' } },
  );
}
