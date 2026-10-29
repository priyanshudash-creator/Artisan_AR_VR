/**
 * SHILPA AI CRAFT GUIDE — Groq Client Service
 * 
 * Handles authenticated server-side calls to Groq API.
 * Never exposes GROQ_API_KEY to browser bundles or frontend network requests.
 */

import Groq from 'groq-sdk';
import { SHILPA_SYSTEM_PROMPT } from './systemPrompt.js';
import { getDeterministicAnswer } from './faqRetrieval.js';

const DEFAULT_MODEL = 'openai/gpt-oss-120b';

/**
 * Checks whether a valid Groq API key is present in environment.
 */
export function isGroqConfigured() {
  const key = process.env.GROQ_API_KEY;
  if (!key) return false;
  if (key === 'gsk_your_groq_api_key_here' || key.includes('placeholder')) return false;
  return key.trim().length > 10;
}

/**
 * Returns currently configured model name.
 */
export function getActiveModel() {
  return process.env.GROQ_MODEL || DEFAULT_MODEL;
}

/**
 * Post-processes model output to strictly eliminate raw markdown tables (|),
 * stray asterisks (*), and converts table rows into clean, readable bullet points.
 */
export function cleanCraftResponse(text) {
  if (!text) return '';

  const lines = String(text).split('\n');
  const resultLines = [];
  let inTable = false;
  let tableHeaders = [];
  const tableRows = [];

  const flushTable = () => {
    if (tableHeaders.length > 0 && tableRows.length > 0) {
      tableRows.forEach(row => {
        if (row.length === 0) return;
        const mainTitle = row[0];
        resultLines.push(`• ${mainTitle}`);
        for (let i = 1; i < row.length; i++) {
          const header = tableHeaders[i] || '';
          const cell = row[i];
          if (cell) {
            if (header && !/^(craft|name|item|title)$/i.test(header.trim())) {
              resultLines.push(`  ${header}: ${cell}`);
            } else {
              resultLines.push(`  ${cell}`);
            }
          }
        }
        resultLines.push('');
      });
    }
    tableHeaders = [];
    tableRows.length = 0;
    inTable = false;
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Check if line is a table divider like |---|---| or +---+
    if (/^\|?(\s*:?-+:?\s*\|)+\s*:?-+:?\s*\|?$/.test(line)) {
      inTable = true;
      continue;
    }

    // Check if line is a table row (starts and ends with pipe or contains multiple pipes)
    if (line.startsWith('|') && line.endsWith('|') && line.includes('|', 1)) {
      const cells = line
        .slice(1, -1)
        .split('|')
        .map(c => c.trim());

      if (!inTable && tableHeaders.length === 0) {
        // First row of table is header
        tableHeaders = cells;
        inTable = true;
      } else {
        tableRows.push(cells);
      }
      continue;
    }

    // Not a table line, flush any active table
    if (inTable || tableHeaders.length > 0) {
      flushTable();
    }

    resultLines.push(lines[i]);
  }

  if (inTable || tableHeaders.length > 0) {
    flushTable();
  }

  let cleaned = resultLines.join('\n');

  // Strip bold/italic asterisks while preserving the words
  cleaned = cleaned.replace(/\*\*([^*]+)\*\*/g, '$1');
  cleaned = cleaned.replace(/\*([^*]+)\*/g, '$1');
  // Convert markdown bullet asterisks to clean bullet character
  cleaned = cleaned.replace(/^\s*\*\s+/gm, '• ');
  // Strip any remaining asterisks
  cleaned = cleaned.replace(/\*/g, '');
  // Strip any remaining pipe characters
  cleaned = cleaned.replace(/\s*\|\s*/g, ' — ');
  cleaned = cleaned.replace(/\|/g, '');

  // Strictly remove any "What is unknown" section and its following lines
  const filteredLines = [];
  let skippingUnknown = false;
  for (const l of cleaned.split('\n')) {
    const trimmed = l.trim().toLowerCase();
    if (trimmed.startsWith('what is unknown')) {
      skippingUnknown = true;
      continue;
    }
    if (skippingUnknown) {
      if (/^(answer|what the records say|source):?$/i.test(trimmed)) {
        skippingUnknown = false;
      } else {
        continue;
      }
    }
    filteredLines.push(l);
  }
  cleaned = filteredLines.join('\n');

  return cleaned.trim();
}

