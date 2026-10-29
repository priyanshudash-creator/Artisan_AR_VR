/**
 * SHILPA AI CRAFT GUIDE — Global React Context
 * 
 * Provides accessible state across all pages:
 * - Opening/closing the assistant drawer
 * - Setting active artifact context
 * - Managing conversation history
 * - Invoking backend Groq inference
 */

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { ShilpaMessage, ShilpaArtifactContext, ShilpaStatusResponse } from '../types/shilpa';
import { askShilpa, getShilpaStatus, getArtifactSuggestedQuestions } from '../services/shilpaApi';

interface ShilpaContextType {
  isOpen: boolean;
  openShilpa: (artifact?: ShilpaArtifactContext | null) => void;
  closeShilpa: () => void;
  toggleShilpa: () => void;
  activeArtifact: ShilpaArtifactContext | null;
  setActiveArtifact: (artifact: ShilpaArtifactContext | null) => void;
  messages: ShilpaMessage[];
  isTyping: boolean;
  error: string | null;
  sendMessage: (text: string) => Promise<void>;
  clearChat: () => void;
  groqStatus: ShilpaStatusResponse | null;
  suggestedQuestions: string[];
  isSpeaking: boolean;
  speakMessage: (text: string) => void;
  stopSpeaking: () => void;
}

const ShilpaContext = createContext<ShilpaContextType | undefined>(undefined);

const INITIAL_WELCOME_TEXT = "Namaste! I'm SHILPA, your AI Craft Guide. Ask me about this artifact's materials, traditional making process, cultural significance, or documented pricing.";

export const ShilpaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeArtifact, setActiveArtifactState] = useState<ShilpaArtifactContext | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [groqStatus, setGroqStatus] = useState<ShilpaStatusResponse | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Initialize messages with welcome message
  const createInitialMessage = useCallback((artifact?: ShilpaArtifactContext | null): ShilpaMessage => {
    return {
      id: 'welcome-msg',
      role: 'assistant',
      content: INITIAL_WELCOME_TEXT,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestedQuestions: getArtifactSuggestedQuestions(artifact)
    };
  }, []);

  const [messages, setMessages] = useState<ShilpaMessage[]>([createInitialMessage(null)]);

  // Load status on mount
  useEffect(() => {
    getShilpaStatus().then(status => {
      if (status) setGroqStatus(status);
    });
  }, []);

  // Update suggested questions when activeArtifact changes
  const suggestedQuestions = getArtifactSuggestedQuestions(activeArtifact);

  const openShilpa = useCallback((artifact?: ShilpaArtifactContext | null) => {
    if (artifact !== undefined) {
      setActiveArtifactState(artifact);
      // If switching to a new artifact, add a system or fresh welcome message
      setMessages(prev => {
        if (prev.length <= 1) {
          return [createInitialMessage(artifact)];
        }
        return [
          ...prev,
          {
            id: `artifact-switch-${Date.now()}`,
            role: 'assistant',
            content: artifact 
              ? `I have updated my guide context to **${artifact.name}** (${artifact.district} District). Ask me about its materials, traditional process, or declared price.`
              : `I have cleared the active artifact context. Ask me anything about Odisha's craft traditions!`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            suggestedQuestions: getArtifactSuggestedQuestions(artifact)
          }
        ];
      });
    }
    setIsOpen(true);
  }, [createInitialMessage]);

  const closeShilpa = useCallback(() => {
    setIsOpen(false);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, []);

  const toggleShilpa = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const setActiveArtifact = useCallback((artifact: ShilpaArtifactContext | null) => {
    setActiveArtifactState(artifact);
  }, []);

  const clearChat = useCallback(() => {
    setMessages([createInitialMessage(activeArtifact)]);
    setError(null);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [activeArtifact, createInitialMessage]);

  const sendMessage = useCallback(async (text: string) => {
    const cleanText = text.trim();
    if (!cleanText || isTyping) return;

    setError(null);

    const userMessage: ShilpaMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: cleanText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    try {
      // Build conversation history for API
      const history = messages.slice(-5).map(m => ({
        role: m.role,
        content: m.content
      }));

      const response = await askShilpa(cleanText, activeArtifact?.id, history);

      const assistantMessage: ShilpaMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: response.answer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sources: response.sources,
        limitations: response.limitations,
        modelUsed: response.modelUsed,
        configurationNotice: response.configurationNotice
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (err: any) {
      setError(err.message || 'Unable to consult SHILPA.');
      const errorMessage: ShilpaMessage = {
        id: `assistant-error-${Date.now()}`,
        role: 'assistant',
        content: "I couldn't complete that query due to a connection issue with the craft guide service. Please verify your connection or try asking again in a moment.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        limitations: ['Network request to AI inference service failed.']
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  }, [activeArtifact, isTyping, messages]);

  // Text to Speech
  const speakMessage = useCallback((text: string) => {
    if (!('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();
    // Clean markdown symbols for natural speech
    const cleanSpeech = text
      .replace(/\*\*/g, '')
      .replace(/#{1,6}\s/g, '')
      .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
      .replace(/[-*•]\s/g, '')
      .slice(0, 500);

    const utterance = new SpeechSynthesisUtterance(cleanSpeech);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.lang = 'en-IN'; // Indian English cadence

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  }, []);

  const stopSpeaking = useCallback(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, []);

  return (
    <ShilpaContext.Provider
      value={{
        isOpen,
        openShilpa,
        closeShilpa,
        toggleShilpa,
        activeArtifact,
        setActiveArtifact,
        messages,
        isTyping,
        error,
        sendMessage,
        clearChat,
        groqStatus,
        suggestedQuestions,
        isSpeaking,
        speakMessage,
        stopSpeaking
      }}
    >
      {children}
    </ShilpaContext.Provider>
  );
};

export const useShilpa = () => {
  const context = useContext(ShilpaContext);
  if (!context) {
    throw new Error('useShilpa must be used within a ShilpaProvider');
  }
  return context;
};
