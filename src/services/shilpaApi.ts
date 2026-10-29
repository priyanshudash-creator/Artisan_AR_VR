/**
 * SHILPA AI CRAFT GUIDE — Client API Service
 * 
 * Communicates with backend endpoints at /api/shilpa/*.
 * Does not expose GROQ_API_KEY to the browser.
 */

import { ShilpaApiResponse, ShilpaStatusResponse, ShilpaArtifactContext } from '../types/shilpa';

export async function askShilpa(
  message: string,
  artifactId?: string,
  conversationHistory: { role: 'user' | 'assistant'; content: string }[] = []
): Promise<ShilpaApiResponse> {
  try {
    const response = await fetch('/api/shilpa/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message,
        artifactId,
        conversationHistory: conversationHistory.slice(-6)
      })
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.error || `Server responded with status ${response.status}`);
    }

    const data: ShilpaApiResponse = await response.json();
    return data;
  } catch (err: any) {
    console.error('[Shilpa API Client Error]:', err);
    throw new Error(err.message || 'Unable to connect to SHILPA assistant service.');
  }
}

export async function getShilpaStatus(): Promise<ShilpaStatusResponse | null> {
  try {
    const response = await fetch('/api/shilpa/status');
    if (!response.ok) return null;
    return await response.json();
  } catch {
    return null;
  }
}

export async function getAvailableArtifacts(): Promise<ShilpaArtifactContext[]> {
  try {
    const response = await fetch('/api/shilpa/artifacts');
    if (!response.ok) return [];
    const data = await response.json();
    return data.artifacts || [];
  } catch {
    return [];
  }
}

/**
 * Generates dynamic suggested questions tailored to the active artifact.
 */
export function getArtifactSuggestedQuestions(artifact?: ShilpaArtifactContext | null): string[] {
  if (!artifact) {
    return [
      "What crafts is Odisha famous for?",
      "Which craft is associated with Puri district?",
      "How do I know if an Odisha artifact is authentic?",
      "Explain the difference between Pattachitra and printed art."
    ];
  }

  const cat = (artifact.category || '').toLowerCase();
  
  if (cat.includes('pattachitra') || cat.includes('painting')) {
    return [
      "What materials are used to make this painting?",
      "How is Pattachitra traditionally created?",
      "Why does this artifact cost its declared price?",
      "What makes this artwork different from a printed painting?",
      "Which district is this craft associated with?",
      "Show me the sources."
    ];
  }

  if (cat.includes('handloom') || cat.includes('saree') || cat.includes('textile')) {
    return [
      "What materials are used in this handloom?",
      "How is the Bandha (Ikat) tie-dye process executed?",
      "Can you explain the declared price breakdown?",
      "Who is the master weaver behind this?",
      "Which district is this craft associated with?",
      "Show me the sources."
    ];
  }

  if (cat.includes('dhokra') || cat.includes('metal')) {
    return [
      "What materials are used in this lost-wax craft?",
      "How is Dhokra metal casting traditionally done?",
      "Explain the declared price of this artifact.",
      "Is this piece unique or mass produced?",
      "Which tribal cluster crafted this piece?",
      "Show me the sources."
    ];
  }

  if (cat.includes('filigree') || cat.includes('silver')) {
    return [
      "What materials and silver purity are used?",
      "How are the micro-wires drawn and soldered in Cuttack?",
      "Explain the declared price breakdown.",
      "Who made this artifact?",
      "Show me the sources."
    ];
  }

  // Default suggestions for any general Odisha craft
  return [
    "What materials are used?",
    "How is it made?",
    "Tell me its cultural significance.",
    "Explain the declared price.",
    "Who made this artifact?",
    "Show me the sources."
  ];
}
