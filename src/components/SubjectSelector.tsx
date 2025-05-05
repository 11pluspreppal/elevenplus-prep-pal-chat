
import { useState } from "react";
import { Subject } from "@/utils/examTopics";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type SubjectSelectorProps = {
  subjects: Subject[];
  onSelectSubject: (subjectId: string) => void;
  selectedSubjectId: string | null;
};

const SubjectSelector = ({ subjects, onSelectSubject, selectedSubjectId }: SubjectSelectorProps) => {
  return (
    <div>
      <h2 className="text-lg font-medium mb-3">Choose a Subject</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {subjects.map((subject) => (
          <Card 
            key={subject.id}
            className={`cursor-pointer transition-all hover:scale-105 ${
              selectedSubjectId === subject.id ? "ring-2 ring-primary" : ""
            }`}
            onClick={() => onSelectSubject(subject.id)}
          >
            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              <div className="text-3xl mb-2">{subject.icon}</div>
              <h3 className="font-medium">{subject.name}</h3>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SubjectSelector;
