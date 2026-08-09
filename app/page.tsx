import type { Metadata } from "next";
import { CopyEmailButton, ExperienceExplorer } from "./InteractivePortfolio";

export const metadata: Metadata = {
  title: "Shrey15 — Financial Research & Data Analytics",
  description:
    "Economics and Quantitative Methods graduate turning market, company, and operational data into decision-ready analysis.",
};

const capabilities = [
  {
    number: "01",
    title: "Research",
    body: "Company research, sector mapping, credit foundations, valuation support, macro and rates context.",
  },
  {
    number: "02",
    title: "Model",
    body: "Econometrics, sensitivity analysis, decision scoring, data cleaning, QA, and integration.",
  },
  {
    number: "03",
    title: "Build",
    body: "Advanced Excel, Tableau, SQL, Python, R, and repeatable analytical workflows.",
  },
  {
    number: "04",
    title: "Explain",
    body: "Investor materials, client reports, executive presentations, and clear stakeholder updates.",
  },
];

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <header className="site-header">
        <a className="brand" href="#top" aria-label="Shrey Sharma, home">
          <span className="brand-mark">S15</span>
          <span className="brand-name">Shrey15</span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#work">Work</a>
          <a href="#experience">Experience</a>
          <a href="#about">About</a>
        </nav>
        <a className="header-cta" href="mailto:Shreshth2002@gmail.com">
          Let&apos;s talk <span aria-hidden="true">↗</span>
        </a>
      </header>

      <main id="main">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="hero-copy">
            <div className="status-line">
              <span className="status-dot" aria-hidden="true" />
              Washington–Baltimore · Open to opportunities nationwide
            </div>
            <p className="eyebrow">Economics × Quantitative Methods</p>
            <h1 id="hero-title">
              I turn messy business questions into
              <em> decision-ready analysis.</em>
            </h1>
            <p className="hero-intro">
              I&apos;m <strong>Shreyshth Sharma</strong>—Shrey for short—an Indiana
              University graduate working at the intersection of financial
              research, data analysis, and clear communication.
            </p>
            <div className="hero-actions">
              <a className="button button-dark" href="#work">
                See selected work <span aria-hidden="true">↓</span>
              </a>
              <a className="button button-light" href="/resume.pdf">
                Resume <span aria-hidden="true">↗</span>
              </a>
            </div>
            <p className="pronunciation">
              Pronounced “Shrey-sh-th Shar-ma” · goes by Shrey
            </p>
          </div>

          <div className="hero-visual">
            <div className="portrait-frame">
              <img
                src="/images/shrey-iu.jpg"
                alt="Shrey Sharma at Indiana University"
                width="960"
                height="1280"
              />
              <div className="photo-caption">
                <span>Indiana University</span>
                <span>B.S. · 2026</span>
              </div>
            </div>
            <div className="evidence-card">
              <p>My working loop</p>
              <ol>
                <li><span>01</span> Frame the question</li>
                <li><span>02</span> Structure the evidence</li>
                <li><span>03</span> Make the decision clear</li>
              </ol>
            </div>
          </div>
        </section>

        <section className="proof-strip" aria-label="Selected proof points">
          <div>
            <strong>8+</strong>
            <span>companies researched</span>
          </div>
          <div>
            <strong>10s of thousands</strong>
            <span>of records analyzed</span>
          </div>
          <div>
            <strong>9h → 2h</strong>
            <span>illustrative prep-time reduction</span>
          </div>
          <div>
            <strong>3</strong>
            <span>decision-focused case studies</span>
          </div>
        </section>

        <section className="section work-section" id="work" aria-labelledby="work-title">
          <div className="section-heading">
            <p className="eyebrow">01 / Selected work</p>
            <h2 id="work-title">Evidence over adjectives.</h2>
            <p>
              Three examples of how I move from an ambiguous question to a
              usable answer.
            </p>
          </div>

          <article className="case case-featured">
            <div className="case-copy">
              <div className="case-topline">
                <span>Decision modeling</span>
                <span>Intel · Industry project</span>
              </div>
              <h3>Which site should carry the next data center?</h3>
              <p className="case-summary">
                Energy, grid, and infrastructure data lived across sources. I
                normalized the inputs, created a comparable scoring model, and
                built Tableau views that made the tradeoffs legible.
              </p>
              <div className="par-grid">
                <div>
                  <span>Problem</span>
                  <p>Five locations, inconsistent data, one capital decision.</p>
                </div>
                <div>
                  <span>Approach</span>
                  <p>Python prep pipeline + normalized decision criteria.</p>
                </div>
                <div>
                  <span>Result</span>
                  <p>A defensible ranking that could be refreshed quickly.</p>
                </div>
              </div>
              <div className="tag-row" aria-label="Tools used">
                <span>Tableau</span><span>Python</span><span>Excel</span><span>Decision modeling</span>
              </div>
            </div>
            <div className="case-visual time-visual" aria-label="Manual preparation reduced from 9 hours to 2 hours">
              <div className="visual-label">
                <span>PREP TIME / REFRESH</span>
                <span>HOURS</span>
              </div>
              <div className="bar-row before">
                <span>Manual</span>
                <div className="bar"><i /></div>
                <strong>9h</strong>
              </div>
              <div className="bar-row after">
                <span>Python</span>
                <div className="bar"><i /></div>
                <strong>2h</strong>
              </div>
              <p>5 candidate sites · multi-source energy & infrastructure data</p>
            </div>
          </article>

          <div className="case-grid">
            <article className="case case-compact case-blue">
              <div className="case-topline">
                <span>Econometric simulation</span>
                <span>Independent</span>
              </div>
              <h3>How sensitive is the UBI answer?</h3>
              <p>
                Modeled labor-supply effects across a range of behavioral
                elasticities, replacing a brittle point estimate with an honest
                sensitivity band.
              </p>
              <div className="number-callout">
                <strong>~6.4%</strong>
                <span>modeled reduction at elasticity 0.80</span>
              </div>
              <div className="sensitivity" aria-hidden="true">
                <span /><span /><span /><span /><span /><span /><span />
              </div>
              <div className="case-footer">
                <div className="tag-row"><span>Python</span><span>Econometrics</span></div>
                <a href="https://github.com/Shreyshth15/UBI-Labor-Supply-Simulation">
                  View code ↗
                </a>
              </div>
            </article>

            <article className="case case-compact case-acid">
              <div className="case-topline">
                <span>Audience analytics</span>
                <span>Recording Academy</span>
              </div>
              <h3>Where does the audience disappear?</h3>
              <p>
                Cleaned multi-source audience data and built KPI dashboards that
                surfaced the content segments that held attention—and the moments
                that lost it.
              </p>
              <div className="number-callout">
                <strong>3</strong>
                <span>engagement drop-off points surfaced</span>
              </div>
              <div className="funnel" aria-label="Three-stage engagement funnel">
                <div><span>Reach</span></div>
                <div><span>Engage</span></div>
                <div><span>Retain</span></div>
              </div>
              <div className="case-footer">
                <div className="tag-row"><span>Tableau</span><span>Python</span></div>
                <span className="quiet">Executive-ready recommendations</span>
              </div>
            </article>
          </div>
        </section>

        <section className="section experience-section" id="experience" aria-labelledby="experience-title">
          <div className="section-heading compact-heading">
            <p className="eyebrow">02 / Experience</p>
            <h2 id="experience-title">A track record of making analysis useful.</h2>
          </div>
          <ExperienceExplorer />
        </section>

        <section className="section capabilities-section" aria-labelledby="capabilities-title">
          <div className="section-heading compact-heading">
            <p className="eyebrow">03 / Capabilities</p>
            <h2 id="capabilities-title">Research judgment, analytical execution.</h2>
          </div>
          <div className="capability-grid">
            {capabilities.map((item) => (
              <article key={item.number}>
                <span>{item.number}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section about-section" id="about" aria-labelledby="about-title">
          <div className="about-photo">
            <img
              src="/images/shrey-graduation.jpg"
              alt="Shrey Sharma receiving his Economics and Quantitative Methods degree"
              width="1600"
              height="900"
            />
            <p>Indiana University Bloomington · 2026</p>
          </div>
          <div className="about-copy">
            <p className="eyebrow">04 / About</p>
            <h2 id="about-title">Quantitative by training. Practical by instinct.</h2>
            <p className="about-lead">
              My edge is the combination: I can understand the business question,
              structure the data, pressure-test the assumptions, and explain the
              answer clearly enough for someone to act on it.
            </p>
            <div className="education-list">
              <div>
                <span>Indiana University Bloomington</span>
                <p>B.S. Economics & Quantitative Methods (STEM) · Psychology minor · Executive Dean&apos;s List</p>
              </div>
              <div>
                <span>London School of Economics</span>
                <p>Intermediate Macroeconomics + Introduction to Econometrics · Summer 2024</p>
              </div>
              <div>
                <span>Current focus</span>
                <p>Building deeper fixed-income and credit foundations through structured CFA curriculum study.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="contact-section" id="contact" aria-labelledby="contact-title">
          <p className="eyebrow">Open to the right analytical team</p>
          <h2 id="contact-title">Have a hard question?<br />I&apos;d like to help answer it.</h2>
          <p>
            Exploring credit research, structured finance, asset management, and
            investment analytics opportunities.
          </p>
          <div className="contact-actions">
            <a className="button button-acid" href="mailto:Shreshth2002@gmail.com">
              Email Shrey <span aria-hidden="true">↗</span>
            </a>
            <a className="button button-outline" href="https://www.linkedin.com/in/shreyshth-sharma-0170">
              LinkedIn <span aria-hidden="true">↗</span>
            </a>
            <CopyEmailButton />
          </div>
          <div className="footer-line">
            <span>© 2026 Shreyshth Sharma</span>
            <span>Washington–Baltimore · Open to relocate</span>
            <a href="#top">Back to top ↑</a>
          </div>
        </section>
      </main>
    </>
  );
}
