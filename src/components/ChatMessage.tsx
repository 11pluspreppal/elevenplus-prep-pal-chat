
import { Card, CardContent } from "@/components/ui/card";
import { Question } from "@/utils/questionGenerator";
import { Button } from "@/components/ui/button";
import { Check, HelpCircle } from "lucide-react";
import { useState } from "react";

type ChatMessageProps = {
  isUser: boolean;
  content: string;
  timestamp: Date;
  question?: Question;
};

const ChatMessage = ({ isUser, content, timestamp, question }: ChatMessageProps) => {
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  
  const formattedTime = new Intl.DateTimeFormat("en-GB", {
    hour: "numeric",
    minute: "numeric",
  }).format(timestamp);

  const handleShowAnswer = () => {
    setShowAnswer(true);
  };

  const handleSelectOption = (option: string) => {
    if (selectedOption) return; // Prevent changing answer
    setSelectedOption(option);
  };

  const isCorrect = selectedOption === question?.answer;

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      <div className={`max-w-[85%] ${isUser ? "order-2" : "order-1"}`}>
        <div className="flex items-center mb-1">
          <div 
            className={`w-8 h-8 rounded-full flex items-center justify-center text-white
              ${isUser ? "bg-secondary order-2 ml-2" : "bg-primary order-1 mr-2"}`}
          >
            {isUser ? "U" : "🤖"}
          </div>
          <div className={`text-xs text-muted-foreground ${isUser ? "order-1 mr-2" : "order-2 ml-2"}`}>
            {formattedTime}
          </div>
        </div>
        
        <Card className={isUser ? "bg-secondary/10" : "bg-primary/10"}>
          <CardContent className="p-3">
            {content && <p className="whitespace-pre-wrap mb-3">{content}</p>}
            
            {question && (
              <div className="mt-2 space-y-4">
                <div className="p-3 bg-card rounded-md">
                  <h3 className="font-semibold">{question.text}</h3>
                  
                  {question.options && (
                    <div className="mt-4 space-y-2">
                      {question.options.map((option, index) => (
                        <div 
                          key={index}
                          onClick={() => handleSelectOption(option)}
                          className={`p-2 rounded-md border cursor-pointer transition-colors
                            ${selectedOption === option 
                              ? (showAnswer 
                                ? (isCorrect ? "bg-green-100 border-green-500" : "bg-red-100 border-red-500")
                                : "bg-accent border-accent-foreground") 
                              : "hover:bg-muted"
                            }
                            ${selectedOption && selectedOption !== option ? "opacity-70" : ""}
                            ${showAnswer && option === question.answer && selectedOption !== option 
                              ? "bg-green-100 border-green-500" : ""
                            }
                          `}
                        >
                          <div className="flex items-center">
                            <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center mr-2">
                              {String.fromCharCode(65 + index)}
                            </div>
                            <div className="flex-1">{option}</div>
                            {showAnswer && option === question.answer && (
                              <Check className="w-5 h-5 text-green-600" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {!showAnswer && (
                    <div className="mt-4 flex justify-between">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={handleShowAnswer}
                        disabled={!selectedOption}
                      >
                        Check Answer
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={handleShowAnswer}
                      >
                        <HelpCircle className="w-4 h-4 mr-1" />
                        Show Answer
                      </Button>
                    </div>
                  )}
                  
                  {showAnswer && question.explanation && (
                    <div className="mt-4 p-3 bg-muted/50 rounded-md">
                      <h4 className="font-medium text-sm mb-1">Explanation:</h4>
                      <p className="text-sm">{question.explanation}</p>
                    </div>
                  )}
                  
                  <div className="mt-4 flex justify-between text-xs text-muted-foreground">
                    <div>{question.subjectId.charAt(0).toUpperCase() + question.subjectId.slice(1)}</div>
                    <div>
                      <span className="px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground">
                        {question.difficulty}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ChatMessage;