/**
 * Calls Groq API with strict context grounding and error handling.
 */
export async function generateCraftAnswer(artifactContext, userMessage, conversationHistory = []) {
  const cleanMessage = String(userMessage || '').trim();
  if (!cleanMessage) {
    throw new Error('User message cannot be empty.');
  }

  // If Groq API Key is not configured, gracefully fall back to deterministic verified answer
  if (!isGroqConfigured()) {
    console.warn('[SHILPA Service] GROQ_API_KEY is not configured or placeholder. Using deterministic grounded retrieval.');
    const fallback = getDeterministicAnswer(artifactContext, cleanMessage);
    return {
      answer: cleanCraftResponse(fallback.answer),
      sources: fallback.sources,
      limitations: fallback.limitations,
      modelUsed: 'deterministic-knowledge-engine (Phase 1)',
      configurationNotice: 'Groq API Key not detected in environment. To enable live Groq LLM inference, configure GROQ_API_KEY in your server .env file.'
    };
  }

  try {
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
    const model = getActiveModel();

    // Format safe recent conversation history (max 6 messages to preserve token budget)
    const formattedHistory = [];
    const recentHistory = Array.isArray(conversationHistory) 
      ? conversationHistory.slice(-6) 
      : [];

    for (const msg of recentHistory) {
      if (msg && msg.role && msg.content) {
        formattedHistory.push({
          role: msg.role === 'assistant' ? 'assistant' : 'user',
          content: String(msg.content).slice(0, 1000)
        });
      }
    }

    // Build the user prompt with injected artifact context
    const userPromptWithContext = `
${artifactContext ? artifactContext.contextPromptText : 'No artifact selected.'}

----------------------------------------
[PATRON QUESTION]:
${cleanMessage}
----------------------------------------
Remember: Answer strictly using the verified facts above. If price breakdown is not documented, state the indicative price range of ₹${artifactContext?.priceMin || 'X'}–₹${artifactContext?.priceMax || 'Y'} ${artifactContext?.priceUnit || 'per piece'} and explicitly state that detailed breakdown is not documented. Never fabricate costs!
`.trim();

    const messages = [
      { role: 'system', content: SHILPA_SYSTEM_PROMPT },
      ...formattedHistory,
      { role: 'user', content: userPromptWithContext }
    ];

    const completion = await groq.chat.completions.create({
      model,
      messages,
      temperature: 0.2, // Low temperature for high factual precision
      max_tokens: 800,
      top_p: 0.95
    });

    const rawAnswer = completion.choices?.[0]?.message?.content || '';

    return {
      answer: cleanCraftResponse(rawAnswer),
      sources: artifactContext?.sources || [],
      limitations: artifactContext?.limitations || [],
      modelUsed: model,
      configurationNotice: null
    };

  } catch (error) {
    console.error('[SHILPA Service Error]:', error.message || error);

    // If rate-limited or API failure, gracefully fall back to deterministic response
    const fallback = getDeterministicAnswer(artifactContext, cleanMessage);
    
    let errorDetail = 'AI inference provider encountered an unexpected issue.';
    if (error.status === 401 || (error.message && error.message.includes('API key'))) {
      errorDetail = 'Invalid Groq API Key. Please check the GROQ_API_KEY setting in your .env file.';
    } else if (error.status === 429) {
      errorDetail = 'Groq API rate limit reached. Displaying grounded dataset facts in the interim.';
    }

    return {
      answer: cleanCraftResponse(fallback.answer),
      sources: fallback.sources,
      limitations: [
        ...fallback.limitations,
        `Provider note: ${errorDetail}`
      ],
      modelUsed: 'deterministic-knowledge-engine (Provider Fallback)',
      configurationNotice: errorDetail
    };
  }
}
