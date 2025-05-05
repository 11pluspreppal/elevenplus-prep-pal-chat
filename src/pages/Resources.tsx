
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GraduationCap, BookOpen, Link as LinkIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Resources = () => {
  const navigate = useNavigate();

  const resources = [
    {
      title: "11+ English Guide",
      description: "Comprehensive guide to tackling comprehension, grammar, and vocabulary questions.",
      link: "#"
    },
    {
      title: "Mathematics Problem-Solving Techniques",
      description: "Step-by-step approaches to solving complex math problems quickly.",
      link: "#"
    },
    {
      title: "Verbal Reasoning Strategies",
      description: "Methods for identifying patterns and solving verbal reasoning questions efficiently.",
      link: "#"
    },
    {
      title: "Non-Verbal Reasoning Practice Book",
      description: "Additional practice for mastering spatial and pattern-based questions.",
      link: "#"
    },
    {
      title: "Time Management for Exam Success",
      description: "Tips for managing time during the 11+ exam and practice techniques.",
      link: "#"
    },
    {
      title: "11+ Exam Day Preparation",
      description: "What to expect and how to prepare for the actual exam day.",
      link: "#"
    }
  ];

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
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-2">Learning Resources</h2>
          <p className="text-muted-foreground mb-8">
            Helpful guides and materials to support your 11+ exam preparation
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resources.map((resource, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BookOpen className="h-5 w-5 mr-2 text-primary" />
                    {resource.title}
                  </CardTitle>
                  <CardDescription>{resource.description}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button variant="ghost" size="sm" className="w-full">
                    <LinkIcon className="h-4 w-4 mr-2" />
                    Access Resource
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="mt-12 bg-muted p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Need More Help?</h3>
            <p className="mb-4">
              Our premium resources include personalized study plans, detailed answer explanations, 
              and additional practice materials across all subjects.
            </p>
            <Button>Explore Premium Resources</Button>
          </div>
        </div>
      </main>

      <footer className="mt-8 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} 11+ Prep Pal - Practice questions for 11+ exam success</p>
      </footer>
    </div>
  );
};

export default Resources;
