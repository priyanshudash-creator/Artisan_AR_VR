/**
 * SHILPA AI CRAFT GUIDE — Type Definitions
 */

export interface ShilpaSourceReference {
  title: string;
  url: string;
  type: string;
  approvalStatus?: string;
}

export interface ShilpaMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  sources?: ShilpaSourceReference[];
  limitations?: string[];
  modelUsed?: string;
  configurationNotice?: string | null;
  suggestedQuestions?: string[];
}

export interface ShilpaArtifactContext {
  id: string;
  slug?: string;
  name: string;
  category: string;
  district: string;
  priceDisplay?: string;
  priceRange?: string;
  image?: string;
  isDetailedBreakdownAvailable?: boolean;
}

export interface ShilpaApiResponse {
  answer: string;
  sources: ShilpaSourceReference[];
  limitations: string[];
  modelUsed?: string;
  configurationNotice?: string | null;
  selectedArtifact?: {
    id: string;
    name: string;
    category: string;
    district: string;
    priceRange: string;
    isDetailedBreakdownAvailable: boolean;
  } | null;
  error?: string;
}

export interface ShilpaStatusResponse {
  status: string;
  assistant: string;
  tagline: string;
  groqConfigured: boolean;
  activeModel: string;
  environment: string;
}
