import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("portfolio content stays evidence-led and recruiter-ready", async () => {
  const [page, interactive] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/InteractivePortfolio.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(page, /Analysis that holds up/);
  assert.match(page, /Financial research × data analytics/);
  assert.match(page, /How sensitive is the UBI answer/);
  assert.match(page, /Company and sector research/);
  assert.match(page, /Intel decision framework/);
  assert.match(page, /Corporate finance and transaction support/);
  assert.match(page, /five candidate data-center/);
  assert.match(page, /three engagement drop-off points/);
  assert.match(page, /Nobody knows what 96% of Excel means/);
  assert.match(page, /intention of sitting for the Level I exam/);
  assert.match(page, /Book 30 minutes/);
  assert.match(page, /calendar\.google\.com\/calendar\/u\/0\/appointments\/schedules/);
  assert.match(page, /mailto:Shreshth2002@gmail.com/);
  assert.match(page, /linkedin\.com\/in\/shreyshth-sharma-0170/);
  assert.match(page, /href="\/resume\.pdf"/);

  assert.match(interactive, /const BASE_INCOME = 50_000/);
  assert.match(interactive, /min="0\.05"/);
  assert.match(interactive, /max="0\.2"/);
  assert.match(interactive, /Modeled change in work hours/);
  assert.match(interactive, /Evidence boundary|Current decision lens/);
  assert.doesNotMatch(page, /10s of thousands|9h → 2h|8\+ companies/i);
  assert.doesNotMatch(page, /Interactivity here is part of the analysis|LMAO/i);
  assert.doesNotMatch(page, /Typical conversation window|busy times are automatically withheld/i);
  assert.match(page, /The work is here/);
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
  assert.match(layout, /og\.png/);
  assert.match(layout, /robots: \{ index: true, follow: true \}/);

  await Promise.all([
    access(new URL("../public/resume.pdf", import.meta.url)),
    access(new URL("../public/og.png", import.meta.url)),
    access(new URL("../public/images/shrey-iu.jpg", import.meta.url)),
    access(new URL("../public/images/shrey-graduation.jpg", import.meta.url)),
  ]);

  await assert.rejects(access(new URL("app/_sites-preview", root)));
});
