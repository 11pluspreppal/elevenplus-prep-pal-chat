
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send } from "lucide-react";
import ChatMessage from "./ChatMessage";
import { Question, generateQuestion } from "@/utils/questionGenerator";
import { examSubjects, getSubjectById } from "@/utils/examTopics";
import SubjectSelector from "./SubjectSelector";
import TopicSelector from "./TopicSelector";
import { toast } from "sonner";

type Message = {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  question?: Question;
};

const INITIAL_MESSAGE: Message = {
  id: "welcome",
  content: "Hello! I'm your 11+ exam prep assistant. I can help you practice with questions for verbal reasoning, non-verbal reasoning, mathematics, and English. Select a subject to begin!",
  isUser: false,
  timestamp: new Date(),
};

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [inputValue, setInputValue] = useState("");
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const [generatedQuestions, setGeneratedQuestions] = useState<Question[]>([]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: inputValue,
      isUser: true,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    
    // Process user message
    processUserMessage(inputValue);
  };
  
  const processUserMessage = (message: string) => {
    const lowerMessage = message.toLowerCase();
    
    // If asking for a question
    if (lowerMessage.includes("question") || 
        lowerMessage.includes("give me") || 
        lowerMessage.includes("another") ||
        lowerMessage.includes("example") || 
        lowerMessage.includes("practice")) {
      
      if (selectedSubjectId && selectedTopicId) {
        generateQuestionForSelectedTopic();
      } else if (selectedSubjectId) {
        // Ask to select a topic
        const botMessage: Message = {
          id: `bot-${Date.now()}`,
          content: "Please select a topic first.",
          isUser: false,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, botMessage]);
      } else {
        // Ask to select a subject
        const botMessage: Message = {
          id: `bot-${Date.now()}`,
          content: "Please select a subject first.",
          isUser: false,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, botMessage]);
      }
    } 
    // If asking for help/instructions
    else if (lowerMessage.includes("help") || 
             lowerMessage.includes("how") || 
             lowerMessage.includes("instruction")) {
      
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        content: "I can help you practice for the 11+ exam!\n\n1. Select a subject (English, Mathematics, Verbal Reasoning, or Non-Verbal Reasoning)\n2. Choose a topic within that subject\n3. Ask for a question by typing something like 'Give me a question'\n4. You can attempt to answer the question and check your answer\n5. Ask for another question any time!",
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botMessage]);
    }
    // Generic response for other messages
    else {
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        content: "I'm here to help you practice for the 11+ exam. Please select a subject and topic, then ask for questions to practice!",
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botMessage]);
    }
  };
  
  const handleSelectSubject = (subjectId: string) => {
    setSelectedSubjectId(subjectId);
    setSelectedTopicId(null);
    
    const subject = getSubjectById(subjectId);
    if (subject) {
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        content: `Great! You've selected ${subject.name}. Now please choose a topic to practice.`,
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botMessage]);
    }
  };
  
  const handleSelectTopic = (topicId: string) => {
    setSelectedTopicId(topicId);
    
    const subject = getSubjectById(selectedSubjectId || "");
    const topic = subject?.topics.find(t => t.id === topicId);
    
    if (subject && topic) {
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        content: `You've selected ${topic.name} in ${subject.name}. Type "give me a question" to get a practice question.`,
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botMessage]);
    }
  };
  
  const generateQuestionForSelectedTopic = () => {
    if (!selectedSubjectId || !selectedTopicId) return;
    
    const question = generateQuestion(selectedSubjectId, selectedTopicId);
    
    if (question) {
      // Add to history
      setGeneratedQuestions(prev => [...prev, question]);
      
      // Create bot message with question
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        content: "Here's a practice question for you:",
        isUser: false,
        timestamp: new Date(),
        question: question,
      };
      
      setMessages(prev => [...prev, botMessage]);
    } else {
      // Fallback message if no question can be generated
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        content: "I'm having trouble generating a question for this topic. Please try another topic.",
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botMessage]);
    }
  };
  
  const handleSelectHistoryQuestion = (question: Question) => {
    // Show historical question again
    const botMessage: Message = {
      id: `bot-${Date.now()}`,
      content: "Here's the question you selected from history:",
      isUser: false,
      timestamp: new Date(),
      question: question,
    };
    
    setMessages(prev => [...prev, botMessage]);
    
    // Set the corresponding subject and topic
    setSelectedSubjectId(question.subjectId);
    setSelectedTopicId(question.topicId);
    
    toast.success("Question loaded from history");
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[calc(100vh-80px)]">
      {/* Left panel: Question history */}
      <div className="hidden md:block md:col-span-1 border rounded-lg overflow-hidden">
        <div className="border-b p-3">
          <h2 className="font-semibold">Question History</h2>
        </div>
        <QuestionHistory 
          questions={generatedQuestions}
          onSelectQuestion={handleSelectHistoryQuestion}
        />
      </div>
      
      {/* Main chat area */}
      <div className="col-span-1 md:col-span-3 border rounded-lg flex flex-col overflow-hidden">
        <div className="border-b p-3">
          <h1 className="font-semibold text-center">11+ Exam Prep Assistant</h1>
        </div>
        
        <div className="flex-1 flex flex-col p-4 overflow-hidden">
          {/* Subject selector */}
          <SubjectSelector 
            subjects={examSubjects}
            onSelectSubject={handleSelectSubject}
            selectedSubjectId={selectedSubjectId}
          />
          
          {/* Topic selector */}
          {selectedSubjectId && (
            <TopicSelector 
              topics={getSubjectById(selectedSubjectId)?.topics || []}
              selectedTopicId={selectedTopicId}
              onSelectTopic={handleSelectTopic}
            />
          )}
          
          {/* Chat messages */}
          <div className="flex-1 overflow-hidden mt-6">
            <ScrollArea className="h-[calc(100%-120px)]">
              <div className="space-y-4 p-2">
                {messages.map((message) => (
                  <ChatMessage
                    key={message.id}
                    isUser={message.isUser}
                    content={message.content}
                    timestamp={message.timestamp}
                    question={message.question}
                  />
                ))}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
          </div>
          
          {/* Input area */}
          <div className="mt-4 flex gap-2">
            <Input
              ref={inputRef}
              placeholder="Type your message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1"
            />
            <Button onClick={handleSendMessage} disabled={!inputValue.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Fix missing import for QuestionHistory
import QuestionHistory from "./QuestionHistory";

export default ChatInterface;
