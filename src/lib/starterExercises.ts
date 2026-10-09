// Starter deck exercises: the same 8 exercises for every language. Tests are
// plain input -> expected output, so they grade any language; only the
// on-slide syntax hints change per language.
//
// The notes text written to each slide uses the add-on's coding-question
// format (see codekiwi-app-backend/src/services/testCases.js), which the
// grader reads: output must END with the expected lines, prompt text before
// the answer is ignored, and case/extra spaces are ignored by default.

export const STARTER_LANGUAGES = ["python", "javascript", "java", "cpp"] as const;
export type StarterLanguage = (typeof STARTER_LANGUAGES)[number];

export const LANGUAGE_LABEL: Record<StarterLanguage, string> = {
  python: "Python",
  javascript: "JavaScript",
  java: "Java",
  cpp: "C++",
};

type InputKind = "none" | "line" | "int" | "ints2" | "ints3";

export type Exercise = {
  title: string;
  prompt: string; // shown on the slide and stored as the question prompt
  input: InputKind;
  tests: { input: string; output: string }[];
  /** Run shown on the slide, when the first test is too long to show. */
  example?: { input: string; output: string };
};

export const EXERCISES: Exercise[] = [
  {
    title: "Hello, World!",
    prompt: 'Print exactly: Hello, World!',
    input: "none",
    tests: [{ input: "", output: "Hello, World!" }],
  },
  {
    title: "Greeting",
    prompt: "Read a name, then print a greeting in the form: Hello, NAME!",
    input: "line",
    tests: [
      { input: "Ava", output: "Hello, Ava!" },
      { input: "Ben", output: "Hello, Ben!" },
    ],
  },
  {
    title: "Sum of two numbers",
    prompt: "Read two whole numbers on one line and print their sum.",
    input: "ints2",
    tests: [
      { input: "5 7", output: "12" },
      { input: "-3 3", output: "0" },
      { input: "100 23", output: "123" },
    ],
  },
  {
    title: "Even or odd",
    prompt: "Read a whole number and print even or odd.",
    input: "int",
    tests: [
      { input: "10", output: "even" },
      { input: "7", output: "odd" },
      { input: "0", output: "even" },
      { input: "-3", output: "odd" },
    ],
  },
  {
    title: "Count up",
    prompt: "Read a number n and print the numbers 1 to n, one per line.",
    input: "int",
    tests: [
      { input: "3", output: "1\n2\n3" },
      { input: "1", output: "1" },
      { input: "5", output: "1\n2\n3\n4\n5" },
    ],
  },
  {
    title: "FizzBuzz",
    prompt:
      "Read n and print the numbers 1 to n, one per line, but print Fizz for multiples of 3, Buzz for multiples of 5, and FizzBuzz for multiples of both.",
    input: "int",
    example: { input: "3", output: "1\n2\nFizz" },
    tests: [
      { input: "5", output: "1\n2\nFizz\n4\nBuzz" },
      { input: "15", output: "1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz" },
      { input: "1", output: "1" },
    ],
  },
  {
    title: "Reverse a word",
    prompt: "Read a word and print it backwards.",
    input: "line",
    tests: [
      { input: "kiwi", output: "iwik" },
      { input: "racecar", output: "racecar" },
      { input: "code", output: "edoc" },
    ],
  },
  {
    title: "Largest of three",
    prompt: "Read three whole numbers on one line and print the largest.",
    input: "ints3",
    tests: [
      { input: "3 9 5", output: "9" },
      { input: "-1 -7 -3", output: "-1" },
      { input: "4 4 2", output: "4" },
    ],
  },
];

const READ_HINT: Record<StarterLanguage, Record<Exclude<InputKind, "none">, string>> = {
  python: {
    line: "word = input()",
    int: "n = int(input())",
    ints2: "a, b = map(int, input().split())",
    ints3: "a, b, c = map(int, input().split())",
  },
  javascript: {
    line: "const word = prompt();",
    int: "const n = Number(prompt());",
    ints2: 'const [a, b] = prompt()\n  .split(" ").map(Number);',
    ints3: 'const [a, b, c] = prompt()\n  .split(" ").map(Number);',
  },
  java: {
    line: "String word = sc.nextLine();",
    int: "int n = sc.nextInt();",
    ints2: "int a = sc.nextInt();\nint b = sc.nextInt();",
    ints3: "int a = sc.nextInt(), b = sc.nextInt(),\n    c = sc.nextInt();",
  },
  cpp: {
    line: "string word; getline(cin, word);",
    int: "int n; cin >> n;",
    ints2: "int a, b; cin >> a >> b;",
    ints3: "int a, b, c; cin >> a >> b >> c;",
  },
};

const PRINT_HINT: Record<StarterLanguage, string> = {
  python: 'print("Hello, World!")',
  javascript: 'console.log("Hello, World!");',
  java: 'System.out.println("Hello, World!");',
  cpp: 'cout << "Hello, World!" << endl;',
};

const PRINT_ANSWER: Record<StarterLanguage, string> = {
  python: "print(answer)",
  javascript: "console.log(answer);",
  java: "System.out.println(answer);",
  cpp: "cout << answer << endl;",
};

/** Syntax hints for the slide: how to read this exercise's input (if any) and how to print. */
export function hintFor(language: StarterLanguage, ex: Exercise): { read: string | null; print: string } {
  if (ex.input === "none") return { read: null, print: PRINT_HINT[language] };
  const read = READ_HINT[language][ex.input];
  return {
    read: language === "java" ? `Scanner sc = new Scanner(System.in);\n${read}` : read,
    print: PRINT_ANSWER[language],
  };
}

/** Speaker notes in the coding-question format the grader reads. */
export function notesFor(ex: Exercise): string {
  let out = `Code Question:\n${ex.prompt}`;
  for (const t of ex.tests) {
    out += "\n\n";
    if (t.input) out += `Test Input:\n${t.input}\n`;
    out += `Test Output:\n${t.output}`;
  }
  return out;
}
