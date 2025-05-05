
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GraduationCap, Clock, Save, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { getSubjectById, getTopicById } from "@/utils/examTopics";
import { generateQuestion, Question } from "@/utils/questionGenerator";
import { toast } from "sonner";

const PracticeSession = () => {
  const navigate = useNavigate();
  const { subjectId, topicId, numQuestions, difficulty, timeInMinutes } = 
    useParams<{ 
      subjectId: string, 
      topicId: string, 
      numQuestions: string, 
      difficulty: string, 
      timeInMinutes: string 
    }>();
  
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  
  // Generate questions on component mount
  useEffect(() => {
    if (!subjectId || !topicId || !numQuestions) return;
    
    const questionsToGenerate = parseInt(numQuestions);
    const generatedQuestions: Question[] = [];
    
    for (let i = 0; i < questionsToGenerate; i++) {
      const question = generateQuestion(subjectId, topicId, difficulty !== "mixed" ? difficulty : undefined);
      if (question) {
        generatedQuestions.push(question);
      }
    }
    
    setQuestions(generatedQuestions);
    
    // Set timer
    const minutes = parseInt(timeInMinutes || "15");
    setTimeLeft(minutes * 60);
  }, [subjectId, topicId, numQuestions, difficulty, timeInMinutes]);
  
  // Timer effect
  useEffect(() => {
    if (timeLeft <= 0 || isFinished) return;
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          toast.warning("Time's up!");
          setIsFinished(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [timeLeft, isFinished]);
  
  // Format time as mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const handleSelectAnswer = (answer: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentIndex]: answer
    }));
  };
  
  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setIsFinished(true);
      toast.success("Practice session completed!");
    }
  };
  
  const handlePreviousQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };
  
  const handleSaveQuestion = () => {
    if (currentIndex < questions.length) {
      const savedQuestions = JSON.parse(localStorage.getItem("savedQuestions") || "[]");
      const questionToSave = questions[currentIndex];
      
      // Check if the question is already saved
      const isAlreadySaved = savedQuestions.some((q: Question) => 
        q.text === questionToSave.text && q.subjectId === questionToSave.subjectId
      );
      
      if (!isAlreadySaved) {
        savedQuestions.push(questionToSave);
        localStorage.setItem("savedQuestions", JSON.stringify(savedQuestions));
        toast.success("Question saved to your collection");
      } else {
        toast.info("This question is already in your saved collection");
      }
    }
  };
  
  const subject = subjectId ? getSubjectById(subjectId) : undefined;
  const topic = topicId && subjectId ? getTopicById(subjectId, topicId) : undefined;
  
  if (!subject || !topic || questions.length === 0) {
    return (
      <div className="container mx-auto px-4 py-6 text-center">
        <h2>Loading questions...</h2>
      </div>
    );
  }
  
  const currentQuestion = questions[currentIndex];
  
  return (
    <div className="container mx-auto px-4 py-6">
      <header className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <GraduationCap className="h-8 w-8 mr-2 text-primary" />
          <h1 className="text-2xl font-bold text-primary">11+ Prep Pal</h1>
        </div>
        {!isFinished && (
          <div className="flex items-center gap-2 bg-accent/20 px-3 py-1 rounded-full">
            <Clock className="h-4 w-4 text-accent-foreground" />
            <span className="font-medium">{formatTime(timeLeft)}</span>
          </div>
        )}
      </header>

      <main className="py-8">
        <div className="max-w-4xl mx-auto">
          {!isFinished ? (
            <>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">
                  {subject.name}: {topic.name}
                </h2>
                <div className="text-sm text-muted-foreground">
                  Question {currentIndex + 1} of {questions.length}
                </div>
              </div>
              
              <Card className="mb-6">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <span className="px-2 py-1 bg-primary/10 text-primary text-sm rounded-md">
                      {currentQuestion.difficulty}
                    </span>
                    <Button variant="ghost" size="sm" onClick={handleSaveQuestion}>
                      <Save className="h-4 w-4 mr-1" />
                      Save
                    </Button>
                  </div>
                  
                  <h3 className="text-lg font-medium mb-4">{currentQuestion.text}</h3>
                  
                  {currentQuestion.options && (
                    <div className="space-y-3 mt-4">
                      {currentQuestion.options.map((option, index) => (
                        <div
                          key={index}
                          onClick={() => handleSelectAnswer(option)}
                          className={`p-3 border rounded-md cursor-pointer transition-colors
                            ${selectedAnswers[currentIndex] === option 
                              ? "bg-accent border-primary" 
                              : "hover:bg-accent/50"}`}
                        >
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center mr-3 shrink-0">
                              {String.fromCharCode(65 + index)}
                            </div>
                            <div>{option}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <div className="flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={handlePreviousQuestion}
                  disabled={currentIndex === 0}
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </Button>
                <Button 
                  onClick={handleNextQuestion}
                >
                  {currentIndex === questions.length - 1 ? "Finish" : "Next"}
                  {currentIndex < questions.length - 1 && <ChevronRight className="h-4 w-4 ml-1" />}
                </Button>
              </div>
            </>
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <h2 className="text-2xl font-bold mb-4">Practice Session Complete!</h2>
                <p className="mb-6">
                  You've answered {Object.keys(selectedAnswers).length} out of {questions.length} questions.
                </p>
                <div className="flex justify-center gap-4">
                  <Button variant="outline" onClick={() => navigate("/")}>
                    Return to Home
                  </Button>
                  <Button onClick={() => navigate(`/practice/${subjectId}`)}>
                    Practice Again
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <footer className="mt-8 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} 11+ Prep Pal - Practice questions for 11+ exam success</p>
      </footer>
    </div>
  );
};

export default PracticeSession;
