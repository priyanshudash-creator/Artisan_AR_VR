import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Send,
  Trash2,
  Sparkles,
  MapPin,
  Mic,
  MicOff,
  Search,
  ChevronDown,
  Info,
  ShieldCheck,
  RotateCcw,
  SlidersHorizontal,
  Layers
} from 'lucide-react';
import { useShilpa } from '../../context/ShilpaContext';
import { ShilpaMessageBubble } from './ShilpaMessageBubble';
import { getAvailableArtifacts } from '../../services/shilpaApi';
import { ShilpaArtifactContext } from '../../types/shilpa';
import logoImg from '../../assets/logo.jpg';

export const ShilpaChatDrawer: React.FC = () => {
  const {
    isOpen,
    closeShilpa,
    activeArtifact,
    setActiveArtifact,
    messages,
    isTyping,
    sendMessage,
    clearChat,
    groqStatus,
    suggestedQuestions,
    isSpeaking,
    speakMessage,
    stopSpeaking
  } = useShilpa();

  const [inputMessage, setInputMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(true);
  const [showArtifactPicker, setShowArtifactPicker] = useState(false);
  const [artifactList, setArtifactList] = useState<ShilpaArtifactContext[]>([]);
  const [artifactSearchQuery, setArtifactSearchQuery] = useState('');

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll on messages change
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  // Load available artifacts for switching
  useEffect(() => {
    if (showArtifactPicker && artifactList.length === 0) {
      getAvailableArtifacts().then(setArtifactList);
    }
  }, [showArtifactPicker, artifactList.length]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  // Setup Web Speech Recognition
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-IN';

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setInputMessage(transcript);
        }
        setIsRecording(false);
      };

      recognition.onerror = () => {
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
    } else {
      setVoiceSupported(false);
    }
  }, []);

  const handleToggleVoice = () => {
    if (!recognitionRef.current) {
      alert('Voice speech recognition is not supported in this browser. Please use Chrome, Edge, or Safari.');
      return;
    }

    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsRecording(true);
      } catch (err) {
        console.error('Speech recognition start failed:', err);
        setIsRecording(false);
      }
    }
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputMessage.trim() || isTyping) return;
    const msg = inputMessage.trim();
    setInputMessage('');
    sendMessage(msg);
  };

  const handleQuestionChipClick = (question: string) => {
    sendMessage(question);
  };

  const handleSelectArtifact = (artifact: ShilpaArtifactContext) => {
    setActiveArtifact(artifact);
    setShowArtifactPicker(false);
  };

  if (!isOpen) return null;

  const filteredArtifacts = artifactList.filter(a =>
    a.name.toLowerCase().includes(artifactSearchQuery.toLowerCase()) ||
    a.category.toLowerCase().includes(artifactSearchQuery.toLowerCase()) ||
    a.district.toLowerCase().includes(artifactSearchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end animate-fade-in">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={closeShilpa}
        aria-hidden="true"
      />

      {/* Slide-Over Drawer Container */}
      <div className="relative w-full max-w-lg bg-[#FAF8F5] border-l border-[#E5DED3] shadow-2xl flex flex-col h-full z-10 text-[#252722]">
        
        {/* Header Bar */}
        <div className="px-5 py-3.5 bg-white border-b border-[#E5DED3] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            {/* Konark Wheel Thumbnail */}
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#B85C38]/40 shadow-xs shrink-0">
              <img
                src={logoImg}
                alt="SHILPA Konark Wheel"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <h3 className="font-serif font-bold text-base text-[#244C3A]">
                  SHILPA
                </h3>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#B85C38] bg-[#E8DCCB] px-2 py-0.5 rounded-full">
                  AI Craft Guide
                </span>
              </div>
              <span className="text-[11px] text-[#6B6A63] tracking-tight">
                Ask SHILPA. Discover the Story Behind Every Craft.
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={clearChat}
              className="p-2 text-[#78816A] hover:text-[#B85C38] hover:bg-[#FAF8F5] rounded-lg transition-colors"
              title="Clear conversation history"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={closeShilpa}
              className="p-2 text-[#78816A] hover:text-[#252722] hover:bg-[#FAF8F5] rounded-lg transition-colors"
              title="Close guide"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Selected Artifact Context Banner */}
        <div className="px-4 py-2.5 bg-[#F4EFE6] border-b border-[#E5DED3] flex items-center justify-between gap-3 shrink-0">
          {activeArtifact ? (
            <div className="flex items-center gap-2.5 min-w-0">
              {activeArtifact.image && (
                <img
                  src={activeArtifact.image}
                  alt={activeArtifact.name}
                  className="w-9 h-9 rounded-lg object-cover border border-[#E5DED3] shrink-0"
                />
              )}
              <div className="min-w-0">
                <span className="text-[10px] font-bold text-[#B85C38] uppercase tracking-wider block">
                  Active Context Attached
                </span>
                <h4 className="font-serif font-bold text-xs text-[#244C3A] truncate">
                  {activeArtifact.name}
                </h4>
                <div className="flex items-center gap-2 text-[10px] text-[#6B6A63]">
                  <span>{activeArtifact.district} District</span>
                  <span>•</span>
                  <span>{activeArtifact.priceDisplay || activeArtifact.priceRange || 'Odisha Heritage'}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-[#E8DCCB] text-[#244C3A] flex items-center justify-center shrink-0">
                <Layers className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <h4 className="font-serif font-bold text-xs text-[#244C3A]">
                  All Odisha Craft Traditions
                </h4>
                <p className="text-[10px] text-[#6B6A63]">
                  General knowledge mode • Attach an artifact for detailed materials & pricing
                </p>
              </div>
            </div>
          )}

          <button
            onClick={() => setShowArtifactPicker(!showArtifactPicker)}
            className="text-[11px] font-semibold text-[#B85C38] hover:text-[#9E4928] px-2.5 py-1 rounded-md border border-[#B85C38]/30 bg-white/80 hover:bg-white shrink-0 transition-colors"
          >
            {showArtifactPicker ? 'Close Picker' : 'Switch Craft'}
          </button>
        </div>

        {/* Artifact Switcher Dropdown Modal */}
        {showArtifactPicker && (
          <div className="p-4 bg-white border-b border-[#E5DED3] space-y-3 shrink-0 max-h-64 overflow-y-auto animate-fade-in shadow-inner">
            <div className="relative">
              <Search className="w-4 h-4 text-[#78816A] absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search across 300+ crafts or districts..."
                value={artifactSearchQuery}
                onChange={e => setArtifactSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-[#E5DED3] bg-[#FAF8F5] focus:outline-none focus:border-[#B85C38]"
              />
            </div>

            <div className="space-y-1">
              <button
                onClick={() => {
                  setActiveArtifact(null);
                  setShowArtifactPicker(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors ${
                  !activeArtifact ? 'bg-[#244C3A] text-white' : 'hover:bg-[#FAF8F5] text-[#252722]'
                }`}
              >
                <span>🌍 General Odisha Crafts (No specific item)</span>
                {!activeArtifact && <ShieldCheck className="w-3.5 h-3.5 text-white" />}
              </button>

              {filteredArtifacts.slice(0, 15).map(art => (
                <button
                  key={art.id}
                  onClick={() => handleSelectArtifact(art)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs flex items-center justify-between transition-colors ${
                    activeArtifact?.id === art.id
                      ? 'bg-[#244C3A] text-white font-bold'
                      : 'hover:bg-[#FAF8F5] text-[#252722]'
                  }`}
                >
                  <div className="truncate pr-2">
                    <span className="block truncate">{art.name}</span>
                    <span className={`text-[10px] ${activeArtifact?.id === art.id ? 'text-white/80' : 'text-[#6B6A63]'}`}>
                      {art.district} District • {art.category}
                    </span>
                  </div>
                  <span className={`text-[10px] font-mono shrink-0 ${activeArtifact?.id === art.id ? 'text-white' : 'text-[#B85C38]'}`}>
                    {art.priceDisplay}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Scrollable Conversation History */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-2">
          {messages.map(msg => (
            <ShilpaMessageBubble
              key={msg.id}
              message={msg}
              onAskQuestion={handleQuestionChipClick}
              onSpeak={speakMessage}
              isSpeaking={isSpeaking}
            />
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex items-center gap-3 mb-4 animate-fade-in">
              <div className="w-8 h-8 rounded-full overflow-hidden border border-[#B85C38]/40 shrink-0 bg-white">
                <img src={logoImg} alt="SHILPA" className="w-full h-full object-cover" />
              </div>
              <div className="bg-white rounded-2xl rounded-tl-xs px-4 py-3 border border-[#E5DED3] shadow-xs flex items-center gap-1.5">
                <span className="text-xs text-[#78816A] mr-1">Consulting craft records</span>
                <span className="w-2 h-2 rounded-full bg-[#B85C38] animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 rounded-full bg-[#B85C38] animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 rounded-full bg-[#B85C38] animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Question Chips Footer */}
        {suggestedQuestions.length > 0 && (
          <div className="px-4 py-2 border-t border-[#E5DED3]/60 bg-white/60">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#6B6A63] block mb-1.5">
              Suggested Questions for this Craft:
            </span>
            <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
              {suggestedQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleQuestionChipClick(q)}
                  disabled={isTyping}
                  className="whitespace-nowrap text-[11px] px-3 py-1.5 rounded-full bg-white hover:bg-[#B85C38] hover:text-white text-[#244C3A] border border-[#E5DED3] transition-colors shadow-2xs font-medium disabled:opacity-50 shrink-0"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Bar & Controls */}
        <div className="p-4 bg-white border-t border-[#E5DED3] shrink-0">
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <div className="relative flex-1">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={e => setInputMessage(e.target.value)}
                placeholder={activeArtifact ? `Ask about ${activeArtifact.name}...` : "Ask SHILPA about materials, process, or pricing..."}
                disabled={isTyping}
                className="w-full pl-3.5 pr-10 py-2.5 text-xs sm:text-sm rounded-xl border border-[#E5DED3] bg-[#FAF8F5] focus:outline-none focus:border-[#B85C38] transition-colors text-[#252722] placeholder:text-[#78816A] disabled:opacity-50"
              />

              {voiceSupported && (
                <button
                  type="button"
                  onClick={handleToggleVoice}
                  className={`absolute right-2.5 top-2.5 p-1 rounded-md transition-colors ${
                    isRecording
                      ? 'text-red-600 animate-pulse bg-red-50'
                      : 'text-[#78816A] hover:text-[#B85C38]'
                  }`}
                  title={isRecording ? 'Listening... click to stop' : 'Ask with voice'}
                >
                  {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </button>
              )}
            </div>

            <button
              type="submit"
              disabled={!inputMessage.trim() || isTyping}
              className="p-2.5 sm:px-4 sm:py-2.5 rounded-xl bg-[#B85C38] hover:bg-[#9E4928] text-white disabled:opacity-40 disabled:hover:bg-[#B85C38] transition-colors flex items-center gap-1.5 shadow-xs font-semibold text-xs"
              title="Send question"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">Ask</span>
            </button>
          </form>

          {/* Verification Disclaimer */}
          <div className="mt-2 text-center">
            <span className="text-[10px] text-[#78816A]">
              AI-generated responses are grounded in verified Odisha craft records. Consult artisans or cooperatives for commercial transactions.
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};
