import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("portfolio content stays evidence-led and recruiter-ready", async () => {
  const [page, interactive, intelModel] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/InteractivePortfolio.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/intelModel.ts", import.meta.url), "utf8"),
  ]);

  assert.match(page, /Understand the business/);
  assert.match(page, /Test the numbers/);
  assert.match(page, /Financial research × data analytics/);
  assert.match(page, /How sensitive is the UBI answer/);
  assert.match(page, /Company research/);
  assert.match(page, /Decision models/);
  assert.match(page, /Corporate finance/);
  assert.match(page, /Transactions/);
  assert.match(page, /five candidate data-center/);
  assert.match(page, /three engagement drop-off points/);
  assert.match(page, /Nobody knows what 96% of Excel means/);
  assert.match(page, /Updated August 2026/);
  assert.match(page, /Open to relocation nationwide/);
  assert.doesNotMatch(page, /Available immediately/);
  assert.doesNotMatch(page, /CFA|Current study|Level I exam/);
  assert.match(page, /Book 30 minutes/);
  assert.match(page, /calendar\.google\.com\/calendar\/u\/0\/appointments\/schedules/);
  assert.match(page, /mailto:Shreshth2002@gmail.com/);
  assert.match(page, /linkedin\.com\/in\/shreyshth-sharma-0170/);
  assert.match(page, /href="\/resume\.pdf"/);

  assert.match(interactive, /const BASE_INCOME = 50_000/);
  assert.match(interactive, /min="0\.05"/);
  assert.match(interactive, /max="0\.2"/);
  assert.match(interactive, /Modeled change in work hours/);
  assert.match(interactive, /Live scenario/);
  assert.match(interactive, /Project conclusion/);
  assert.match(interactive, /Site A won\./);
  assert.match(interactive, /strongest sustainability-first balance/);
  assert.match(intelModel, /Site A/);
  assert.match(intelModel, /Site E/);
  assert.match(interactive, /What would flip it/);
  assert.match(interactive, /duration: "12 months"/);
  assert.match(interactive, /Outcome/);
  assert.doesNotMatch(page, /10s of thousands|9h → 2h|8\+ companies/i);
  assert.doesNotMatch(page, /Interactivity here is part of the analysis|LMAO/i);
  assert.doesNotMatch(page, /Typical conversation window|busy times are automatically withheld/i);
  assert.match(page, /Looking for this mix/);
  assert.match(page, /Experience across finance and analytics/);
  assert.match(page, />Visca</);
  assert.match(page, />Barça\.</);
  assert.match(page, /Applied work/);
  assert.match(page, /Curiosity brought me to Economics/);
  assert.match(page, /Evidence led me to Quant/);
  assert.match(page, /Psychology minor/);
  assert.match(page, /Outside work, you&apos;ll usually find me playing the piano/);
  assert.match(page, /resetting with breathwork/);
  assert.match(page, /I grew up in <strong>New Delhi<\/strong>/);
  assert.match(page, /behavior behind the numbers/);
  assert.match(page, /FC Barcelona is my club/);
  assert.match(page, /on match day, I&apos;m usually glued to the screen/);
  assert.match(page, /Summer School/);
  assert.doesNotMatch(page, /Study Abroad/);
  assert.match(page, />Visca<\/span> el/);
  assert.match(page, /visca-blue/);
  assert.match(page, /barca-red/);
  assert.match(page, /Role focus/);
  assert.doesNotMatch(page, /—/);

  assert.doesNotMatch(page, /LeoAssistant|LEO|AI assistant/);
  await assert.rejects(access(new URL("../app/LeoAssistant.tsx", import.meta.url)));
});

test("final site has production metadata and required public assets", async () => {
  const [page, layout, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.doesNotMatch(page, /codex-preview|SkeletonPreview|_sites-preview/);
  assert.doesNotMatch(layout, /Starter Project|codex-preview|_sites-preview/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  assert.match(layout, /og-v2\.jpg/);
  assert.match(layout, /Understand the Business\. Test the Numbers\./);
  assert.doesNotMatch(layout, /Analysis that holds up|—/);
  assert.match(layout, /robots: \{ index: true, follow: true \}/);

  await Promise.all([
    access(new URL("../public/resume.pdf", import.meta.url)),
    access(new URL("../public/og.png", import.meta.url)),
    access(new URL("../public/og-v2.jpg", import.meta.url)),
    access(new URL("../public/images/shrey-iu.jpg", import.meta.url)),
    access(new URL("../public/images/shrey-graduation.jpg", import.meta.url)),
  ]);

  await assert.rejects(access(new URL("app/_sites-preview", root)));
});
