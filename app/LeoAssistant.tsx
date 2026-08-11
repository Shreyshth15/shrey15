"use client";

import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";

type Message = {
  id: number;
  role: "leo" | "visitor";
  text: string;
};

type KnowledgeItem = {
  id: string;
  title: string;
  keywords: string[];
  answer: string;
  detail?: string;
};

type BotLanguage = "en" | "hi" | "pa";

type AnswerResult = {
  text: string;
  topic: string | null;
  language: BotLanguage;
};

const bookingUrl =
  "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ2KI9iKlYUYG7eE8OJuNifjKdTYUQn3_oGtvD-kDc9J_CmYZVAA_8Dps8k6zEhm_HSa7YtAXnOm?gv=true";

const LEO_RESPONSE_DELAY_MS = 2_000;

const knowledge: KnowledgeItem[] = [
  {
    id: "overview",
    title: "Who is Shrey?",
    keywords: ["who is shrey", "tell me about shrey", "overview", "summary", "introduce shrey"],
    answer:
      "Shreyshth Sharma, Shrey for short, is an Indiana University graduate in Economics and Quantitative Methods with a Psychology minor. He works where financial research and analytics meet: understanding the business, testing the numbers, and making the conclusion useful to a decision-maker.",
    detail:
      "The through-line is simple: Shrey likes questions that need both judgment and evidence. His experience moves from company research and investor materials to operating-spend analysis, client dashboards, and interactive decision models.",
  },
  {
    id: "background",
    title: "Background",
    keywords: ["background", "delhi", "india", "roots", "journey", "grew up", "location", "based"],
    answer:
      "Shrey has roots in Delhi and has worked in New Delhi, Gurugram, and Bangalore before studying at Indiana University. He is now based in the Washington-Baltimore area and is open to opportunities nationwide. A fairly international midfield, if you ask me.",
    detail:
      "That path exposed him to fundraising research, real-estate finance operations, recruitment analytics, and U.S. industry projects. It is one reason the portfolio does not force finance and analytics into separate boxes.",
  },
  {
    id: "why-study",
    title: "Why economics and quant?",
    keywords: ["why economics", "why quant", "economics and quant", "quantitative methods", "why his majors", "why those majors"],
    answer:
      "Economics gave Shrey a way to think about incentives, markets, and decisions. He added Quantitative Methods because he wanted to test the intuition instead of stopping at a good story. Psychology contributes the human layer. Together, the three explain how he approaches a business question.",
    detail:
      "In practice, that means he frames the decision, checks what the evidence can support, stress-tests the assumptions, and makes the result useful for the next person.",
  },
  {
    id: "age",
    title: "Age and private details",
    keywords: ["age", "old", "birthday", "born", "date of birth"],
    answer:
      "Shrey's age is not published in the verified portfolio or resume materials, so I will not guess. I know the work. I respect the offside line on private details.",
  },
  {
    id: "education",
    title: "Education",
    keywords: ["education", "college", "university", "indiana", "iu", "degree", "major", "lse", "coursework", "study"],
    answer:
      "Shrey earned a STEM-designated B.S. in Economics and Quantitative Methods from Indiana University, with a minor in Psychology. He also studied Intermediate Macroeconomics and Introduction to Econometrics at the London School of Economics in summer 2024.",
    detail:
      "Relevant coursework includes money and banking, machine learning for economic data, computational macroeconomics, game theory, statistics, and international trade. He also earned Executive Dean's List recognition.",
  },
  {
    id: "psychology",
    title: "Why Psychology?",
    keywords: ["psychology", "psych", "behavior", "people", "minor", "human decisions"],
    answer:
      "The Psychology minor adds the human layer to Shrey's economics and quantitative training. Economics frames incentives, quant tests the pattern, and psychology keeps attention on the people making the decision. Numbers matter, but humans still click the button.",
    detail:
      "It is especially relevant to how he thinks about incentives, audience behavior, communication, and stakeholder decisions. He does not treat a dashboard as the person making the call.",
  },
  {
    id: "experience",
    title: "Experience",
    keywords: ["experience", "worked", "work history", "companies", "internship", "intern", "marquee", "dlf", "ntalents", "global tech"],
    answer:
      "Shrey's experience spans investment research at Marquee Equity, finance and operations at DLF, data analysis at nTalents.ai, and client-facing analytics through The Global Tech Experience. Across those roles, he researched companies, examined operating spend, analyzed client data, and built dashboards and decision-ready reporting.",
    detail:
      "Marquee built the research foundation. DLF added operating-finance exposure. nTalents.ai developed SQL, Python, and client reporting. Global Tech combined dashboards, executive communication, and decision frameworks for Intel and the Recording Academy.",
  },
  {
    id: "finance",
    title: "Finance work",
    keywords: ["finance", "investment", "credit", "company research", "sector research", "financial analysis", "investor", "valuation", "fixed income"],
    answer:
      "On the finance side, Shrey has researched early and growth-stage companies across several sectors, studied funding and competitive positioning, supported investor-facing materials, and analyzed operating spend. His coursework also covers financial statements, money and banking, valuation, and fixed-income fundamentals.",
    detail:
      "The strongest finance evidence comes from Marquee Equity's company and sector research, investor-facing narratives, and deal-prioritization support, plus DLF's vendor and departmental spending analysis.",
  },
  {
    id: "financial-analysis",
    title: "Financial analysis",
    keywords: ["financial statements", "spend analysis", "cost analysis", "operating spend", "variance", "dlf finance", "financial modeling"],
    answer:
      "Shrey reads financial statements, compares business drivers, and examines spending, cost, and variance patterns. At DLF, he standardized expense reporting and analyzed vendor and departmental spending to support a cost review.",
    detail:
      "The value is not a prettier spreadsheet. It is a clearer view of what changed, why it may have changed, and where a finance team should look next.",
  },
  {
    id: "analytics",
    title: "Analytics work",
    keywords: ["analytics", "data", "dashboard", "tableau", "python", "sql", "excel", "r programming", "model", "tools", "technology", "skills"],
    answer:
      "Shrey works with Excel, PowerPoint, Tableau, SQL, Python, and R. He uses them to clean and compare evidence, build dashboards and decision models, run sensitivity analysis, and communicate the answer. The software is the toolkit, not the personality.",
    detail:
      "Examples include Python sensitivity modeling for UBI, Tableau and Excel decision views for Intel, SQL and Python client analysis at nTalents.ai, and executive reporting for audience analytics.",
  },
  {
    id: "communication",
    title: "Communicating the call",
    keywords: ["communication", "presentation", "powerpoint", "reporting", "storytelling", "explain", "stakeholder", "executive", "investor materials"],
    answer:
      "Shrey builds dashboards, presentations, and investor materials around the decision rather than the software. He has translated company research into investor-facing narratives and packaged analytics into executive-ready client reporting.",
    detail:
      "His standard is that the next person should understand the question, evidence, trade-off, and boundary. If a result needs a ten-minute software tutorial before it is useful, the job is not finished.",
  },
  {
    id: "projects",
    title: "Selected projects",
    keywords: ["projects", "portfolio", "selected work", "built", "build", "ubi", "intel", "recording academy", "simulation", "site selection", "audience"],
    answer:
      "The portfolio features three interactive projects: a UBI labor-supply sensitivity model, an Intel data-center site-selection framework, and Recording Academy audience analytics organized around reach, engage, and retain. Each one shows the assumptions and evidence boundary, not just the polished output.",
    detail:
      "The UBI project shows sensitivity to elasticity assumptions. Intel shows how changing criteria weights changes the decision lens. Recording Academy shows where to inspect audience drop-off across reach, engagement, and retention.",
  },
  {
    id: "roles",
    title: "Role fit",
    keywords: ["role", "roles", "job", "fit", "hire", "opportunity", "career", "target", "looking for", "credit research", "corporate finance", "portfolio analytics"],
    answer:
      "Shrey is targeting entry-level roles in investment and credit research, corporate finance, transaction support, portfolio analytics, and finance-focused consulting. The best fit is a team that wants someone to research the question, work through the data, and explain the call clearly.",
    detail:
      "He is especially well positioned for roles that sit between a finance question and an analytical answer. Pure research and pure analytics can both fit, but the overlap is where his profile becomes most distinctive.",
  },
  {
    id: "why-hire",
    title: "Why Shrey?",
    keywords: ["why shrey", "why hire", "strength", "different", "value", "bring to the table", "candidate"],
    answer:
      "Shrey's edge is the combination: finance context, quantitative execution, and clear communication. He can move from an ambiguous business question to a structured comparison without pretending every model is certainty. Useful judgment, visible assumptions, no 96% Excel skill bar.",
    detail:
      "A recruiter can see that combination across investment research, finance operations, client analytics, and independent modeling. Different desks, same habit of making the evidence useful.",
  },
  {
    id: "personal",
    title: "Outside work",
    keywords: ["hobby", "hobbies", "outside work", "personal", "piano", "running", "run", "meditation", "breathwork", "philosophy", "barca", "barcelona", "football", "leo"],
    answer:
      "Outside work, Shrey plays piano, runs, practices meditation and breathwork, and reads philosophy and different schools of thought. He is also a committed Barça supporter. I am named LEO, so neutrality was never really on the table. Visca Barça.",
    detail:
      "The common thread is curiosity and rhythm: learning a piece at the piano, settling into a long run, slowing down through breathwork, or finding an idea that challenges his own. Barça is less calming, but loyalty has its costs.",
  },
  {
    id: "languages",
    title: "Languages",
    keywords: ["language", "languages", "hindi", "punjabi", "spanish", "english", "speak"],
    answer:
      "Shrey speaks fluent English and is a native Hindi and Punjabi speaker. He also has basic Spanish. Enough to discuss the work in several languages and complain about a referee in at least one more.",
  },
  {
    id: "cfa",
    title: "CFA study",
    keywords: ["cfa", "level 1", "level i", "candidate", "exam", "current study"],
    answer:
      "Shrey is preparing with CFA Program Level I curriculum materials and intends to sit for the Level I exam. He does not present himself as an active CFA candidate unless that status is current and confirmed.",
  },
  {
    id: "contact",
    title: "Contact Shrey",
    keywords: ["contact", "email", "book", "meeting", "calendar", "linkedin", "resume", "talk", "reach"],
    answer:
      "The quickest options are below: email Shrey, book a 30-minute conversation, open LinkedIn, or view the resume. If the role needs both the financial question and the analytical answer, that sounds like a useful conversation.",
  },
  {
    id: "leo-help",
    title: "What LEO knows",
    keywords: ["what can you do", "what do you know", "help me", "ask leo", "topics", "capabilities"],
    answer:
      "I can discuss Shrey's background, education, Psychology minor, experience, finance work, analytics, communication, projects, tools, role fit, languages, CFA study, hobbies, and contact options. Follow-up questions work too. I am a conversation, not a dropdown wearing a football shirt.",
  },
];

