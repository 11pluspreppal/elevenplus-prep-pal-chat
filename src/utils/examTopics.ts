
export type Subject = {
  id: string;
  name: string;
  icon: string;
  topics: Topic[];
};

export type Topic = {
  id: string;
  name: string;
  description: string;
};

export const examSubjects: Subject[] = [
  {
    id: "english",
    name: "English",
    icon: "📝",
    topics: [
      {
        id: "comprehension",
        name: "Comprehension",
        description: "Understanding and analyzing written passages"
      },
      {
        id: "vocabulary",
        name: "Vocabulary",
        description: "Word meanings, synonyms, antonyms, and context"
      },
      {
        id: "grammar",
        name: "Grammar",
        description: "Sentence structure, parts of speech, and punctuation"
      },
      {
        id: "spelling",
        name: "Spelling",
        description: "Common spelling rules and exceptions"
      },
      {
        id: "writing",
        name: "Writing",
        description: "Creative writing and essay structure"
      }
    ]
  },
  {
    id: "mathematics",
    name: "Mathematics",
    icon: "🔢",
    topics: [
      {
        id: "arithmetic",
        name: "Arithmetic",
        description: "Addition, subtraction, multiplication, and division"
      },
      {
        id: "fractions",
        name: "Fractions",
        description: "Working with fractions, decimals, and percentages"
      },
      {
        id: "geometry",
        name: "Geometry",
        description: "Shapes, angles, area, and perimeter"
      },
      {
        id: "algebra",
        name: "Algebra",
        description: "Basic algebraic concepts and equations"
      },
      {
        id: "problemSolving",
        name: "Problem Solving",
        description: "Word problems and logical thinking"
      }
    ]
  },
  {
    id: "verbal-reasoning",
    name: "Verbal Reasoning",
    icon: "🔤",
    topics: [
      {
        id: "wordPatterns",
        name: "Word Patterns",
        description: "Identifying patterns in words and letters"
      },
      {
        id: "codedWords",
        name: "Coded Words",
        description: "Deciphering coded messages and substitutions"
      },
      {
        id: "wordProblems",
        name: "Word Problems",
        description: "Solving problems presented in text form"
      },
      {
        id: "logicalDeduction",
        name: "Logical Deduction",
        description: "Drawing conclusions from given information"
      },
      {
        id: "analogies",
        name: "Analogies",
        description: "Understanding relationships between words"
      }
    ]
  },
  {
    id: "non-verbal-reasoning",
    name: "Non-Verbal Reasoning",
    icon: "📊",
    topics: [
      {
        id: "patterns",
        name: "Patterns",
        description: "Identifying and continuing visual patterns"
      },
      {
        id: "sequences",
        name: "Sequences",
        description: "Finding the next item in a sequence"
      },
      {
        id: "matrices",
        name: "Matrices",
        description: "Completing matrices based on logical rules"
      },
      {
        id: "shapes",
        name: "Shapes",
        description: "Analyzing and manipulating 2D and 3D shapes"
      },
      {
        id: "symmetry",
        name: "Symmetry",
        description: "Identifying symmetrical properties of shapes"
      }
    ]
  }
];

export const getSubjectById = (id: string): Subject | undefined => {
  return examSubjects.find(subject => subject.id === id);
};

export const getTopicById = (subjectId: string, topicId: string): Topic | undefined => {
  const subject = getSubjectById(subjectId);
  if (!subject) return undefined;
  return subject.topics.find(topic => topic.id === topicId);
};
