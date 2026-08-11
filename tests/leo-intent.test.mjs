import assert from "node:assert/strict";
import test from "node:test";

import {
  composeRoleFitAnswer,
  composeWhyHireAnswer,
  normalizeQuestion,
  resolveEnglishIntent,
} from "../app/leoIntent.js";

test("hire questions route to Shrey's value proposition", () => {
  const transcriptQuestion = normalizeQuestion("can you tell me why should i even hire him");
  const repeatedQuestion = normalizeQuestion("i asked why shoud i hire him");

  assert.equal(resolveEnglishIntent(transcriptQuestion), "why-hire");
  assert.equal(resolveEnglishIntent(repeatedQuestion), "why-hire");

  const firstAnswer = composeWhyHireAnswer(transcriptQuestion);
  const evidenceAnswer = composeWhyHireAnswer(repeatedQuestion, true);

  assert.match(firstAnswer, /full analyst loop/);
  assert.match(firstAnswer, /investment research, finance operations, and client analytics/);
  assert.doesNotMatch(firstAnswer, /targeting entry-level roles/);
  assert.match(evidenceAnswer, /Marquee Equity/);
  assert.match(evidenceAnswer, /DLF/);
  assert.match(evidenceAnswer, /Intel/);
});

test("role-fit questions stay distinct and adapt to the named role", () => {
  assert.equal(resolveEnglishIntent(normalizeQuestion("What roles fit him best?")), "roles");
  assert.equal(resolveEnglishIntent(normalizeQuestion("What is he like outside work?")), "personal");

  const creditAnswer = composeRoleFitAnswer(
    normalizeQuestion("Would he fit a credit research role?"),
  );
  const analyticsAnswer = composeWhyHireAnswer(
    normalizeQuestion("Why should we hire him for a data analyst role?"),
  );

  assert.match(creditAnswer, /Credit research and structured-finance analyst roles/);
  assert.match(creditAnswer, /early-career analyst/);
  assert.match(analyticsAnswer, /more than a tools list/);
  assert.match(analyticsAnswer, /business should care/);
});
