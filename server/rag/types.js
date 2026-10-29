/**
 * SHILPA AI CRAFT GUIDE — Phase 2: RAG Readiness Interface Specifications
 * 
 * Defines architecture contracts for the future Retrieval-Augmented Generation pipeline.
 * IMPORTANT: This pipeline is preserved for Phase 2 implementation. The UI currently operates
 * on verified deterministic retrieval + Groq LLM inference without claiming RAG capabilities.
 */

/**
 * @typedef {Object} DocumentChunkMetadata
 * @property {string} artifactId - Unique artifact identifier (e.g. 'prod-001' or 'odisha-art-1')
 * @property {string} artifactSlug - URL-friendly slug
 * @property {string} craftCategory - Craft category (e.g. 'Sambalpuri Handloom')
 * @property {string} district - Odisha district of origin
 * @property {string} sourceTitle - Document or record title
 * @property {string} sourceUrl - Verified source URL or internal record path
 * @property {'product_passport'|'government_record'|'dataset_record'|'artisan_oral_history'} documentType
 * @property {'Approved'|'Under Review'|'Advisory'} approvalStatus
 * @property {string} lastUpdatedDate - ISO date string
 */

/**
 * @typedef {Object} DocumentChunk
 * @property {string} id - Chunk identifier
 * @property {string} text - Extracted text segment
 * @property {number[]} [embedding] - Optional high-dimensional vector embedding
 * @property {DocumentChunkMetadata} metadata - Chunk provenance metadata
 */

/**
 * @typedef {Object} VectorRetrievalResult
 * @property {DocumentChunk} chunk
 * @property {number} similarityScore - Cosine similarity or relevance score (0-1)
 */

/**
 * Interface contract for Future Phase 2 Embedding Service.
 */
export class IEmbeddingService {
  /**
   * @param {string} text
   * @returns {Promise<number[]>}
   */
  async generateEmbedding(text) {
    throw new Error('Phase 2 RAG EmbeddingService is not yet activated.');
  }
}

/**
 * Interface contract for Future Phase 2 Vector Store.
 */
export class IVectorStore {
  /**
   * @param {string} query
   * @param {number} topK
   * @param {Partial<DocumentChunkMetadata>} [filter]
   * @returns {Promise<VectorRetrievalResult[]>}
   */
  async querySimilarChunks(query, topK = 4, filter = {}) {
    throw new Error('Phase 2 RAG VectorStore is not yet activated.');
  }
}
