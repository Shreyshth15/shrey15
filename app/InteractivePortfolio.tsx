"use client";

import Image from "next/image";
import { useState } from "react";

const BASE_INCOME = 50_000;
const UBI_LEVELS = [0, 6_000, 12_000, 18_000];
const MAX_MODELED_DROP = 7.2;

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

const mobileNavigationItems = [
  { href: "#work", label: "Work", number: "01" },
  { href: "#experience", label: "Experience", number: "02" },
  { href: "#capabilities", label: "Capabilities", number: "03" },
  { href: "#about", label: "About", number: "04" },
];

export function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={isOpen ? "mobile-navigation is-open" : "mobile-navigation"}>
      <button
        className="mobile-nav-toggle"
        type="button"
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-navigation-panel"
        onClick={() => setIsOpen((current) => !current)}
      >
        <span>Menu</span>
        <span aria-hidden="true">{isOpen ? "−" : "+"}</span>
      </button>
      <nav
        className="mobile-nav-panel"
        id="mobile-navigation-panel"
        aria-label="Mobile navigation"
        aria-hidden={!isOpen}
      >
        {mobileNavigationItems.map((item) => (
          <a key={item.href} href={item.href} onClick={() => setIsOpen(false)}>
            <span>{item.number}</span>
            {item.label}
          </a>
        ))}
      </nav>
    </div>
  );
}

export function MethodCard() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={isExpanded ? "method-card is-expanded" : "method-card"}>
      <p>How I work</p>
      <ol>
        <li>
          <span>01</span> Frame the decision
        </li>
        <li>
          <span>02</span> Audit the evidence
        </li>
        <li>
          <span>03</span> Stress-test the answer
        </li>
        <li>
          <span>04</span> Make it usable
        </li>
      </ol>
      <button
        className="method-card-touch-toggle"
        type="button"
        aria-label={isExpanded ? "Return the How I work card to normal size" : "Enlarge the How I work card"}
        aria-pressed={isExpanded}
        onClick={() => setIsExpanded((current) => !current)}
      >
        <span className="sr-only">
          {isExpanded ? "Return card to normal size" : "Enlarge card"}
        </span>
      </button>
    </div>
  );
}

export function AboutPhotoCard() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={isExpanded ? "about-photo is-expanded" : "about-photo"}>
      <Image
        src="/images/shrey-graduation.jpg"
        alt="Shrey Sharma receiving his Economics and Quantitative Methods degree"
        width="1600"
        height="900"
        sizes="(max-width: 900px) 86vw, 42vw"
      />
      <p>Indiana University Bloomington · 2026</p>
      <button
        className="about-photo-touch-toggle"
        type="button"
        aria-label={
          isExpanded
            ? "Return the graduation photo to normal size"
            : "Enlarge the graduation photo"
        }
        aria-pressed={isExpanded}
        onClick={() => setIsExpanded((current) => !current)}
      >
        <span className="sr-only">
          {isExpanded ? "Return photo to normal size" : "Enlarge photo"}
        </span>
      </button>
    </div>
  );
}

const educationItems = [
  {
    id: "indiana",
    institution: "Indiana University",
    context: null,
    detail: "B.S. Economics & Quantitative Methods (STEM) · Psychology minor",
  },
  {
    id: "lse",
    institution: "London School of Economics",
    context: "(Summer School)",
    detail: "Intermediate Macroeconomics · Econometrics · Jul–Aug 2024",
  },
] as const;

