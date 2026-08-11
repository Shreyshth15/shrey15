const INTENT_RULES = [
  {
    topic: "why-hire",
    patterns: [
      /\bwhy (?:should|would|could) (?:i|we|you|someone|a team|an employer) (?:even )?(?:hire|choose|pick)\b/,
      /\bwhy (?:hire|choose|pick) (?:him|shrey)\b/,
      /\b(?:hire|choose|pick) (?:him|shrey)\b/,
      /\bwhat (?:can|would|does) (?:he|shrey) bring\b/,
      /\bbring to the table\b/,
      /\bconvince me\b/,
      /\bsell (?:me on )?(?:him|shrey)\b/,
      /\bwhy shrey\b/,
      /\bwhat makes (?:him|shrey) (?:different|valuable|worth hiring)\b/,
    ],
  },
  {
    topic: "growth",
    patterns: [
      /\bweakness(?:es)?\b/,
      /\bdevelopment area\b/,
      /\bwhat (?:does he|does shrey) still need to learn\b/,
      /\bwhat (?:is he|is shrey) missing\b/,
      /\bconcerns? about (?:him|shrey)\b/,
      /\bwhy (?:not|shouldn t) (?:hire|choose)\b/,
    ],
  },
  {
    topic: "personal",
    patterns: [
      /\boutside (?:of )?work\b/,
      /\bwhat is (?:he|shrey) like\b/,
      /\bhobbies?\b/,
      /\binterests?\b/,
      /\bfree time\b/,
    ],
  },
  {
    topic: "why-study",
    patterns: [
      /\bwhy (?:did )?(?:he|shrey) (?:study|choose|add)\b/,
      /\bwhy economics\b/,
      /\bwhy quant(?:itative methods)?\b/,
      /\beconomics and quant\b/,
    ],
  },
  {
    topic: "psychology",
    patterns: [
      /\bwhy psychology\b/,
      /\bpsychology minor\b/,
      /\bhow does psychology\b/,
    ],
  },
  {
    topic: "roles",
    patterns: [
      /\bwhat roles?\b/,
      /\brole fit\b/,
      /\bwhere (?:would|does|could) (?:he|shrey) fit\b/,
      /\bwhat jobs?\b/,
      /\btarget(?:ing)? roles?\b/,
      /\bcareer direction\b/,
    ],
  },
  {
    topic: "projects",
    patterns: [
      /\bwhat (?:has|did) (?:he|shrey) build\b/,
      /\bprojects?\b/,
      /\bselected work\b/,
      /\bubi\b/,
      /\bintel\b/,
      /\brecording academy\b/,
    ],
  },
  {
    topic: "experience",
    patterns: [
      /\bwhere (?:has|did) (?:he|shrey) work\b/,
      /\bwork history\b/,
      /\bexperience\b/,
      /\binternships?\b/,
    ],
  },
  {
    topic: "background",
    patterns: [
      /\bwhere is (?:he|shrey) from\b/,
      /\bbackground\b/,
      /\bdelhi\b/,
      /\broots\b/,
    ],
  },
  {
    topic: "overview",
    patterns: [
      /\bwho is shrey\b/,
      /\btell me about shrey\b/,
      /\bintroduce shrey\b/,
    ],
  },
];

export function normalizeQuestion(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\b(?:shoudl|shoud|shuld)\b/g, "should")
    .replace(/\b(?:hir|hure)\b/g, "hire")
    .replace(/\bteh\b/g, "the")
    .replace(/\s+/g, " ")
    .trim();
}

export function resolveEnglishIntent(normalizedQuestion) {
  return INTENT_RULES.find(({ patterns }) =>
    patterns.some((pattern) => pattern.test(normalizedQuestion)),
  )?.topic ?? null;
}