const localizedAnswers: Record<"hi" | "pa", Record<string, string>> = {
  hi: {
    "leo-help": "नमस्ते, मैं LEO हूँ। आप Shrey की पढ़ाई, अनुभव, finance, analytics, projects, skills, hobbies या role fit के बारे में पूछ सकते हैं। आप follow-up भी पूछ सकते हैं।",
    overview: "Shreyshth Sharma Indiana University से Economics और Quantitative Methods graduate हैं, साथ में Psychology minor भी है। वह financial research और analytics को जोड़कर business को समझते हैं, numbers को test करते हैं और decision को साफ बनाते हैं।",
    background: "Shrey की जड़ें Delhi में हैं। उन्होंने New Delhi, Gurugram और Bangalore में काम किया, Indiana University में पढ़ाई की और अब Washington-Baltimore क्षेत्र में रहते हैं। वह nationwide opportunities के लिए खुले हैं।",
    "why-study": "Economics ने Shrey को incentives, markets और decisions समझने का framework दिया। Quantitative Methods इसलिए जोड़ा ताकि intuition को data से test कर सकें। Psychology ने human behavior का नजरिया जोड़ा।",
    age: "Shrey की उम्र verified portfolio या resume में public नहीं है, इसलिए मैं अनुमान नहीं लगाऊँगा। काम की जानकारी पूरी है, private details की सीमा भी साफ है।",
    education: "Shrey ने Indiana University से STEM-designated B.S. in Economics and Quantitative Methods किया है और Psychology में minor है। उन्होंने London School of Economics में Macroeconomics और Econometrics भी पढ़ी।",
    psychology: "Psychology minor Shrey की economics और quant training में human layer जोड़ता है। Economics incentives समझाती है, quant pattern को test करता है और psychology याद दिलाती है कि decision आखिर इंसान लेते हैं।",
    experience: "Shrey ने Marquee Equity में investment research, DLF में finance and operations, nTalents.ai में data analysis और Global Tech Experience में client analytics पर काम किया है।",
    finance: "Finance side पर Shrey ने company और sector research, funding trends, competitive positioning, investor materials और operating-spend analysis पर काम किया है।",
    "financial-analysis": "Shrey financial statements, business drivers, spending, cost और variance patterns देखते हैं। DLF में उन्होंने expense reporting को standardize किया और vendor तथा departmental spending analyze की।",
    analytics: "Shrey Excel, PowerPoint, Tableau, SQL, Python और R इस्तेमाल करते हैं। वह data clean करते हैं, dashboards और decision models बनाते हैं, sensitivity analysis चलाते हैं और result साफ तरीके से समझाते हैं।",
    communication: "Shrey dashboards, presentations और investor materials को software के हिसाब से नहीं, decision के हिसाब से बनाते हैं। उनका लक्ष्य है कि stakeholder question, evidence, trade-off और सीमा तुरंत समझ सके।",
    projects: "Portfolio में तीन interactive projects हैं: UBI labor-supply sensitivity model, Intel data-center site-selection framework और Recording Academy audience analytics। हर project assumptions और evidence boundary साफ दिखाता है।",
    roles: "Shrey investment और credit research, corporate finance, transaction support, portfolio analytics और finance-focused consulting की entry-level roles target कर रहे हैं।",
    "why-hire": "Shrey की खासियत finance context, quantitative execution और clear communication का combination है। वह ambiguous question को structured comparison में बदलते हैं और model की limitations नहीं छिपाते।",
    personal: "काम के बाहर Shrey piano बजाते हैं, running करते हैं, meditation और breathwork practice करते हैं और philosophy पढ़ते हैं। वह Barça fan भी हैं। मेरा नाम LEO है, इसलिए neutrality की उम्मीद मत रखिए। Visca Barça.",
    languages: "Shrey fluent English बोलते हैं और Hindi तथा Punjabi के native speaker हैं। उन्हें basic Spanish भी आती है। मैं भी Hindi और Punjabi में portfolio questions का जवाब दे सकता हूँ।",
    cfa: "Shrey CFA Program Level I curriculum materials से तैयारी कर रहे हैं और Level I exam देने का इरादा रखते हैं। वह current confirmation के बिना खुद को active CFA candidate नहीं बताते।",
    contact: "आप नीचे दिए buttons से Shrey को email कर सकते हैं, 30-minute conversation book कर सकते हैं या resume खोल सकते हैं।",
  },
  pa: {
    "leo-help": "ਸਤ ਸ੍ਰੀ ਅਕਾਲ, ਮੈਂ LEO ਹਾਂ। ਤੁਸੀਂ Shrey ਦੀ ਪੜ੍ਹਾਈ, ਤਜਰਬੇ, finance, analytics, projects, skills, hobbies ਜਾਂ role fit ਬਾਰੇ ਪੁੱਛ ਸਕਦੇ ਹੋ। Follow-up ਸਵਾਲ ਵੀ ਕਰ ਸਕਦੇ ਹੋ।",
    overview: "Shreyshth Sharma Indiana University ਤੋਂ Economics ਅਤੇ Quantitative Methods graduate ਹਨ ਅਤੇ Psychology minor ਵੀ ਕੀਤਾ ਹੈ। ਉਹ financial research ਅਤੇ analytics ਨੂੰ ਜੋੜ ਕੇ business ਸਮਝਦੇ, numbers test ਕਰਦੇ ਅਤੇ decision ਸਾਫ ਬਣਾਉਂਦੇ ਹਨ।",
    background: "Shrey ਦੀਆਂ ਜੜ੍ਹਾਂ Delhi ਵਿੱਚ ਹਨ। ਉਹ New Delhi, Gurugram ਅਤੇ Bangalore ਵਿੱਚ ਕੰਮ ਕਰ ਚੁੱਕੇ ਹਨ, Indiana University ਵਿੱਚ ਪੜ੍ਹੇ ਹਨ ਅਤੇ ਹੁਣ Washington-Baltimore ਇਲਾਕੇ ਵਿੱਚ ਰਹਿੰਦੇ ਹਨ।",
    "why-study": "Economics ਨੇ Shrey ਨੂੰ incentives, markets ਅਤੇ decisions ਸਮਝਣ ਦਾ framework ਦਿੱਤਾ। Quantitative Methods ਨਾਲ ਉਹ intuition ਨੂੰ data ਨਾਲ test ਕਰਦੇ ਹਨ, ਅਤੇ Psychology human behavior ਵਾਲੀ layer ਜੋੜਦੀ ਹੈ।",
    age: "Shrey ਦੀ ਉਮਰ verified portfolio ਜਾਂ resume ਵਿੱਚ public ਨਹੀਂ ਹੈ, ਇਸ ਲਈ ਮੈਂ ਅੰਦਾਜ਼ਾ ਨਹੀਂ ਲਗਾਵਾਂਗਾ। ਕੰਮ ਬਾਰੇ ਪੂਰੀ ਜਾਣਕਾਰੀ ਹੈ, private details ਦੀ ਹੱਦ ਵੀ ਸਾਫ ਹੈ।",
    education: "Shrey ਨੇ Indiana University ਤੋਂ STEM-designated B.S. in Economics and Quantitative Methods ਕੀਤਾ ਹੈ ਅਤੇ Psychology ਵਿੱਚ minor ਹੈ। ਉਹ London School of Economics ਵਿੱਚ Macroeconomics ਅਤੇ Econometrics ਵੀ ਪੜ੍ਹੇ ਹਨ।",
    psychology: "Psychology minor Shrey ਦੀ economics ਅਤੇ quant training ਵਿੱਚ human layer ਜੋੜਦਾ ਹੈ। Economics incentives ਸਮਝਾਉਂਦੀ ਹੈ, quant pattern test ਕਰਦਾ ਹੈ ਅਤੇ psychology ਯਾਦ ਦਿਵਾਉਂਦੀ ਹੈ ਕਿ decision ਲੋਕ ਲੈਂਦੇ ਹਨ।",
    experience: "Shrey ਨੇ Marquee Equity ਵਿੱਚ investment research, DLF ਵਿੱਚ finance and operations, nTalents.ai ਵਿੱਚ data analysis ਅਤੇ Global Tech Experience ਵਿੱਚ client analytics ਉੱਤੇ ਕੰਮ ਕੀਤਾ ਹੈ।",
    finance: "Finance ਵਾਲੇ ਪਾਸੇ Shrey ਨੇ company ਅਤੇ sector research, funding trends, competitive positioning, investor materials ਅਤੇ operating-spend analysis ਉੱਤੇ ਕੰਮ ਕੀਤਾ ਹੈ।",
    "financial-analysis": "Shrey financial statements, business drivers, spending, cost ਅਤੇ variance patterns ਵੇਖਦੇ ਹਨ। DLF ਵਿੱਚ ਉਨ੍ਹਾਂ ਨੇ expense reporting standardize ਕੀਤੀ ਅਤੇ vendor ਤੇ departmental spending analyze ਕੀਤੀ।",
    analytics: "Shrey Excel, PowerPoint, Tableau, SQL, Python ਅਤੇ R ਵਰਤਦੇ ਹਨ। ਉਹ data clean ਕਰਦੇ, dashboards ਅਤੇ decision models ਬਣਾਉਂਦੇ, sensitivity analysis ਚਲਾਉਂਦੇ ਅਤੇ result ਸਾਫ ਤਰੀਕੇ ਨਾਲ ਸਮਝਾਉਂਦੇ ਹਨ।",
    communication: "Shrey dashboards, presentations ਅਤੇ investor materials ਨੂੰ software ਨਹੀਂ, decision ਦੇ ਆਲੇ-ਦੁਆਲੇ ਬਣਾਉਂਦੇ ਹਨ ਤਾਂ ਜੋ stakeholder question, evidence, trade-off ਅਤੇ boundary ਤੁਰੰਤ ਸਮਝ ਸਕੇ।",
    projects: "Portfolio ਵਿੱਚ ਤਿੰਨ interactive projects ਹਨ: UBI labor-supply sensitivity model, Intel data-center site-selection framework ਅਤੇ Recording Academy audience analytics। ਹਰ project assumptions ਅਤੇ evidence boundary ਸਾਫ ਦਿਖਾਉਂਦਾ ਹੈ।",
    roles: "Shrey investment ਅਤੇ credit research, corporate finance, transaction support, portfolio analytics ਅਤੇ finance-focused consulting ਦੀਆਂ entry-level roles target ਕਰ ਰਹੇ ਹਨ।",
    "why-hire": "Shrey ਦੀ ਖਾਸੀਅਤ finance context, quantitative execution ਅਤੇ clear communication ਦਾ combination ਹੈ। ਉਹ ambiguous question ਨੂੰ structured comparison ਵਿੱਚ ਬਦਲਦੇ ਹਨ ਅਤੇ model ਦੀਆਂ limitations ਨਹੀਂ ਲੁਕਾਉਂਦੇ।",
    personal: "ਕੰਮ ਤੋਂ ਬਾਹਰ Shrey piano ਵਜਾਉਂਦੇ, running ਕਰਦੇ, meditation ਅਤੇ breathwork practice ਕਰਦੇ ਅਤੇ philosophy ਪੜ੍ਹਦੇ ਹਨ। ਉਹ Barça fan ਵੀ ਹਨ। ਮੇਰਾ ਨਾਮ LEO ਹੈ, ਇਸ ਲਈ neutrality ਦੀ ਉਮੀਦ ਨਾ ਰੱਖੋ। Visca Barça.",
    languages: "Shrey fluent English ਬੋਲਦੇ ਹਨ ਅਤੇ Hindi ਤੇ Punjabi ਦੇ native speaker ਹਨ। ਉਨ੍ਹਾਂ ਨੂੰ basic Spanish ਵੀ ਆਉਂਦੀ ਹੈ। ਮੈਂ ਵੀ Hindi ਅਤੇ Punjabi ਵਿੱਚ portfolio questions ਦੇ ਜਵਾਬ ਦੇ ਸਕਦਾ ਹਾਂ।",
    cfa: "Shrey CFA Program Level I curriculum materials ਨਾਲ ਤਿਆਰੀ ਕਰ ਰਹੇ ਹਨ ਅਤੇ Level I exam ਦੇਣ ਦਾ ਇਰਾਦਾ ਰੱਖਦੇ ਹਨ। Current confirmation ਤੋਂ ਬਿਨਾਂ ਉਹ ਆਪਣੇ ਆਪ ਨੂੰ active CFA candidate ਨਹੀਂ ਕਹਿੰਦੇ।",
    contact: "ਹੇਠਾਂ ਦਿੱਤੇ buttons ਨਾਲ ਤੁਸੀਂ Shrey ਨੂੰ email ਕਰ ਸਕਦੇ ਹੋ, 30-minute conversation book ਕਰ ਸਕਦੇ ਹੋ ਜਾਂ resume ਖੋਲ੍ਹ ਸਕਦੇ ਹੋ।",
  },
};