export function EducationList() {
  const [activeEducation, setActiveEducation] = useState<string | null>(null);

  return (
    <div className="education-list">
      {educationItems.map((item) => {
        const isActive = activeEducation === item.id;

        return (
          <div
            className={isActive ? "education-entry is-expanded" : "education-entry"}
            key={item.id}
          >
            <div className="education-institution">
              <span>{item.institution}</span>
              {item.context ? (
                <p className="education-context">{item.context}</p>
              ) : null}
            </div>
            <p>{item.detail}</p>
            <button
              className="education-entry-touch-toggle"
              type="button"
              aria-label={
                isActive
                  ? `Remove focus from ${item.institution}`
                  : `Focus on ${item.institution}`
              }
              aria-pressed={isActive}
              onClick={() =>
                setActiveEducation((current) =>
                  current === item.id ? null : item.id,
                )
              }
            >
              <span className="sr-only">
                {isActive ? "Remove focus" : "Focus education entry"}
              </span>
            </button>
          </div>
        );
      })}
    </div>
  );
}

export function UbiSimulator() {
  const [elasticity, setElasticity] = useState(0.1);
  const [ubi, setUbi] = useState(12_000);

  const modeledChange = -(elasticity * (ubi / BASE_INCOME) * 100);
  const chartValues = UBI_LEVELS.map((level) => ({
    level,
    change: -(elasticity * (level / BASE_INCOME) * 100),
  }));

  return (
    <div className="ubi-simulator">
      <div className="simulator-controls">
        <div className="control-heading">
          <div>
            <span>01</span>
            <p>Set the assumptions</p>
          </div>
          <span className="live-pill">Illustrative scenario · adjust the inputs</span>
        </div>

        <label className="range-control" htmlFor="elasticity">
          <span>
            Income elasticity
            <output htmlFor="elasticity">ε = {elasticity.toFixed(2)}</output>
          </span>
          <input
            id="elasticity"
            type="range"
            min="0.05"
            max="0.2"
            step="0.01"
            value={elasticity}
            onChange={(event) => setElasticity(Number(event.target.value))}
            aria-describedby="elasticity-note"
          />
          <small id="elasticity-note">Explore how the modeled result changes with elasticity.</small>
        </label>

        <label className="range-control" htmlFor="ubi">
          <span>
            Annual UBI
            <output htmlFor="ubi">{formatCurrency(ubi)}</output>
          </span>
          <input
            id="ubi"
            type="range"
            min="0"
            max="18000"
            step="1000"
            value={ubi}
            onChange={(event) => setUbi(Number(event.target.value))}
          />
          <span className="range-ticks" aria-hidden="true">
            <span>$0</span>
            <span>$6k</span>
            <span>$12k</span>
            <span>$18k</span>
          </span>
        </label>

        <div className="formula-card">
          <span>Model</span>
          <code>−ε × (UBI ÷ $50,000) × 100</code>
        </div>
      </div>

      <div className="simulator-output">
        <div className="result-line" aria-live="polite">
          <span>Modeled change in work hours</span>
          <strong>{modeledChange.toFixed(1)}%</strong>
          <p>
            At ε = {elasticity.toFixed(2)}, a {formatCurrency(ubi)} annual UBI
            produces a {Math.abs(modeledChange).toFixed(1)}% modeled reduction.
          </p>
        </div>

        <div
          className="ubi-chart"
          role="img"
          aria-label={`Bar chart showing modeled labor-supply reductions from zero to eighteen thousand dollars of UBI at elasticity ${elasticity.toFixed(2)}`}
        >
          <div className="chart-axis">
            <span>0%</span>
            <span>−3.6%</span>
            <span>−7.2%</span>
          </div>
          <div className="chart-bars">
            {chartValues.map((item) => (
              <div className="chart-column" key={item.level}>
                <div className="bar-area">
                  <span
                    className={item.level === ubi ? "chart-bar active" : "chart-bar"}
                    style={{
                      height: `${Math.max(
                        item.level === 0 ? 1 : 7,
                        (Math.abs(item.change) / MAX_MODELED_DROP) * 100,
                      )}%`,
                    }}
                  >
                    <i>{item.change.toFixed(1)}%</i>
                  </span>
                </div>
                <span>{item.level === 0 ? "$0" : `$${item.level / 1000}k`}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function IntelDecisionExplorer() {
  return (
    <div className="intel-explorer">
      <div className="intel-evidence-grid" aria-label="Metrics compared in the Intel case">
        <div><span>01 / Supply</span><p>Electricity supply</p></div>
        <div><span>02 / Demand</span><p>Electricity demand</p></div>
        <div><span>03 / Renewables</span><p>Renewable generation</p></div>
      </div>
      <div className="recommendation-panel intel-evidence-panel">
        <div className="project-conclusion">
          <span>Scope</span>
          <strong>13 U.S. regions.</strong>
          <p>
            Tableau dashboards compared regional electricity supply, demand,
            and renewable generation using a program-provided case dataset.
          </p>
        </div>
        <div className="scenario-result">
          <span>Finding</span>
          <strong>Northwest.</strong>
          <p>
            The Northwest had the highest renewable-generation share in the case comparison.
          </p>
        </div>
        <small>
          IU Global Career Accelerator course case using a program-provided dataset; exact regional figures are not shown here.
        </small>
      </div>
    </div>
  );
}
const audienceStages = [
  {
    id: "before",
    label: "Before",
    question: "1.86 pages per session",
    evidence: "Grammy.com engagement before the website split.",
    decision: "Baseline for the observed KPI comparison.",
  },
  {
    id: "after",
    label: "After",
    question: "2.25 pages per session",
    evidence: "Grammy.com engagement after the website split.",
    decision: "The observed KPI was higher in the later period.",
  },
  {
    id: "recommendation",
    label: "Recommendation",
    question: "Retain separate sites",
    evidence: "Excel PivotTables and KPI comparisons supported the review.",
    decision: "Recommended retaining separate sites; the before-and-after difference does not establish causation.",
  },
];

export function AudienceLens() {
  const [activeId, setActiveId] = useState("before");
  const active = audienceStages.find((stage) => stage.id === activeId) ?? audienceStages[0];

  return (
    <div className="audience-lens">
      <div className="journey-tabs" role="tablist" aria-label="Grammy.com engagement comparison">
        {audienceStages.map((stage, index) => (
          <button
            type="button"
            role="tab"
            key={stage.id}
            aria-selected={stage.id === activeId}
            aria-controls="audience-panel"
            onClick={() => setActiveId(stage.id)}
          >
            <span>0{index + 1}</span>
            {stage.label}
          </button>
        ))}
      </div>

      <div className="audience-panel" id="audience-panel" role="tabpanel" aria-live="polite">
        <span>{active.label} · Grammy.com</span>
        <h4>{active.question}</h4>
        <dl>
          <div>
            <dt>Evidence</dt>
            <dd>{active.evidence}</dd>
          </div>
          <div>
            <dt>Interpretation</dt>
            <dd>{active.decision}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
const experiences = [
  {
    company: "IU Global Career Accelerator",
    date: "Jan–May 2025",
    duration: "5 months",
    location: "Indiana University Bloomington",
    role: "Data Analytics Track · six-credit experiential course",
    summary:
      "Completed a six-credit experiential course using program-provided case datasets, not an employer internship with Intel or the Recording Academy.",
    work: [
      "Built Tableau dashboards comparing electricity supply, demand, and renewable generation across 13 U.S. regions for an Intel sustainability case",
      "Identified the Northwest as having the highest renewable-generation share in the case comparison",
      "Analyzed Grammy.com engagement using Excel PivotTables and KPI comparisons",
      "Observed pages per session increase from 1.86 to 2.25 after a website split",
    ],
    outcome:
      "Recommended retaining separate sites for the Recording Academy case; the before-and-after KPI comparison does not establish that the split caused the increase.",
    tools: ["Tableau", "Excel PivotTables", "KPI comparison"],
  },
  {
    company: "NTALENTS.AI (Acquired by Unacademy)",
    date: "May–Jun 2024",
    duration: "2 months",
    location: "Bangalore, India",
    role: "Data Analyst Intern",
    summary:
      "Analyzed up to 30,000 recruitment records across 3+ client accounts using MySQL joins and Python pandas.",
    work: [
      "Flagged screening-to-interview delays for stakeholder review",
      "Helped build Tableau dashboards tracking stage conversion and time-to-interview for monthly client reports",
      "Recommended priority follow-ups on stalled applications",
    ],
    outcome:
      "The reporting and follow-up recommendations contributed to 15% higher reported client satisfaction scores.",
    tools: ["MySQL", "Python pandas", "Tableau", "Client reporting"],
  },
  {
    company: "DLF Limited",
    date: "Aug–Nov 2023",
    duration: "4 months",
    location: "Gurugram, India",
    role: "Finance & Accounting Intern",
    summary:
      "Processed 50–100 customer cheque payments daily in Ramco and reconciled installment records.",
    work: [
      "Resolved missing entries, duplicate payments, and amount discrepancies with manager approval",
      "Built a reusable Excel lookup-based reconciliation template for approximately 200–300 customers",
    ],
    outcome:
      "The template cut monthly installment review time by 25%, from 8 to 6 hours.",
    tools: ["Ramco", "Excel lookup formulas", "Financial reconciliation"],
  },
  {
    company: "Marquee Equity",
    date: "Jul 2022–May 2023",
    duration: "11 months",
    location: "Remote",
    role: "Investment Banking Fellow",
    summary:
      "Researched 15+ companies across TMT, consumer, education, and B2B services.",
    work: [
      "Assessed business models, funding activity, and competitive positioning",
      "Supported company screening and investor research",
    ],
    outcome:
      "Produced company research to support screening and investor research.",
    tools: ["Company research", "Investment research", "Competitive positioning"],
  },
];
export function ExperienceExplorer() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = experiences[activeIndex];

  return (
    <div className="experience-explorer">
      <div className="experience-list" role="tablist" aria-label="Experience timeline">
        {experiences.map((item, index) => (
          <button
            type="button"
            role="tab"
            key={item.company}
            className={index === activeIndex ? "experience-choice active" : "experience-choice"}
            aria-selected={index === activeIndex}
            aria-controls="experience-panel"
            onClick={() => setActiveIndex(index)}
          >
            <span className="choice-index">0{index + 1}</span>
            <span className="choice-main">
              <strong>{item.company}</strong>
              <small>{item.role}</small>
            </span>
            <span className="choice-date">
              {item.date}
              <small>{item.duration}</small>
            </span>
          </button>
        ))}
      </div>

      <article
        className={`experience-panel experience-tone-${activeIndex + 1}`}
        id="experience-panel"
        role="tabpanel"
        key={active.company}
      >
        <div className="experience-meta">
          <span>{active.date}</span>
          <span className="duration-badge">{active.duration}</span>
          <span>{active.location}</span>
        </div>
        <p className="experience-company">{active.company}</p>
        <h3>{active.role}</h3>
        <p className="experience-summary">{active.summary}</p>

        <div className="experience-detail">
          <div>
            <span>What I did</span>
            <ul>
              {active.work.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <span>Outcome</span>
            <p>{active.outcome}</p>
          </div>
        </div>

        <div className="tag-row" role="group" aria-label="Relevant skills and tools">
          {active.tools.map((tool) => (
            <span key={tool} title={`${tool} · used in this role`}>
              {tool}
            </span>
          ))}
        </div>
      </article>
    </div>
  );
}

export function CopyEmailButton() {
  const [label, setLabel] = useState("Copy email");

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("Shreshth2002@gmail.com");
      setLabel("Email copied");
      window.setTimeout(() => setLabel("Copy email"), 2200);
    } catch {
      setLabel("Shreshth2002@gmail.com");
    }
  };

  return (
    <button className="button button-outline" type="button" onClick={copyEmail} aria-live="polite">
      {label}
    </button>
  );
}
