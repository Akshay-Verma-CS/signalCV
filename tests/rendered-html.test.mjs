import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

test("exports the complete SignalCV app as static HTML", async () => {
  const html = await readFile(new URL("../out/index.html", import.meta.url), "utf8");

  assert.match(html, /SignalCV/);
  assert.match(html, /Built for software engineers/);
  assert.match(html, /ATS readiness/);
  assert.match(html, /Export PDF/);
  assert.match(html, /Resume Builder for Software Engineers/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/i);

  await Promise.all([
    access(new URL("../out/_next/", import.meta.url)),
    access(new URL("../out/og.png", import.meta.url)),
    access(new URL("../out/favicon.svg", import.meta.url)),
    access(new URL("../out/.nojekyll", import.meta.url)),
  ]);
});

test("keeps the MVP local-first and GitHub Pages ready", async () => {
  const [page, layout, packageJson, nextConfig, workflow] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    readFile(new URL("../next.config.ts", import.meta.url), "utf8"),
    readFile(new URL("../.github/workflows/deploy-pages.yml", import.meta.url), "utf8"),
  ]);

  assert.match(page, /signalcv-resume-v1/);
  assert.match(page, /analyzeResume/);
  assert.match(page, /analyzeJobDescription/);
  assert.match(page, /Packer\.toBlob/);
  assert.match(page, /window\.print\(\)/);
  assert.match(layout, /NEXT_PUBLIC_SITE_URL/);
  assert.match(packageJson, /"docx"/);
  assert.match(packageJson, /"lucide-react"/);
  assert.match(packageJson, /"build": "next build"/);
  assert.match(nextConfig, /output: "export"/);
  assert.match(nextConfig, /GITHUB_PAGES/);
  assert.match(workflow, /actions\/deploy-pages@v4/);
  assert.match(workflow, /actions\/upload-pages-artifact@v4/);
  assert.doesNotMatch(packageJson, /vinext|wrangler|drizzle|cloudflare/i);
});
