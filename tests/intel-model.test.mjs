import assert from "node:assert/strict";
import test from "node:test";
import { initialIntelWeights, rankIntelSites } from "../app/intelModel.ts";

test("Intel recommendation starts at Site A and flips with decision priorities", () => {
  assert.equal(rankIntelSites(initialIntelWeights)[0].label, "Site A");
  assert.equal(
    rankIntelSites({ ...initialIntelWeights, reliability: 70 })[0].label,
    "Site B",
  );
  assert.equal(
    rankIntelSites({ ...initialIntelWeights, cost: 70 })[0].label,
    "Site C",
  );
  assert.equal(
    rankIntelSites({ ...initialIntelWeights, readiness: 70 })[0].label,
    "Site E",
  );
});
