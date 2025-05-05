
import { useEffect } from "react";
import ChatInterface from "@/components/ChatInterface";
import { Button } from "@/components/ui/button";
import { GraduationCap } from "lucide-react";

const Index = () => {
  useEffect(() => {
    document.title = "11+ Exam Prep Pal";
  }, []);

  return (
    <div className="container mx-auto px-4 py-6">
      <header className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <GraduationCap className="h-8 w-8 mr-2 text-primary" />
          <h1 className="text-2xl font-bold text-primary">11+ Prep Pal</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            About
          </Button>
          <Button variant="secondary" size="sm">
            Resources
          </Button>
        </div>
      </header>

      <main>
        <ChatInterface />
      </main>

      <footer className="mt-8 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} 11+ Prep Pal - Practice questions for 11+ exam success</p>
      </footer>
    </div>
  );
};

export default Index;
