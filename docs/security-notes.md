# Dependency security note

Checked with `npm audit` on 2026-08-25.

The site is required to remain on Astro 6. The current last Astro 6 release (`6.4.8`) is included in 2026 advisories that npm marks high severity; npm's only core fix is the breaking Astro 7 upgrade. The affected Astro paths concern runtime-generated attribute names, hydrated transition directives and view-transition properties. This portfolio is a fully static build, uses no hydrated islands or view transitions, accepts no runtime user content and ships no Astro server, so those paths are not exposed by the deployed artifact. The build still validates generated HTML and forbids first-party content-page JavaScript.

Astro 7 should be evaluated as the next framework upgrade rather than forced through this revamp, because the stated migration target is Astro 6. Re-run `npm audit` during that upgrade and remove this exception once the supported release line contains the fixes.

The audit also reports transitive `esbuild` and `sharp` advisories through Astro. Those packages execute only in the trusted local/CI build environment and are not shipped as server code. Avoid running the development server on untrusted networks, and keep CI inputs repository-controlled.
