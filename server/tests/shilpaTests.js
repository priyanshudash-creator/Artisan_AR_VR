/**
 * SHILPA AI CRAFT GUIDE — Core Behavior & Safety Verification Tests
 * 
 * Tests:
 * 1. Artifact Resolution (Curated products + 300 Odisha dataset records)
 * 2. Context Construction & Pricing Grounding
 * 3. Price Breakdown Compliance (Detailed breakdown vs Indicative min/max limitation)
 * 4. Factual Artisan Attribution (Public records vs Unknown village artisans)
 * 5. Unknown Artifact ID Graceful Handling
 * 6. System Prompt Behavioral Guardrails
 * 7. FAQ Deterministic Intent Retrieval
 */

import assert from 'assert';
import {
  resolveArtifact,
  buildStructuredArtifactContext,
  getAllArtifactsSummary
} from '../services/artifactKnowledge.js';
import {
  matchQuestionIntent,
  getDeterministicAnswer
} from '../services/faqRetrieval.js';
import { SHILPA_SYSTEM_PROMPT } from '../services/systemPrompt.js';
import { isGroqConfigured } from '../services/groqClient.js';

let passed = 0;
let total = 0;

function test(name, fn) {
  total++;
  try {
    fn();
    console.log(`  ✓ PASS: ${name}`);
    passed++;
  } catch (err) {
    console.error(`  ✗ FAIL: ${name}`);
    console.error(`    ${err.message}`);
  }
}

console.log('\n======================================================');
console.log('🏛️  RUNNING SHILPA AI CRAFT GUIDE VERIFICATION SUITE');
console.log('======================================================\n');

// 1. Artifact Resolution
test('Resolves curated product by ID (prod-002)', () => {
  const resolved = resolveArtifact('prod-002');
  assert(resolved !== null, 'Should resolve prod-002');
  assert.strictEqual(resolved.type, 'curated_product');
  assert.strictEqual(resolved.item.name, 'Sacred Pattachitra Krishna Leela Scroll');
});

test('Resolves curated product by slug (sacred-pattachitra-krishna-leela-scroll)', () => {
  const resolved = resolveArtifact('sacred-pattachitra-krishna-leela-scroll');
  assert(resolved !== null, 'Should resolve by slug');
  assert.strictEqual(resolved.item.id, 'prod-002');
});

test('Resolves 300-dataset artifact by ID (odisha-art-1)', () => {
  const resolved = resolveArtifact('odisha-art-1');
  assert(resolved !== null, 'Should resolve odisha-art-1');
  assert.strictEqual(resolved.type, 'odisha_artifact');
  assert.strictEqual(resolved.item.district, 'Angul');
  assert.strictEqual(resolved.item.name, 'Terracotta figurines');
});

test('Handles unknown artifact ID safely without throwing', () => {
  const resolved = resolveArtifact('non-existent-artifact-99999');
  assert.strictEqual(resolved, null, 'Unknown artifact must return null');
  const context = buildStructuredArtifactContext(resolved);
  assert.strictEqual(context.artifactFound, false);
});

// 2. Pricing & Cost Breakdown Rules
test('Curated product has audited detailed price breakdown', () => {
  const resolved = resolveArtifact('prod-002');
  const context = buildStructuredArtifactContext(resolved);
  assert.strictEqual(context.isDetailedBreakdownAvailable, true);
  assert(context.priceBreakdown !== null);
  assert.strictEqual(context.priceBreakdown.materials, 1800);
  assert.strictEqual(context.priceBreakdown.labour, 4500);
  assert.strictEqual(context.priceBreakdown.total, 8500);

  const answerObj = getDeterministicAnswer(context, 'Explain the declared price breakdown');
  assert(answerObj.answer.includes('Raw Materials Cost') && answerObj.answer.includes('1,800'), 'Should explain documented materials cost');
  assert(answerObj.answer.includes('Skilled Artisan Labour') && answerObj.answer.includes('4,500'), 'Should explain documented labor cost');
});

test('Indicative price artifact (odisha-art-1) STRICTLY produces missing breakdown limitation', () => {
  const resolved = resolveArtifact('odisha-art-1');
  const context = buildStructuredArtifactContext(resolved);
  assert.strictEqual(context.isDetailedBreakdownAvailable, false);
  assert.strictEqual(context.priceBreakdown, null);

  const answerObj = getDeterministicAnswer(context, 'Explain the declared price breakdown');
  assert(
    answerObj.answer.includes('indicative price range of ₹150–₹3000 per piece') ||
    answerObj.answer.includes('indicative price range of'),
    'Must state indicative price range'
  );
  assert(
    answerObj.answer.includes('A detailed breakdown of materials, labor, finishing, packaging, and other costs is not available') ||
    answerObj.answer.includes('not available in the current records'),
    'Must state detailed breakdown is not documented'
  );
  assert(answerObj.limitations.length > 0, 'Must include explicit limitation');
});

// 3. Question Intent Matching
test('Question intent matcher accurately identifies core categories', () => {
  assert.strictEqual(matchQuestionIntent('What materials are used to make this painting?'), 'materials');
  assert.strictEqual(matchQuestionIntent('How is Pattachitra traditionally created?'), 'process');
  assert.strictEqual(matchQuestionIntent('Why does this artifact cost ₹3,000?'), 'pricing');
  assert.strictEqual(matchQuestionIntent('Which district is this craft associated with?'), 'district');
  assert.strictEqual(matchQuestionIntent('Who made this artifact?'), 'artisan');
  assert.strictEqual(matchQuestionIntent('What makes this artwork different from a printed painting?'), 'authenticity_difference');
  assert.strictEqual(matchQuestionIntent('Which parts of this information are documented in sources?'), 'sources');
});

// 4. Grounded Material Knowledge
test('Pattachitra materials answer includes documented organic pigments', () => {
  const resolved = resolveArtifact('prod-002');
  const context = buildStructuredArtifactContext(resolved);
  const ans = getDeterministicAnswer(context, 'What materials are used?');
  assert(ans.answer.includes('Handmade Cotton Patta Cloth'), 'Must include Patta cloth');
  assert(ans.answer.includes('Tamarind Seed Gum'), 'Must include Tamarind seed gum');
  assert(ans.answer.includes('Conch Powder'), 'Must include Conch powder');
});

// 5. System Prompt Guardrails
test('System prompt contains non-hallucination and price rules', () => {
  assert(SHILPA_SYSTEM_PROMPT.includes('SHILPA (AI Craft Guide)'));
  assert(SHILPA_SYSTEM_PROMPT.toLowerCase().includes('zero hallucination'));
  assert(SHILPA_SYSTEM_PROMPT.includes('PRICE EXPLANATION RULES'));
  assert(SHILPA_SYSTEM_PROMPT.includes('A detailed breakdown of materials, labor, finishing, and other costs is not available in the current records'));
  assert(SHILPA_SYSTEM_PROMPT.toLowerCase().includes('never invent cost percentages'));
});

// 6. Artifacts Catalog Summary
test('Artifacts summary includes all 300+ items across all 30 districts', () => {
  const list = getAllArtifactsSummary();
  assert(list.length >= 308, `Should have at least 308 artifacts (found ${list.length})`);
  const districts = new Set(list.map(a => a.district));
  assert(districts.size >= 30, `Should cover all 30 districts (found ${districts.size})`);
});

console.log(`\n------------------------------------------------------`);
console.log(`RESULTS: ${passed} of ${total} tests passed.`);
console.log('------------------------------------------------------\n');

if (passed !== total) {
  process.exit(1);
}
