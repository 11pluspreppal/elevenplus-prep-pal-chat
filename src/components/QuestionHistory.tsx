
import { Question } from "@/utils/questionGenerator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { MessageSquare, Search } from "lucide-react";
import { useState } from "react";

type QuestionHistoryProps = {
  questions: Question[];
  onSelectQuestion: (question: Question) => void;
};

const QuestionHistory = ({ questions, onSelectQuestion }: QuestionHistoryProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredQuestions = questions.filter(q => 
    q.text.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Group questions by subject
  const groupedQuestions = filteredQuestions.reduce((acc, question) => {
    const subjectId = question.subjectId;
    if (!acc[subjectId]) {
      acc[subjectId] = [];
    }
    acc[subjectId].push(question);
    return acc;
  }, {} as Record<string, Question[]>);
  
  // Sort questions by creation date (most recent first)
  Object.keys(groupedQuestions).forEach(subjectId => {
    groupedQuestions[subjectId].sort((a, b) => 
      b.createdAt.getTime() - a.createdAt.getTime()
    );
  });
  
  if (questions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-4 text-center">
        <MessageSquare className="h-10 w-10 text-muted-foreground mb-3" />
        <h3 className="font-medium mb-1">No questions yet</h3>
        <p className="text-sm text-muted-foreground">
          Your question history will appear here
        </p>
      </div>
    );
  }
  
  return (
    <div className="space-y-4 p-2">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <input
          placeholder="Search questions..."
          className="w-full rounded-md border border-input pl-8 h-9 text-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <ScrollArea className="h-[calc(100vh-200px)]">
        <div className="space-y-5">
          {Object.keys(groupedQuestions).map(subjectId => (
            <div key={subjectId}>
              <h3 className="font-medium text-sm text-muted-foreground mb-2 uppercase">
                {subjectId.charAt(0).toUpperCase() + subjectId.slice(1)}
              </h3>
              
              <div className="space-y-2">
                {groupedQuestions[subjectId].map(question => (
                  <Button
                    key={question.id}
                    variant="ghost"
                    className="w-full justify-start text-left h-auto py-2 px-3"
                    onClick={() => onSelectQuestion(question)}
                  >
                    <div className="truncate">
                      <div className="font-medium text-sm truncate">
                        {question.text.length > 60 
                          ? question.text.substring(0, 60) + "..." 
                          : question.text
                        }
                      </div>
                      <div className="flex text-xs text-muted-foreground mt-1">
                        <span className="mr-2">
                          {new Date(question.createdAt).toLocaleDateString("en-GB")}
                        </span>
                        <span className="px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground">
                          {question.difficulty}
                        </span>
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default QuestionHistory;
