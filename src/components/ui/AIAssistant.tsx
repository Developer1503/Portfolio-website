import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle, Send, Bot, User, Minimize2, Maximize2, X, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

interface AIAssistantProps {
  className?: string;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your AI assistant. I can help you learn more about the skills and technologies showcased on this portfolio. Ask me anything!",
      sender: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const quickReplies = [
    { text: "Tell me about Python skills", icon: "🐍" },
    { text: "What about React expertise?", icon: "⚛️" },
    { text: "AI/ML capabilities?", icon: "🤖" },
    { text: "Database experience?", icon: "🗄️" }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (messages.length > 1) {
      setShowSuggestions(false);
    }
  }, [messages]);

  const callHuggingFaceAPI = async (prompt: string): Promise<string> => {
    try {
      const apiToken = process.env.NEXT_PUBLIC_HUGGINGFACE_API_TOKEN;
      const model = process.env.NEXT_PUBLIC_HUGGINGFACE_MODEL || 'microsoft/DialoGPT-medium';

      // Using Hugging Face's free inference API
      const response = await fetch(
        `https://api-inference.huggingface.co/models/${model}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(apiToken && { 'Authorization': `Bearer ${apiToken}` })
          },
          body: JSON.stringify({
            inputs: {
              past_user_inputs: messages
                .filter(m => m.sender === 'user')
                .slice(-3)
                .map(m => m.text),
              generated_responses: messages
                .filter(m => m.sender === 'assistant')
                .slice(-3)
                .map(m => m.text),
              text: prompt
            },
            parameters: {
              max_length: 100,
              temperature: 0.7,
              do_sample: true,
              top_p: 0.9
            }
          })
        }
      );

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      return data.generated_text || "I'm sorry, I couldn't process that request. Could you try rephrasing?";
    } catch (error) {
      console.error('Hugging Face API error:', error);

      // Enhanced fallback responses for portfolio-specific questions
      const lowerPrompt = prompt.toLowerCase();

      if (lowerPrompt.includes('python')) {
        return "Python is one of the strongest skills here with 95% proficiency! It's used for backend development, data science, AI/ML projects, and automation. The experience includes frameworks like FastAPI, TensorFlow, and PyTorch.";
      }

      if (lowerPrompt.includes('react') || lowerPrompt.includes('javascript') || lowerPrompt.includes('typescript')) {
        return "Frontend development is a core strength! React (94% proficiency) and TypeScript (92%) are used for building modern, interactive web applications. The tech stack includes Next.js for full-stack development.";
      }

      if (lowerPrompt.includes('database') || lowerPrompt.includes('sql')) {
        return "Database expertise spans multiple technologies: PostgreSQL (88%), MongoDB (87%), MySQL (85%), and Redis (82%). This covers both relational and NoSQL databases for different use cases.";
      }

      if (lowerPrompt.includes('ai') || lowerPrompt.includes('machine learning') || lowerPrompt.includes('ml')) {
        return "AI/ML capabilities include TensorFlow (87%), PyTorch (83%), and Scikit-learn (90%). These are used for building intelligent applications, data analysis, and predictive models.";
      }

      if (lowerPrompt.includes('cloud') || lowerPrompt.includes('aws') || lowerPrompt.includes('docker')) {
        return "Cloud and DevOps skills include AWS (82%), Docker (88%), Kubernetes (75%), and Terraform (70%). This enables scalable, containerized deployments and infrastructure as code.";
      }

      if (lowerPrompt.includes('skill') || lowerPrompt.includes('technology')) {
        return "The portfolio showcases 24+ technologies across 4 categories: 6 programming languages (Python, TypeScript, JavaScript leading), 8 frameworks (React, Next.js, TensorFlow), 4 databases, and 6 development tools.";
      }

      if (lowerPrompt.includes('experience') || lowerPrompt.includes('project')) {
        return "The skills demonstrate full-stack development expertise with strong backend (Python, Node.js), frontend (React, TypeScript), and AI/ML capabilities. Proficiency levels range from 70-95%, showing deep knowledge across the stack.";
      }

      if (lowerPrompt.includes('contact') || lowerPrompt.includes('hire') || lowerPrompt.includes('work')) {
        return "Interested in collaboration? The portfolio shows expertise in modern web development, AI/ML, and cloud technologies. Check the contact section to get in touch for opportunities!";
      }

      if (lowerPrompt.includes('hello') || lowerPrompt.includes('hi') || lowerPrompt.includes('hey')) {
        return "Hello! I'm here to help you explore this portfolio's technical skills. Ask me about specific technologies like Python, React, AI/ML, databases, or anything else you'd like to know!";
      }

      if (lowerPrompt.includes('what') || lowerPrompt.includes('tell me')) {
        return "This portfolio showcases a modern full-stack developer with expertise in Python (95%), React (94%), TypeScript (92%), and AI/ML technologies. The skills span web development, data science, and cloud platforms. What specific area interests you?";
      }

      return "I'm your portfolio guide! Ask me about specific technologies (Python, React, AI/ML), skill levels, project experience, or anything else you'd like to know about the technical capabilities showcased here.";
    }
  };

  const handleSendMessage = async (text?: string) => {
    const messageText = text || inputText.trim();
    if (!messageText || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await callHuggingFaceAPI(messageText);

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'assistant',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm experiencing some technical difficulties. Please try again in a moment.",
        sender: 'assistant',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickReply = (text: string) => {
    handleSendMessage(text);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) {
    return (
      <div className={`fixed bottom-6 right-6 z-50 ${className}`}>
        <div className="relative group">
          {/* Pulse ring animation */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 opacity-75 blur-md group-hover:blur-lg animate-pulse"></div>

          <Button
            onClick={() => setIsOpen(true)}
            className="relative w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 via-pink-600 to-rose-600 hover:from-purple-500 hover:via-pink-500 hover:to-rose-500 shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-110 border-2 border-white/20"
          >
            <div className="relative">
              <MessageCircle className="w-7 h-7 text-white" />
              <Sparkles className="w-3 h-3 text-yellow-300 absolute -top-1 -right-1 animate-pulse" />
            </div>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 ${className}`}>
      <Card className={`w-[420px] bg-gradient-to-br from-gray-900/95 via-gray-900/95 to-purple-900/95 backdrop-blur-xl border border-purple-500/30 shadow-2xl shadow-purple-500/20 transition-all duration-300 ${isMinimized ? 'h-16' : 'h-[600px]'
        } rounded-2xl overflow-hidden`}>
        {/* Animated gradient border */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 opacity-20 blur-xl"></div>

        <CardHeader className="relative flex flex-row items-center justify-between p-4 border-b border-purple-500/20 bg-black/30">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-rose-500 flex items-center justify-center shadow-lg">
                <Bot className="w-5 h-5 text-white" />
              </div>
              {/* Online indicator */}
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-gray-900 animate-pulse"></div>
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                AI Assistant
                <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
              </h3>
              <p className="text-xs text-gray-400">Online • Ready to help</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMinimized(!isMinimized)}
              className="w-8 h-8 p-0 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
            >
              {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 p-0 text-gray-400 hover:text-white hover:bg-red-500/20 rounded-lg transition-all duration-200"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>

        {!isMinimized && (
          <CardContent className="relative p-0 flex flex-col h-[calc(100%-80px)]">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-purple-500/50 scrollbar-track-transparent">
              {messages.map((message, index) => (
                <div
                  key={message.id}
                  className={`flex items-start gap-3 animate-fadeIn ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                    }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg ${message.sender === 'user'
                      ? 'bg-gradient-to-br from-blue-500 to-cyan-500'
                      : 'bg-gradient-to-br from-purple-500 via-pink-500 to-rose-500'
                    }`}>
                    {message.sender === 'user' ? (
                      <User className="w-4 h-4 text-white" />
                    ) : (
                      <Bot className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <div className={`max-w-[75%] p-3 rounded-2xl text-sm leading-relaxed shadow-lg transition-all duration-200 hover:scale-[1.02] ${message.sender === 'user'
                      ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-tr-sm'
                      : 'bg-gradient-to-br from-gray-800 to-gray-900 text-gray-100 border border-gray-700/50 rounded-tl-sm'
                    }`}>
                    {message.text}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex items-start gap-3 animate-fadeIn">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-rose-500 flex items-center justify-center shadow-lg">
                    <Bot className="w-4 h-4 text-white animate-pulse" />
                  </div>
                  <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 p-3 rounded-2xl rounded-tl-sm shadow-lg">
                    <div className="flex space-x-2">
                      <div className="w-2.5 h-2.5 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-bounce"></div>
                      <div className="w-2.5 h-2.5 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></div>
                      <div className="w-2.5 h-2.5 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
                    </div>
                  </div>
                </div>
              )}

              {/* Quick Replies */}
              {showSuggestions && !isLoading && (
                <div className="space-y-2 animate-fadeIn">
                  <p className="text-xs text-gray-400 font-medium px-2">Suggested questions:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {quickReplies.map((reply, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuickReply(reply.text)}
                        className="group flex items-center gap-2 p-2.5 bg-gradient-to-br from-purple-500/10 to-pink-500/10 hover:from-purple-500/20 hover:to-pink-500/20 border border-purple-500/20 hover:border-purple-500/40 rounded-xl text-xs text-gray-300 hover:text-white transition-all duration-200 hover:scale-105 shadow-sm hover:shadow-md"
                      >
                        <span className="text-lg group-hover:scale-110 transition-transform duration-200">{reply.icon}</span>
                        <span className="text-left">{reply.text}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-purple-500/20 bg-black/30 backdrop-blur-sm">
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything..."
                    className="w-full px-4 py-3 bg-gray-800/80 border border-gray-600/50 rounded-xl text-white text-sm placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition-all duration-200 shadow-inner"
                    disabled={isLoading}
                  />
                  {/* Focus glow effect */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 blur-md -z-10 transition-opacity duration-200 peer-focus:opacity-20"></div>
                </div>
                <Button
                  onClick={() => handleSendMessage()}
                  disabled={!inputText.trim() || isLoading}
                  className="px-4 py-3 bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 hover:from-purple-500 hover:via-pink-500 hover:to-rose-500 disabled:from-gray-700 disabled:to-gray-800 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl shadow-lg hover:shadow-purple-500/50 transition-all duration-200 hover:scale-105"
                >
                  <Send className="w-5 h-5" />
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">Press Enter to send • Shift + Enter for new line</p>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default AIAssistant;