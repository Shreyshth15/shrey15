"use client";

import { useState } from "react";

const experiences = [
  {
    company: "Global Tech Experience",
    date: "Jan — May 2025",
    location: "Bloomington, IN",
    role: "Data Analytics Trainee",
    summary:
      "Built decision tools from messy, multi-source data, translating both infrastructure and audience questions into executive-ready reporting.",
    focus: ["Decision dashboards", "Python automation", "Executive reporting"],
    metric: "5",
    metricLabel: "candidate sites compared",
    proof: "Also surfaced 3 engagement drop-off points for a Recording Academy audience project.",
    tools: ["Tableau", "Python", "Excel"],
  },
  {
    company: "DLF Limited",
    date: "Aug — Nov 2023",
    location: "Gurugram, India",
    role: "Finance & Operations Intern",
    summary:
      "Standardized expense reporting, tightened monthly reconciliation, and analyzed spend patterns across vendors and departments.",
    focus: ["Expense analysis", "Reporting design", "Cost review"],
    metric: "~10%",
    metricLabel: "lower monthly operating costs",
    proof: "The analysis fed a broader cost review and made recurring expense variance easier to spot.",
    tools: ["Excel", "FP&A", "Cost analysis"],
  },
  {
    company: "nTalents.ai",
    date: "Jun — Jul 2023",
    location: "Bangalore, India",
    role: "Data Analyst Intern",
    summary:
      "Queried and cleaned large client datasets, then turned the patterns into dashboards and stakeholder presentations.",
    focus: ["Data QA", "Client dashboards", "Stakeholder storytelling"],
    metric: "~15%",
    metricLabel: "higher client satisfaction",
    proof: "Worked across tens of thousands of records for 3+ enterprise clients.",
    tools: ["SQL", "Python", "Dashboards"],
  },
  {
    company: "Marquee Equity",
    date: "Jul 2022 — Jun 2023",
    location: "New Delhi, India",
    role: "Investment Research Fellow",
    summary:
      "Researched companies and sectors, assessed competitive positioning and funding momentum, and shaped the findings into investor-facing narratives.",
    focus: ["Company research", "Sector mapping", "Investor materials"],
    metric: "8+",
    metricLabel: "companies researched",
    proof: "Coverage spanned TMT, consumer, education, and B2B businesses at early and growth stages.",
    tools: ["Equity research", "Valuation", "Investor decks"],
  },
];

export function ExperienceExplorer() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = experiences[activeIndex];

  const move = (direction: number) => {
    setActiveIndex((current) => (current + direction + experiences.length) % experiences.length);
  };

  return (
    <div className="experience-explorer">
      <div className="experience-list" aria-label="Choose a role to explore">
        {experiences.map((item, index) => (
          <button
            type="button"
            key={item.company}
            className={index === activeIndex ? "experience-choice active" : "experience-choice"}
            aria-pressed={index === activeIndex}
            onClick={() => setActiveIndex(index)}
          >
            <span className="choice-index">0{index + 1}</span>
            <span className="choice-main">
              <strong>{item.company}</strong>
              <small>{item.role}</small>
            </span>
            <span className="choice-arrow" aria-hidden="true">→</span>
          </button>
        ))}
      </div>

      <article className="experience-panel" key={active.company} aria-live="polite">
        <div className="experience-meta">
          <span>{active.date}</span>
          <span>{active.location}</span>
        </div>
        <p className="experience-company">{active.company}</p>
        <h3>{active.role}</h3>
        <p className="experience-summary">{active.summary}</p>

        <div className="experience-evidence">
          <div className="focus-list">
            <span>What I did</span>
            <ul>
              {active.focus.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
          <div className="metric-block">
            <strong>{active.metric}</strong>
            <span>{active.metricLabel}</span>
          </div>
        </div>

        <p className="experience-proof">{active.proof}</p>
        <div className="experience-bottom">
          <div className="tag-row">
            {active.tools.map((tool) => <span key={tool}>{tool}</span>)}
          </div>
          <div className="experience-controls" aria-label="Browse roles">
            <button type="button" onClick={() => move(-1)} aria-label="Previous role">←</button>
            <span>{activeIndex + 1} / {experiences.length}</span>
            <button type="button" onClick={() => move(1)} aria-label="Next role">→</button>
          </div>
        </div>
      </article>
    </div>
  );
}

export function CopyEmailButton() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    await navigator.clipboard.writeText("Shreshth2002@gmail.com");
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  };

  return (
    <button className="button button-outline copy-email" type="button" onClick={copyEmail} aria-live="polite">
      {copied ? "Email copied ✓" : "Copy email"}
    </button>
  );
}
