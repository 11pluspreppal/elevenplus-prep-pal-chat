
import { getSubjectById, getTopicById } from "./examTopics";

export type Question = {
  id: string;
  subjectId: string;
  topicId: string;
  text: string;
  options?: string[];
  answer?: string;
  explanation?: string;
  difficulty: "easy" | "medium" | "hard";
  createdAt: Date;
};

// Sample questions for each topic
const sampleQuestions: Record<string, Record<string, Question[]>> = {
  english: {
    comprehension: [
      {
        id: "eng-comp-1",
        subjectId: "english",
        topicId: "comprehension",
        text: "Read the following passage and answer the question:\n\nJack and his sister Emma went to the beach on a sunny day. They built sandcastles and collected shells. Jack found a large blue shell that was shaped like a spiral. Emma found three small pink shells.\n\nWhat did Jack find at the beach?",
        options: [
          "A pink shell",
          "A large blue shell",
          "A bucket",
          "A starfish"
        ],
        answer: "A large blue shell",
        explanation: "The passage states that 'Jack found a large blue shell that was shaped like a spiral.'",
        difficulty: "easy",
        createdAt: new Date()
      }
    ],
    vocabulary: [
      {
        id: "eng-vocab-1",
        subjectId: "english",
        topicId: "vocabulary",
        text: "Which word is an antonym (opposite) of 'happy'?",
        options: [
          "Sad",
          "Joyful",
          "Pleased",
          "Delighted"
        ],
        answer: "Sad",
        explanation: "'Sad' is the opposite of 'happy', while all other options are synonyms or similar to 'happy'.",
        difficulty: "easy",
        createdAt: new Date()
      }
    ],
    grammar: [
      {
        id: "eng-gram-1",
        subjectId: "english",
        topicId: "grammar",
        text: "Which sentence is punctuated correctly?",
        options: [
          "The dog barked, and the cat, ran away.",
          "The dog barked and the cat ran away.",
          "The dog barked and the cat, ran away.",
          "The, dog barked and the cat ran away."
        ],
        answer: "The dog barked and the cat ran away.",
        explanation: "This sentence has correct comma usage with a compound sentence structure.",
        difficulty: "medium",
        createdAt: new Date()
      }
    ],
    spelling: [
      {
        id: "eng-spell-1",
        subjectId: "english",
        topicId: "spelling",
        text: "Which word is spelled correctly?",
        options: [
          "Accomodate",
          "Acommodate",
          "Accommodate",
          "Acomodate"
        ],
        answer: "Accommodate",
        explanation: "'Accommodate' has two 'c's and two 'm's.",
        difficulty: "hard",
        createdAt: new Date()
      }
    ],
    writing: [
      {
        id: "eng-write-1",
        subjectId: "english",
        topicId: "writing",
        text: "Which is the best opening sentence for a story about a space adventure?",
        options: [
          "The day was really nice and sunny.",
          "The spaceship's engines roared to life as Captain Zara prepared for her first solo mission.",
          "Space is very big and has many planets.",
          "Captain Zara liked space travel a lot."
        ],
        answer: "The spaceship's engines roared to life as Captain Zara prepared for her first solo mission.",
        explanation: "This opening sentence creates interest, introduces a character, and sets the scene effectively.",
        difficulty: "medium",
        createdAt: new Date()
      }
    ]
  },
  mathematics: {
    arithmetic: [
      {
        id: "math-arith-1",
        subjectId: "mathematics",
        topicId: "arithmetic",
        text: "Calculate: 347 + 598",
        options: [
          "835",
          "845",
          "935",
          "945"
        ],
        answer: "945",
        explanation: "347 + 598 = 945",
        difficulty: "medium",
        createdAt: new Date()
      }
    ],
    fractions: [
      {
        id: "math-frac-1",
        subjectId: "mathematics",
        topicId: "fractions",
        text: "Which of these is equal to 3/4?",
        options: [
          "0.25",
          "0.5",
          "0.75",
          "0.8"
        ],
        answer: "0.75",
        explanation: "3/4 = 0.75 or 75%",
        difficulty: "medium",
        createdAt: new Date()
      }
    ],
    geometry: [
      {
        id: "math-geom-1",
        subjectId: "mathematics",
        topicId: "geometry",
        text: "A rectangle has a length of 12 cm and a width of 5 cm. What is its area?",
        options: [
          "17 cm²",
          "34 cm²",
          "60 cm²",
          "72 cm²"
        ],
        answer: "60 cm²",
        explanation: "Area of rectangle = length × width = 12 × 5 = 60 cm²",
        difficulty: "easy",
        createdAt: new Date()
      }
    ],
    algebra: [
      {
        id: "math-alg-1",
        subjectId: "mathematics",
        topicId: "algebra",
        text: "If 3x + 7 = 22, what is the value of x?",
        options: [
          "3",
          "5",
          "7",
          "15"
        ],
        answer: "5",
        explanation: "3x + 7 = 22\n3x = 22 - 7\n3x = 15\nx = 5",
        difficulty: "medium",
        createdAt: new Date()
      }
    ],
    problemSolving: [
      {
        id: "math-prob-1",
        subjectId: "mathematics",
        topicId: "problemSolving",
        text: "Tom has 24 marbles. He gives 1/3 of them to his friend. How many marbles does Tom have left?",
        options: [
          "8",
          "12",
          "16",
          "20"
        ],
        answer: "16",
        explanation: "1/3 of 24 = 8 marbles given away. 24 - 8 = 16 marbles left.",
        difficulty: "medium",
        createdAt: new Date()
      }
    ]
  },
  "verbal-reasoning": {
    wordPatterns: [
      {
        id: "vr-pattern-1",
        subjectId: "verbal-reasoning",
        topicId: "wordPatterns",
        text: "Which word follows the same pattern as: HAND, FOOT, ARM?",
        options: [
          "HAT",
          "LEG",
          "SHOE",
          "GLOVE"
        ],
        answer: "LEG",
        explanation: "HAND, FOOT, ARM are all parts of the body. LEG is also a part of the body.",
        difficulty: "easy",
        createdAt: new Date()
      }
    ],
    codedWords: [
      {
        id: "vr-code-1",
        subjectId: "verbal-reasoning",
        topicId: "codedWords",
        text: "If APPLE is coded as BQQMF, what is ORANGE coded as?",
        options: [
          "PSBOHF",
          "PQBMHF",
          "QBSHOF",
          "PSBOHF"
        ],
        answer: "PSBOHF",
        explanation: "Each letter in the code is one letter after the original (A→B, P→Q, etc.), so ORANGE becomes PSBOHF.",
        difficulty: "medium",
        createdAt: new Date()
      }
    ],
    wordProblems: [
      {
        id: "vr-word-1",
        subjectId: "verbal-reasoning",
        topicId: "wordProblems",
        text: "If Sarah is taller than Emma, and Emma is taller than Lucy, who is the shortest?",
        options: [
          "Sarah",
          "Emma",
          "Lucy",
          "Cannot be determined"
        ],
        answer: "Lucy",
        explanation: "If Sarah > Emma and Emma > Lucy, then Sarah > Emma > Lucy, making Lucy the shortest.",
        difficulty: "easy",
        createdAt: new Date()
      }
    ],
    logicalDeduction: [
      {
        id: "vr-logic-1",
        subjectId: "verbal-reasoning",
        topicId: "logicalDeduction",
        text: "All cats have tails. Fluffy is a cat. Does Fluffy have a tail?",
        options: [
          "Yes",
          "No",
          "Maybe",
          "Not enough information"
        ],
        answer: "Yes",
        explanation: "Since all cats have tails and Fluffy is a cat, Fluffy must have a tail.",
        difficulty: "easy",
        createdAt: new Date()
      }
    ],
    analogies: [
      {
        id: "vr-analog-1",
        subjectId: "verbal-reasoning",
        topicId: "analogies",
        text: "Hand is to Glove as Foot is to:",
        options: [
          "Leg",
          "Sock",
          "Shoe",
          "Toe"
        ],
        answer: "Shoe",
        explanation: "A glove is worn on a hand, just as a shoe is worn on a foot.",
        difficulty: "medium",
        createdAt: new Date()
      }
    ]
  },
  "non-verbal-reasoning": {
    patterns: [
      {
        id: "nvr-pat-1",
        subjectId: "non-verbal-reasoning",
        topicId: "patterns",
        text: "Which shape would come next in this pattern?\n○ △ □ ○ △ □ ○ ?",
        options: [
          "○",
          "△",
          "□",
          "◇"
        ],
        answer: "△",
        explanation: "The pattern repeats every three symbols: ○ △ □, ○ △ □, ○ ?. The next shape would be △.",
        difficulty: "easy",
        createdAt: new Date()
      }
    ],
    sequences: [
      {
        id: "nvr-seq-1",
        subjectId: "non-verbal-reasoning",
        topicId: "sequences",
        text: "What number comes next in this sequence? 2, 4, 8, 16, ?",
        options: [
          "18",
          "24",
          "32",
          "64"
        ],
        answer: "32",
        explanation: "Each number is being multiplied by 2: 2 × 2 = 4, 4 × 2 = 8, 8 × 2 = 16, 16 × 2 = 32",
        difficulty: "medium",
        createdAt: new Date()
      }
    ],
    matrices: [
      {
        id: "nvr-mat-1",
        subjectId: "non-verbal-reasoning",
        topicId: "matrices",
        text: "In a 3×3 grid, if the first two columns contain circles and squares, and you need to complete the third column following the same pattern, what shape would be in the bottom right corner?",
        options: [
          "Circle",
          "Square",
          "Triangle",
          "Cannot be determined without seeing the grid"
        ],
        answer: "Cannot be determined without seeing the grid",
        explanation: "Without seeing the specific pattern in the grid, it's impossible to determine what shape would complete it.",
        difficulty: "hard",
        createdAt: new Date()
      }
    ],
    shapes: [
      {
        id: "nvr-shape-1",
        subjectId: "non-verbal-reasoning",
        topicId: "shapes",
        text: "Which of these shapes has the most sides?",
        options: [
          "Triangle",
          "Square",
          "Pentagon",
          "Hexagon"
        ],
        answer: "Hexagon",
        explanation: "A triangle has 3 sides, a square has 4, a pentagon has 5, and a hexagon has 6 sides.",
        difficulty: "easy",
        createdAt: new Date()
      }
    ],
    symmetry: [
      {
        id: "nvr-sym-1",
        subjectId: "non-verbal-reasoning",
        topicId: "symmetry",
        text: "Which letter has a vertical line of symmetry?",
        options: [
          "A",
          "B",
          "C",
          "H"
        ],
        answer: "H",
        explanation: "H has a vertical line of symmetry, meaning the left half is a mirror image of the right half.",
        difficulty: "medium",
        createdAt: new Date()
      }
    ]
  }
};