const localizedIntents: Record<"hi" | "pa", Array<{ topic: string; pattern: RegExp }>> = {
  hi: [
    { topic: "age", pattern: /उम्र|जन्म/ },
    { topic: "psychology", pattern: /मनोविज्ञान|साइकोलॉजी/ },
    { topic: "personal", pattern: /शौक|पियानो|दौड़|ध्यान|बार्सा|फुटबॉल/ },
    { topic: "contact", pattern: /संपर्क|ईमेल|मिलना|बात करनी|कैलेंडर/ },
    { topic: "roles", pattern: /नौकरी|भूमिका|रोल|करियर/ },
    { topic: "projects", pattern: /प्रोजेक्ट|बनाया|मॉडल/ },
    { topic: "finance", pattern: /वित्त|निवेश|क्रेडिट|फाइनेंस/ },
    { topic: "analytics", pattern: /डेटा|एनालिटिक्स|स्किल|टूल|पाइथन|एक्सेल/ },
    { topic: "experience", pattern: /अनुभव|काम किया|कंपनी/ },
    { topic: "education", pattern: /पढ़ाई|शिक्षा|कॉलेज|डिग्री/ },
    { topic: "background", pattern: /दिल्ली|पृष्ठभूमि|कहाँ से/ },
    { topic: "overview", pattern: /कौन|श्रेय के बारे|परिचय/ },
  ],
  pa: [
    { topic: "age", pattern: /ਉਮਰ|ਜਨਮ/ },
    { topic: "psychology", pattern: /ਮਨੋਵਿਗਿਆਨ|ਸਾਇਕੋਲੋਜੀ/ },
    { topic: "personal", pattern: /ਸ਼ੌਕ|ਪਿਆਨੋ|ਦੌੜ|ਧਿਆਨ|ਬਾਰਸਾ|ਫੁੱਟਬਾਲ/ },
    { topic: "contact", pattern: /ਸੰਪਰਕ|ਈਮੇਲ|ਮਿਲਣਾ|ਗੱਲ ਕਰਨੀ|ਕੈਲੰਡਰ/ },
    { topic: "roles", pattern: /ਨੌਕਰੀ|ਭੂਮਿਕਾ|ਰੋਲ|ਕਰੀਅਰ/ },
    { topic: "projects", pattern: /ਪ੍ਰੋਜੈਕਟ|ਬਣਾਇਆ|ਮਾਡਲ/ },
    { topic: "finance", pattern: /ਵਿੱਤ|ਨਿਵੇਸ਼|ਕਰੈਡਿਟ|ਫਾਇਨੈਂਸ/ },
    { topic: "analytics", pattern: /ਡਾਟਾ|ਐਨਾਲਿਟਿਕਸ|ਹੁਨਰ|ਟੂਲ|ਪਾਇਥਨ|ਐਕਸਲ/ },
    { topic: "experience", pattern: /ਤਜਰਬਾ|ਕੰਮ ਕੀਤਾ|ਕੰਪਨੀ/ },
    { topic: "education", pattern: /ਪੜ੍ਹਾਈ|ਸਿੱਖਿਆ|ਕਾਲਜ|ਡਿਗਰੀ/ },
    { topic: "background", pattern: /ਦਿੱਲੀ|ਪਿਛੋਕੜ|ਕਿੱਥੋਂ/ },
    { topic: "overview", pattern: /ਕੌਣ|ਸ਼੍ਰੇ ਬਾਰੇ|ਜਾਣ-ਪਛਾਣ/ },
  ],
};

