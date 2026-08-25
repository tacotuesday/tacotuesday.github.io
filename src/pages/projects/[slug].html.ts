import type { APIContext } from 'astro';
import { archiveProjects, type ArchiveProject } from '../../data/archive';
import { redirectDocument } from '../../lib/redirect-document';

export function getStaticPaths() {
  return archiveProjects.map((project) => ({ params: { slug: project.slug }, props: { project } }));
}

export function GET({ props, site }: APIContext<{ project: ArchiveProject }>) {
  const target = `/archive/${props.project.slug}/`;
  return new Response(redirectDocument(target, 'Moved to the learning archive', site as URL), {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}
