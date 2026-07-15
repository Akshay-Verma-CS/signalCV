"use client";

import {
  AlertCircle,
  ArrowLeft,
  BarChart3,
  BriefcaseBusiness,
  Check,
  ChevronDown,
  CirclePlus,
  Download,
  FileText,
  GripVertical,
  Lightbulb,
  Link2,
  Plus,
  RefreshCcw,
  Sparkles,
  Target,
  Trash2,
  UserRound,
  WandSparkles,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState, type CSSProperties } from "react";

type TemplateId = "classic" | "modern" | "compact" | "harvard" | "minimal" | "swiss" | "executive";
type TargetLevel = "SDE I" | "SDE II" | "Senior" | "Staff";
type EditorTab = "build" | "target";
type MobileView = "build" | "preview" | "score" | "target";

type Experience = {
  id: string;
  company: string;
  role: string;
  location: string;
  start: string;
  end: string;
  bullets: string[];
};

type Project = {
  id: string;
  name: string;
  link: string;
  description: string;
  technologies: string;
};

type Education = {
  id: string;
  school: string;
  degree: string;
  start: string;
  end: string;
};

type ExtraSection = {
  id: string;
  title: string;
  items: string[];
};

type ResumeData = {
  basics: {
    name: string;
    headline: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    github: string;
    portfolio: string;
  };
  summary: string;
  skills: string;
  experience: Experience[];
  projects: Project[];
  education: Education[];
  extras: ExtraSection[];
  template: TemplateId;
  targetLevel: TargetLevel;
};

type AtsCheck = {
  label: string;
  detail: string;
  points: number;
  passed: boolean;
};

const starterResume: ResumeData = {
  basics: {
    name: "Aarav Mehta",
    headline: "Senior Software Engineer",
    email: "aarav.mehta@email.com",
    phone: "+91 98765 43210",
    location: "Bengaluru, India",
    linkedin: "linkedin.com/in/aaravmehta",
    github: "github.com/aarav-mehta",
    portfolio: "aaravmehta.dev",
  },
  summary:
    "Backend-focused software engineer with 6+ years of experience building reliable distributed systems and developer platforms. Led services handling 25M+ daily events, reduced infrastructure cost by 31%, and mentored engineers across two product teams.",
  skills:
    "TypeScript, Java, Go, Python, React, Node.js, Spring Boot, PostgreSQL, Redis, Kafka, AWS, Kubernetes, Docker, Terraform, System Design, Observability",
  experience: [
    {
      id: "exp-1",
      company: "Nimbus Labs",
      role: "Senior Software Engineer",
      location: "Bengaluru, India",
      start: "Jan 2023",
      end: "Present",
      bullets: [
        "Led the redesign of an event-processing platform handling 25M+ daily events, improving p95 latency by 43% and availability to 99.99%.",
        "Reduced annual cloud spend by ₹48L through capacity planning, autoscaling, and storage lifecycle policies.",
        "Mentored 5 engineers and introduced design reviews that cut production incidents by 28% quarter over quarter.",
      ],
    },
    {
      id: "exp-2",
      company: "PixelStack",
      role: "Software Engineer II",
      location: "Hyderabad, India",
      start: "Jul 2020",
      end: "Dec 2022",
      bullets: [
        "Built a multi-tenant notification service in Go and Kafka that delivered 8M+ messages per day with idempotent retries.",
        "Improved deployment frequency from weekly to daily by creating reusable Kubernetes and Terraform pipelines.",
      ],
    },
  ],
  projects: [
    {
      id: "project-1",
      name: "Traceboard",
      link: "github.com/aarav-mehta/traceboard",
      description:
        "Built an open-source observability dashboard for distributed traces; reached 600+ GitHub stars and 20 community contributors.",
      technologies: "Go, OpenTelemetry, React, ClickHouse",
    },
  ],
  education: [
    {
      id: "edu-1",
      school: "National Institute of Technology, Karnataka",
      degree: "B.Tech, Computer Science & Engineering",
      start: "2016",
      end: "2020",
    },
  ],
  extras: [],
  template: "classic",
  targetLevel: "Senior",
};

const blankResume: ResumeData = {
  basics: {
    name: "Your Name",
    headline: "Software Engineer",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    github: "",
    portfolio: "",
  },
  summary: "",
  skills: "",
  experience: [],
  projects: [],
  education: [],
  extras: [],
  template: "classic",
  targetLevel: "SDE I",
};

const templateOptions: { id: TemplateId; name: string; note: string }[] = [
  { id: "classic", name: "Classic ATS", note: "Best parse rate" },
  { id: "modern", name: "Modern", note: "Polished & clear" },
  { id: "compact", name: "Compact Tech", note: "More per page" },
  { id: "harvard", name: "Harvard", note: "Traditional & trusted" },
  { id: "minimal", name: "Minimal", note: "Quiet confidence" },
  { id: "swiss", name: "Swiss", note: "Crisp & structured" },
  { id: "executive", name: "Executive", note: "Senior leadership" },
];