export function composeWhyHireAnswer(normalizedQuestion, detailed = false) {
  if (/\bcredit|structured finance|fixed income|asset management\b/.test(normalizedQuestion)) {
    return detailed
      ? "The evidence is strongest in company and sector research, investor-facing materials, financial-statement and fixed-income coursework, and the discipline to make assumptions visible. He has not claimed direct professional credit underwriting or structured-finance execution, so the honest pitch is a strong analytical foundation with relevant research habits and room to grow under an experienced team."
      : "For a credit, structured-finance, or asset-management analyst role, Shrey brings company research, financial context, quantitative analysis, and clear writing in one profile. He can examine the business, organize the evidence, test the assumptions, and communicate the conclusion without overstating what the data proves.";
  }

  if (/\banalytics|data analyst|business analyst|tableau|sql|python\b/.test(normalizedQuestion)) {
    return detailed
      ? "He has used SQL and Python on recruitment data, Tableau and Excel for Intel and Recording Academy work, and Python for a UBI sensitivity model. The useful part is not the software list. It is that he connects the analysis to a business decision and can present the result to a client or executive audience."
      : "For an analytics role, Shrey brings more than a tools list. He has cleaned and analyzed data, built client-facing dashboards, created comparative decision views, and translated the result into recommendations. He understands both how to do the analysis and why the business should care.";
  }

  if (/\bcorporate finance|transaction|finance analyst|fp a|financial analyst\b/.test(normalizedQuestion)) {
    return detailed
      ? "At DLF, he standardized expense reporting and analyzed vendor and departmental spending. His resume connects that work to a cost review credited with roughly 10% lower monthly operating costs. Marquee Equity adds company research and investor-material experience, while his analytics work adds Excel, SQL, Python, and Tableau execution."
      : "For a corporate-finance or transaction-support role, Shrey combines operating-finance exposure, company research, and analytical execution. He can work through spending or business-driver questions, build a structured comparison, and present the answer clearly to the next decision-maker.";
  }

  return detailed
    ? "The evidence sits across three settings. At Marquee Equity, Shrey researched companies and sectors and translated findings into investor-facing materials. At DLF, he standardized expense reporting and analyzed vendor and departmental spending. In Global Tech projects, he turned multi-source data into comparative views for Intel and audience insights for the Recording Academy. That is why the pitch is credible: he has repeatedly connected research, analysis, and communication to a real decision."
    : "Because Shrey already works through the full analyst loop: understand the business question, research the context, analyze the evidence, and explain the call. He has applied that pattern in investment research, finance operations, and client analytics. A team gets someone who can move between financial context and Excel, SQL, Python, or Tableau, then turn the result into something a decision-maker can actually use. He is early-career, but the work already shows range, discipline, and judgment.";
}

export function composeRoleFitAnswer(normalizedQuestion, detailed = false) {
  if (/\bcredit|structured finance|fixed income\b/.test(normalizedQuestion)) {
    return detailed
      ? "His transferable evidence includes company and sector research, investor materials, financial-statement analysis, money and banking, and fixed-income fundamentals through coursework. He should present himself as ready to learn the underwriting process, not as someone who has already done professional credit underwriting."
      : "Credit research and structured-finance analyst roles are credible targets when the team values research, financial analysis, and quantitative discipline. Shrey has the foundation, but he should be positioned as an early-career analyst building direct underwriting depth, not as an experienced credit professional.";
  }

  if (/\basset management|portfolio|performance analytics\b/.test(normalizedQuestion)) {
    return "Portfolio and performance analytics are a strong fit because they combine markets, financial context, data work, and clear reporting. Shrey's research background and Excel, SQL, Python, and Tableau toolkit line up well with teams that need analysis to be both technically sound and easy to act on.";
  }

  if (/\bcorporate finance|transaction|finance analyst\b/.test(normalizedQuestion)) {
    return "Corporate-finance and transaction-support roles fit his experience with expense reporting, operating-spend analysis, company research, and presentation support. The best version of the role gives him a financial question to investigate, not only a reporting process to maintain.";
  }

  if (/\banalytics|data analyst|business analyst\b/.test(normalizedQuestion)) {
    return "Business and data analytics roles fit when the work involves decision support, client reporting, or finance-adjacent questions. He is strongest when Excel, SQL, Python, or Tableau are the means to answer the question, not the entire job description.";
  }

  return detailed
    ? "The overlap is the differentiator. Pure research and pure analytics can both fit, but Shrey is most valuable when a team needs someone to understand a financial or business question, work through the evidence, and communicate a defensible conclusion."
    : "Shrey is best suited to entry-level roles in investment and credit research, structured finance, corporate finance, transaction support, portfolio or performance analytics, and finance-focused consulting. The common thread is a team that needs both financial judgment and analytical execution.";
}
