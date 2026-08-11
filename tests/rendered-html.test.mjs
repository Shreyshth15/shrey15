import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("portfolio content stays evidence-led and recruiter-ready", async () => {
  const [page, interactive, leo] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/InteractivePortfolio.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/LeoAssistant.tsx", import.meta.url), "utf8"),
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
  assert.match(page, /Looking for this mix/);
  assert.match(page, /Different desks\. Same standard/);
  assert.match(page, /Visca Barça/);
  assert.match(page, /Applied work/);
  assert.match(page, /Curiosity brought me to economics/);
  assert.match(page, /Psychology minor/);
  assert.match(page, /at the piano, out for a long run/);
  assert.match(page, /I grew up in/);
  assert.match(page, /behavior behind the numbers/);
  assert.match(page, /FC Barcelona has my/);
  assert.match(page, /needlessly stressful final ten minutes/);
  assert.match(page, /Role focus/);
  assert.doesNotMatch(page, /—/);

  assert.match(leo, /AI assistant/);
  assert.match(leo, /Hey, I’m LEO/);
  assert.match(leo, /the story behind both\. Ask me anything\./);
  assert.doesNotMatch(leo, /Barça opinions may be slightly biased/);
  assert.match(leo, /LEO_RESPONSE_DELAY_MS = 2_000/);
  assert.match(leo, /LEO is thinking/);
  assert.doesNotMatch(leo, /English, हिंदी, and ਪੰਜਾਬੀ all work/);
  assert.match(leo, /roots in Delhi/);
  assert.match(leo, /age is not published/);
  assert.match(leo, /Psychology minor/);
  assert.match(leo, /Marquee Equity/);
  assert.match(leo, /UBI labor-supply sensitivity model/);
  assert.match(leo, /Book 30 min/);
  assert.match(leo, /verified scouting report/i);
  assert.match(leo, /Verified answers/);
  assert.match(leo, /detectLanguage/);
  assert.match(leo, /previousTopic/);
  assert.match(leo, /financial-analysis/);
  assert.match(leo, /communication/);
  assert.match(leo, /resolveEnglishIntent/);
  assert.match(leo, /composeWhyHireAnswer/);
  assert.match(leo, /Development areas/);
  assert.doesNotMatch(leo, /PEDRI|PedriAssistant/);
  assert.doesNotMatch(leo, /—/);
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