const levelGuidance: Record<TargetLevel, { focus: string; keywords: string[] }> = {
  "SDE I": {
    focus: "Show strong fundamentals, shipped features, learning speed, and hands-on projects.",
    keywords: ["data structures", "testing", "debugging", "api", "git"],
  },
  "SDE II": {
    focus: "Show independent ownership, production impact, system design, and cross-team delivery.",
    keywords: ["ownership", "system design", "reliability", "performance", "collaboration"],
  },
  Senior: {
    focus: "Show technical leadership, ambiguous problem solving, mentoring, and measurable business impact.",
    keywords: ["architecture", "mentored", "led", "reliability", "stakeholders"],
  },
  Staff: {
    focus: "Show organizational leverage, multi-team strategy, technical direction, and durable platform impact.",
    keywords: ["strategy", "cross-functional", "platform", "roadmap", "organization"],
  },
};

const actionVerbs = [
  "built",
  "led",
  "designed",
  "developed",
  "created",
  "improved",
  "reduced",
  "increased",
  "launched",
  "implemented",
  "optimized",
  "architected",
  "mentored",
  "automated",
  "delivered",
  "scaled",
];

const stopWords = new Set([
  "and",
  "the",
  "with",
  "for",
  "that",
  "this",
  "from",
  "you",
  "your",
  "our",
  "are",
  "will",
  "have",
  "has",
  "into",
  "who",
  "but",
  "not",
  "all",
  "any",
  "can",
  "job",
  "role",
  "team",
  "work",
  "years",
  "experience",
  "software",
  "engineer",
]);

