import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  Mail,
  Send,
  X,
  ChevronDown,
  ExternalLink,
  CheckCircle2,
  Phone,
  User,
  Bot,
  Calendar,
  Sparkles,
  RotateCcw,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ClinicConfig } from '../types/clinic';
import { smoothEasing } from './SectionTransition';

interface LiveChatWidgetProps {
  config: ClinicConfig;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  onBookTreatment?: (treatmentName?: string) => void;
}

interface AiMessageItem {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  recommendedTreatment?: string;
  followUpQuestions?: string[];
}

interface DirectThreadItem {
  id: string;
  sender: 'clinic' | 'user';
  text: string;
  timestamp: string;
  channel?: 'whatsapp' | 'email';
  topic?: string;
  actionUrl?: string;
  secondaryEmailUrl?: string;
  secondaryWhatsappUrl?: string;
}

const INITIAL_AI_SUGGESTIONS = [
  'I have tooth pain — what should I do?',
  'Tell me about Smile Makeovers & Veneers',
  'How do 3D Dental Implants work?',
  'What are your clinic hours & location?',
];

const QUICK_TOPICS = [
  'Book Consultation',
  'Treatment Cost',
  'Tooth Pain / Urgent',
  'Clinic Timings',
];

export const LiveChatWidget: React.FC<LiveChatWidgetProps> = ({
  config,
  isOpen,
  onClose,
  onBookTreatment,
}) => {
  const [activeMode, setActiveMode] = useState<'ai' | 'direct'>('ai');

  // --- 24/7 AI Agent State ---
  const [aiInput, setAiInput] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [aiMessages, setAiMessages] = useState<AiMessageItem[]>([
    {
      id: 'ai-welcome',
      sender: 'ai',
      text: `Hello! I am ${config.doctorName}'s 24/7 AI Dental Agent at ${config.clinicName}. Ask me anything about treatments, tooth pain relief, smile makeovers, dental implants, or appointment availability in Chandigarh.`,
      timestamp: '24/7 Active',
      recommendedTreatment: 'General Check-up',
      followUpQuestions: INITIAL_AI_SUGGESTIONS,
    },
  ]);

  // --- Direct WhatsApp / Email State ---
  const [channel, setChannel] = useState<'whatsapp' | 'email'>('whatsapp');
  const [selectedTopic, setSelectedTopic] = useState<string>('Book Consultation');
  const [senderName, setSenderName] = useState('');
  const [senderContact, setSenderContact] = useState('');
  const [messageText, setMessageText] = useState('');
  const [isSendingDirect, setIsSendingDirect] = useState(false);
  const [directThread, setDirectThread] = useState<DirectThreadItem[]>([
    {
      id: 'welcome-msg',
      sender: 'clinic',
      text: `Send a direct message below to connect with ${config.doctorName}'s support desk via WhatsApp (${config.clinicPhone}) or Support Email (${config.clinicEmail}).`,
      timestamp: 'Clinic Desk',
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const externalLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [aiMessages, directThread, isAiTyping, activeMode, isOpen]);

  // --- 24/7 AI Agent Handler ---
  const sendAiPrompt = async (promptText: string) => {
    const trimmed = promptText.trim();
    if (!trimmed || isAiTyping) return;

    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userItem: AiMessageItem = {
      id: `user-ai-${Date.now()}`,
      sender: 'user',
      text: trimmed,
      timestamp: nowTime,
    };

    const updatedHistory = [...aiMessages, userItem];
    setAiMessages(updatedHistory);
    setAiInput('');
    setIsAiTyping(true);

    try {
      const response = await fetch('/api/ai-agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: trimmed,
          history: updatedHistory.map((m) => ({
            sender: m.sender,
            text: m.text,
          })),
        }),
      });

      const data = await response.json();
      const aiReply: AiMessageItem = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text:
          data.reply ||
          `I can help you schedule a visit with ${config.doctorName} at ${config.clinicAddress}, ${config.city}. Call or WhatsApp us at ${config.clinicPhone}.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        recommendedTreatment: data.recommendedTreatment || 'General Check-up',
        followUpQuestions:
          Array.isArray(data.followUpQuestions) && data.followUpQuestions.length > 0
            ? data.followUpQuestions
            : ['Book an appointment', 'What are your clinic hours?'],
      };

      setAiMessages((prev) => [...prev, aiReply]);
    } catch {
      const fallbackReply: AiMessageItem = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: `At ${config.clinicName} in Sector 9-C, Chandigarh, ${config.doctorName} offers personalized preventive, restorative, and cosmetic dental treatments. Would you like to book a consultation or connect on WhatsApp (${config.clinicPhone})?`,
        timestamp: nowTime,
        recommendedTreatment: 'General Check-up',
        followUpQuestions: ['Book a consultation', 'Switch to Direct WhatsApp'],
      };
      setAiMessages((prev) => [...prev, fallbackReply]);
    } finally {
      setIsAiTyping(false);
    }
  };

  const handleAiFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendAiPrompt(aiInput);
  };

  const handleResetAiChat = () => {
    setAiMessages([
      {
        id: `ai-welcome-${Date.now()}`,
        sender: 'ai',
        text: `Hello! I am ${config.doctorName}'s 24/7 AI Dental Agent at ${config.clinicName}. Ask me anything about treatments, tooth pain relief, smile makeovers, dental implants, or appointment availability in Chandigarh.`,
        timestamp: '24/7 Active',
        recommendedTreatment: 'General Check-up',
        followUpQuestions: INITIAL_AI_SUGGESTIONS,
      },
    ]);
  };

  // --- Direct WhatsApp / Email Handlers ---
  const handleSelectTopic = (topic: string) => {
    setSelectedTopic(topic);
    if (!messageText.trim()) {
      const templates: Record<string, string> = {
        'Book Consultation': `Hi ${config.doctorName}, I would like to schedule a dental consultation at your Chandigarh clinic.`,
        'Treatment Cost': `Hi ${config.doctorName}, could you share an estimate and consultation details for dental treatment?`,
        'Tooth Pain / Urgent': `Hi ${config.doctorName}, I am experiencing tooth discomfort and need an urgent check-up slot.`,
        'Clinic Timings': `Hi ${config.doctorName}, please share your available appointment slots for this week.`,
      };
      setMessageText(templates[topic] || '');
    }
  };

  const buildDirectUrls = (name: string, contact: string, topic: string, msg: string) => {
    const cleanName = name.trim() || 'Website Visitor';
    const cleanContact = contact.trim();
    const waBody = `Hi ${config.doctorName},\n*Topic:* ${topic}\n*Name:* ${cleanName}\n${
      cleanContact ? `*Contact:* ${cleanContact}\n` : ''
    }*Message:* ${msg.trim()}`;

    const whatsappUrl = `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(waBody)}`;

    const emailSubject = `[Live Chat: ${topic}] Message from ${cleanName}`;
    const emailBody = `Hello ${config.doctorName} Support Team,\n\nName: ${cleanName}\nContact: ${
      cleanContact || 'Not provided'
    }\nTopic: ${topic}\n\nMessage:\n${msg.trim()}\n\n---\nSent via ${config.clinicName} Live Chat`;

    const mailtoUrl = `mailto:${config.clinicEmail}?subject=${encodeURIComponent(
      emailSubject
    )}&body=${encodeURIComponent(emailBody)}`;

    return { whatsappUrl, mailtoUrl };
  };

  const triggerAnchorNavigation = (url: string, isWhatsApp: boolean) => {
    if (!externalLinkRef.current) return;
    externalLinkRef.current.href = url;
    if (isWhatsApp) {
      externalLinkRef.current.target = '_blank';
      externalLinkRef.current.rel = 'noopener noreferrer';
    } else {
      externalLinkRef.current.removeAttribute('target');
      externalLinkRef.current.removeAttribute('rel');
    }
    externalLinkRef.current.click();
  };

  const handleSendDirectMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = messageText.trim();
    if (!trimmed || isSendingDirect) return;

    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const fallbackUrls = buildDirectUrls(senderName, senderContact, selectedTopic, trimmed);

    const userMsg: DirectThreadItem = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: trimmed,
      timestamp: nowTime,
      channel,
      topic: selectedTopic,
    };

    setDirectThread((prev) => [...prev, userMsg]);
    setMessageText('');
    setIsSendingDirect(true);

    try {
      const response = await fetch('/api/chat-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: senderName,
          contact: senderContact,
          channel,
          topic: selectedTopic,
          message: trimmed,
        }),
      });

      const data = await response.json();
      const targetWhatsappUrl = data.whatsappUrl || fallbackUrls.whatsappUrl;
      const targetMailtoUrl = data.mailtoUrl || fallbackUrls.mailtoUrl;
      const primaryUrl = channel === 'whatsapp' ? targetWhatsappUrl : targetMailtoUrl;

      const replyMsg: DirectThreadItem = {
        id: `clinic-${Date.now()}`,
        sender: 'clinic',
        text:
          data.reply ||
          (channel === 'whatsapp'
            ? `Your message is ready to send on WhatsApp (${config.clinicPhone}).`
            : `Your message is ready for our support email (${config.clinicEmail}).`),
        timestamp: nowTime,
        channel,
        actionUrl: primaryUrl,
        secondaryWhatsappUrl: targetWhatsappUrl,
        secondaryEmailUrl: targetMailtoUrl,
      };

      setDirectThread((prev) => [...prev, replyMsg]);
      triggerAnchorNavigation(primaryUrl, channel === 'whatsapp');
    } catch {
      const primaryUrl =
        channel === 'whatsapp' ? fallbackUrls.whatsappUrl : fallbackUrls.mailtoUrl;

      const replyMsg: DirectThreadItem = {
        id: `clinic-${Date.now()}`,
        sender: 'clinic',
        text:
          channel === 'whatsapp'
            ? `Your message is formatted for ${config.doctorName}'s WhatsApp desk (${config.clinicPhone}).`
            : `Your message is formatted for our support email (${config.clinicEmail}).`,
        timestamp: nowTime,
        channel,
        actionUrl: primaryUrl,
        secondaryWhatsappUrl: fallbackUrls.whatsappUrl,
        secondaryEmailUrl: fallbackUrls.mailtoUrl,
      };

      setDirectThread((prev) => [...prev, replyMsg]);
      triggerAnchorNavigation(primaryUrl, channel === 'whatsapp');
    } finally {
      setIsSendingDirect(false);
    }
  };

  return (
    <>
      {/* Hidden anchor for iframe-safe navigation to WhatsApp or mailto */}
      <a ref={externalLinkRef} className="hidden" aria-hidden="true">
        Launch
      </a>

      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ opacity: 0, y: 28, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.94 }}
            transition={{ duration: 0.3, ease: smoothEasing }}
            aria-label="24/7 AI Dental Agent & Clinic Chat"
            className="fixed bottom-20 lg:bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[410px] max-h-[calc(100vh-7.5rem)] flex flex-col rounded-3xl bg-[#FFFFFF] border border-[#D5E7ED] shadow-2xl shadow-[#16324F]/25 overflow-hidden"
          >
            {/* Top Header */}
            <div className="bg-[#16324F] text-[#FFFFFF] px-5 py-4 flex items-center justify-between border-b border-[#1D4268]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#10253B] border border-[#2A9D8F]/40 flex items-center justify-center text-[#2A9D8F] shrink-0">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-serif font-bold tracking-wide text-[#FFFFFF]">
                    {config.doctorName} 24/7 AI Concierge
                  </h3>
                  <p className="text-[11px] text-[#EAF4F7]">
                    Instant AI Guidance · WhatsApp · Email
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                {activeMode === 'ai' && aiMessages.length > 1 && (
                  <button
                    type="button"
                    onClick={handleResetAiChat}
                    className="p-2 rounded-xl text-[#EAF4F7] hover:text-white hover:bg-[#10253B] transition-colors cursor-pointer"
                    aria-label="Reset AI conversation"
                    title="Reset conversation"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={onClose}
                  className="p-2 rounded-xl text-[#EAF4F7] hover:text-white hover:bg-[#10253B] transition-colors cursor-pointer"
                  aria-label="Minimize chat"
                  title="Collapse chat"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="p-2 rounded-xl text-[#EAF4F7] hover:text-white hover:bg-[#10253B] transition-colors cursor-pointer"
                  aria-label="Close chat"
                  title="Close chat"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Mode Switcher: 24/7 AI Agent vs Direct WhatsApp/Email */}
            <div className="px-4 py-2 bg-[#EAF4F7] border-b border-[#D5E7ED] flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setActiveMode('ai')}
                className={`flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  activeMode === 'ai'
                    ? 'bg-[#16324F] text-[#FFFFFF] shadow-xs'
                    : 'text-[#667085] hover:text-[#16324F] hover:bg-[#D8ECF2]'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-[#2A9D8F]" />
                <span>24/7 AI Agent</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveMode('direct')}
                className={`flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  activeMode === 'direct'
                    ? 'bg-[#16324F] text-[#FFFFFF] shadow-xs'
                    : 'text-[#667085] hover:text-[#16324F] hover:bg-[#D8ECF2]'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#2A9D8F]" />
                <span>WhatsApp &amp; Email</span>
              </button>
            </div>

            {/* ==================== MODE 1: 24/7 AI DENTAL AGENT ==================== */}
            {activeMode === 'ai' ? (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[310px] sm:max-h-[340px] bg-gradient-to-b from-[#FFFFFF] to-[#FFFFFF]">
                  {aiMessages.map((msg, idx) => {
                    const isLatestAi =
                      msg.sender === 'ai' && idx === aiMessages.length - 1 && !isAiTyping;

                    return (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25 }}
                        className={`flex flex-col ${
                          msg.sender === 'user' ? 'items-end' : 'items-start'
                        }`}
                      >
                        <div
                          className={`max-w-[90%] rounded-2xl px-4 py-3 text-xs leading-relaxed ${
                            msg.sender === 'user'
                              ? 'bg-[#16324F] text-[#FFFFFF] rounded-br-xs shadow-sm'
                              : 'bg-[#EAF4F7] text-[#16324F] border border-[#D5E7ED] rounded-bl-xs'
                          }`}
                        >
                          <p className="whitespace-pre-line">{msg.text}</p>

                          {/* Action Buttons inside AI Response */}
                          {msg.sender === 'ai' && (
                            <div className="mt-3 pt-2.5 border-t border-[#D5E7ED] flex flex-wrap items-center gap-2">
                              {onBookTreatment && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    onClose();
                                    onBookTreatment(msg.recommendedTreatment || 'General Check-up');
                                  }}
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#16324F] hover:bg-[#10253B] text-[#FFFFFF] text-[11px] font-semibold transition-colors cursor-pointer whitespace-nowrap"
                                >
                                  <Calendar className="w-3 h-3 text-[#2A9D8F]" />
                                  <span>
                                    Book {msg.recommendedTreatment || 'Appointment'}
                                  </span>
                                </button>
                              )}

                              <button
                                type="button"
                                onClick={() => {
                                  setActiveMode('direct');
                                  setChannel('whatsapp');
                                }}
                                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-[#D5E7ED] hover:bg-[#D5E7ED] text-[#16324F] text-[11px] font-semibold transition-colors cursor-pointer whitespace-nowrap"
                              >
                                <MessageSquare className="w-3 h-3 text-[#16324F]" />
                                <span>WhatsApp Desk</span>
                              </button>
                            </div>
                          )}
                        </div>

                        <span className="text-[10px] text-[#667085] mt-1 px-1">
                          {msg.sender === 'user' ? 'You' : `${config.doctorName} AI Agent`} ·{' '}
                          {msg.timestamp}
                        </span>

                        {/* Suggested Follow-Up Prompts on Latest AI Message */}
                        {isLatestAi &&
                          msg.followUpQuestions &&
                          msg.followUpQuestions.length > 0 && (
                            <div className="mt-2.5 flex flex-wrap gap-1.5">
                              {msg.followUpQuestions.map((q) => (
                                <button
                                  key={q}
                                  type="button"
                                  onClick={() => sendAiPrompt(q)}
                                  className="text-left px-2.5 py-1.5 rounded-xl bg-[#EBE3D5] hover:bg-[#16324F] text-[#16324F] hover:text-[#FFFFFF] border border-[#D5E7ED] text-[11px] font-medium transition-colors cursor-pointer"
                                >
                                  {q}
                                </button>
                              ))}
                            </div>
                          )}
                      </motion.div>
                    );
                  })}

                  {/* AI Typing Indicator */}
                  {isAiTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-start"
                    >
                      <div className="px-4 py-3 rounded-2xl rounded-bl-xs bg-[#EAF4F7] border border-[#D5E7ED] text-xs text-[#667085] flex items-center gap-2">
                        <Bot className="w-3.5 h-3.5 text-[#2A9D8F]" />
                        <span>AI Concierge is preparing your answer...</span>
                      </div>
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* AI Prompt Composer */}
                <form
                  onSubmit={handleAiFormSubmit}
                  className="p-3.5 bg-[#FFFFFF] border-t border-[#D5E7ED] space-y-2"
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={aiInput}
                      onChange={(e) => setAiInput(e.target.value)}
                      placeholder="Ask about treatments, pain relief, timings..."
                      className="flex-1 px-3.5 py-2.5 text-xs rounded-xl bg-[#EAF4F7] border border-[#D5E7ED] text-[#16324F] placeholder-[#667085] focus:outline-none focus:border-[#16324F]"
                    />
                    <button
                      type="submit"
                      disabled={!aiInput.trim() || isAiTyping}
                      className="px-4 py-2.5 rounded-xl bg-[#16324F] hover:bg-[#10253B] disabled:opacity-50 text-[#FFFFFF] text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer shrink-0 shadow-sm border border-[#2A9D8F] whitespace-nowrap"
                    >
                      <Send className="w-3.5 h-3.5 text-[#2A9D8F]" />
                      <span>Ask AI</span>
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-[#667085] px-0.5">
                    <span>24/7 Instant Clinical Guidance</span>
                    <button
                      type="button"
                      onClick={() => setActiveMode('direct')}
                      className="text-[#2A9D8F] font-semibold hover:underline cursor-pointer"
                    >
                      Send to WhatsApp / Email
                    </button>
                  </div>
                </form>
              </>
            ) : (
              /* ==================== MODE 2: DIRECT WHATSAPP & EMAIL ==================== */
              <>
                {/* Sub-Selector: WhatsApp vs Support Email */}
                <div className="px-4 py-2 bg-[#FFFFFF] border-b border-[#D5E7ED] flex items-center justify-between gap-2">
                  <span className="text-[11px] font-semibold text-[#667085] whitespace-nowrap">
                    Channel:
                  </span>
                  <div className="flex items-center gap-1 p-1 rounded-xl bg-[#E6DDD0] flex-1">
                    <button
                      type="button"
                      onClick={() => setChannel('whatsapp')}
                      className={`flex-1 inline-flex items-center justify-center gap-1.5 py-1 px-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                        channel === 'whatsapp'
                          ? 'bg-[#16324F] text-[#FFFFFF] shadow-xs'
                          : 'text-[#667085] hover:text-[#16324F]'
                      }`}
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-[#2A9D8F]" />
                      <span>WhatsApp</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setChannel('email')}
                      className={`flex-1 inline-flex items-center justify-center gap-1.5 py-1 px-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                        channel === 'email'
                          ? 'bg-[#16324F] text-[#FFFFFF] shadow-xs'
                          : 'text-[#667085] hover:text-[#16324F]'
                      }`}
                    >
                      <Mail className="w-3.5 h-3.5 text-[#2A9D8F]" />
                      <span>Support Email</span>
                    </button>
                  </div>
                </div>

                {/* Direct Conversation Feed */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3.5 max-h-[240px] sm:max-h-[270px] bg-gradient-to-b from-[#FFFFFF] to-[#FFFFFF]">
                  {directThread.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25 }}
                      className={`flex flex-col ${
                        item.sender === 'user' ? 'items-end' : 'items-start'
                      }`}
                    >
                      <div
                        className={`max-w-[88%] rounded-2xl px-4 py-3 text-xs leading-relaxed ${
                          item.sender === 'user'
                            ? 'bg-[#16324F] text-[#FFFFFF] rounded-br-xs shadow-sm'
                            : 'bg-[#EAF4F7] text-[#16324F] border border-[#D5E7ED] rounded-bl-xs'
                        }`}
                      >
                        {item.topic && item.sender === 'user' && (
                          <div className="text-[10px] text-[#2A9D8F] font-semibold mb-1">
                            Topic: {item.topic}
                          </div>
                        )}
                        <p className="whitespace-pre-line">{item.text}</p>

                        {item.actionUrl && (
                          <div className="mt-3 pt-2.5 border-t border-[#D5E7ED] flex flex-col gap-2">
                            <a
                              href={item.actionUrl}
                              target={item.channel === 'whatsapp' ? '_blank' : undefined}
                              rel={
                                item.channel === 'whatsapp' ? 'noopener noreferrer' : undefined
                              }
                              className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#16324F] hover:bg-[#10253B] text-[#FFFFFF] text-[11px] font-semibold transition-colors"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#2A9D8F]" />
                              <span>
                                {item.channel === 'whatsapp'
                                  ? 'Open WhatsApp Now'
                                  : 'Open Email Client'}
                              </span>
                              <ExternalLink className="w-3 h-3 ml-0.5 opacity-80" />
                            </a>

                            <div className="flex items-center justify-between text-[10px] text-[#667085] px-0.5">
                              <a
                                href={item.secondaryWhatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline hover:text-[#16324F]"
                              >
                                WhatsApp ({config.clinicPhone})
                              </a>
                              <span>·</span>
                              <a
                                href={item.secondaryEmailUrl}
                                className="underline hover:text-[#16324F]"
                              >
                                Email ({config.clinicEmail})
                              </a>
                            </div>
                          </div>
                        )}
                      </div>
                      <span className="text-[10px] text-[#667085] mt-1 px-1">
                        {item.sender === 'user' ? 'You' : config.doctorName} · {item.timestamp}
                      </span>
                    </motion.div>
                  ))}

                  {/* Quick Topic Selector Buttons */}
                  <div className="pt-1">
                    <p className="text-[10px] font-semibold text-[#667085] mb-1.5">
                      Quick topics:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {QUICK_TOPICS.map((topic) => {
                        const active = selectedTopic === topic;
                        return (
                          <button
                            key={topic}
                            type="button"
                            onClick={() => handleSelectTopic(topic)}
                            className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors cursor-pointer ${
                              active
                                ? 'bg-[#16324F] text-[#FFFFFF]'
                                : 'bg-[#EBE3D5] text-[#3A473E] hover:bg-[#E1D6C5]'
                            }`}
                          >
                            {topic}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div ref={messagesEndRef} />
                </div>

                {/* Direct Composer Form */}
                <form
                  onSubmit={handleSendDirectMessage}
                  className="p-3.5 bg-[#FFFFFF] border-t border-[#D5E7ED] space-y-2.5"
                >
                  <div className="grid grid-cols-2 gap-2">
                    <div className="relative">
                      <User className="w-3.5 h-3.5 text-[#667085] absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="text"
                        value={senderName}
                        onChange={(e) => setSenderName(e.target.value)}
                        placeholder="Your name"
                        className="w-full pl-8 pr-2.5 py-1.5 text-xs rounded-xl bg-[#EAF4F7] border border-[#D5E7ED] text-[#16324F] placeholder-[#667085] focus:outline-none focus:border-[#16324F]"
                      />
                    </div>
                    <div className="relative">
                      <Phone className="w-3.5 h-3.5 text-[#667085] absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="text"
                        value={senderContact}
                        onChange={(e) => setSenderContact(e.target.value)}
                        placeholder={channel === 'email' ? 'Your email/phone' : 'Your phone'}
                        className="w-full pl-8 pr-2.5 py-1.5 text-xs rounded-xl bg-[#EAF4F7] border border-[#D5E7ED] text-[#16324F] placeholder-[#667085] focus:outline-none focus:border-[#16324F]"
                      />
                    </div>
                  </div>

                  <div className="flex items-end gap-2">
                    <textarea
                      rows={2}
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendDirectMessage(e);
                        }
                      }}
                      placeholder={
                        channel === 'whatsapp'
                          ? `Write a WhatsApp message to ${config.doctorName}...`
                          : `Write an email to ${config.clinicEmail}...`
                      }
                      className="flex-1 px-3 py-2 text-xs rounded-xl bg-[#EAF4F7] border border-[#D5E7ED] text-[#16324F] placeholder-[#667085] focus:outline-none focus:border-[#16324F] resize-none leading-relaxed"
                      required
                    />
                    <button
                      type="submit"
                      disabled={!messageText.trim() || isSendingDirect}
                      className="h-[52px] px-4 rounded-xl bg-[#16324F] hover:bg-[#10253B] disabled:opacity-50 text-[#FFFFFF] text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer shrink-0 shadow-sm border border-[#2A9D8F]"
                    >
                      <Send className="w-3.5 h-3.5 text-[#2A9D8F]" />
                      <span className="whitespace-nowrap">
                        {channel === 'whatsapp' ? 'WhatsApp' : 'Email'}
                      </span>
                    </button>
                  </div>
                </form>
              </>
            )}
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};
