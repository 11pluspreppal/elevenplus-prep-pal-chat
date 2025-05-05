
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GraduationCap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { getSubjectById } from "@/utils/examTopics";
import TopicSelector from "@/components/TopicSelector";
import { toast } from "sonner";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Slider
} from "@/components/ui/slider";

const PracticeSetup = () => {
  const navigate = useNavigate();
  const { subjectId } = useParams<{ subjectId: string }>();
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const [numQuestions, setNumQuestions] = useState(5);
  const [difficulty, setDifficulty] = useState<string>("mixed");
  const [timeInMinutes, setTimeInMinutes] = useState(15);
  
  // Check if user is logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    
    if (!isLoggedIn) {
      // Save the current path to redirect back after login
      localStorage.setItem("redirectAfterLogin", window.location.pathname);
      toast.error("Please sign in to continue");
      navigate("/login");
    }
  }, [navigate]);
  
  // Get subject data
  const subject = subjectId ? getSubjectById(subjectId) : undefined;
  
  if (!subject) {
    return <div>Subject not found</div>;
  }
  
  const handleStartPractice = () => {
    if (!selectedTopicId) {
      toast.error("Please select a topic");
      return;
    }
    
    // Navigate to practice session with parameters
    navigate(`/practice-session/${subjectId}/${selectedTopicId}/${numQuestions}/${difficulty}/${timeInMinutes}`);
  };
  
  return (
    <div className="container mx-auto px-4 py-6">
      <header className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <GraduationCap className="h-8 w-8 mr-2 text-primary" />
          <h1 className="text-2xl font-bold text-primary">11+ Prep Pal</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => navigate("/")}>
            Back to Subjects
          </Button>
        </div>
      </header>

      <main className="py-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-4">{subject.name} Practice</h2>
          <p className="text-center text-muted-foreground mb-8">
            Customize your practice session
          </p>
          
          <Card>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">Select Topic</h3>
                  <TopicSelector
                    topics={subject.topics}
                    selectedTopicId={selectedTopicId}
                    onSelectTopic={setSelectedTopicId}
                  />
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3">Number of Questions</h3>
                  <Slider
                    defaultValue={[5]}
                    min={1}
                    max={20}
                    step={1}
                    onValueChange={(value) => setNumQuestions(value[0])}
                    className="w-full max-w-md mx-auto"
                  />
                  <p className="text-center mt-2">{numQuestions} questions</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3">Difficulty Level</h3>
                  <Select
                    value={difficulty}
                    onValueChange={setDifficulty}
                  >
                    <SelectTrigger className="w-full max-w-md mx-auto">
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hard">Hard</SelectItem>
                      <SelectItem value="mixed">Mixed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3">Time Available</h3>
                  <Slider
                    defaultValue={[15]}
                    min={5}
                    max={60}
                    step={5}
                    onValueChange={(value) => setTimeInMinutes(value[0])}
                    className="w-full max-w-md mx-auto"
                  />
                  <p className="text-center mt-2">{timeInMinutes} minutes</p>
                </div>
                
                <Button 
                  onClick={handleStartPractice} 
                  size="lg" 
                  className="w-full max-w-md mx-auto mt-6"
                  disabled={!selectedTopicId}
                >
                  Start Practice Session
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="mt-8 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} 11+ Prep Pal - Practice questions for 11+ exam success</p>
      </footer>
    </div>
  );
};

export default PracticeSetup;