const uid = () => `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

function resumeToText(data: ResumeData) {
  return [
    ...Object.values(data.basics),
    data.summary,
    data.skills,
    ...data.experience.flatMap((item) => [
      item.company,
      item.role,
      item.location,
      ...item.bullets,
    ]),
    ...data.projects.flatMap((item) => [
      item.name,
      item.description,
      item.technologies,
    ]),
    ...data.education.flatMap((item) => [item.school, item.degree]),
    ...data.extras.flatMap((item) => [item.title, ...item.items]),
  ]
    .join(" ")
    .toLowerCase();
}

function analyzeResume(data: ResumeData) {
  const text = resumeToText(data);
  const bullets = data.experience.flatMap((item) => item.bullets).filter(Boolean);
  const skills = data.skills.split(",").map((item) => item.trim()).filter(Boolean);
  const contactComplete = Boolean(data.basics.email && data.basics.phone && data.basics.location);
  const linksComplete = Boolean(data.basics.linkedin && data.basics.github);
  const summaryStrong = data.summary.length >= 120 && data.summary.length <= 500;
  const enoughExperience = data.experience.length > 0 && bullets.length >= 3;
  const actionBulletRatio = bullets.length
    ? bullets.filter((bullet) => actionVerbs.some((verb) => bullet.toLowerCase().startsWith(verb))).length /
      bullets.length
    : 0;
  const metricRatio = bullets.length
    ? bullets.filter((bullet) => /\d|%|₹|\$|million|thousand|[mk]\+?/i.test(bullet)).length / bullets.length
    : 0;
  const roleWords = levelGuidance[data.targetLevel].keywords;
  const roleWordCount = roleWords.filter((keyword) => text.includes(keyword)).length;
  const readableBullets = bullets.length > 0 && bullets.every((bullet) => bullet.length <= 220);

  const checks: AtsCheck[] = [
    {
      label: "Contact details",
      detail: contactComplete ? "Recruiter-ready contact details" : "Add email, phone, and location",
      points: 10,
      passed: contactComplete,
    },
    {
      label: "Professional links",
      detail: linksComplete ? "LinkedIn and GitHub included" : "Add both LinkedIn and GitHub",
      points: 5,
      passed: linksComplete,
    },
    {
      label: "Focused summary",
      detail: summaryStrong ? "Summary has useful depth" : "Aim for 2–4 concise, outcome-led lines",
      points: 10,
      passed: summaryStrong,
    },
    {
      label: "Experience depth",
      detail: enoughExperience ? "Experience is supported by evidence" : "Add at least 3 experience bullets",
      points: 15,
      passed: enoughExperience,
    },
    {
      label: "Strong action verbs",
      detail: actionBulletRatio >= 0.7 ? "Most bullets start decisively" : "Start more bullets with strong action verbs",
      points: 10,
      passed: actionBulletRatio >= 0.7,
    },
    {
      label: "Quantified impact",
      detail: metricRatio >= 0.5 ? "Impact is measurable" : "Add metrics to at least half your bullets",
      points: 15,
      passed: metricRatio >= 0.5,
    },
    {
      label: "Technical skills",
      detail: skills.length >= 8 ? `${skills.length} relevant skills found` : "Add at least 8 relevant technical skills",
      points: 15,
      passed: skills.length >= 8,
    },
    {
      label: `${data.targetLevel} signals`,
      detail:
        roleWordCount >= 2
          ? `${roleWordCount} level-relevant signals found`
          : `Show more ${data.targetLevel}-level scope and ownership`,
      points: 15,
      passed: roleWordCount >= 2,
    },
    {
      label: "Readable bullets",
      detail: readableBullets ? "Bullets are concise and scannable" : "Keep each bullet under roughly two lines",
      points: 5,
      passed: readableBullets,
    },
  ];

  const score = checks.reduce((total, check) => total + (check.passed ? check.points : 0), 0);
  return { score, checks };
}

function analyzeJobDescription(data: ResumeData, jobDescription: string) {
  const resumeText = resumeToText(data);
  const words = jobDescription
    .toLowerCase()
    .replace(/[^a-z0-9+#.\-]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 2 && !stopWords.has(word));
  const frequency = words.reduce<Record<string, number>>((acc, word) => {
    acc[word] = (acc[word] ?? 0) + 1;
    return acc;
  }, {});
  const keywords = Object.entries(frequency)
    .sort((a, b) => b[1] - a[1])
    .map(([word]) => word)
    .slice(0, 24);
  const matched = keywords.filter((keyword) => resumeText.includes(keyword));
  const missing = keywords.filter((keyword) => !resumeText.includes(keyword));
  const score = keywords.length ? Math.round((matched.length / keywords.length) * 100) : 0;
  return { score, matched, missing };
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  className = "",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  className?: string;
}) {
  return (
    <label className={`field ${className}`}>
      <span>{label}</span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
      />
    </label>
  );
}

function TextAreaField({
  label,
  value,
  onChange,
  placeholder,
  rows = 4,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <label className="field">
      <span>{label}</span>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        rows={rows}
      />
    </label>
  );
}

function EditorSection({
  title,
  icon,
  count,
  open,
  onToggle,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  count?: number;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <section className={`editor-section ${open ? "is-open" : ""}`}>
      <button className="section-trigger" type="button" onClick={onToggle} aria-expanded={open}>
        <span className="section-trigger-icon">{icon}</span>
        <span className="section-trigger-title">{title}</span>
        {typeof count === "number" && <span className="section-count">{count}</span>}
        <ChevronDown size={16} className="chevron" />
      </button>
      {open && <div className="section-content">{children}</div>}
    </section>
  );
}

function ResumePreview({ data }: { data: ResumeData }) {
  const [previewScale, setPreviewScale] = useState(1);
  const contacts = [
    data.basics.email,
    data.basics.phone,
    data.basics.location,
    data.basics.linkedin,
    data.basics.github,
    data.basics.portfolio,
  ].filter(Boolean);
  const skills = data.skills.split(",").map((skill) => skill.trim()).filter(Boolean);

  useEffect(() => {
    const updatePreviewScale = () => {
      const availableWidth = window.innerWidth - 28;
      setPreviewScale(window.innerWidth <= 860 ? Math.min(1, availableWidth / 720) : 1);
    };

    updatePreviewScale();
    window.addEventListener("resize", updatePreviewScale);
    return () => window.removeEventListener("resize", updatePreviewScale);
  }, []);

  return (
    <article
      className={`resume-sheet template-${data.template}`}
      id="resume-document"
      style={{ "--resume-scale": previewScale } as CSSProperties}
    >
      <header className="resume-header">
        <p className="resume-eyebrow">{data.basics.headline}</p>
        <h1>{data.basics.name}</h1>
        <div className="resume-contact">
          {contacts.map((contact) => (
            <span key={contact}>{contact}</span>
          ))}
        </div>
      </header>

      <div className="resume-body">
        {data.summary && (
          <section className="resume-section resume-summary">
            <h2>Summary</h2>
            <p>{data.summary}</p>
          </section>
        )}

        {skills.length > 0 && (
          <section className="resume-section resume-skills">
            <h2>Technical Skills</h2>
            <div className="skill-list">
              {skills.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
          </section>
        )}

        {data.experience.length > 0 && (
          <section className="resume-section resume-experience">
            <h2>Experience</h2>
            {data.experience.map((item) => (
              <div className="resume-item" key={item.id}>
                <div className="resume-item-heading">
                  <div>
                    <h3>{item.role}</h3>
                    <p>{item.company}{item.location ? ` · ${item.location}` : ""}</p>
                  </div>
                  <time>{[item.start, item.end].filter(Boolean).join(" — ")}</time>
                </div>
                {item.bullets.filter(Boolean).length > 0 && (
                  <ul>
                    {item.bullets.filter(Boolean).map((bullet, index) => (
                      <li key={`${item.id}-${index}`}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </section>
        )}

        {data.projects.length > 0 && (
          <section className="resume-section resume-projects">
            <h2>Projects</h2>
            {data.projects.map((project) => (
              <div className="resume-item project-item" key={project.id}>
                <div className="resume-item-heading">
                  <div>
                    <h3>{project.name}</h3>
                    {project.technologies && <p>{project.technologies}</p>}
                  </div>
                  {project.link && <span className="project-link">{project.link}</span>}
                </div>
                <p>{project.description}</p>
              </div>
            ))}
          </section>
        )}

        {data.education.length > 0 && (
          <section className="resume-section resume-education">
            <h2>Education</h2>
            {data.education.map((item) => (
              <div className="resume-item-heading education-row" key={item.id}>
                <div>
                  <h3>{item.school}</h3>
                  <p>{item.degree}</p>
                </div>
                <time>{[item.start, item.end].filter(Boolean).join(" — ")}</time>
              </div>
            ))}
          </section>
        )}

        {data.extras.map((section) => (
          <section className="resume-section" key={section.id}>
            <h2>{section.title}</h2>
            <ul>
              {section.items.filter(Boolean).map((item, index) => (
                <li key={`${section.id}-${index}`}>{item}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </article>
  );
}

export default function Home() {
  const [resume, setResume] = useState<ResumeData>(starterResume);
  const [tab, setTab] = useState<EditorTab>("build");
  const [mobileView, setMobileView] = useState<MobileView>("build");
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({ profile: true });
  const [addSectionOpen, setAddSectionOpen] = useState(false);
  const [jobDescription, setJobDescription] = useState("");
  const [saved, setSaved] = useState(true);
  const [hydrated, setHydrated] = useState(false);
  const [exportingDocx, setExportingDocx] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const stored = window.localStorage.getItem("signalcv-resume-v1");
        if (stored) setResume(JSON.parse(stored) as ResumeData);
        const storedJob = window.localStorage.getItem("signalcv-job-v1");
        if (storedJob) setJobDescription(storedJob);
      } catch {
        // Keep the starter resume if locally stored data is malformed.
      } finally {
        setHydrated(true);
      }
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    queueMicrotask(() => setSaved(false));
    const timer = window.setTimeout(() => {
      window.localStorage.setItem("signalcv-resume-v1", JSON.stringify(resume));
      window.localStorage.setItem("signalcv-job-v1", jobDescription);
      setSaved(true);
    }, 350);
    return () => window.clearTimeout(timer);
  }, [resume, jobDescription, hydrated]);

  const ats = useMemo(() => analyzeResume(resume), [resume]);
  const jobMatch = useMemo(
    () => analyzeJobDescription(resume, jobDescription),
    [resume, jobDescription],
  );

  const updateBasics = (key: keyof ResumeData["basics"], value: string) => {
    setResume((current) => ({
      ...current,
      basics: { ...current.basics, [key]: value },
    }));
  };

  const updateExperience = (id: string, patch: Partial<Experience>) => {
    setResume((current) => ({
      ...current,
      experience: current.experience.map((item) => item.id === id ? { ...item, ...patch } : item),
    }));
  };

  const updateProject = (id: string, patch: Partial<Project>) => {
    setResume((current) => ({
      ...current,
      projects: current.projects.map((item) => item.id === id ? { ...item, ...patch } : item),
    }));
  };

  const updateEducation = (id: string, patch: Partial<Education>) => {
    setResume((current) => ({
      ...current,
      education: current.education.map((item) => item.id === id ? { ...item, ...patch } : item),
    }));
  };

  const toggleSection = (key: string) => {
    setOpenSections((current) => ({ ...current, [key]: !current[key] }));
  };

  const switchMobileView = (view: MobileView) => {
    setMobileView(view);
    if (view === "build") setTab("build");
    if (view === "target") setTab("target");
    window.requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "smooth" }));
  };

  const addExtraSection = (title: string) => {
    const id = uid();
    setResume((current) => ({
      ...current,
      extras: [...current.extras, { id, title, items: [""] }],
    }));
    setOpenSections((current) => ({ ...current, [id]: true }));
    setAddSectionOpen(false);
  };

  const startFresh = () => {
    if (window.confirm("Start with a blank resume? Your current draft will be replaced.")) {
      setResume(blankResume);
      setJobDescription("");
      setOpenSections({ profile: true });
    }
  };

  const exportPdf = () => {
    document.title = `${resume.basics.name || "Resume"} - Resume`;
    window.print();
  };

  const exportDocx = async () => {
    setExportingDocx(true);
    try {
      const {
        AlignmentType,
        Document,
        HeadingLevel,
        Packer,
        Paragraph,
        TextRun,
      } = await import("docx");

      const sectionTitle = (text: string) => new Paragraph({
        text: text.toUpperCase(),
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 220, after: 80 },
      });
      const children = [
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: resume.basics.name, bold: true, size: 34 })],
          spacing: { after: 40 },
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: resume.basics.headline, bold: true, size: 22, color: "2F6D65" })],
          spacing: { after: 60 },
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          text: [
            resume.basics.email,
            resume.basics.phone,
            resume.basics.location,
            resume.basics.linkedin,
            resume.basics.github,
            resume.basics.portfolio,
          ].filter(Boolean).join("  ·  "),
          spacing: { after: 160 },
        }),
      ];

      if (resume.summary) {
        children.push(sectionTitle("Summary"));
        children.push(new Paragraph({ text: resume.summary, spacing: { after: 80 } }));
      }
      if (resume.skills) {
        children.push(sectionTitle("Technical Skills"));
        children.push(new Paragraph({ text: resume.skills, spacing: { after: 80 } }));
      }
      if (resume.experience.length) {
        children.push(sectionTitle("Experience"));
        resume.experience.forEach((item) => {
          children.push(new Paragraph({
            children: [
              new TextRun({ text: item.role, bold: true }),
              new TextRun({ text: ` — ${item.company}` }),
              new TextRun({ text: `\t${[item.start, item.end].filter(Boolean).join(" – ")}`, italics: true }),
            ],
            spacing: { before: 80, after: 30 },
          }));
          item.bullets.filter(Boolean).forEach((bullet) => children.push(new Paragraph({ text: bullet, bullet: { level: 0 } })));
        });
      }
      if (resume.projects.length) {
        children.push(sectionTitle("Projects"));
        resume.projects.forEach((project) => {
          children.push(new Paragraph({
            children: [
              new TextRun({ text: project.name, bold: true }),
              new TextRun({ text: project.technologies ? ` — ${project.technologies}` : "" }),
            ],
            spacing: { before: 70, after: 30 },
          }));
          if (project.description) children.push(new Paragraph({ text: project.description }));
          if (project.link) children.push(new Paragraph({ text: project.link }));
        });
      }
      if (resume.education.length) {
        children.push(sectionTitle("Education"));
        resume.education.forEach((item) => {
          children.push(new Paragraph({
            children: [
              new TextRun({ text: item.school, bold: true }),
              new TextRun({ text: ` — ${item.degree}` }),
              new TextRun({ text: `\t${[item.start, item.end].filter(Boolean).join(" – ")}`, italics: true }),
            ],
          }));
        });
      }
      resume.extras.forEach((section) => {
        children.push(sectionTitle(section.title));
        section.items.filter(Boolean).forEach((item) => children.push(new Paragraph({ text: item, bullet: { level: 0 } })));
      });

      const doc = new Document({
        styles: {
          default: { document: { run: { font: "Arial", size: 20 }, paragraph: { spacing: { line: 270 } } } },
          paragraphStyles: [{
            id: "Heading2",
            name: "Heading 2",
            basedOn: "Normal",
            next: "Normal",
            run: { bold: true, size: 22, color: "173B3A" },
          }],
        },
        sections: [{
          properties: { page: { margin: { top: 720, right: 720, bottom: 720, left: 720 } } },
          children,
        }],
      });
      const blob = await Packer.toBlob(doc);
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = `${(resume.basics.name || "resume").toLowerCase().replace(/[^a-z0-9]+/g, "-")}.docx`;
      anchor.click();
      URL.revokeObjectURL(url);
    } finally {
      setExportingDocx(false);
    }
  };

  const topIssue = ats.checks.find((check) => !check.passed);

  return (
    <main className="app-shell">
      <header className="topbar">
        <div className="brand-wrap">
          <div className="brand-mark" aria-hidden="true"><span /></div>
          <div>
            <div className="brand-name">SignalCV</div>
            <div className="brand-subtitle">Built for software engineers</div>
          </div>
        </div>
        <div className="document-status">
          <button className="back-button" type="button" onClick={startFresh} title="Start a fresh resume">
            <ArrowLeft size={17} />
          </button>
          <div>
            <strong>{resume.basics.name || "Untitled resume"}</strong>
            <span className={saved ? "saved" : "saving"}>
              <i /> {saved ? "Saved locally" : "Saving…"}
            </span>
          </div>
        </div>
        <div className="top-actions">
          <button className="button button-ghost" type="button" onClick={exportDocx} disabled={exportingDocx}>
            <FileText size={16} /> {exportingDocx ? "Exporting…" : "DOCX"}
          </button>
          <button className="button button-primary" type="button" onClick={exportPdf}>
            <Download size={16} /> Export PDF
          </button>
        </div>
      </header>

      <div className={`workspace mobile-view-${mobileView}`}>
        <aside className="editor-panel">
          <div className="mode-tabs" role="tablist" aria-label="Resume tools">
            <button
              type="button"
              role="tab"
              aria-selected={tab === "build"}
              className={tab === "build" ? "active" : ""}
              onClick={() => setTab("build")}
            >
              <WandSparkles size={16} /> Build
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={tab === "target"}
              className={tab === "target" ? "active" : ""}
              onClick={() => setTab("target")}
            >
              <Target size={16} /> Match job
            </button>
          </div>

          {tab === "build" ? (
            <div className="editor-scroll">
              <div className="editor-intro">
                <div>
                  <span className="step-label">Resume builder</span>
                  <h2>Shape your strongest story</h2>
                </div>
                <button className="icon-button" type="button" onClick={() => setResume(starterResume)} title="Restore sample">
                  <RefreshCcw size={15} />
                </button>
              </div>

              <div className="level-picker">
                <label htmlFor="target-level">Target level</label>
                <select
                  id="target-level"
                  value={resume.targetLevel}
                  onChange={(event) => setResume((current) => ({ ...current, targetLevel: event.target.value as TargetLevel }))}
                >
                  {Object.keys(levelGuidance).map((level) => <option key={level}>{level}</option>)}
                </select>
                <p><Sparkles size={13} /> {levelGuidance[resume.targetLevel].focus}</p>
              </div>

              <EditorSection
                title="Profile"
                icon={<UserRound size={17} />}
                open={Boolean(openSections.profile)}
                onToggle={() => toggleSection("profile")}
              >
                <div className="field-grid">
                  <Field label="Full name" value={resume.basics.name} onChange={(value) => updateBasics("name", value)} />
                  <Field label="Headline" value={resume.basics.headline} onChange={(value) => updateBasics("headline", value)} />
                  <Field label="Email" value={resume.basics.email} type="email" onChange={(value) => updateBasics("email", value)} />
                  <Field label="Phone" value={resume.basics.phone} onChange={(value) => updateBasics("phone", value)} />
                  <Field label="Location" value={resume.basics.location} onChange={(value) => updateBasics("location", value)} />
                  <Field label="LinkedIn" value={resume.basics.linkedin} onChange={(value) => updateBasics("linkedin", value)} />
                  <Field label="GitHub" value={resume.basics.github} onChange={(value) => updateBasics("github", value)} />
                  <Field label="Portfolio" value={resume.basics.portfolio} onChange={(value) => updateBasics("portfolio", value)} />
                </div>
              </EditorSection>

              <EditorSection
                title="Summary"
                icon={<FileText size={17} />}
                open={Boolean(openSections.summary)}
                onToggle={() => toggleSection("summary")}
              >
                <TextAreaField
                  label="Professional summary"
                  value={resume.summary}
                  onChange={(value) => setResume((current) => ({ ...current, summary: value }))}
                  placeholder="2–4 lines connecting your experience, scope, and impact…"
                  rows={6}
                />
                <div className="field-meta"><span>{resume.summary.length} characters</span><span>Ideal: 120–500</span></div>
              </EditorSection>

              <EditorSection
                title="Experience"
                icon={<BriefcaseBusiness size={17} />}
                count={resume.experience.length}
                open={Boolean(openSections.experience)}
                onToggle={() => toggleSection("experience")}
              >
                {resume.experience.map((item, index) => (
                  <div className="repeat-card" key={item.id}>
                    <div className="repeat-card-head">
                      <span><GripVertical size={14} /> Experience {index + 1}</span>
                      <button type="button" onClick={() => setResume((current) => ({ ...current, experience: current.experience.filter((entry) => entry.id !== item.id) }))} aria-label="Delete experience">
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <div className="field-grid">
                      <Field label="Role" value={item.role} onChange={(value) => updateExperience(item.id, { role: value })} />
                      <Field label="Company" value={item.company} onChange={(value) => updateExperience(item.id, { company: value })} />
                      <Field label="Location" value={item.location} onChange={(value) => updateExperience(item.id, { location: value })} />
                      <div className="split-fields">
                        <Field label="Start" value={item.start} onChange={(value) => updateExperience(item.id, { start: value })} />
                        <Field label="End" value={item.end} onChange={(value) => updateExperience(item.id, { end: value })} />
                      </div>
                      <TextAreaField
                        label="Impact bullets — one per line"
                        value={item.bullets.join("\n")}
                        onChange={(value) => updateExperience(item.id, { bullets: value.split("\n") })}
                        rows={7}
                      />
                    </div>
                  </div>
                ))}
                <button className="add-inline" type="button" onClick={() => setResume((current) => ({
                  ...current,
                  experience: [...current.experience, { id: uid(), company: "", role: "", location: "", start: "", end: "", bullets: [""] }],
                }))}>
                  <Plus size={15} /> Add experience
                </button>
              </EditorSection>

              <EditorSection
                title="Technical skills"
                icon={<BarChart3 size={17} />}
                open={Boolean(openSections.skills)}
                onToggle={() => toggleSection("skills")}
              >
                <TextAreaField
                  label="Comma-separated skills"
                  value={resume.skills}
                  onChange={(value) => setResume((current) => ({ ...current, skills: value }))}
                  rows={5}
                  placeholder="TypeScript, React, Node.js, AWS…"
                />
              </EditorSection>

              <EditorSection
                title="Projects"
                icon={<Link2 size={17} />}
                count={resume.projects.length}
                open={Boolean(openSections.projects)}
                onToggle={() => toggleSection("projects")}
              >
                {resume.projects.map((project, index) => (
                  <div className="repeat-card" key={project.id}>
                    <div className="repeat-card-head">
                      <span><GripVertical size={14} /> Project {index + 1}</span>
                      <button type="button" onClick={() => setResume((current) => ({ ...current, projects: current.projects.filter((entry) => entry.id !== project.id) }))} aria-label="Delete project">
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <div className="field-grid">
                      <Field label="Project name" value={project.name} onChange={(value) => updateProject(project.id, { name: value })} />
                      <Field label="Link" value={project.link} onChange={(value) => updateProject(project.id, { link: value })} />
                      <Field label="Technologies" value={project.technologies} onChange={(value) => updateProject(project.id, { technologies: value })} />
                      <TextAreaField label="What did you build and what changed?" value={project.description} onChange={(value) => updateProject(project.id, { description: value })} rows={5} />
                    </div>
                  </div>
                ))}
                <button className="add-inline" type="button" onClick={() => setResume((current) => ({
                  ...current,
                  projects: [...current.projects, { id: uid(), name: "", link: "", description: "", technologies: "" }],
                }))}>
                  <Plus size={15} /> Add project
                </button>
              </EditorSection>

              <EditorSection
                title="Education"
                icon={<FileText size={17} />}
                count={resume.education.length}
                open={Boolean(openSections.education)}
                onToggle={() => toggleSection("education")}
              >
                {resume.education.map((item, index) => (
                  <div className="repeat-card" key={item.id}>
                    <div className="repeat-card-head">
                      <span><GripVertical size={14} /> Education {index + 1}</span>
                      <button type="button" onClick={() => setResume((current) => ({ ...current, education: current.education.filter((entry) => entry.id !== item.id) }))} aria-label="Delete education">
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <div className="field-grid">
                      <Field label="School" value={item.school} onChange={(value) => updateEducation(item.id, { school: value })} />
                      <Field label="Degree" value={item.degree} onChange={(value) => updateEducation(item.id, { degree: value })} />
                      <div className="split-fields">
                        <Field label="Start" value={item.start} onChange={(value) => updateEducation(item.id, { start: value })} />
                        <Field label="End" value={item.end} onChange={(value) => updateEducation(item.id, { end: value })} />
                      </div>
                    </div>
                  </div>
                ))}
                <button className="add-inline" type="button" onClick={() => setResume((current) => ({
                  ...current,
                  education: [...current.education, { id: uid(), school: "", degree: "", start: "", end: "" }],
                }))}>
                  <Plus size={15} /> Add education
                </button>
              </EditorSection>

              {resume.extras.map((section) => (
                <EditorSection
                  key={section.id}
                  title={section.title}
                  icon={<CirclePlus size={17} />}
                  count={section.items.filter(Boolean).length}
                  open={Boolean(openSections[section.id])}
                  onToggle={() => toggleSection(section.id)}
                >
                  <TextAreaField
                    label="One item per line"
                    value={section.items.join("\n")}
                    onChange={(value) => setResume((current) => ({
                      ...current,
                      extras: current.extras.map((item) => item.id === section.id ? { ...item, items: value.split("\n") } : item),
                    }))}
                    rows={5}
                  />
                  <button className="delete-section" type="button" onClick={() => setResume((current) => ({ ...current, extras: current.extras.filter((item) => item.id !== section.id) }))}>
                    <Trash2 size={14} /> Remove section
                  </button>
                </EditorSection>
              ))}

              <div className="add-section-wrap">
                <button className="add-section-button" type="button" onClick={() => setAddSectionOpen(true)}>
                  <CirclePlus size={17} /> Add optional section
                </button>
              </div>
            </div>
          ) : (
            <div className="editor-scroll target-editor">
              <div className="target-hero">
                <span className="target-icon"><Target size={21} /></span>
                <div>
                  <span className="step-label">Job alignment</span>
                  <h2>Tailor with evidence</h2>
                </div>
              </div>
              <p className="target-copy">Paste a job description. SignalCV compares its most repeated, meaningful terms with your resume — entirely in your browser.</p>
              <TextAreaField
                label="Job description"
                value={jobDescription}
                onChange={setJobDescription}
                placeholder="Paste the full job description here…"
                rows={15}
              />
              {jobDescription ? (
                <div className="match-card">
                  <div className="match-score-row">
                    <div className={`mini-score ${jobMatch.score >= 65 ? "good" : "needs-work"}`}>{jobMatch.score}%</div>
                    <div><strong>Keyword alignment</strong><span>{jobMatch.matched.length} of {jobMatch.matched.length + jobMatch.missing.length} priority terms found</span></div>
                  </div>
                  <div className="keyword-group">
                    <label>Missing from your resume</label>
                    <div className="keyword-chips">
                      {jobMatch.missing.slice(0, 12).map((keyword) => <span className="missing" key={keyword}>{keyword}</span>)}
                    </div>
                  </div>
                  <div className="keyword-group">
                    <label>Already covered</label>
                    <div className="keyword-chips">
                      {jobMatch.matched.slice(0, 12).map((keyword) => <span className="matched" key={keyword}><Check size={11} />{keyword}</span>)}
                    </div>
                  </div>
                  <div className="ethics-note"><Lightbulb size={15} /><span>Use missing terms only when they truthfully describe your experience. Evidence beats keyword stuffing.</span></div>
                </div>
              ) : (
                <div className="target-empty">
                  <FileText size={24} />
                  <strong>Your match report appears here</strong>
                  <span>We’ll surface matched skills, missing terms, and level signals.</span>
                </div>
              )}
            </div>
          )}
        </aside>

        <section className="preview-panel">
          <div className="preview-toolbar">
            <div>
              <span className="toolbar-label">Template</span>
              <div className="template-switcher">
                {templateOptions.map((template) => (
                  <button
                    key={template.id}
                    type="button"
                    className={resume.template === template.id ? "active" : ""}
                    onClick={() => setResume((current) => ({ ...current, template: template.id }))}
                  >
                    <i className={`template-thumb thumb-${template.id}`} />
                    <span><strong>{template.name}</strong><small>{template.note}</small></span>
                    {resume.template === template.id && <Check size={14} />}
                  </button>
                ))}
              </div>
            </div>
            <div className="page-indicator">A4 · Page 1</div>
          </div>
          <div className="paper-stage">
            <ResumePreview data={resume} />
          </div>
        </section>

        <aside className="insights-panel">
          <div className="insights-scroll">
            <section className="score-card">
              <div className="score-card-header">
                <div><span className="step-label">Live analysis</span><h2>ATS readiness</h2></div>
                <span className="live-pill"><i /> Live</span>
              </div>
              <div className="score-overview">
                <div className="score-ring" style={{ "--score": `${ats.score * 3.6}deg` } as React.CSSProperties}>
                  <div><strong>{ats.score}</strong><span>/ 100</span></div>
                </div>
                <div className="score-copy">
                  <strong>{ats.score >= 85 ? "Strong signal" : ats.score >= 65 ? "Good foundation" : "Needs attention"}</strong>
                  <span>{ats.score >= 85 ? "Ready for a final human review." : "A few focused edits can lift your score."}</span>
                </div>
              </div>
              <div className="score-bar"><span style={{ width: `${ats.score}%` }} /></div>
              <p className="score-disclaimer">Heuristic guidance, not a guarantee from any employer or ATS vendor.</p>
            </section>

            {topIssue && (
              <section className="priority-card">
                <div className="priority-label"><AlertCircle size={15} /> Highest-impact fix</div>
                <h3>{topIssue.label}</h3>
                <p>{topIssue.detail}</p>
                <button type="button" onClick={() => {
                  setTab("build");
                  const key = topIssue.label.includes("Contact") || topIssue.label.includes("links") ? "profile" : topIssue.label.includes("Summary") ? "summary" : topIssue.label.includes("skill") ? "skills" : "experience";
                  setOpenSections((current) => ({ ...current, [key]: true }));
                }}>Fix this <span>→</span></button>
              </section>
            )}

            <section className="checklist-card">
              <div className="panel-heading"><h3>Quality checklist</h3><span>{ats.checks.filter((check) => check.passed).length}/{ats.checks.length}</span></div>
              <div className="check-list">
                {ats.checks.map((check) => (
                  <div className={`check-row ${check.passed ? "passed" : ""}`} key={check.label}>
                    <span className="check-icon">{check.passed ? <Check size={13} /> : <AlertCircle size={13} />}</span>
                    <div><strong>{check.label}</strong><small>{check.detail}</small></div>
                    <b>+{check.points}</b>
                  </div>
                ))}
              </div>
            </section>

            <section className="ladder-card">
              <div className="ladder-icon"><Sparkles size={16} /></div>
              <div>
                <span>Targeting {resume.targetLevel}</span>
                <p>{levelGuidance[resume.targetLevel].focus}</p>
                <div className="level-signals">
                  {levelGuidance[resume.targetLevel].keywords.map((keyword) => <em key={keyword}>{keyword}</em>)}
                </div>
              </div>
            </section>
          </div>
        </aside>
      </div>

      <nav className="mobile-nav" aria-label="Mobile resume tools">
        <button type="button" className={mobileView === "build" ? "active" : ""} onClick={() => switchMobileView("build")}>
          <WandSparkles size={19} />
          <span>Build</span>
        </button>
        <button type="button" className={mobileView === "preview" ? "active" : ""} onClick={() => switchMobileView("preview")}>
          <FileText size={19} />
          <span>Preview</span>
        </button>
        <button type="button" className={mobileView === "score" ? "active" : ""} onClick={() => switchMobileView("score")}>
          <BarChart3 size={19} />
          <span>ATS Score</span>
        </button>
        <button type="button" className={mobileView === "target" ? "active" : ""} onClick={() => switchMobileView("target")}>
          <Target size={19} />
          <span>Match</span>
        </button>
      </nav>

      {addSectionOpen && (
        <div className="modal-backdrop" role="presentation" onMouseDown={() => setAddSectionOpen(false)}>
          <div className="section-modal" role="dialog" aria-modal="true" aria-labelledby="add-section-title" onMouseDown={(event) => event.stopPropagation()}>
            <div className="modal-head">
              <div><span className="step-label">Optional content</span><h2 id="add-section-title">Add a section</h2></div>
              <button type="button" onClick={() => setAddSectionOpen(false)} aria-label="Close"><X size={18} /></button>
            </div>
            <p>Choose only sections that strengthen your fit for a software engineering role.</p>
            <div className="section-choice-grid">
              {["Open source", "Certifications", "Awards", "Publications", "Patents", "Speaking", "Leadership", "Volunteering"].map((title) => (
                <button type="button" key={title} onClick={() => addExtraSection(title)}>
                  <span><Plus size={15} /></span><strong>{title}</strong><small>Add relevant entries</small>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
