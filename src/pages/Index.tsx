
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { GraduationCap } from "lucide-react";
import SubjectSelector from "@/components/SubjectSelector";
import { examSubjects } from "@/utils/examTopics";
import { useNavigate } from "react-router-dom";
import UserMenu from "@/components/UserMenu";

const Index = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    document.title = "11+ Exam Prep Pal";
    // Check if user is logged in
    const loginStatus = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loginStatus);
  }, []);

  const handleSelectSubject = (subjectId: string) => {
    // Navigate to the subject page with the selected subject ID
    navigate(`/practice/${subjectId}`);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <header className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <GraduationCap className="h-8 w-8 mr-2 text-primary" />
          <h1 className="text-2xl font-bold text-primary">11+ Prep Pal</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => navigate("/about")}>
            About
          </Button>
          <Button variant="secondary" size="sm" onClick={() => navigate("/resources")}>
            Resources
          </Button>
          {isLoggedIn ? (
            <UserMenu />
          ) : (
            <Button variant="default" size="sm" onClick={() => navigate("/login")}>
              Sign In
            </Button>
          )}
        </div>
      </header>

      <main className="py-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">Choose a Subject to Begin</h2>
          <SubjectSelector 
            subjects={examSubjects}
            onSelectSubject={handleSelectSubject}
            selectedSubjectId={null}
          />
        </div>
      </main>

      <footer className="mt-8 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} 11+ Prep Pal - Practice questions for 11+ exam success</p>
      </footer>
    </div>
  );
};

export default Index;
