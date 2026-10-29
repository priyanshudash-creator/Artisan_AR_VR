/**
 * SHILPA AI CRAFT GUIDE — Backend Server
 * 
 * Express API server providing protected endpoints for:
 * - POST /api/shilpa/chat
 * - GET  /api/shilpa/artifacts
 * - GET  /api/shilpa/artifact/:id
 * - GET  /api/shilpa/status
 */

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import {
  resolveArtifact,
  buildStructuredArtifactContext,
  getAllArtifactsSummary
} from './services/artifactKnowledge.js';
import {
  generateCraftAnswer,
  isGroqConfigured,
  getActiveModel
} from './services/groqClient.js';

// Load environment variables from .env with override
dotenv.config({ override: true });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '64kb' }));

// In-Memory Rate Limiting (Simple sliding window: 60 requests per minute per IP)
const rateLimitMap = new Map();
function rateLimiter(req, res, next) {
  const ip = req.ip || req.headers['x-forwarded-for'] || 'anonymous';
  const now = Date.now();
  const windowMs = 60 * 1000;
  const maxRequests = 60;

  let record = rateLimitMap.get(ip);
  if (!record || now - record.startTime > windowMs) {
    record = { count: 1, startTime: now };
    rateLimitMap.set(ip, record);
  } else {
    record.count++;
  }

  if (record.count > maxRequests) {
    return res.status(429).json({
      error: 'Rate limit exceeded. Please wait a moment before sending more queries to SHILPA.',
      retryAfterSeconds: Math.ceil((record.startTime + windowMs - now) / 1000)
    });
  }

  next();
}

/**
 * Health check & configuration status
 */
app.get('/api/shilpa/status', (req, res) => {
  res.json({
    status: 'ok',
    assistant: 'SHILPA (AI Craft Guide)',
    tagline: 'Ask SHILPA. Discover the Story Behind Every Craft.',
    groqConfigured: isGroqConfigured(),
    activeModel: getActiveModel(),
    environment: process.env.NODE_ENV || 'development'
  });
});

/**
 * Get summary catalog of all artifacts for search / context switching
 */
app.get('/api/shilpa/artifacts', (req, res) => {
  try {
    const list = getAllArtifactsSummary();
    res.json({
      total: list.length,
      artifacts: list
    });
  } catch (err) {
    console.error('Failed to get artifacts summary:', err);
    res.status(500).json({ error: 'Failed to retrieve artifacts list.' });
  }
});

/**
 * Get structured context for a specific artifact by ID or slug
 */
app.get('/api/shilpa/artifact/:id', (req, res) => {
  try {
    const { id } = req.params;
    const resolved = resolveArtifact(id);
    if (!resolved) {
      return res.status(404).json({ error: `Artifact with ID '${id}' was not found in Odisha records.` });
    }
    const context = buildStructuredArtifactContext(resolved);
    res.json(context);
  } catch (err) {
    console.error('Failed to resolve artifact:', err);
    res.status(500).json({ error: 'Failed to resolve artifact context.' });
  }
});

/**
 * Primary SHILPA Chat Endpoint
 * POST /api/shilpa/chat
 */
app.post('/api/shilpa/chat', rateLimiter, async (req, res) => {
  try {
    const { artifactId, message, conversationHistory } = req.body;

    // Validate inputs
    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({
        error: 'Question message is required and must be a non-empty string.'
      });
    }

    if (message.length > 1000) {
      return res.status(400).json({
        error: 'Message is too long. Please limit your question to 1,000 characters.'
      });
    }

    // Resolve artifact context (either curated product or 300 Odisha dataset listing)
    const resolved = artifactId ? resolveArtifact(artifactId) : null;
    const artifactContext = resolved ? buildStructuredArtifactContext(resolved) : null;

    // Call Groq AI service with grounded context
    const response = await generateCraftAnswer(
      artifactContext,
      message.trim(),
      Array.isArray(conversationHistory) ? conversationHistory : []
    );

    res.json({
      answer: response.answer,
      sources: response.sources || [],
      limitations: response.limitations || [],
      modelUsed: response.modelUsed,
      configurationNotice: response.configurationNotice,
      selectedArtifact: artifactContext ? {
        id: artifactContext.id,
        name: artifactContext.name,
        category: artifactContext.category,
        district: artifactContext.district,
        priceRange: artifactContext.priceRange,
        isDetailedBreakdownAvailable: artifactContext.isDetailedBreakdownAvailable
      } : null
    });

  } catch (err) {
    console.error('[SHILPA API Error]:', err);
    res.status(500).json({
      error: 'An internal error occurred while consulting SHILPA. Please try again.',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

// Start standalone server when executed directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  app.listen(PORT, () => {
    console.log(`===================================================`);
    console.log(`🏛️  SHILPA AI CRAFT GUIDE SERVER RUNNING`);
    console.log(`🔗  Port: http://localhost:${PORT}`);
    console.log(`🤖  Groq Model: ${getActiveModel()}`);
    console.log(`🔑  Groq Configured: ${isGroqConfigured() ? 'YES' : 'NO (Using Deterministic Phase 1 Engine)'}`);
    console.log(`===================================================`);
  });
}
