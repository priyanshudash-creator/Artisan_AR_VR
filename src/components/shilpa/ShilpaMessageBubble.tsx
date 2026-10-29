import React, { useState } from 'react';
import { Volume2, VolumeX, Copy, Check, ExternalLink, AlertTriangle, ShieldCheck, Sparkles, BookOpen } from 'lucide-react';
import { ShilpaMessage } from '../../types/shilpa';
import logoImg from '../../assets/logo.jpg';

interface ShilpaMessageBubbleProps {
  message: ShilpaMessage;
  onAskQuestion?: (q: string) => void;
  onSpeak?: (text: string) => void;
  isSpeaking?: boolean;
}

export const ShilpaMessageBubble: React.FC<ShilpaMessageBubbleProps> = ({
  message,
  onAskQuestion,
  onSpeak,
  isSpeaking = false
}) => {
  const isUser = message.role === 'user';
  const [copied, setCopied] = useState(false);
  const [showSources, setShowSources] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Clean raw markdown tables (|), raw asterisks (*), and format into clean text
  const sanitizeMessageContent = (text: string): string => {
    if (!text) return '';

    const lines = text.split('\n');
    const resultLines: string[] = [];
    let inTable = false;
    let tableHeaders: string[] = [];
    const tableRows: string[][] = [];

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
          tableHeaders = cells;
          inTable = true;
        } else {
          tableRows.push(cells);
        }
        continue;
      }

      if (inTable || tableHeaders.length > 0) {
        flushTable();
      }

      resultLines.push(lines[i]);
    }

    if (inTable || tableHeaders.length > 0) {
      flushTable();
    }

    let cleaned = resultLines.join('\n');

    // Remove markdown asterisks (*italic* or **bold**) while preserving the words
    cleaned = cleaned.replace(/\*\*([^*]+)\*\*/g, '$1');
    cleaned = cleaned.replace(/\*([^*]+)\*/g, '$1');
    cleaned = cleaned.replace(/^\s*\*\s+/gm, '• ');
    cleaned = cleaned.replace(/\*/g, '');
    cleaned = cleaned.replace(/\s*\|\s*/g, ' — ');
    cleaned = cleaned.replace(/\|/g, '');

    // Strictly strip any "What is unknown" section and its bullet lines
    const filteredLines: string[] = [];
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
  };

  // Render clean text with museum-quality typography and clear badges
  const renderFormattedContent = (content: string) => {
    const sanitized = sanitizeMessageContent(content);
    const lines = sanitized.split('\n');

    return lines.map((rawLine, idx) => {
      const line = rawLine.trim();

      if (!line) {
        return <div key={idx} className="h-1.5" />;
      }

      // Section Headings: Answer, What the records say, Source
      if (/^Answer:?$/i.test(line)) {
        return (
          <div key={idx} className="pt-0.5 pb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#244C3A]/10 text-[#244C3A] font-serif font-bold text-xs uppercase tracking-wider">
              Answer
            </span>
          </div>
        );
      }

      if (/^What the records say:?$/i.test(line)) {
        return (
          <div key={idx} className="pt-2.5 pb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-emerald-50 border border-emerald-200 text-emerald-800 font-semibold text-xs tracking-wide">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              What the records say
            </span>
          </div>
        );
      }

      if (/^Source:?$/i.test(line)) {
        return (
          <div key={idx} className="pt-2.5 pb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-stone-100 border border-stone-200 text-stone-700 font-semibold text-xs tracking-wide">
              <BookOpen className="w-3.5 h-3.5 text-stone-600" />
              Source
            </span>
          </div>
        );
      }

      // Bullet Item (Main item)
      if (rawLine.trim().startsWith('• ') || rawLine.trim().startsWith('- ')) {
        const itemText = rawLine.trim().replace(/^[•-]\s*/, '');
        return (
          <div key={idx} className="flex items-start gap-2 my-1 text-xs sm:text-sm text-[#252722] leading-relaxed">
            <span className="text-[#B85C38] font-bold text-base leading-none shrink-0">•</span>
            <div className="font-semibold text-[#244C3A]">{itemText}</div>
          </div>
        );
      }

      // Sub-bullet / Indented property line (e.g. "Key Features & Materials: ...")
      if (rawLine.startsWith('  ') && rawLine.includes(':')) {
        const colonIdx = rawLine.indexOf(':');
        const label = rawLine.slice(0, colonIdx).trim();
        const value = rawLine.slice(colonIdx + 1).trim();
        return (
          <div key={idx} className="ml-5 pl-2.5 my-1 border-l-2 border-[#E5DED3] text-xs sm:text-[13px] leading-relaxed text-[#4A4F41]">
            <span className="font-semibold text-[#244C3A]">{label}: </span>
            <span className="text-[#252722]">{value}</span>
          </div>
        );
      }

      // Regular clean paragraph
      return (
        <p 
          key={idx} 
          className="text-xs sm:text-sm text-[#252722] leading-relaxed my-1"
        >
          {line}
        </p>
      );
    });
  };

  if (isUser) {
    return (
      <div className="flex justify-end mb-4 animate-fade-in">
        <div className="max-w-[82%] sm:max-w-[75%] rounded-2xl rounded-tr-xs px-4 py-3 bg-[#B85C38] text-white shadow-xs">
          <p className="text-xs sm:text-sm font-medium leading-relaxed">{message.content}</p>
          <span className="block text-[10px] text-white/70 text-right mt-1.5">{message.timestamp}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3 mb-6 animate-fade-in group">
      {/* SHILPA Konark Wheel Logo Thumbnail Avatar */}
      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border-2 border-[#B85C38]/40 shadow-xs shrink-0 bg-white">
        <img 
          src={logoImg} 
          alt="SHILPA Konark Wheel Logo" 
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1 max-w-[88%] sm:max-w-[82%] space-y-2.5">
        {/* Assistant Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="font-serif font-bold text-xs sm:text-sm text-[#244C3A]">SHILPA</span>
            <span className="text-[10px] font-semibold text-[#B85C38] bg-[#FAF8F5] border border-[#E5DED3] px-1.5 py-0.5 rounded">
              Craft Guide
            </span>
          </div>
          <span className="text-[10px] text-[#78816A]">{message.timestamp}</span>
        </div>

        {/* Message Body Card */}
        <div className="bg-white rounded-2xl rounded-tl-xs p-4 sm:p-5 border border-[#E5DED3] shadow-xs">
          {/* Main Formatted Content */}
          <div className="space-y-1">
            {renderFormattedContent(message.content)}
          </div>

          {/* Limitations / What is unknown Banner */}
          {message.limitations && message.limitations.length > 0 && (
            <div className="mt-3.5 pt-3 border-t border-amber-200/80 bg-amber-50/70 rounded-xl p-3">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div className="text-xs text-amber-900 leading-relaxed">
                  <span className="font-bold block text-[11px] uppercase tracking-wider text-amber-800">
                    Craft Registry Note
                  </span>
                  <ul className="list-disc ml-3.5 mt-1 space-y-1 text-[11px]">
                    {message.limitations.map((lim, i) => (
                      <li key={i}>{lim}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Verified Sources Toggle */}
          {message.sources && message.sources.length > 0 && (
            <div className="mt-3 pt-2.5 border-t border-[#E5DED3]">
              <button
                onClick={() => setShowSources(!showSources)}
                className="text-[11px] font-bold text-[#244C3A] hover:text-[#B85C38] flex items-center gap-1.5 transition-colors"
              >
                <BookOpen className="w-3.5 h-3.5 text-[#B85C38]" />
                <span>{showSources ? 'Hide Verified Sources' : `Show Verified Sources (${message.sources.length})`}</span>
              </button>

              {showSources && (
                <div className="mt-2 space-y-1.5 pl-1">
                  {message.sources.map((src, i) => (
                    <a
                      key={i}
                      href={src.url}
                      target={src.url.startsWith('http') ? '_blank' : '_self'}
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-2 rounded-lg bg-[#FAF8F5] border border-[#E5DED3] hover:border-[#B85C38] text-[11px] text-[#244C3A] group/link transition-colors"
                    >
                      <span className="font-medium truncate pr-2 flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="truncate">{src.title}</span>
                      </span>
                      <ExternalLink className="w-3 h-3 text-[#78816A] group-hover/link:text-[#B85C38] shrink-0" />
                    </a>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Bottom Action Strip: Voice & Copy */}
          <div className="mt-3 pt-2 border-t border-[#E5DED3]/60 flex items-center justify-between text-[11px] text-[#78816A]">
            <span className="text-[10px]">
              {message.modelUsed ? `Model: ${message.modelUsed}` : 'Grounded Dataset'}
            </span>

            <div className="flex items-center gap-2">
              {onSpeak && (
                <button
                  onClick={() => onSpeak(message.content)}
                  className="p-1 rounded hover:bg-[#FAF8F5] text-[#78816A] hover:text-[#244C3A] transition-colors"
                  title={isSpeaking ? 'Stop speech' : 'Listen with voice'}
                >
                  {isSpeaking ? (
                    <VolumeX className="w-3.5 h-3.5 text-[#B85C38] animate-pulse" />
                  ) : (
                    <Volume2 className="w-3.5 h-3.5" />
                  )}
                </button>
              )}

              <button
                onClick={handleCopy}
                className="p-1 rounded hover:bg-[#FAF8F5] text-[#78816A] hover:text-[#244C3A] transition-colors"
                title="Copy response"
              >
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Suggested Question Chips (if attached to this message) */}
        {message.suggestedQuestions && message.suggestedQuestions.length > 0 && onAskQuestion && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {message.suggestedQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => onAskQuestion(q)}
                className="text-left text-[11px] px-3 py-1.5 rounded-full bg-white hover:bg-[#B85C38] hover:text-white text-[#244C3A] border border-[#E5DED3] font-medium transition-all shadow-2xs flex items-center gap-1 group/chip"
              >
                <Sparkles className="w-3 h-3 text-[#B85C38] group-hover/chip:text-white shrink-0" />
                <span>{q}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
