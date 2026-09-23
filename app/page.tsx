import type { Metadata } from "next";
import Image from "next/image";
import {
  AboutPhotoCard,
  AudienceLens,
  CopyEmailButton,
  EducationList,
  ExperienceExplorer,
  IntelDecisionExplorer,
  MethodCard,
  MobileNavigation,
  UbiSimulator,
} from "./InteractivePortfolio";

export const metadata: Metadata = {
  title: "Shreyshth Sharma | Data & Business Analyst",
  description:
    "Economics and Quantitative Methods graduate focused on data analysis, business analysis, financial analysis, and investment research.",
};

const bookingUrl =
  "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ2KI9iKlYUYG7eE8OJuNifjKdTYUQn3_oGtvD-kDc9J_CmYZVAA_8Dps8k6zEhm_HSa7YtAXnOm?gv=true";

const capabilities = [
  {
    number: "01",
    title: "Business & investment research",
    does: "Assess business models, funding activity, and competitive positioning across companies and sectors.",
    why: "It helps teams screen companies and frame the questions worth investigating.",
    proof: "Marquee Equity · research on 15+ companies",
  },
  {
    number: "02",
    title: "Financial analysis",
    does: "Reconcile customer payments, investigate discrepancies, and make recurring reviews more efficient in Excel.",
    why: "Reliable financial records support faster, more accurate review.",
    proof: "DLF · Ramco payment processing · Excel reconciliation",
  },
  {
    number: "03",
    title: "Data analysis & models",
    does: "Join and analyze records with MySQL and Python, compare regional metrics in Tableau, and test assumptions in a simulation.",
    why: "It turns source data and assumptions into findings others can review.",
    proof: "NTALENTS recruitment analysis · Intel case dashboards · UBI simulation",
  },
  {
    number: "04",
    title: "Communicate findings",
    does: "Build client dashboards and compare KPIs, then explain what the evidence supports and where it stops.",
    why: "Clear reporting helps stakeholders decide what to review or follow up on.",
    proof: "NTALENTS monthly reporting · Grammy.com KPI comparison",
  },
];

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Shreyshth Sharma",
  alternateName: "Shrey Sharma",
  url: "https://shreysharma15.vercel.app",
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
        <nav className="desktop-nav" aria-label="Main navigation">
          <a href="#work">Work</a>
          <a href="#experience">Experience</a>
          <a href="#capabilities">Capabilities</a>
          <a href="#about">About</a>
        </nav>
        <MobileNavigation />
        <div className="header-actions">
          <a className="header-cta" href="#contact">
            Contact <span aria-hidden="true">↘</span>
          </a>
          <span className="header-update">Updated September 2026.</span>
        </div>
      </header>

      <main id="main">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="hero-copy">
            <div className="status-line">
              <span className="status-dot" aria-hidden="true" />
              Washington–Baltimore · Open to relocation nationwide
            </div>
            <p className="eyebrow">Financial research × data analytics</p>
            <h1 id="hero-title">
              <span className="hero-heading-main">
                <span>Understand</span>{" "}
                <span>the business.</span>
              </span>
              <em>
                <span>Test the</span>{" "}
                <span>numbers.</span>
              </em>
            </h1>
            <p className="hero-intro">
              Hi, I&apos;m <strong>Shreyshth Sharma</strong>. I turn
              company, market, and operating data into <strong>investment research
              and financial analysis</strong>. I pair quantitative thinking with
              AI-assisted analysis to test assumptions and find what matters.
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
                alt="Shreyshth Sharma in graduation attire at Indiana University"
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
            <MethodCard />
          </div>
        </section>

        <section className="proof-strip" aria-label="Professional positioning">
          <article>
            <span>Applied work</span>
            <p>Recruitment analysis · Client dashboards · Financial reconciliation · Investment research · Sensitivity analysis</p>
          </article>
          <article>
            <span>Toolkit</span>
            <p>Excel · Tableau · MySQL · Python · R</p>
          </article>
          <article>
            <span>Role focus</span>
            <p>Data analyst · Business analyst · Financial analysis · Investment research</p>
          </article>
        </section>

        <section className="section work-section" id="work" aria-labelledby="work-title">
          <div className="section-heading">
            <p className="eyebrow">01 / Selected work</p>
            <h2 id="work-title">Examine the evidence.</h2>
            <p>
              A simulation, a regional comparison, and a website KPI review—
              with a clear boundary between observation and inference.
            </p>
          </div>

          <article className="project project-ubi" aria-labelledby="ubi-title">
            <div className="project-intro">
              <div className="project-topline">
                <span>Python labor-supply simulation</span>
                <span>Individual · ECON E402 course project · Jan–Jun 2025</span>
              </div>
              <div>
                <p className="project-index">Project 01</p>
                <h3 id="ubi-title">How sensitive is the UBI answer?</h3>
                <p>
                  An individual ECON E402 project simulated 12 UBI and elasticity
                  scenarios in Python. At $12,000 annual UBI, 0.10 elasticity,
                  and $50,000 baseline income, the model shows a 2.4% reduction
                  in work hours—not a causal policy forecast.
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
            <div className="project-outcome">
              <span>Outcome</span>
              <p>
                Used sensitivity analysis to show how modeled work hours vary with the UBI and elasticity assumptions.
              </p>
            </div>
            <div className="project-foot">
              <div className="tag-row" role="group" aria-label="UBI project tools">
                <span title="Simulation logic">Python</span>
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
                <span>Regional energy analysis</span>
                <span>Intel case · IU experiential course</span>
              </div>
              <p className="project-index">Project 02</p>
              <h3 id="intel-title">How does regional energy compare?</h3>
              <p className="project-summary">
                Built Tableau dashboards comparing electricity supply, demand,
                and renewable generation across 13 U.S. regions using a
                program-provided case dataset.
              </p>
              <IntelDecisionExplorer />
              <div className="tag-row">
                <span title="Regional dashboards">Tableau</span>
                <span title="Energy metric comparisons">Regional comparison</span>
              </div>
            </article>

            <article className="project project-audience" aria-labelledby="audience-title">
              <div className="project-topline">
                <span>Website engagement analysis</span>
                <span>Recording Academy case · IU experiential course</span>
              </div>
              <p className="project-index">Project 03</p>
              <h3 id="audience-title">What changed in Grammy.com engagement?</h3>
              <p className="project-summary">
                Used Excel PivotTables and KPI comparisons on a program-provided
                case dataset to examine Grammy.com engagement before and after
                a website split.
              </p>
              <AudienceLens />
              <div className="project-outcome">
                <span>Outcome</span>
                <p>
                  Observed pages per session rise from 1.86 to 2.25 after the split and recommended retaining separate sites.
                </p>
              </div>
              <div className="evidence-note">
                <span>Evidence boundary</span>
                <p>
                  This is a before-and-after comparison, not proof that the website split caused the increase.
                </p>
              </div>
              <div className="tag-row">
                <span title="Engagement analysis">Excel PivotTables</span>
                <span title="Before-and-after website engagement">KPI comparison</span>
              </div>
            </article>
          </div>
        </section>

        <section className="section experience-section" id="experience" aria-labelledby="experience-title">
          <div className="section-heading compact-heading">
            <p className="eyebrow">02 / Experience</p>
            <h2 id="experience-title">Experience across finance and analytics.</h2>
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
              Data, finance, and communication. No 96% skill bars.
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
          <AboutPhotoCard />
          <div className="about-copy">
            <p className="eyebrow">04 / About</p>
            <h2 id="about-title">Curiosity brought me to Economics. Evidence led me to Quant.</h2>
            <p className="about-lead">
              I grew up in <strong>New Delhi</strong> and came to Indiana University curious
              about why people, businesses, and markets make the choices they do.
              Economics gave me the language for <strong>incentives and trade-offs</strong>.
              I added Quantitative Methods because I did not want to stop at intuition;
              I wanted to test the story against the data. My <strong>Psychology minor</strong>{" "}
              added the third piece: understanding the behavior behind the numbers.
            </p>
            <p className="about-target">
              That combination now shapes how I work. I can <strong>research a company,
              examine the financial and operating evidence, build a model or dashboard,
              and explain the conclusion clearly</strong>. I have used that approach across
              investment research, finance operations, and client analytics. I am looking
              for data and business analyst roles where analytical execution and
              financial judgment belong together.
            </p>
            <EducationList />
            <p className="about-personal">
              At IU, I served as Finance Chair for Principles of Cybersecurity,
              managing a semester budget of approximately $2,000 and coordinating
              financial logistics for three employer-led workshops serving 60+ attendees.
            </p>
            <p className="about-personal">
              Outside work, you&apos;ll usually find me playing the piano, out for a run, reading philosophy, or resetting with breathwork. FC Barcelona is my club, and on match day, I&apos;m usually glued to the screen.{" "}
              <span className="visca-blue">Visca</span> el{" "}
              <span className="barca-red">Barça.</span>
            </p>
          </div>
        </section>

        <section className="contact-section" id="contact" aria-labelledby="contact-title">
          <div className="contact-kicker">
            <span className="status-dot" aria-hidden="true" />
            Finance × analytics
          </div>
          <h2 id="contact-title">
            Looking for this mix?
            <em> Let&apos;s talk.</em>
          </h2>
          <p className="contact-intro">
            If your team values financial judgment and analytical execution, I&apos;d like to hear what you&apos;re building.
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
