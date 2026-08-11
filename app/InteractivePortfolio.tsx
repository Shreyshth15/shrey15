"use client";

import { useMemo, useState } from "react";
import {
  initialIntelWeights,
  rankIntelSites,
  type IntelCriterionId,
} from "./intelModel";

const BASE_INCOME = 50_000;
const UBI_LEVELS = [0, 6_000, 12_000, 18_000];
const MAX_MODELED_DROP = 7.2;

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

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
          <span className="live-pill">Live model · yes, it moves</span>
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
          <small id="elasticity-note">Original notebook range: 0.05–0.20</small>
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

type IntelCriterion = {
  id: IntelCriterionId;
  label: string;
  evidence: string;
  color: string;
};

const intelCriteria: IntelCriterion[] = [
  {
    id: "renewables",
    label: "Renewable mix",
    evidence: "Generation mix and renewable-resource availability",
    color: "#dfff61",
  },
  {
    id: "reliability",
    label: "Grid reliability",
    evidence: "Reliability indicators and regional surplus potential",
    color: "#6be6ff",
  },
  {
    id: "cost",
    label: "Power economics",
    evidence: "Comparable electricity-cost indicators",
    color: "#ff9d73",
  },
  {
    id: "readiness",
    label: "Infrastructure readiness",
    evidence: "Site constraints and infrastructure-readiness signals",
    color: "#b49bff",
  },
];

