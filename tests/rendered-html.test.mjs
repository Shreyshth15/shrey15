import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

test("portfolio claims match Resume15 and older claims are gone", async () => {
  const [page, interactive, layout] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/InteractivePortfolio.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
  ]);
  const content = `${page}\n${interactive}\n${layout}`;

  assert.match(page, /Data analyst · Business analyst · Financial analysis · Investment research/);
  assert.match(page, /Hi, I&apos;m <strong>Shreyshth Sharma<\/strong>/);
  assert.match(page, /Financial research × data analytics/);
  assert.match(page, /AI-assisted analysis to test assumptions/);
  assert.match(page, /Individual · ECON E402 course project/);
  assert.match(page, /\$12,000 annual UBI, 0\.10 elasticity/);
  assert.match(page, /\$50,000 baseline income/);
  assert.match(page, /2\.4% reduction/);
  assert.match(page, /13 U\.S\. regions/);
  assert.match(page, /Grammy\.com engagement/);
  assert.match(page, /Excel PivotTables/);
  assert.match(page, /1\.86 to 2\.25/);
  assert.match(page, /Finance Chair for Principles of Cybersecurity/);
  assert.equal((page.match(/href="\/resume\.pdf"/g) ?? []).length, 2);

  assert.match(interactive, /NTALENTS\.AI \(Acquired by Unacademy\)/);
  assert.match(interactive, /May–Jun 2024/);
  assert.match(interactive, /up to 30,000 recruitment records across 3\+ client accounts/);
  assert.match(interactive, /MySQL joins and Python pandas/);
  assert.match(interactive, /15% higher reported client satisfaction scores/);
  assert.match(interactive, /Finance & Accounting Intern/);
  assert.match(interactive, /50–100 customer cheque payments daily in Ramco/);
  assert.match(interactive, /approximately 200–300 customers/);
  assert.match(interactive, /25%, from 8 to 6 hours/);
  assert.match(interactive, /role: "Investment Banking Fellow"/);
  assert.doesNotMatch(interactive, /Investment Banking Fellow \(Part-Time\)/);
  assert.match(interactive, /Jul 2022–May 2023/);
  assert.match(interactive, /duration: "11 months"/);
  assert.match(interactive, /six-credit experiential course/);
  assert.match(interactive, /program-provided case datasets/);
  assert.match(interactive, /Northwest had the highest renewable-generation share/);
  assert.match(interactive, /before-and-after difference does not establish causation/);
  assert.ok(interactive.indexOf("NTALENTS.AI (Acquired by Unacademy)") < interactive.indexOf('company: "DLF Limited"'));

  assert.doesNotMatch(content, /Site A|five candidate|weighted ranking|three engagement drop-off|vendor|operating.spend|10% lower|cost.saving|Jun–Jul 2023|Jul 2022–Jun 2023|investor.materials/i);
  assert.match(page, /UBI-Labor-Supply-Simulation/);
  assert.match(page, /linkedin\.com\/in\/shreyshth-sharma-0170/);
  assert.match(page, /Book 30 minutes/);
  assert.match(interactive, /aria-label="Mobile navigation"/);
  assert.match(interactive, /Enlarge the graduation photo/);
});

test("production assets include the exact Resume15 PDF", async () => {
  const resume = await readFile(new URL("../public/resume.pdf", import.meta.url));
  const sha256 = createHash("sha256").update(resume).digest("hex");
  assert.equal(sha256, "fe559003ae32b550ef87cf2e6d1cae6679d9d6266485f9a6ce9965f18094c9ba");

  await Promise.all([
    access(new URL("../public/og-v3.png", import.meta.url)),
    access(new URL("../public/images/shrey-iu.jpg", import.meta.url)),
    access(new URL("../public/images/shrey-graduation.jpg", import.meta.url)),
  ]);
});
