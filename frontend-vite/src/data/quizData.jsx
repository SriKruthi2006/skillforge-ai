const quizData = {
  Python: [
    {
      question: "What is the correct file extension for Python?",
      options: [".py", ".java", ".js", ".cpp"],
      answer: ".py",
    },
    {
      question: "Which keyword defines a function in Python?",
      options: ["func", "define", "def", "function"],
      answer: "def",
    },
    {
      question: "Which data type is used for text?",
      options: ["int", "float", "str", "bool"],
      answer: "str",
    },
    {
      question: "Which loop is used when iterations are known?",
      options: ["while", "for", "loop", "repeat"],
      answer: "for",
    },
    {
      question: "What does OOP stand for?",
      options: [
        "Object Oriented Programming",
        "Only One Program",
        "Object Output Process",
        "None",
      ],
      answer: "Object Oriented Programming",
    },
    {
      question: "Which symbol is used for comments?",
      options: ["//", "#", "/* */", "--"],
      answer: "#",
    },
    {
      question: "Which keyword is used for exception handling?",
      options: ["try", "catch", "error", "handle"],
      answer: "try",
    },
    {
      question: "Which collection is unordered?",
      options: ["list", "tuple", "set", "string"],
      answer: "set",
    },
    {
      question: "What is used to define a class?",
      options: ["class", "define", "object", "struct"],
      answer: "class",
    },
    {
      question: "Which operator is used for exponent?",
      options: ["^", "**", "%", "//"],
      answer: "**",
    },
  ],

  Java: [
    {
      question: "Which keyword is used to define a class in Java?",
      options: ["class", "define", "struct", "object"],
      answer: "class",
    },
    {
      question: "Which method is the entry point of Java?",
      options: ["start()", "main()", "run()", "init()"],
      answer: "main()",
    },
    {
      question: "Java is ____ language.",
      options: ["Compiled", "Interpreted", "Both", "None"],
      answer: "Both",
    },
    {
      question: "Which keyword is used for inheritance?",
      options: ["extends", "implements", "inherits", "super"],
      answer: "extends",
    },
    {
      question: "Which collection does not allow duplicates?",
      options: ["List", "Set", "Map", "ArrayList"],
      answer: "Set",
    },
    {
      question: "Which keyword is used to handle exceptions?",
      options: ["try", "error", "handle", "catching"],
      answer: "try",
    },
    {
      question: "Which operator compares values?",
      options: ["=", "==", "!=", "<>"],
      answer: "==",
    },
    {
      question: "Which keyword prevents inheritance?",
      options: ["static", "final", "private", "const"],
      answer: "final",
    },
    {
      question: "Which memory stores objects?",
      options: ["Stack", "Heap", "Register", "Cache"],
      answer: "Heap",
    },
    {
      question: "Which framework is popular in Java backend?",
      options: ["React", "Spring", "Django", "Angular"],
      answer: "Spring",
    },
  ],

  Aptitude: [
    {
      question: "What is 25% of 200?",
      options: ["25", "50", "75", "100"],
      answer: "50",
    },
    {
      question: "If a train travels 60 km/hr for 2 hours, distance is?",
      options: ["100 km", "120 km", "80 km", "140 km"],
      answer: "120 km",
    },
    {
      question: "What is 15% of 300?",
      options: ["30", "45", "60", "75"],
      answer: "45",
    },
    {
      question: "LCM of 4 and 6?",
      options: ["12", "24", "6", "18"],
      answer: "12",
    },
    {
      question: "Simple Interest formula?",
      options: ["P+R+T", "PRT/100", "P-R-T", "PRT"],
      answer: "PRT/100",
    },
    {
      question: "If CP=100 and SP=120, profit is?",
      options: ["10", "20", "30", "40"],
      answer: "20",
    },
    {
      question: "Average of 10, 20, 30?",
      options: ["15", "20", "25", "30"],
      answer: "20",
    },
    {
      question: "Probability of getting head in a coin?",
      options: ["1", "0", "1/2", "2"],
      answer: "1/2",
    },
    {
      question: "Time & Work formula?",
      options: ["Work = Time × Rate", "Work = Time + Rate", "Work = Time - Rate", "None"],
      answer: "Work = Time × Rate",
    },
    {
      question: "1/4 of 80?",
      options: ["10", "20", "30", "40"],
      answer: "20",
    },
  ],

  "Logical Reasoning": [
    {
      question: "If A is father of B, B is sister of C. A is ___ of C?",
      options: ["Brother", "Father", "Uncle", "Grandfather"],
      answer: "Father",
    },
    {
      question: "Coding: CAT = DBU. DOG = ?",
      options: ["EPH", "EPI", "FQI", "DPI"],
      answer: "EPH",
    },
    {
      question: "Find odd one: Apple, Mango, Carrot, Banana",
      options: ["Apple", "Mango", "Carrot", "Banana"],
      answer: "Carrot",
    },
    {
      question: "If 2+3=10, 3+4=21, 4+5=?",
      options: ["36", "40", "45", "30"],
      answer: "36",
    },
    {
      question: "Direction: If you turn left twice, you face?",
      options: ["Same direction", "Opposite direction", "Right", "North"],
      answer: "Opposite direction",
    },
    {
      question: "Series: 2, 4, 8, 16, ?",
      options: ["20", "24", "32", "18"],
      answer: "32",
    },
    {
      question: "Blood relation: Sister’s son is?",
      options: ["Nephew", "Cousin", "Brother", "Uncle"],
      answer: "Nephew",
    },
    {
      question: "Find missing: 1, 4, 9, 16, ?",
      options: ["20", "24", "25", "30"],
      answer: "25",
    },
    {
      question: "Mirror image of LEFT is?",
      options: ["TFEL", "LEFT", "RIGHT", "ELTF"],
      answer: "TFEL",
    },
    {
      question: "If all cats are animals and some animals are dogs, then?",
      options: [
        "All cats are dogs",
        "Some cats may be dogs",
        "No cats are dogs",
        "All dogs are cats",
      ],
      answer: "Some cats may be dogs",
    },
  ],
};

export default quizData;