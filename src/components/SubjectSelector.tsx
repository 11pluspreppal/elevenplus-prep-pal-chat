
import { Subject } from "@/utils/examTopics";
import { Card, CardContent } from "@/components/ui/card";

type SubjectSelectorProps = {
  subjects: Subject[];
  onSelectSubject: (subjectId: string) => void;
  selectedSubjectId: string | null;
};

const SubjectSelector = ({ subjects, onSelectSubject, selectedSubjectId }: SubjectSelectorProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {subjects.map((subject) => (
        <Card 
          key={subject.id}
          className={`cursor-pointer transition-all hover:scale-105 ${
            selectedSubjectId === subject.id ? "ring-2 ring-primary" : ""
          }`}
          onClick={() => onSelectSubject(subject.id)}
        >
          <CardContent className="p-6 flex flex-col items-center justify-center text-center">
            <div className="text-4xl mb-3">{subject.icon}</div>
            <h3 className="text-lg font-medium">{subject.name}</h3>
            <p className="text-sm text-muted-foreground mt-2">
              {subject.topics.length} topics available
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SubjectSelector;