export function IntelDecisionExplorer() {
  const [weights, setWeights] = useState(initialIntelWeights);
  const total = Object.values(weights).reduce((sum, value) => sum + value, 0);

  const normalized = useMemo(
    () =>
      intelCriteria.map((criterion) => ({
        ...criterion,
        raw: weights[criterion.id],
        share: (weights[criterion.id] / total) * 100,
      })),
    [total, weights],
  );
  const ranking = useMemo(() => rankIntelSites(weights), [weights]);
  const winner = ranking[0];
  const runnerUp = ranking[1];
  const isBaseline = Object.entries(initialIntelWeights).every(
    ([criterion, value]) => weights[criterion as IntelCriterion["id"]] === value,
  );
  const winnerDrivers = [...intelCriteria]
    .sort(
      (a, b) =>
        winner.scores[b.id] * weights[b.id] - winner.scores[a.id] * weights[a.id],
    )
    .slice(0, 2);

  const nearestFlip = useMemo(() => {
    const alternatives: Array<{
      criterion: IntelCriterion;
      value: number;
      share: number;
      winner: string;
      distance: number;
    }> = [];

    intelCriteria.forEach((criterion) => {
      for (let value = 5; value <= 70; value += 5) {
        if (value === weights[criterion.id]) continue;
        const scenarioWeights = { ...weights, [criterion.id]: value };
        const scenarioWinner = rankIntelSites(scenarioWeights)[0];

        if (scenarioWinner.id !== winner.id) {
          const scenarioTotal = Object.values(scenarioWeights).reduce(
            (sum, weight) => sum + weight,
            0,
          );
          alternatives.push({
            criterion,
            value,
            share: (value / scenarioTotal) * 100,
            winner: scenarioWinner.label,
            distance: Math.abs(value - weights[criterion.id]),
          });
        }
      }
    });

    return alternatives.sort((a, b) => a.distance - b.distance)[0];
  }, [weights, winner.id]);

  return (
    <div className="intel-explorer">
      <div className="intel-composition" aria-label="Normalized decision weights">
        {normalized.map((criterion) => (
          <span
            key={criterion.id}
            style={{ width: `${criterion.share}%`, background: criterion.color }}
            title={`${criterion.label}: ${criterion.share.toFixed(0)}%`}
          />
        ))}
      </div>

      <div className="intel-grid">
        <div className="weight-controls">
          {normalized.map((criterion) => (
            <label key={criterion.id} htmlFor={`weight-${criterion.id}`}>
              <span>
                <i style={{ background: criterion.color }} />
                {criterion.label}
                <output htmlFor={`weight-${criterion.id}`}>
                  {criterion.share.toFixed(0)}%
                </output>
              </span>
              <input
                id={`weight-${criterion.id}`}
                type="range"
                min="5"
                max="70"
                step="5"
                value={criterion.raw}
                onChange={(event) =>
                  setWeights((current) => ({
                    ...current,
                    [criterion.id]: Number(event.target.value),
                  }))
                }
              />
              <small>{criterion.evidence}</small>
            </label>
          ))}
        </div>

        <div className="site-ranking" aria-label="Weighted ranking of anonymized sites">
          {ranking.map((site, index) => (
            <div className={index === 0 ? "site-rank winner" : "site-rank"} key={site.id}>
              <span>
                <i>0{index + 1}</i>
                {site.label}
                {site.id === "site-a" && <small>Project pick</small>}
              </span>
              <strong>{site.total.toFixed(1)}</strong>
              <div aria-hidden="true">
                <i style={{ width: `${site.total}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="recommendation-panel" aria-live="polite">
        <div className="recommendation-result">
          <span>{isBaseline ? "Recommendation" : "Current winner"}</span>
          <strong>{winner.label}</strong>
          <p>
            {winner.label} leads on the current mix, driven most by {winnerDrivers[0].label.toLowerCase()} and{" "}
            {winnerDrivers[1].label.toLowerCase()}. It is {(winner.total - runnerUp.total).toFixed(1)} points ahead of{" "}
            {runnerUp.label}.
          </p>
        </div>
        <div>
          <span>What would flip it</span>
          <p>
            {nearestFlip
              ? `${nearestFlip.value > weights[nearestFlip.criterion.id] ? "Raise" : "Lower"} ${nearestFlip.criterion.label.toLowerCase()} to about ${nearestFlip.share.toFixed(0)}% of the mix and ${nearestFlip.winner} takes the lead.`
              : "No single slider move flips the result. More than one trade-off has to change."}
          </p>
        </div>
        <div>
          <span>Outcome</span>
          <p>
            The framework turned scattered energy and infrastructure inputs into a recommendation centered on carbon reduction and execution readiness.
          </p>
        </div>
        <small>
          Anonymized portfolio reconstruction. Site profiles are normalized to 0–100; exact source values are not presented.
        </small>
      </div>
    </div>
  );
}

const audienceStages = [
  {
    id: "reach",
    label: "Reach",
    question: "Which content earns the first look?",
    evidence: "Compare audience volume and the segments producing initial attention.",
    decision: "Prioritize the formats and topics with the strongest entry signal.",
  },
  {
    id: "engage",
    label: "Engage",
    question: "Where does attention start to weaken?",
    evidence: "Trace the journey to isolate the engagement drop-off points.",
    decision: "Revise sequencing, creative, or distribution around the weak handoff.",
  },
  {
    id: "retain",
    label: "Retain",
    question: "Which patterns are worth repeating?",
    evidence: "Connect later-stage behavior back to top-performing content segments.",
    decision: "Build the next content plan around repeatable audience signals.",
  },
];

export function AudienceLens() {
  const [activeId, setActiveId] = useState("reach");
  const active = audienceStages.find((stage) => stage.id === activeId) ?? audienceStages[0];

  return (
    <div className="audience-lens">
      <div className="journey-tabs" role="tablist" aria-label="Audience analysis stages">
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
        <span>{active.label} lens</span>
        <h4>{active.question}</h4>
        <dl>
          <div>
            <dt>What to inspect</dt>
            <dd>{active.evidence}</dd>
          </div>
          <div>
            <dt>Why it matters</dt>
            <dd>{active.decision}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

const experiences = [
  {
    company: "Global Tech Experience",
    date: "Jan–May 2025",
    duration: "5 months",
    location: "Bloomington, IN",
    role: "Data Analytics Trainee",
    summary:
      "Built comparative reporting for an Intel site-selection project and audience analysis for the Recording Academy.",
    work: [
      "Synthesized multi-source energy and infrastructure data",
      "Built Tableau and Excel decision views",
      "Packaged findings into executive-ready reporting",
    ],
    outcome:
      "The final reporting made site trade-offs easier to compare and identified three audience drop-off points that informed content strategy.",
    tools: ["Tableau", "Excel", "Python", "Executive reporting"],
  },
  {
    company: "DLF Limited",
    date: "Aug–Nov 2023",
    duration: "4 months",
    location: "Gurugram, India",
    role: "Finance Intern",
    summary:
      "Standardized expense reporting and analyzed spend patterns across vendors and departments.",
    work: [
      "Built reusable Excel reporting templates",
      "Improved expense categorization and reconciliation",
      "Analyzed three months of operating spend",
    ],
    outcome:
      "The analysis fed a cost review credited with roughly 10% lower monthly operating costs.",
    tools: ["Excel", "Expense analysis", "Financial reporting"],
  },
  {
    company: "nTalents.ai",
    date: "Jun–Jul 2023",
    duration: "2 months",
    location: "Bangalore, India",
    role: "Data Analyst Intern",
    summary:
      "Turned recruitment datasets into client-facing dashboards and clear visual findings.",
    work: [
      "Queried and cleaned recruitment data",
      "Performed exploratory analysis",
      "Translated patterns into stakeholder presentations",
    ],
    outcome:
      "The client reporting contributed to roughly 15% higher satisfaction by making recruitment patterns easier to act on.",
    tools: ["SQL", "Python", "Tableau", "Client reporting"],
  },
  {
    company: "Marquee Equity",
    date: "Jul 2022–Jun 2023",
    duration: "12 months",
    location: "New Delhi, India",
    role: "Investment Research Fellow",
    summary:
      "Built company and sector research for fundraising mandates, investor outreach, and internal deal prioritization.",
    work: [
      "Researched early- and growth-stage companies across TMT, consumer, education, and B2B services",
      "Tracked sector trends, funding momentum, and competitive positioning",
      "Screened company narratives for fundraising and investor relevance",
      "Turned findings into investor-facing materials and internal deal priorities",
    ],
    outcome:
      "The research informed mandate selection and deal prioritization while strengthening materials used in investor outreach.",
    tools: ["Company research", "Sector analysis", "Competitive research", "Investor materials"],
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

        <div className="tag-row" aria-label="Relevant skills and tools">
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