const quickQuestions = [
  "What roles fit Shrey?",
  "Why economics and quant?",
  "What has he built?",
  "What is he like outside work?",
];

const greeting: Message = {
  id: 0,
  role: "leo",
  text: "Hey, I’m LEO. I know Shrey’s work, projects, and the story behind both. Ask me anything.",
};

const normalize = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

function detectLanguage(question: string, current: BotLanguage): BotLanguage {
  const normalizedQuestion = normalize(question);
  if (/\b(english|in english|english please)\b/.test(normalizedQuestion)) return "en";
  if (/[\u0A00-\u0A7F]/.test(question) || /\b(punjabi|punjabi vich|sat sri akal)\b/.test(normalizedQuestion)) return "pa";
  if (/[\u0900-\u097F]/.test(question) || /\b(hindi|hindi mein|hindi me|namaste)\b/.test(normalizedQuestion)) return "hi";
  return current;
}

function findEnglishTopic(normalizedQuestion: string) {
  return knowledge
    .map((item) => {
      const score = item.keywords.reduce((total, keyword) => {
        const normalizedKeyword = normalize(keyword);
        return normalizedQuestion.includes(normalizedKeyword)
          ? total + Math.max(8, normalizedKeyword.split(" ").length * 5)
          : total;
      }, 0);
      return { item, score };
    })
    .sort((a, b) => b.score - a.score)[0];
}

