# SignalCV product strategy

## Product promise

SignalCV helps software engineers from SDE I through Staff turn real experience into a focused, readable, job-aligned resume without sending personal data to a server.

## MVP principles

1. **Evidence before decoration.** The editor and live guidance prioritize scope, action, and measurable outcomes. Templates stay readable and ATS-conscious.
2. **One source of truth.** A single structured resume model powers every template, the ATS heuristic, job matching, and both export formats.
3. **Local by default.** Drafts and job descriptions remain in browser storage. This keeps static hosting possible and removes an account requirement from the MVP.
4. **Transparent guidance.** Scores are labeled as heuristics, each point maps to a visible check, and job keywords come with an anti-keyword-stuffing reminder.
5. **Level-aware coaching.** SDE I, SDE II, Senior, and Staff targets change the signals and language the app looks for.

## User journey

1. Start from a realistic sample or a blank resume.
2. Choose a target engineering level.
3. Add core and optional sections in a guided editor.
4. Watch ATS readiness update after every edit.
5. Paste a job description and close truthful keyword gaps.
6. Choose a template and export to PDF or DOCX.

## Scoring strategy

The MVP uses deterministic, explainable checks for contact completeness, professional links, summary length, experience depth, action verbs, quantified impact, technical skill coverage, level signals, and bullet readability. It does not claim to reproduce any proprietary ATS.

Job alignment extracts the most repeated meaningful terms from the description and checks whether they appear in the structured resume. Future versions should add phrase normalization, skill aliases, title seniority checks, and opt-in model-assisted rewriting.

## Static architecture

- Client-rendered application with no required backend.
- Browser local storage for drafts and the current job description.
- In-browser DOCX generation and browser-native print-to-PDF.
- No account, database, file upload, or private API keys in the MVP.

## Next releases

### V1.1 — stronger authoring

- Multiple named resume variants per candidate.
- Drag-and-drop section ordering.
- Bullet rewrite suggestions with before/after reasoning.
- Page-overflow and orphan-line warnings.
- Import from an existing resume.

### V1.2 — stronger targeting

- Skill synonym graph for common engineering stacks.
- Saved job descriptions and per-job application status.
- Role-specific guidance for backend, frontend, mobile, platform, data, and engineering management.
- Version comparison to show what changed between applications.

### V2 — optional intelligence

- Opt-in AI rewriting through a user-supplied or hosted API.
- Anonymous benchmark calibration using consented outcomes.
- Secure sync and collaboration while preserving a local-only mode.

## Success measures

- Time to first complete resume.
- Percentage of drafts exported.
- Percentage of failed checks resolved before export.
- Job descriptions matched per resume variant.
- Return rate during an active application cycle.
