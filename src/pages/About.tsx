
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GraduationCap } from "lucide-react";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-6">
      <header className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <GraduationCap className="h-8 w-8 mr-2 text-primary" />
          <h1 className="text-2xl font-bold text-primary">11+ Prep Pal</h1>
        </div>
        <Button variant="outline" size="sm" onClick={() => navigate("/")}>
          Back to Home
        </Button>
      </header>

      <main className="py-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">About 11+ Prep Pal</h2>
          
          <div className="prose prose-slate max-w-none">
            <p className="text-lg mb-4">
              11+ Prep Pal is designed to help students prepare for the UK's 11+ exams, providing comprehensive practice across all major subjects.
            </p>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">What is the 11+ Exam?</h3>
            <p>
              The 11+ exam is a selective entrance examination taken by students in their final year of primary school (Year 6) to gain admission to grammar schools and other academically selective secondary schools in the UK.
            </p>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">Subjects Covered</h3>
            <p>Our platform offers practice questions in the four key subject areas tested in most 11+ exams:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li><strong>English</strong> - Comprehension, grammar, vocabulary, and creative writing</li>
              <li><strong>Mathematics</strong> - Arithmetic, problem-solving, geometry, and algebra</li>
              <li><strong>Verbal Reasoning</strong> - Word problems, logic, and language patterns</li>
              <li><strong>Non-Verbal Reasoning</strong> - Shape patterns, spatial awareness, and sequence recognition</li>
            </ul>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">How to Use 11+ Prep Pal</h3>
            <ol className="list-decimal pl-6 mt-2 space-y-2">
              <li>Select a subject you wish to practice</li>
              <li>Choose a specific topic within that subject</li>
              <li>Customize your practice session (number of questions, difficulty, time limit)</li>
              <li>Complete the questions and review your answers</li>
              <li>Save challenging questions for later review</li>
            </ol>
            
            <p className="mt-6">
              Regular practice with 11+ Prep Pal can help students build confidence, improve speed, and develop the skills needed to succeed in their exams.
            </p>
          </div>
        </div>
      </main>

      <footer className="mt-8 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} 11+ Prep Pal - Practice questions for 11+ exam success</p>
      </footer>
    </div>
  );
};

export default About;
