
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GraduationCap, Clock, Save, ChevronLeft, ChevronRight, CheckCircle, XCircle, RotateCcw, BookOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { getSubjectById, getTopicById } from "@/utils/examTopics";
import { generateQuestion, Question } from "@/utils/questionGenerator";
import { toast } from "sonner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Create a type for tracking answer results
type AnswerResult = {
  questionId: string;
  userAnswer: string;
  isCorrect: boolean;
};

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
  const [showResults, setShowResults] = useState(false);
  const [answerResults, setAnswerResults] = useState<AnswerResult[]>([]);
  const [reviewMode, setReviewMode] = useState(false);
  
  // Generate questions on component mount
  useEffect(() => {
    if (!subjectId || !topicId || !numQuestions) return;
    
    const questionsToGenerate = parseInt(numQuestions);
    const generatedQuestions: Question[] = [];
    
    for (let i = 0; i < questionsToGenerate; i++) {
      // Type check the difficulty parameter before passing it to generateQuestion
      const typedDifficulty = difficulty === "easy" || difficulty === "medium" || difficulty === "hard" 
        ? difficulty 
        : undefined;
        
      const question = generateQuestion(subjectId, topicId, typedDifficulty);
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
          finishSession();
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
      finishSession();
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
  
  const finishSession = () => {
    setIsFinished(true);
    
    // Calculate results
    const results: AnswerResult[] = questions.map((question, index) => {
      const userAnswer = selectedAnswers[index] || "";
      const isCorrect = userAnswer === question.answer;
      
      return {
        questionId: question.id,
        userAnswer,
        isCorrect
      };
    });
    
    setAnswerResults(results);
    setShowResults(true);
  };
  
  const getScore = () => {
    const answeredQuestions = Object.keys(selectedAnswers).length;
    const correctAnswers = answerResults.filter(result => result.isCorrect).length;
    return {
      total: questions.length,
      answered: answeredQuestions,
      correct: correctAnswers,
      percentage: questions.length > 0 
        ? Math.round((correctAnswers / questions.length) * 100) 
        : 0
    };
  };
  
  const handleReviewQuestions = () => {
    setShowResults(false);
    setReviewMode(true);
    setCurrentIndex(0);
  };
  
  const handleRestartPractice = () => {
    navigate(`/practice/${subjectId}`);
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
  const score = getScore();
  
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
          ) : showResults ? (
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6 text-center">Practice Session Results</h2>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-muted p-4 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground mb-1">Total Questions</p>
                    <p className="text-2xl font-bold">{score.total}</p>
                  </div>
                  <div className="bg-muted p-4 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground mb-1">Score</p>
                    <p className="text-2xl font-bold">{score.correct} / {score.total}</p>
                  </div>
                  <div className="bg-muted p-4 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground mb-1">Answered</p>
                    <p className="text-2xl font-bold">{score.answered} / {score.total}</p>
                  </div>
                  <div className="bg-muted p-4 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground mb-1">Percentage</p>
                    <p className="text-2xl font-bold">{score.percentage}%</p>
                  </div>
                </div>
                
                <div className="flex flex-col gap-4 mt-8">
                  <Button onClick={handleReviewQuestions} className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    Review Questions
                  </Button>
                  <Button onClick={handleRestartPractice} variant="outline" className="flex items-center gap-2">
                    <RotateCcw className="h-4 w-4" />
                    Practice Again
                  </Button>
                  <Button variant="outline" onClick={() => navigate("/")} className="flex items-center gap-2">
                    Return to Home
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : reviewMode ? (
            <>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">
                  Review: Question {currentIndex + 1} of {questions.length}
                </h2>
                <div className="flex items-center gap-2">
                  {answerResults[currentIndex]?.isCorrect ? (
                    <span className="flex items-center text-green-500">
                      <CheckCircle className="h-4 w-4 mr-1" /> Correct
                    </span>
                  ) : (
                    <span className="flex items-center text-red-500">
                      <XCircle className="h-4 w-4 mr-1" /> Incorrect
                    </span>
                  )}
                </div>
              </div>
              
              <Card className="mb-6">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <span className="px-2 py-1 bg-primary/10 text-primary text-sm rounded-md">
                      {currentQuestion.difficulty}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-medium mb-4">{currentQuestion.text}</h3>
                  
                  {currentQuestion.options && (
                    <div className="space-y-3 mt-4">
                      {currentQuestion.options.map((option, index) => {
                        const isUserChoice = selectedAnswers[currentIndex] === option;
                        const isCorrectAnswer = currentQuestion.answer === option;
                        
                        let optionClass = "p-3 border rounded-md";
                        
                        if (isCorrectAnswer) {
                          optionClass += " bg-green-100 border-green-500";
                        } else if (isUserChoice) {
                          optionClass += " bg-red-100 border-red-500";
                        }
                        
                        return (
                          <div key={index} className={optionClass}>
                            <div className="flex items-center">
                              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center mr-3 shrink-0">
                                {String.fromCharCode(65 + index)}
                              </div>
                              <div className="flex-1">{option}</div>
                              {isCorrectAnswer && (
                                <CheckCircle className="h-5 w-5 text-green-500 ml-2" />
                              )}
                              {isUserChoice && !isCorrectAnswer && (
                                <XCircle className="h-5 w-5 text-red-500 ml-2" />
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                  
                  {currentQuestion.explanation && (
                    <div className="mt-6 p-4 bg-muted/50 rounded-md">
                      <h4 className="font-semibold mb-2">Explanation:</h4>
                      <p className="text-sm">{currentQuestion.explanation}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <div className="flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
                  disabled={currentIndex === 0}
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </Button>
                {currentIndex < questions.length - 1 ? (
                  <Button 
                    onClick={() => setCurrentIndex(prev => Math.min(questions.length - 1, prev + 1))}
                  >
                    Next
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                ) : (
                  <Button 
                    onClick={() => setShowResults(true)}
                  >
                    Back to Results
                  </Button>
                )}
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
