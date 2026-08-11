export type IntelCriterionId = "renewables" | "reliability" | "cost" | "readiness";

export type IntelSite = {
  id: "site-a" | "site-b" | "site-c" | "site-d" | "site-e";
  label: string;
  scores: Record<IntelCriterionId, number>;
};

export const initialIntelWeights: Record<IntelCriterionId, number> = {
  renewables: 35,
  reliability: 30,
  cost: 20,
  readiness: 15,
};

export const intelSites: IntelSite[] = [
  {
    id: "site-a",
    label: "Site A",
    scores: { renewables: 94, reliability: 86, cost: 68, readiness: 84 },
  },
  {
    id: "site-b",
    label: "Site B",
    scores: { renewables: 72, reliability: 97, cost: 74, readiness: 86 },
  },
  {
    id: "site-c",
    label: "Site C",
    scores: { renewables: 58, reliability: 74, cost: 99, readiness: 80 },
  },
  {
    id: "site-d",
    label: "Site D",
    scores: { renewables: 87, reliability: 79, cost: 84, readiness: 66 },
  },
  {
    id: "site-e",
    label: "Site E",
    scores: { renewables: 78, reliability: 88, cost: 70, readiness: 98 },
  },
];

export const rankIntelSites = (weights: Record<IntelCriterionId, number>) => {
  const totalWeight = Object.values(weights).reduce((sum, value) => sum + value, 0);

  return intelSites
    .map((site) => ({
      ...site,
      total: Object.entries(site.scores).reduce(
        (sum, [criterion, score]) =>
          sum + score * (weights[criterion as IntelCriterionId] / totalWeight),
        0,
      ),
    }))
    .sort((a, b) => b.total - a.total);
};
