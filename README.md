# SignalCV

SignalCV is a local-first resume builder for software engineers from SDE I through Staff. It combines structured resume authoring, live ATS-readiness guidance, job-description matching, three printable templates, and PDF/DOCX exports in a statically hostable web app.

## MVP features

- Classic ATS, Modern, and Compact Tech templates
- Structured profile, summary, experience, skills, projects, and education editors
- Optional sections for open source, certifications, awards, publications, patents, speaking, leadership, and volunteering
- Explainable ATS-readiness score that updates after every edit
- Job-description keyword alignment with matched and missing term reports
- SDE I, SDE II, Senior, and Staff level-aware guidance
- Browser-local autosave with no account or backend
- Print-quality PDF export and native DOCX generation

## Run locally

Requires Node.js 22.13 or newer.

```bash
npm install
npm run dev
```

Open the local URL printed by the development server.

## Validate

```bash
npm run build
npm run lint
npm test
```

## Deploy to GitHub Pages

The repository includes a GitHub Actions workflow at `.github/workflows/deploy-pages.yml`. Every push to `main` builds a fully static Next.js export and publishes the `out/` directory to GitHub Pages. The workflow also supports manual runs from the Actions tab.

The repository’s Pages source must be set to **GitHub Actions**. No hosting secrets or runtime services are required.

## Privacy and architecture

Resume data and the current job description are saved only in browser local storage. The MVP has no database, upload, account, or required external API, so it can be statically hosted.

The ATS score is an explainable heuristic rather than a reproduction of a proprietary hiring system. Job alignment uses repeated meaningful terms from the pasted description and reminds candidates to add terms only when they truthfully reflect their experience.

See [PRODUCT_STRATEGY.md](./PRODUCT_STRATEGY.md) for the product principles, roadmap, and success measures.