function answerQuestion(
  question: string,
  previousTopic: string | null,
  currentLanguage: BotLanguage,
): AnswerResult {
  const normalizedQuestion = normalize(question);
  const language = detectLanguage(question, currentLanguage);
  const isFollowUp =
    /^(tell me more|more|go on|details|detail|give me an example|example|examples|how so|what else)$/.test(normalizedQuestion) ||
    /और बताओ|थोड़ा और|उदाहरण|विस्तार/.test(question) ||
    /ਹੋਰ ਦੱਸੋ|ਥੋੜਾ ਹੋਰ|ਉਦਾਹਰਨ|ਵੇਰਵਾ/.test(question);

  if (/^(hi|hello|hey|yo|good morning|good afternoon|namaste|sat sri akal)\b/.test(normalizedQuestion)) {
    const help = language === "en"
      ? "Hello. Ask me about Shrey's work, background, projects, role fit, or interests. Follow-ups work too. I have the scouting report and none of the mysterious 96% skill bars."
      : localizedAnswers[language]["leo-help"];
    return { text: help, topic: "leo-help", language };
  }

  const isLanguageRequest =
    /^(english|english please|in english|hindi|hindi mein|hindi me|punjabi|punjabi vich)$/.test(normalizedQuestion) ||
    /हिंदी में बात करें|ਪੰਜਾਬੀ ਵਿੱਚ ਗੱਲ ਕਰੋ/.test(question);

  if (isLanguageRequest) {
    const help = language === "en"
      ? "We can continue in English. Ask about Shrey's background, work, projects, capabilities, or role fit."
      : localizedAnswers[language]["leo-help"];
    return { text: help, topic: "leo-help", language };
  }

  let item = isFollowUp && previousTopic
    ? knowledge.find((entry) => entry.id === previousTopic)
    : undefined;

  if (!item) {
    const englishMatch = findEnglishTopic(normalizedQuestion);
    if (englishMatch?.score >= 8) item = englishMatch.item;
  }

  if (!item && language !== "en") {
    const localizedTopic = localizedIntents[language].find(({ pattern }) => pattern.test(question))?.topic;
    if (localizedTopic) item = knowledge.find((entry) => entry.id === localizedTopic);
  }

  if (item) {
    const text = language === "en"
      ? isFollowUp && item.detail
        ? item.detail
        : item.answer
      : localizedAnswers[language][item.id] ?? localizedAnswers[language]["leo-help"];
    return { text, topic: item.id, language };
  }

  const unknown = language === "hi"
    ? "यह जानकारी मेरी verified scouting report में नहीं है, इसलिए मैं अंदाज़ा नहीं लगाऊँगा। आप Shrey को email कर सकते हैं या नीचे conversation book कर सकते हैं।"
    : language === "pa"
      ? "ਇਹ ਜਾਣਕਾਰੀ ਮੇਰੀ verified scouting report ਵਿੱਚ ਨਹੀਂ ਹੈ, ਇਸ ਲਈ ਮੈਂ ਅੰਦਾਜ਼ਾ ਨਹੀਂ ਲਗਾਵਾਂਗਾ। ਤੁਸੀਂ Shrey ਨੂੰ email ਕਰ ਸਕਦੇ ਹੋ ਜਾਂ ਹੇਠਾਂ conversation book ਕਰ ਸਕਦੇ ਹੋ।"
      : "That one has not made my verified scouting report, and I would rather be useful than creative with the facts. Ask Shrey directly by email or book a conversation below.";
  return { text: unknown, topic: null, language };
}

