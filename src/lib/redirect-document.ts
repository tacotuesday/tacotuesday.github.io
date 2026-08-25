const escapeHtml = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');

export function redirectDocument(target: string, title: string, site: URL) {
  const safeTarget = escapeHtml(target);
  const safeTitle = escapeHtml(title);
  const canonical = escapeHtml(new URL(target, site).toString());
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width">
<meta name="robots" content="noindex, follow">
<meta http-equiv="refresh" content="0; url=${safeTarget}">
<link rel="canonical" href="${canonical}">
<title>${safeTitle}</title>
</head>
<body><main><h1>${safeTitle}</h1><p><a href="${safeTarget}">Continue to the current page</a></p></main></body>
</html>`;
}
