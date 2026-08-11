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

const bookingUrl =
  "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ2KI9iKlYUYG7eE8OJuNifjKdTYUQn3_oGtvD-kDc9J_CmYZVAA_8Dps8k6zEhm_HSa7YtAXnOm?gv=true";

const capabilities = [
  {
    number: "01",
    title: "Finance research",
    does: "Research companies, sectors, funding context, and competitive position; turn the evidence into a clear point of view.",
    why: "It shows where deeper diligence and capital may deserve attention.",
    proof: "Marquee Equity · company and sector research",
  },
  {
    number: "02",
    title: "Financial analysis",
    does: "Read financial statements, compare business drivers, and examine spending, cost, and variance patterns.",
    why: "It connects the numbers to what is actually happening in the business.",
    proof: "DLF · operating-spend analysis · finance coursework",
  },
  {
    number: "03",
    title: "Data & decision models",
    does: "Clean, join, score, and stress-test evidence with Excel, SQL, Python, Tableau, and econometric reasoning.",
    why: "It makes the trade-off visible, reviewable, and easier to challenge.",
    proof: "Intel decision framework · UBI sensitivity model",
  },
  {
    number: "04",
    title: "Communicate the call",
    does: "Build dashboards, presentations, and investor materials around the decision, not the software used to make them.",
    why: "A result only matters if the next person can understand and use it.",
    proof: "Recording Academy reporting · Marquee investor materials",
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
              I&apos;m <strong>Shreyshth Sharma</strong>, an Economics and
              Quantitative Methods graduate who <strong>researches companies</strong>,
              examines <strong>financial and operating data</strong>, and builds
              <strong> decision tools</strong> for teams where finance judgment and
              analytical rigor belong together.
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
            <span>Track record</span>
            <p>Company research · Investor materials · Spend analysis · Decision models · Sensitivity testing · Client dashboards</p>
          </article>
          <article>
            <span>Toolkit</span>
            <p>Excel · PowerPoint · Tableau · SQL · Python · R</p>
          </article>
          <article>
            <span>Role focus</span>
            <p>Investment research · Credit · Corporate finance · Transactions · Portfolio analytics</p>
          </article>
        </section>

        <section className="section work-section" id="work" aria-labelledby="work-title">
          <div className="section-heading">
            <p className="eyebrow">01 / Selected work</p>
            <h2 id="work-title">Use the models.</h2>
            <p>
              Move the inputs. Challenge the output. If the answer breaks,
              that&apos;s useful too.
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
                  <p>Illustrative partial-equilibrium model, not a causal estimate or policy forecast.</p>
                </div>
              </div>
            </div>
            <UbiSimulator />
            <div className="project-foot">
              <div className="tag-row" aria-label="UBI project tools">
                <span title="Simulation logic">Python</span>
                <span title="Scenario outputs">Pandas</span>
                <span title="Sensitivity charts">Matplotlib</span>
                <span title="Stress-tested assumptions">Sensitivity analysis</span>
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
                <span title="Comparative decision views">Tableau</span>
                <span title="Normalized multi-source inputs">Excel</span>
                <span title="Weighted criteria and trade-offs">Comparative analysis</span>
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
                <span title="Audience reporting views">Tableau</span>
                <span title="Data cleaning and automation">Python</span>
                <span title="Reach, engage, and retain framing">KPI reporting</span>
              </div>
            </article>
          </div>
        </section>

        <section className="section experience-section" id="experience" aria-labelledby="experience-title">
          <div className="section-heading compact-heading">
            <p className="eyebrow">02 / Experience</p>
            <h2 id="experience-title">Different desks. Same standard.</h2>
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
              Financial markets, modeling, and communication. No 96% skill bars.
              Nobody knows what 96% of Excel means.
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
            <h2 id="about-title">Numbers tell you what happened. I wanted to understand why.</h2>
            <p className="about-lead">
              Economics gave me the language for <strong>incentives, markets, and
              decisions</strong>. I added Quantitative Methods because intuition is
              useful, but I wanted the tools to test it. Together, they taught me
              to <strong>start with the business question</strong> and earn the answer
              with evidence.
            </p>
            <p className="about-target">
              That mix followed me into <strong>company research, finance operations,
              and client analytics</strong>. I want to keep using it where the stakes
              are real: study the business, question the assumptions, and help make the call.
            </p>
            <p className="about-personal">
              When the laptop closes, I am usually lifting, reading philosophy,
              or watching Barça. Markets somehow follow me anyway. The loyalty
              is permanent. <strong>Visca Barça.</strong>
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
                <p>Preparing with CFA Program Level I curriculum materials, with the intention of sitting for the Level I exam.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="contact-section" id="contact" aria-labelledby="contact-title">
          <div className="contact-kicker">
            <span className="status-dot" aria-hidden="true" />
            Open nationwide
          </div>
          <h2 id="contact-title">
            The work is here.
            <em> Let&apos;s talk about yours.</em>
          </h2>
          <p className="contact-intro">
            Based in Washington–Baltimore. Open nationwide to finance and analytics roles.
          </p>
          <div className="contact-actions">
            <a className="button button-acid" href="mailto:Shreshth2002@gmail.com">
              Email Shrey <span aria-hidden="true">↗</span>
            </a>
            <a
              className="button button-outline"
              href={bookingUrl}
              target="_blank"
              rel="noreferrer"
            >
              Book 30 minutes <span aria-hidden="true">↗</span>
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