export function LeoAssistant() {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [language, setLanguage] = useState<BotLanguage>("en");
  const [messages, setMessages] = useState<Message[]>([greeting]);
  const [thinking, setThinking] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const conversationRef = useRef<HTMLDivElement>(null);
  const nextMessageId = useRef(1);
  const lastTopic = useRef<string | null>(null);
  const thinkingRef = useRef(false);
  const replyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    conversationRef.current?.scrollTo({
      top: conversationRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  useEffect(() => () => {
    if (replyTimer.current) clearTimeout(replyTimer.current);
  }, []);

  const ask = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed || thinkingRef.current) return;

    const nextId = nextMessageId.current;
    nextMessageId.current += 2;
    const response = answerQuestion(trimmed, lastTopic.current, language);
    thinkingRef.current = true;
    setThinking(true);
    setMessages((current) => [
      ...current,
      { id: nextId, role: "visitor", text: trimmed },
    ]);
    setQuestion("");

    replyTimer.current = setTimeout(() => {
      lastTopic.current = response.topic;
      setLanguage(response.language);
      setMessages((current) => [
        ...current,
        { id: nextId + 1, role: "leo", text: response.text },
      ]);
      thinkingRef.current = false;
      setThinking(false);
      replyTimer.current = null;
    }, LEO_RESPONSE_DELAY_MS);
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    ask(question);
  };

  return (
    <div className={open ? "leo-shell is-open" : "leo-shell"}>
      {open && (
        <section
          className="leo-panel"
          id="leo-panel"
          role="dialog"
          aria-modal="false"
          aria-labelledby="leo-title"
        >
          <header className="leo-header">
            <div className="leo-avatar" aria-hidden="true">L</div>
            <div>
              <strong id="leo-title">LEO</strong>
              <span>AI assistant</span>
            </div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close LEO">
              ×
            </button>
          </header>

          <div className="leo-source">
            <span /> Verified answers
          </div>

          <div
            className="leo-conversation"
            ref={conversationRef}
            aria-live="polite"
            aria-busy={thinking}
          >
            {messages.map((message) => (
              <div className={`leo-message ${message.role}`} key={message.id}>
                {message.role === "leo" && <span>LEO</span>}
                <p>{message.text}</p>
              </div>
            ))}
            {thinking && (
              <div className="leo-message leo-thinking" role="status">
                <span>LEO</span>
                <p className="leo-typing" aria-label="LEO is thinking">
                  <i aria-hidden="true" />
                  <i aria-hidden="true" />
                  <i aria-hidden="true" />
                </p>
              </div>
            )}
          </div>

          {messages.length === 1 && (
            <div className="leo-quick" aria-label="Suggested questions">
              {quickQuestions.map((item) => (
                <button type="button" key={item} onClick={() => ask(item)} disabled={thinking}>
                  {item}
                </button>
              ))}
            </div>
          )}

          <form className="leo-form" onSubmit={submit}>
            <label className="sr-only" htmlFor="leo-question">
              Ask LEO about Shrey
            </label>
            <input
              id="leo-question"
              ref={inputRef}
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              disabled={thinking}
              placeholder={
                thinking
                  ? "LEO is thinking..."
                  : language === "hi"
                  ? "Shrey के बारे में पूछें..."
                  : language === "pa"
                    ? "Shrey ਬਾਰੇ ਪੁੱਛੋ..."
                    : "Ask about Shrey..."
              }
              autoComplete="off"
              maxLength={240}
            />
            <button type="submit" aria-label="Send question" disabled={thinking}>Ask</button>
          </form>

          <div className="leo-actions">
            <a href="mailto:Shreshth2002@gmail.com">Email</a>
            <a href={bookingUrl} target="_blank" rel="noreferrer">Book 30 min</a>
            <a href="/resume.pdf" target="_blank">Résumé</a>
          </div>
        </section>
      )}

      <button
        className="leo-trigger"
        type="button"
        aria-expanded={open}
        aria-controls="leo-panel"
        aria-label="Ask LEO about Shrey"
        onClick={() => setOpen((current) => !current)}
      >
        <span className="leo-trigger-mark" aria-hidden="true">LEO</span>
        <i aria-hidden="true" />
      </button>
    </div>
  );
}
