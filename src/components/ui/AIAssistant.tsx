import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle, Send, Bot, User, Minimize2, Maximize2, X } from 'lucide-react';

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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
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

  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await callHuggingFaceAPI(inputText.trim());
      
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

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) {
    return (
      <div className={`fixed bottom-6 right-6 z-50 ${className}`}>
        <Button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        >
          <MessageCircle className="w-6 h-6 text-white" />
        </Button>
      </div>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 ${className}`}>
      <Card className={`w-80 bg-black/90 backdrop-blur-sm border-purple-500/30 shadow-2xl transition-all duration-300 ${
        isMinimized ? 'h-14' : 'h-96'
      }`}>
        <CardHeader className="flex flex-row items-center justify-between p-4 border-b border-purple-500/20">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-sm font-semibold text-white">AI Assistant</h3>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMinimized(!isMinimized)}
              className="w-6 h-6 p-0 text-gray-400 hover:text-white"
            >
              {isMinimized ? <Maximize2 className="w-3 h-3" /> : <Minimize2 className="w-3 h-3" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="w-6 h-6 p-0 text-gray-400 hover:text-white"
            >
              <X className="w-3 h-3" />
            </Button>
          </div>
        </CardHeader>

        {!isMinimized && (
          <CardContent className="p-0 flex flex-col h-80">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start gap-2 ${
                    message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.sender === 'user' 
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500' 
                      : 'bg-gradient-to-r from-purple-500 to-pink-500'
                  }`}>
                    {message.sender === 'user' ? (
                      <User className="w-3 h-3 text-white" />
                    ) : (
                      <Bot className="w-3 h-3 text-white" />
                    )}
                  </div>
                  <div className={`max-w-[70%] p-2 rounded-lg text-sm ${
                    message.sender === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-800 text-gray-100 border border-gray-700'
                  }`}>
                    {message.text}
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                    <Bot className="w-3 h-3 text-white" />
                  </div>
                  <div className="bg-gray-800 border border-gray-700 p-2 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-purple-500/20">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me about the skills..."
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                  disabled={isLoading}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputText.trim() || isLoading}
                  className="px-3 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default AIAssistant;