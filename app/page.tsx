import type { Metadata } from "next";
import Image from "next/image";
import {
  AudienceLens,
  CopyEmailButton,
  ExperienceExplorer,
  IntelDecisionExplorer,
  UbiSimulator,
} from "./InteractivePortfolio";

export const metadata: Metadata = {
  title: "Shreyshth Sharma | Financial Research & Data Analytics",
  description:
    "Economics and Quantitative Methods graduate building defensible research, decision models, and analytical reporting across finance and business questions.",
};

const capabilities = [
  {
    number: "01",
    title: "Investigate a company or sector",
    does: "Map market context, funding momentum, and competitive positioning; turn the research into a concise point of view.",
    why: "It helps a team decide where deeper diligence and attention belong.",
    proof: "Marquee Equity · company and sector research",
  },
  {
    number: "02",
    title: "Structure messy evidence",
    does: "Clean, reconcile, and compare multi-source information with Excel, SQL, Python, and Tableau.",
    why: "A decision is only as credible as the inputs and logic behind it.",
    proof: "Intel · energy and infrastructure comparison",
  },
  {
    number: "03",
    title: "Test the assumption",
    does: "Use sensitivity analysis, econometric reasoning, and weighted criteria to show how an answer changes.",
    why: "It replaces one brittle estimate with a range the reviewer can challenge.",
    proof: "UBI project · elasticity sensitivity model",
  },
  {
    number: "04",
    title: "Make the decision legible",
    does: "Build dashboards, presentations, and investor-facing materials around the question—not the tool.",
    why: "Good analysis earns trust when someone else can explain and use it.",
    proof: "Client reporting · Tableau · PowerPoint",
  },
];

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Shreyshth Sharma",
  alternateName: "Shrey Sharma",
  url: "https://shrey15.vercel.app",
  sameAs: [
    "https://www.linkedin.com/in/shreyshth-sharma-0170",
    "https://github.com/Shreyshth15",
  ],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Indiana University Bloomington",
  },
  knowsAbout: [
    "Financial research",
    "Data analytics",
    "Econometrics",
    "Tableau",
    "Python",
    "SQL",
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <header className="site-header">
        <a className="brand" href="#top" aria-label="Shrey Sharma, home">
          <span className="brand-mark">S15</span>
          <span className="brand-name">Shreyshth Sharma</span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#work">Work</a>
          <a href="#experience">Experience</a>
          <a href="#capabilities">Capabilities</a>
          <a href="#about">About</a>
        </nav>
        <a className="header-cta" href="#contact">
          Contact <span aria-hidden="true">↘</span>
        </a>
      </header>

      <main id="main">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="hero-copy">
            <div className="status-line">
              <span className="status-dot" aria-hidden="true" />
              Washington–Baltimore · Open nationwide
            </div>
            <p className="eyebrow">Financial research × data analytics</p>
            <h1 id="hero-title">
              Analysis that holds up
              <em> in the room.</em>
            </h1>
            <p className="hero-intro">
              I&apos;m <strong>Shreyshth Sharma</strong>—an Economics and
              Quantitative Methods graduate with experience across company and
              sector research, finance operations, and client-facing analytics.
            </p>
            <div className="hero-actions">
              <a className="button button-dark" href="#work">
                Test the work <span aria-hidden="true">↓</span>
              </a>
              <a className="button button-light" href="/resume.pdf" target="_blank">
                View résumé <span aria-hidden="true">↗</span>
              </a>
            </div>
            <p className="pronunciation">Shrey-sh-th Shar-ma · goes by Shrey</p>
          </div>

          <div className="hero-visual">
            <div className="portrait-frame">
              <Image
                src="/images/shrey-iu.jpg"
                alt="Shrey Sharma at Indiana University"
                width="960"
                height="1280"
                sizes="(max-width: 1180px) 78vw, 38vw"
                priority
              />
              <div className="photo-caption">
                <span>Indiana University</span>
                <span>B.S. · 2026</span>
              </div>
            </div>
            <div className="method-card">
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
            </div>
          </div>
        </section>

        <section className="proof-strip" aria-label="Professional positioning">
          <article>
            <span>Evidence</span>
            <p>Company and sector research · Intel decision dashboard · UBI sensitivity model</p>
          </article>
          <article>
            <span>Toolkit</span>
            <p>Excel · PowerPoint · Tableau · SQL · Python · R</p>
          </article>
          <article>
            <span>Role focus</span>
            <p>Credit and investment research · Portfolio analytics · Finance-adjacent consulting</p>
          </article>
        </section>

        <section className="section work-section" id="work" aria-labelledby="work-title">
          <div className="section-heading">
            <p className="eyebrow">01 / Selected work</p>
            <h2 id="work-title">Use the models.</h2>
            <p>
              Adjust the assumptions, inspect the logic, and see where the
              evidence ends. Interactivity here is part of the analysis—not decoration.
            </p>
          </div>

          <article className="project project-ubi" aria-labelledby="ubi-title">
            <div className="project-intro">
              <div className="project-topline">
                <span>Econometric simulation</span>
                <span>Independent · ECON E402</span>
              </div>
              <div>
                <p className="project-index">Project 01</p>
                <h3 id="ubi-title">How sensitive is the UBI answer?</h3>
                <p>
                  A Python model tests how annual UBI levels change labor supply
                  under different income-elasticity assumptions. The point is not
                  a single forecast; it is seeing how much the answer depends on ε.
                </p>
              </div>
              <div className="project-facts">
                <div>
                  <span>Question</span>
                  <p>How does a larger income effect change modeled work hours?</p>
                </div>
                <div>
                  <span>Method</span>
                  <p>Deterministic sensitivity analysis across UBI and elasticity levels.</p>
                </div>
                <div>
                  <span>Boundary</span>
                  <p>Illustrative partial-equilibrium model—not a causal estimate or policy forecast.</p>
                </div>
              </div>
            </div>
            <UbiSimulator />
            <div className="project-foot">
              <div className="tag-row" aria-label="UBI project tools">
                <span>Python</span>
                <span>Pandas</span>
                <span>Matplotlib</span>
                <span>Sensitivity analysis</span>
              </div>
              <a
                href="https://github.com/Shreyshth15/UBI-Labor-Supply-Simulation"
                target="_blank"
                rel="noreferrer"
              >
                Inspect the notebook <span aria-hidden="true">↗</span>
              </a>
            </div>
          </article>

          <div className="project-grid">
            <article className="project project-intel" aria-labelledby="intel-title">
              <div className="project-topline">
                <span>Decision modeling</span>
                <span>Intel · Industry project</span>
              </div>
              <p className="project-index">Project 02</p>
              <h3 id="intel-title">Which evidence should drive a site decision?</h3>
              <p className="project-summary">
                Built a comparative framework for five candidate data-center
                locations using energy, renewable-resource, reliability, cost,
                and infrastructure inputs.
              </p>
              <IntelDecisionExplorer />
              <div className="evidence-note">
                <span>Evidence boundary</span>
                <p>
                  This explorer reconstructs the weighting logic. Site-level
                  scores and the original recommendation are not published here
                  because the underlying report is not part of this portfolio.
                </p>
              </div>
              <div className="tag-row">
                <span>Tableau</span>
                <span>Excel</span>
                <span>Comparative analysis</span>
              </div>
            </article>

            <article className="project project-audience" aria-labelledby="audience-title">
              <div className="project-topline">
                <span>Audience analytics</span>
                <span>Recording Academy</span>
              </div>
              <p className="project-index">Project 03</p>
              <h3 id="audience-title">Where does the audience disappear?</h3>
              <p className="project-summary">
                Cleaned campaign data and built KPI reporting that identified
                three engagement drop-off points and top-performing content segments.
              </p>
              <AudienceLens />
              <div className="evidence-note">
                <span>Evidence boundary</span>
                <p>
                  The three drop-off points are supported by the project record;
                  exact campaign values remain off-site.
                </p>
              </div>
              <div className="tag-row">
                <span>Tableau</span>
                <span>Python</span>
                <span>KPI reporting</span>
              </div>
            </article>
          </div>
        </section>

        <section className="section experience-section" id="experience" aria-labelledby="experience-title">
          <div className="section-heading compact-heading">
            <p className="eyebrow">02 / Experience</p>
            <h2 id="experience-title">Four roles. One working pattern.</h2>
            <p>
              Start with an ambiguous question. Find the evidence. Build the
              comparison. Make the output useful to the next person.
            </p>
          </div>
          <ExperienceExplorer />
        </section>

        <section
          className="section capabilities-section"
          id="capabilities"
          aria-labelledby="capabilities-title"
        >
          <div className="section-heading">
            <p className="eyebrow">03 / Capabilities</p>
            <h2 id="capabilities-title">What I actually do.</h2>
            <p>
              Each capability is tied to a specific kind of work and a reason
              it matters. No unsupported proficiency bars. No tool-first claims.
            </p>
          </div>
          <div className="capability-grid">
            {capabilities.map((item) => (
              <article key={item.number}>
                <span className="capability-number">{item.number}</span>
                <h3>{item.title}</h3>
                <dl>
                  <div>
                    <dt>What that means</dt>
                    <dd>{item.does}</dd>
                  </div>
                  <div>
                    <dt>Why it matters</dt>
                    <dd>{item.why}</dd>
                  </div>
                </dl>
                <p>{item.proof}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section about-section" id="about" aria-labelledby="about-title">
          <div className="about-photo">
            <Image
              src="/images/shrey-graduation.jpg"
              alt="Shrey Sharma receiving his Economics and Quantitative Methods degree"
              width="1600"
              height="900"
              sizes="(max-width: 900px) 86vw, 42vw"
            />
            <p>Indiana University Bloomington · 2026</p>
          </div>
          <div className="about-copy">
            <p className="eyebrow">04 / About</p>
            <h2 id="about-title">The question and the numbers belong together.</h2>
            <p className="about-lead">
              I studied economics because I care about the question behind the
              number, and quantitative methods because I wanted a stronger way
              to test it. Since then, I&apos;ve worked across investment research,
              finance operations, and client-facing analytics.
            </p>
            <p className="about-target">
              I&apos;m targeting teams where financial judgment and analytical
              execution live in the same role—especially credit and investment
              research, portfolio or performance analytics, and finance-adjacent consulting.
            </p>
            <div className="education-list">
              <div>
                <span>Indiana University</span>
                <p>B.S. Economics &amp; Quantitative Methods (STEM) · Psychology minor</p>
              </div>
              <div>
                <span>London School of Economics</span>
                <p>Intermediate Macroeconomics · Introduction to Econometrics · Summer 2024</p>
              </div>
              <div>
                <span>Current study</span>
                <p>Deepening fixed-income and credit foundations through Level I curriculum materials.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="contact-section" id="contact" aria-labelledby="contact-title">
          <div className="contact-kicker">
            <span className="status-dot" aria-hidden="true" />
            Open to the right analytical team
          </div>
          <h2 id="contact-title">
            If the role needs both the investment question and the analytical answer,
            <em> we should talk.</em>
          </h2>
          <div className="contact-grid">
            <p>
              Based in the Washington–Baltimore area and open to opportunities
              nationwide. I&apos;m happy to discuss a role, a project, or the logic
              behind any case study on this site.
            </p>
            <div>
              <span>Typical conversation window</span>
              <strong>Monday–Friday · 12:00–7:00 PM ET</strong>
              <small>Requested times are confirmed by email.</small>
            </div>
          </div>
          <div className="contact-actions">
            <a className="button button-acid" href="mailto:Shreshth2002@gmail.com">
              Email Shrey <span aria-hidden="true">↗</span>
            </a>
            <a
              className="button button-outline"
              href="mailto:Shreshth2002@gmail.com?subject=Conversation%20request&body=Hi%20Shrey%2C%0A%0AI%27d%20like%20to%20connect.%20My%20preferred%20weekday%20and%20time%20between%2012%3A00%20PM%20and%207%3A00%20PM%20ET%20is%3A%0A%0A"
            >
              Request a call <span aria-hidden="true">↗</span>
            </a>
            <a
              className="button button-outline"
              href="https://www.linkedin.com/in/shreyshth-sharma-0170"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn <span aria-hidden="true">↗</span>
            </a>
            <a className="button button-outline" href="/resume.pdf" target="_blank">
              Résumé <span aria-hidden="true">↗</span>
            </a>
            <CopyEmailButton />
          </div>
          <div className="footer-line">
            <span>© 2026 Shreyshth Sharma</span>
            <a href="https://github.com/Shreyshth15" target="_blank" rel="noreferrer">
              GitHub ↗
            </a>
            <a href="#top">Back to top ↑</a>
          </div>
        </section>
      </main>
    </>
  );
}