export const generateQuestion = (
  subjectId: string,
  topicId: string,
  difficulty?: "easy" | "medium" | "hard"
): Question | null => {
  // Validate that the subject and topic exist
  const subject = getSubjectById(subjectId);
  if (!subject) return null;
  
  const topic = getTopicById(subjectId, topicId);
  if (!topic) return null;

  // Get questions for this subject and topic
  const questions = sampleQuestions[subjectId]?.[topicId] || [];
  if (questions.length === 0) return null;
  
  // Filter by difficulty if provided
  let filteredQuestions = questions;
  if (difficulty) {
    filteredQuestions = questions.filter(q => q.difficulty === difficulty);
    if (filteredQuestions.length === 0) filteredQuestions = questions; // Fall back if no questions of that difficulty
  }
  
  // Choose a random question
  const randomIndex = Math.floor(Math.random() * filteredQuestions.length);
  const question = { ...filteredQuestions[randomIndex] };
  
  // Create a new ID and timestamp for each generated question
  question.id = `${question.id}-${Date.now()}`;
  question.createdAt = new Date();
  
  return question;
};

export const generateRandomQuestion = (): Question | null => {
  // Randomly select a subject
  const subjects = Object.keys(sampleQuestions);
  const randomSubject = subjects[Math.floor(Math.random() * subjects.length)];
  
  // Randomly select a topic from that subject
  const topics = Object.keys(sampleQuestions[randomSubject] || {});
  if (topics.length === 0) return null;
  const randomTopic = topics[Math.floor(Math.random() * topics.length)];
  
  return generateQuestion(randomSubject, randomTopic);
};
