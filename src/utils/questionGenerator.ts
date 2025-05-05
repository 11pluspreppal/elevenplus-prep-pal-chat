
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
      },
      {
        id: "eng-comp-2",
        subjectId: "english",
        topicId: "comprehension",
        text: "Read the following passage and answer the question:\n\nThe old library was closing down after fifty years. Mrs. Wilson, the librarian, had worked there since it opened. She carefully packed away the last of the books as a tear rolled down her cheek.\n\nHow long had the library been open?",
        options: [
          "Twenty years",
          "Thirty years",
          "Forty years",
          "Fifty years"
        ],
        answer: "Fifty years",
        explanation: "The passage states that 'The old library was closing down after fifty years.'",
        difficulty: "easy",
        createdAt: new Date()
      },
      {
        id: "eng-comp-3",
        subjectId: "english",
        topicId: "comprehension",
        text: "Read the following passage and answer the question:\n\nThe school trip to the museum was cancelled due to heavy rain. Instead, Mr. Thompson showed the class a virtual tour of the dinosaur exhibit on the interactive whiteboard. Lily was disappointed because she had been looking forward to seeing the Tyrannosaurus Rex skeleton.\n\nWhy was the school trip cancelled?",
        options: [
          "The museum was closed",
          "The bus broke down",
          "Heavy rain",
          "Not enough teachers"
        ],
        answer: "Heavy rain",
        explanation: "The passage states that 'The school trip to the museum was cancelled due to heavy rain.'",
        difficulty: "medium",
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
      },
      {
        id: "eng-vocab-2",
        subjectId: "english",
        topicId: "vocabulary",
        text: "Which word means 'to move quietly and carefully'?",
        options: [
          "Stomp",
          "Creep",
          "Jump",
          "Slide"
        ],
        answer: "Creep",
        explanation: "'Creep' means to move quietly and carefully, often to avoid being noticed.",
        difficulty: "medium",
        createdAt: new Date()
      },
      {
        id: "eng-vocab-3",
        subjectId: "english",
        topicId: "vocabulary",
        text: "What is the meaning of the word 'enormous'?",
        options: [
          "Tiny",
          "Average",
          "Very large",
          "Colorful"
        ],
        answer: "Very large",
        explanation: "'Enormous' means extremely large in size, quantity, or extent.",
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
      },
      {
        id: "eng-gram-2",
        subjectId: "english",
        topicId: "grammar",
        text: "Which sentence uses the correct form of the verb?",
        options: [
          "She don't like chocolate ice cream.",
          "She doesn't likes chocolate ice cream.",
          "She doesn't like chocolate ice cream.",
          "She not like chocolate ice cream."
        ],
        answer: "She doesn't like chocolate ice cream.",
        explanation: "The correct form for the third person singular negative is 'doesn't like'.",
        difficulty: "medium",
        createdAt: new Date()
      },
      {
        id: "eng-gram-3",
        subjectId: "english",
        topicId: "grammar",
        text: "Which of these is a proper noun?",
        options: [
          "city",
          "London",
          "building",
          "large"
        ],
        answer: "London",
        explanation: "London is a proper noun because it's the name of a specific city. Proper nouns are always capitalized.",
        difficulty: "easy",
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
      },
      {
        id: "eng-spell-2",
        subjectId: "english",
        topicId: "spelling",
        text: "Which word is spelled correctly?",
        options: [
          "Necessery",
          "Necessary",
          "Neccesary",
          "Necesary"
        ],
        answer: "Necessary",
        explanation: "'Necessary' is spelled with one 'c' and two 's's.",
        difficulty: "medium",
        createdAt: new Date()
      },
      {
        id: "eng-spell-3",
        subjectId: "english",
        topicId: "spelling",
        text: "Which word is spelled correctly?",
        options: [
          "Definately",
          "Defintely",
          "Definitely",
          "Definetly"
        ],
        answer: "Definitely",
        explanation: "'Definitely' is the correct spelling. A common mistake is to spell it with an 'a' as in 'definately'.",
        difficulty: "medium",
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
      },
      {
        id: "eng-write-2",
        subjectId: "english",
        topicId: "writing",
        text: "Which of these is the best example of descriptive writing?",
        options: [
          "The boy ran fast.",
          "The boy was scared.",
          "The boy's heart pounded as he sprinted through the misty forest, fallen leaves crunching beneath his feet.",
          "The boy went to the forest and ran because he was scared."
        ],
        answer: "The boy's heart pounded as he sprinted through the misty forest, fallen leaves crunching beneath his feet.",
        explanation: "This example uses vivid sensory details and specific language to create a clear image in the reader's mind.",
        difficulty: "hard",
        createdAt: new Date()
      },
      {
        id: "eng-write-3",
        subjectId: "english",
        topicId: "writing",
        text: "What is the best way to end a story?",
        options: [
          "And they all lived happily ever after.",
          "The end.",
          "With a resolution that ties up the main conflict while leaving the reader with something to think about.",
          "With a surprise twist that contradicts everything that happened before."
        ],
        answer: "With a resolution that ties up the main conflict while leaving the reader with something to think about.",
        explanation: "A good ending resolves the main story while potentially leaving some elements for the reader to ponder.",
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
      },
      {
        id: "math-arith-2",
        subjectId: "mathematics",
        topicId: "arithmetic",
        text: "Calculate: 637 - 258",
        options: [
          "379",
          "389",
          "479",
          "489"
        ],
        answer: "379",
        explanation: "637 - 258 = 379",
        difficulty: "medium",
        createdAt: new Date()
      },
      {
        id: "math-arith-3",
        subjectId: "mathematics",
        topicId: "arithmetic",
        text: "Calculate: 24 × 7",
        options: [
          "158",
          "168",
          "178",
          "188"
        ],
        answer: "168",
        explanation: "24 × 7 = 168",
        difficulty: "easy",
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
      },
      {
        id: "math-frac-2",
        subjectId: "mathematics",
        topicId: "fractions",
        text: "What is 2/5 + 3/10?",
        options: [
          "5/15",
          "5/10",
          "7/10",
          "7/15"
        ],
        answer: "7/10",
        explanation: "2/5 = 4/10, so 4/10 + 3/10 = 7/10",
        difficulty: "medium",
        createdAt: new Date()
      },
      {
        id: "math-frac-3",
        subjectId: "mathematics",
        topicId: "fractions",
        text: "If you have 3/4 of a pizza and eat 1/2 of what you have, how much of the whole pizza have you eaten?",
        options: [
          "1/4",
          "3/8",
          "1/2",
          "5/8"
        ],
        answer: "3/8",
        explanation: "1/2 of 3/4 = 1/2 × 3/4 = 3/8",
        difficulty: "hard",
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
      },
      {
        id: "math-geom-2",
        subjectId: "mathematics",
        topicId: "geometry",
        text: "What is the perimeter of a square with sides of length 7.5 cm?",
        options: [
          "15 cm",
          "22.5 cm",
          "30 cm",
          "56.25 cm"
        ],
        answer: "30 cm",
        explanation: "Perimeter of square = 4 × side length = 4 × 7.5 = 30 cm",
        difficulty: "easy",
        createdAt: new Date()
      },
      {
        id: "math-geom-3",
        subjectId: "mathematics",
        topicId: "geometry",
        text: "A triangle has a base of 8 cm and a height of 6 cm. What is its area?",
        options: [
          "24 cm²",
          "28 cm²",
          "42 cm²",
          "48 cm²"
        ],
        answer: "24 cm²",
        explanation: "Area of triangle = (1/2) × base × height = (1/2) × 8 × 6 = 24 cm²",
        difficulty: "medium",
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
      },
      {
        id: "math-alg-2",
        subjectId: "mathematics",
        topicId: "algebra",
        text: "Solve for y: 2y - 8 = 10",
        options: [
          "y = 1",
          "y = 9",
          "y = 7",
          "y = 11"
        ],
        answer: "y = 9",
        explanation: "2y - 8 = 10\n2y = 10 + 8\n2y = 18\ny = 9",
        difficulty: "medium",
        createdAt: new Date()
      },
      {
        id: "math-alg-3",
        subjectId: "mathematics",
        topicId: "algebra",
        text: "If 5p = 20, what is the value of 2p + 3?",
        options: [
          "7",
          "8",
          "11",
          "13"
        ],
        answer: "11",
        explanation: "5p = 20\np = 4\n2p + 3 = 2(4) + 3 = 8 + 3 = 11",
        difficulty: "hard",
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
      },
      {
        id: "math-prob-2",
        subjectId: "mathematics",
        topicId: "problemSolving",
        text: "A train travels at 60 miles per hour. How far will it travel in 2.5 hours?",
        options: [
          "120 miles",
          "150 miles",
          "180 miles",
          "200 miles"
        ],
        answer: "150 miles",
        explanation: "Distance = Speed × Time = 60 × 2.5 = 150 miles",
        difficulty: "medium",
        createdAt: new Date()
      },
      {
        id: "math-prob-3",
        subjectId: "mathematics",
        topicId: "problemSolving",
        text: "A shopkeeper buys a book for £12 and sells it for £15. What is the percentage profit?",
        options: [
          "20%",
          "25%",
          "30%",
          "33.33%"
        ],
        answer: "25%",
        explanation: "Profit = £15 - £12 = £3\nPercentage profit = (Profit ÷ Cost price) × 100% = (3 ÷ 12) × 100% = 25%",
        difficulty: "hard",
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
      },
      {
        id: "vr-pattern-2",
        subjectId: "verbal-reasoning",
        topicId: "wordPatterns",
        text: "Which word follows the same pattern as: CAT, DOG, RABBIT?",
        options: [
          "GRASS",
          "HAMSTER",
          "COLLAR",
          "KENNEL"
        ],
        answer: "HAMSTER",
        explanation: "CAT, DOG, RABBIT are all pets/domestic animals. HAMSTER is also a pet/domestic animal.",
        difficulty: "easy",
        createdAt: new Date()
      },
      {
        id: "vr-pattern-3",
        subjectId: "verbal-reasoning",
        topicId: "wordPatterns",
        text: "Which word follows the same pattern as: RED, BLUE, GREEN?",
        options: [
          "RAINBOW",
          "COLORFUL",
          "YELLOW",
          "PAINT"
        ],
        answer: "YELLOW",
        explanation: "RED, BLUE, GREEN are all colors. YELLOW is also a color.",
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
      },
      {
        id: "vr-code-2",
        subjectId: "verbal-reasoning",
        topicId: "codedWords",
        text: "If CAT is coded as DCV, what is DOG coded as?",
        options: [
          "EPH",
          "FQI",
          "CPF",
          "EPI"
        ],
        answer: "EPH",
        explanation: "The code replaces each letter with the next letter in the alphabet (C→D, A→B, T→U), so DOG becomes EPH.",
        difficulty: "medium",
        createdAt: new Date()
      },
      {
        id: "vr-code-3",
        subjectId: "verbal-reasoning",
        topicId: "codedWords",
        text: "If MATH is coded as NZSI, what is ENGLISH coded as?",
        options: [
          "FOHMJTI",
          "FRKPMWL",
          "DPIMJTI",
          "FRKPMWI"
        ],
        answer: "FOHMJTI",
        explanation: "Each letter is replaced with the next letter in the alphabet, so E+1=F, N+1=O, etc.",
        difficulty: "hard",
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
      },
      {
        id: "vr-word-2",
        subjectId: "verbal-reasoning",
        topicId: "wordProblems",
        text: "Tom, Jack, and Ben are standing in a line. Tom is to the left of Jack, and Jack is to the left of Ben. Who is in the middle?",
        options: [
          "Tom",
          "Jack",
          "Ben",
          "Cannot be determined"
        ],
        answer: "Jack",
        explanation: "If Tom is to the left of Jack, and Jack is to the left of Ben, then the order is Tom, Jack, Ben. So Jack is in the middle.",
        difficulty: "medium",
        createdAt: new Date()
      },
      {
        id: "vr-word-3",
        subjectId: "verbal-reasoning",
        topicId: "wordProblems",
        text: "Alice, Bob, and Charlie each have a red, blue, or green ball, but not necessarily in that order. Alice does not have the red ball. Bob does not have the blue ball. What color is Charlie's ball?",
        options: [
          "Red",
          "Blue",
          "Green",
          "Cannot be determined"
        ],
        answer: "Cannot be determined",
        explanation: "From the given information, there are two possible arrangements: Alice (blue), Bob (green), Charlie (red) OR Alice (green), Bob (red), Charlie (blue). So Charlie's ball color cannot be determined.",
        difficulty: "hard",
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
      },
      {
        id: "vr-logic-2",
        subjectId: "verbal-reasoning",
        topicId: "logicalDeduction",
        text: "All animals with fur are mammals. Some mammals are carnivores. Are all animals with fur carnivores?",
        options: [
          "Yes",
          "No",
          "Maybe",
          "Not enough information"
        ],
        answer: "No",
        explanation: "Since only some mammals are carnivores, and all animals with fur are mammals, it is not necessary that all animals with fur are carnivores.",
        difficulty: "medium",
        createdAt: new Date()
      },
      {
        id: "vr-logic-3",
        subjectId: "verbal-reasoning",
        topicId: "logicalDeduction",
        text: "If it is raining, then the ground is wet. The ground is wet. Is it raining?",
        options: [
          "Yes",
          "No",
          "Maybe",
          "Not enough information"
        ],
        answer: "Maybe",
        explanation: "The ground being wet is a necessary consequence of rain, but there could be other reasons for the ground to be wet (e.g., a water spill). So we cannot conclude that it is definitely raining.",
        difficulty: "hard",
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
      },
      {
        id: "vr-analog-2",
        subjectId: "verbal-reasoning",
        topicId: "analogies",
        text: "Tree is to Forest as House is to:",
        options: [
          "Room",
          "Brick",
          "Town",
          "Garden"
        ],
        answer: "Town",
        explanation: "A forest is a collection of trees, just as a town is a collection of houses.",
        difficulty: "medium",
        createdAt: new Date()
      },
      {
        id: "vr-analog-3",
        subjectId: "verbal-reasoning",
        topicId: "analogies",
        text: "Page is to Book as:",
        options: [
          "Cover is to Paperback",
          "Chapter is to Story",
          "Seat is to Car",
          "Wall is to House"
        ],
        answer: "Wall is to House",
        explanation: "A page is a component part of a book, just as a wall is a component part of a house.",
        difficulty: "hard",
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
      },
      {
        id: "nvr-pat-2",
        subjectId: "non-verbal-reasoning",
        topicId: "patterns",
        text: "Which shape would come next in this pattern?\n○ ○ □ □ △ △ ?",
        options: [
          "○",
          "□",
          "△",
          "◇"
        ],
        answer: "○",
        explanation: "The pattern consists of pairs of shapes: two circles, two squares, two triangles, and then it repeats. So the next shape would be a circle.",
        difficulty: "medium",
        createdAt: new Date()
      },
      {
        id: "nvr-pat-3",
        subjectId: "non-verbal-reasoning",
        topicId: "patterns",
        text: "Which shape would come next in this pattern?\n● ○ ● ○ ● ○ ?",
        options: [
          "●",
          "○",
          "■",
          "□"
        ],
        answer: "●",
        explanation: "The pattern alternates between filled circle and empty circle: ● ○ ● ○ ● ○ ?. The next shape would be a filled circle (●).",
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
      },
      {
        id: "nvr-seq-2",
        subjectId: "non-verbal-reasoning",
        topicId: "sequences",
        text: "What number comes next in this sequence? 1, 4, 9, 16, ?",
        options: [
          "20",
          "25",
          "36",
          "64"
        ],
        answer: "25",
        explanation: "These are square numbers: 1² = 1, 2² = 4, 3² = 9, 4² = 16, 5² = 25",
        difficulty: "medium",
        createdAt: new Date()
      },
      {
        id: "nvr-seq-3",
        subjectId: "non-verbal-reasoning",
        topicId: "sequences",
        text: "What number comes next in this sequence? 3, 6, 11, 18, ?",
        options: [
          "25",
          "27",
          "29",
          "33"
        ],
        answer: "27",
        explanation: "The pattern is to add an increasing odd number: +3, +5, +7, +9. So 18 + 9 = 27.",
        difficulty: "hard",
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
      },
      {
        id: "nvr-mat-2",
        subjectId: "non-verbal-reasoning",
        topicId: "matrices",
        text: "In a 2×2 grid, the top row has a circle then a square. The bottom left has a triangle. What shape should go in the bottom right to complete the pattern?",
        options: [
          "Circle",
          "Square",
          "Triangle",
          "Rectangle"
        ],
        answer: "Square",
        explanation: "If the pattern is consistent across rows, and the top row goes from circle to square, then the bottom row should also go from triangle to square.",
        difficulty: "medium",
        createdAt: new Date()
      },
      {
        id: "nvr-mat-3",
        subjectId: "non-verbal-reasoning",
        topicId: "matrices",
        text: "In a 3×3 grid, if each row has exactly one circle, one square, and one triangle, and the first two rows are complete, what must be in the bottom right if the bottom row already has a circle in the left position and a triangle in the middle?",
        options: [
          "Circle",
          "Square",
          "Triangle",
          "Any shape is possible"
        ],
        answer: "Square",
        explanation: "If each row must have one of each shape, and the bottom row already has a circle and a triangle, the remaining position must contain a square.",
        difficulty: "medium",
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
      },
      {
        id: "nvr-shape-2",
        subjectId: "non-verbal-reasoning",
        topicId: "shapes",
        text: "Which 3D shape has 6 faces, 8 vertices, and 12 edges?",
        options: [
          "Sphere",
          "Cube",
          "Pyramid",
          "Cylinder"
        ],
        answer: "Cube",
        explanation: "A cube has 6 square faces, 8 corners (vertices), and 12 edges.",
        difficulty: "medium",
        createdAt: new Date()
      },
      {
        id: "nvr-shape-3",
        subjectId: "non-verbal-reasoning",
        topicId: "shapes",
        text: "If a shape has 8 sides, what is it called?",
        options: [
          "Hexagon",
          "Heptagon",
          "Octagon",
          "Nonagon"
        ],
        answer: "Octagon",
        explanation: "An octagon has 8 sides. The prefix 'oct-' refers to eight.",
        difficulty: "medium",
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
      },
      {
        id: "nvr-sym-2",
        subjectId: "non-verbal-reasoning",
        topicId: "symmetry",
        text: "Which of these shapes has rotational symmetry?",
        options: [
          "Scalene triangle",
          "Rectangle (not a square)",
          "Circle",
          "Trapezoid"
        ],
        answer: "Circle",
        explanation: "A circle has infinite rotational symmetry - it looks the same when rotated by any angle.",
        difficulty: "medium",
        createdAt: new Date()
      },
      {
        id: "nvr-sym-3",
        subjectId: "non-verbal-reasoning",
        topicId: "symmetry",
        text: "How many lines of symmetry does a regular hexagon have?",
        options: [
          "4",
          "6",
          "8",
          "12"
        ],
        answer: "6",
        explanation: "A regular hexagon has 6 lines of symmetry - one through each vertex and the opposite side, and one through the midpoints of opposite sides.",
        difficulty: "hard",
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
