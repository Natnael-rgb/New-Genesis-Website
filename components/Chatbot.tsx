import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Cpu, Zap, Volume2, Loader2 } from 'lucide-react';
import { generateResponse, generateSpeech } from '../services/geminiService';
import { playPcmAudio } from '../services/audioUtils';
import { ChatMessage, ModelMode } from '../types';

export const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: 'Hi! I am the Genesis AI assistant. Ask me about our web development, design services, or pricing.',
      timestamp: Date.now()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<ModelMode>(ModelMode.FAST);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const responseText = await generateResponse(userMsg.text, mode);
      
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        isThinking: mode === ModelMode.THINKING,
        timestamp: Date.now()
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'model',
        text: "I'm sorry, I encountered an error connecting to Genesis AI services.",
        timestamp: Date.now()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTTS = async (text: string) => {
    try {
        // Optimistic UI or loading state for audio could go here
        const audioBase64 = await generateSpeech(text);
        if (audioBase64) {
            await playPcmAudio(audioBase64);
        }
    } catch (e) {
        console.error("Audio playback failed", e);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-[350px] sm:w-[400px] h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden transition-all transform origin-bottom-right">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-genesis-dark to-gray-800 p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-2">
              <div className="relative">
                 <div className="w-3 h-3 bg-green-400 rounded-full absolute bottom-0 right-0 border-2 border-gray-800"></div>
                 <Cpu className="text-genesis-cyan" size={24} />
              </div>
              <div>
                <h3 className="font-bold text-sm">Genesis AI</h3>
                <p className="text-[10px] text-gray-300">Powered by Gemini 3 Pro & 2.5 Flash</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-1 rounded">
              <X size={20} />
            </button>
          </div>

          {/* Mode Toggle */}
          <div className="bg-gray-50 border-b border-gray-200 p-2 flex gap-2">
             <button 
                onClick={() => setMode(ModelMode.FAST)}
                className={`flex-1 flex items-center justify-center gap-2 text-xs py-1.5 rounded-md transition-colors ${mode === ModelMode.FAST ? 'bg-genesis-cyan text-white shadow-md' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-100'}`}
             >
                <Zap size={14} /> Fast (Flash Lite)
             </button>
             <button 
                onClick={() => setMode(ModelMode.THINKING)}
                className={`flex-1 flex items-center justify-center gap-2 text-xs py-1.5 rounded-md transition-colors ${mode === ModelMode.THINKING ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-100'}`}
             >
                <Cpu size={14} /> Thinking (3 Pro)
             </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl p-3 text-sm shadow-sm relative group ${
                  msg.role === 'user' 
                    ? 'bg-genesis-cyan text-white rounded-br-none' 
                    : 'bg-white border border-gray-100 text-gray-800 rounded-bl-none'
                }`}>
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                  
                  {msg.role === 'model' && (
                     <div className="mt-2 flex items-center justify-between border-t border-gray-100 pt-2 opacity-100 transition-opacity">
                        <span className="text-[10px] text-gray-400 flex items-center gap-1">
                            {msg.isThinking ? <Cpu size={10} className="text-indigo-500" /> : <Zap size={10} className="text-genesis-cyan" />}
                            {msg.isThinking ? 'Deep Thought' : 'Instant'}
                        </span>
                        <button 
                            onClick={() => handleTTS(msg.text)}
                            className="p-1 hover:bg-gray-100 rounded-full text-genesis-red transition-colors"
                            title="Read Aloud"
                        >
                            <Volume2 size={14} />
                        </button>
                     </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-none p-4 shadow-sm">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-genesis-cyan rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-genesis-cyan rounded-full animate-bounce delay-75"></div>
                    <div className="w-2 h-2 bg-genesis-cyan rounded-full animate-bounce delay-150"></div>
                  </div>
                  {mode === ModelMode.THINKING && (
                    <p className="text-[10px] text-indigo-500 mt-2 font-medium animate-pulse">Thinking deeply...</p>
                  )}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-white border-t border-gray-100">
            <div className="flex items-center gap-2 bg-gray-50 rounded-full px-4 py-2 border border-gray-200 focus-within:border-genesis-cyan focus-within:ring-1 focus-within:ring-genesis-cyan/20 transition-all">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your message..."
                className="flex-1 bg-transparent border-none focus:outline-none text-sm"
                disabled={isLoading}
              />
              <button 
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className={`p-1.5 rounded-full transition-colors ${input.trim() ? 'text-genesis-cyan hover:bg-blue-50' : 'text-gray-300'}`}
              >
                {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
              </button>
            </div>
          </div>

        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="h-14 w-14 rounded-full bg-genesis-cyan hover:bg-cyan-500 text-white shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 flex items-center justify-center group"
      >
        {isOpen ? (
          <X size={28} className="transform group-hover:rotate-90 transition-transform duration-300" />
        ) : (
          <MessageCircle size={28} className="transform group-hover:scale-110 transition-transform duration-300" />
        )}
      </button>
    </div>
  );
};
