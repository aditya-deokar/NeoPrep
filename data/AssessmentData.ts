import { Question } from "@/types/zodAssesmentSchema";


export const quizData: Question[] = [
  {
    id: "py-basics-001",
    topic: "Python Basic Syntax and Data Types",
    difficulty: "Easy",
    questionText: "What is the correct way to assign the integer value 10 to a variable named 'age' in Python?",
    options: [
      { id: "A", text: "age = 10" },
      { id: "B", text: "10 = age" },
      { id: "C", text: "int age = 10" },
      { id: "D", text: "age := 10" },
    ],
    correctAnswerId: "A",
    explanation:
      "In Python, assignment is done using the '=' operator, placing the variable name on the left and the value on the right. No explicit type declaration is needed.",
  },
  {
    id: "py-ds-001",
    topic: "Python Data Structures",
    difficulty: "Medium",
    questionText:
      "Which data structure is most appropriate for storing an ordered collection of unique elements in Python?",
    options: [
      { id: "A", text: "List" },
      { id: "B", text: "Tuple" },
      { id: "C", text: "Set" },
      { id: "D", text: "Dictionary" },
    ],
    correctAnswerId: "C",
    explanation:
      "A set is an unordered collection of unique elements. While lists and tuples are ordered, they allow duplicates. Dictionaries store key-value pairs.",
  },
  {
    id: "py-control-001",
    topic: "Control Flow",
    difficulty: "Easy",
    questionText:
      "What keyword is used to specify a condition that should be checked if the initial 'if' condition is false?",
    options: [
      { id: "A", text: "else if" },
      { id: "B", text: "elseif" },
      { id: "C", text: "elif" },
      { id: "D", text: "otherwise" },
    ],
    correctAnswerId: "C",
    explanation:
      "In Python, 'elif' is the keyword used to specify a chain of conditional checks after an initial 'if' statement.",
  },
  {
    id: "py-loops-001",
    topic: "Loops",
    difficulty: "Medium",
    questionText:
      "What will be the output of the following code snippet?\n\n```python\nfor i in range(2, 6, 2):\n    print(i)\n```",
    options: [
      { id: "A", text: "2\n3\n4\n5" },
      { id: "B", text: "2\n4\n6" },
      { id: "C", text: "2\n4" },
      { id: "D", text: "2\n3\n4" },
    ],
    correctAnswerId: "C",
    explanation:
      "The `range(start, stop, step)` function generates numbers from `start` (inclusive) to `stop` (exclusive), incrementing by `step`. So, it generates 2 and 4.",
  },
  {
    id: "py-functions-001",
    topic: "Functions",
    difficulty: "Easy",
    questionText: "What keyword is used to return a value from a Python function?",
    options: [
      { id: "A", text: "value" },
      { id: "B", text: "exit" },
      { id: "C", text: "return" },
      { id: "D", text: "yield" },
    ],
    correctAnswerId: "C",
    explanation:
      "The 'return' keyword is used to send a value back to the caller of the function. 'Yield' is used for generator functions.",
  },
  {
    id: "py-functions-002",
    topic: "Functions",
    difficulty: "Medium",
    questionText: "What are the two main types of arguments that a function can receive?",
    options: [
      { id: "A", text: "Positional and keyword arguments" },
      { id: "B", text: "Required and optional arguments" },
      { id: "C", text: "Global and local arguments" },
      { id: "D", text: "Integer and string arguments" },
    ],
    correctAnswerId: "A",
    explanation:
      "Positional arguments must be given in the order in which they are defined, whereas keyword arguments can be given in any order by explicitly naming them.",
  },
  {
    id: "py-fileio-001",
    topic: "Basic File I/O",
    difficulty: "Medium",
    questionText: "Which mode would you use to both read from and write to a file?",
    options: [
      { id: "A", text: "'r'" },
      { id: "B", text: "'w'" },
      { id: "C", text: "'a'" },
      { id: "D", text: "'r+'" },
    ],
    correctAnswerId: "D",
    explanation:
      "The mode 'r+' opens the file for both reading and writing. The 'w' mode overwrites the file. The 'a' mode only appends and doesn't read. The 'r' mode only reads.",
  },
  {
    id: "py-modules-001",
    topic: "Introduction to Modules and Packages",
    difficulty: "Easy",
    questionText: "What keyword is used to bring a module into your Python script?",
    options: [
      { id: "A", text: "include" },
      { id: "B", text: "use" },
      { id: "C", text: "require" },
      { id: "D", text: "import" },
    ],
    correctAnswerId: "D",
    explanation:
      "The `import` keyword is used to include modules (libraries) in a Python script, giving access to the functions and classes defined within that module.",
  },
  {
    id: "py-exceptions-001",
    topic: "Error Handling",
    difficulty: "Medium",
    questionText: "Which block of code is executed if an exception occurs within the 'try' block?",
    options: [
      { id: "A", text: "'finally'" },
      { id: "B", text: "'else'" },
      { id: "C", text: "'except'" },
      { id: "D", text: "'raise'" },
    ],
    correctAnswerId: "C",
    explanation:
      "The 'except' block is specifically designed to catch and handle exceptions that occur within the associated 'try' block.",
  },
  {
    id: "py-datatypes-001",
    topic: "Python Basic Syntax and Data Types",
    difficulty: "Easy",
    questionText: "Which of the following is NOT a built-in data type in Python?",
    options: [
      { id: "A", text: "Integer" },
      { id: "B", text: "Float" },
      { id: "C", text: "Character" },
      { id: "D", text: "Boolean" },
    ],
    correctAnswerId: "C",
    explanation:
      "Python does not have a dedicated 'Character' data type. Single characters are represented as strings of length one.",
  },
  {
    id: "py-datatypes-002",
    topic: "Python Basic Syntax and Data Types",
    difficulty: "Medium",
    questionText: "What is the output of the following code?\n```python\nprint(type([1, 2, 'hello']))\n```",
    options: [
      { id: "A", text: "<class 'tuple'>" },
      { id: "B", text: "<class 'list'>" },
      { id: "C", text: "<class 'set'>" },
      { id: "D", text: "<class 'string'>" },
    ],
    correctAnswerId: "B",
    explanation:
      "The `type()` function returns the type of the object. The object `[1, 2, 'hello']` is a Python list because it is enclosed in square brackets and contains a mix of data types.",
  },
  {
    id: "py-ds-002",
    topic: "Python Data Structures",
    difficulty: "Medium",
    questionText: "Which data structure in Python is mutable?",
    options: [
      { id: "A", text: "Tuple" },
      { id: "B", text: "String" },
      { id: "C", text: "Integer" },
      { id: "D", text: "List" },
    ],
    correctAnswerId: "D",
    explanation:
      "Lists are mutable, meaning their elements can be changed after creation. Tuples, strings, and integers are immutable.",
  },
  {
    id: "py-control-002",
    topic: "Control Flow",
    difficulty: "Medium",
    questionText:
      "What is the output of the following code?\n```python\nx = 5\nif x > 10:\n    print('Greater than 10')\nelif x > 5:\n    print('Greater than 5')\nelse:\n    print('Less than or equal to 5')\n```",
    options: [
      { id: "A", text: "Greater than 10" },
      { id: "B", text: "Greater than 5" },
      { id: "C", text: "Less than or equal to 5" },
      { id: "D", text: "No output" },
    ],
    correctAnswerId: "C",
    explanation:
      "The variable `x` is assigned the value 5. The first condition `x > 10` is false. The second condition `x > 5` is also false. Thus, the `else` block is executed, printing 'Less than or equal to 5'.",
  },
  {
    id: "py-loops-002",
    topic: "Loops",
    difficulty: "Medium",
    questionText:
      "What will be the output of the following code?\n```python\ncount = 0\nwhile count < 5:\n    print(count)\n    count += 1\nelse:\n    print('Count is no longer less than 5')\n```",
    options: [
      { id: "A", text: "0\n1\n2\n3\n4" },
      { id: "B", text: "0\n1\n2\n3\n4\nCount is no longer less than 5" },
      { id: "C", text: "Count is no longer less than 5" },
      { id: "D", text: "Error" },
    ],
    correctAnswerId: "B",
    explanation:
      "The `while` loop prints the values of `count` from 0 to 4. Since the loop completes normally (without a `break` statement), the `else` block is executed after the loop, printing 'Count is no longer less than 5'.",
  },
  {
    id: "py-functions-003",
    topic: "Functions",
    difficulty: "Medium",
    questionText: "What is a lambda function in Python?",
    options: [
      { id: "A", text: "A function defined with the 'def' keyword" },
      { id: "B", text: "A recursive function" },
      { id: "C", text: "An anonymous function" },
      { id: "D", text: "A function that returns multiple values" },
    ],
    correctAnswerId: "C",
    explanation:
      "A lambda function is a small, anonymous function defined using the `lambda` keyword. It can take any number of arguments but can only have one expression.",
  },
  {
    id: "py-fileio-002",
    topic: "Basic File I/O",
    difficulty: "Medium",
    questionText: "What is the purpose of the 'with' statement when working with files?",
    options: [
      { id: "A", text: "It automatically closes the file after the block of code is executed." },
      { id: "B", text: "It opens the file in write mode." },
      { id: "C", text: "It allows you to read binary files." },
      { id: "D", text: "It is used for error handling." },
    ],
    correctAnswerId: "A",
    explanation:
      "The `with` statement simplifies exception handling by encapsulating common preparation and cleanup tasks. A common use of the `with` statement is to automatically close a file.",
  },
  {
    id: "py-modules-002",
    topic: "Introduction to Modules and Packages",
    difficulty: "Medium",
    questionText: "How do you import a specific function from a module in Python?",
    options: [
      { id: "A", text: "import module.function" },
      { id: "B", text: "from module import function" },
      { id: "C", text: "use module.function" },
      { id: "D", text: "include module.function" },
    ],
    correctAnswerId: "B",
    explanation:
      "The syntax `from module import function` is used to import a specific function from a module directly into the current namespace.",
  },
  {
    id: "py-exceptions-002",
    topic: "Error Handling",
    difficulty: "Medium",
    questionText: "Which block of code will always be executed whether an exception is raised or not?",
    options: [
      { id: "A", text: "else" },
      { id: "B", text: "except" },
      { id: "C", text: "finally" },
      { id: "D", text: "try" },
    ],
    correctAnswerId: "C",
    explanation:
      "The code in the `finally` block is always executed after the `try` block and any associated `except` blocks, regardless of whether an exception was raised or caught.",
  },
  {
    id: "py-ds-adv-001",
    topic: "Python Data Structures",
    difficulty: "Hard",
    questionText: "Which of the following statement is correct about Python sets?",
    options: [
      { id: "A", text: "Sets are unordered collections of unique items" },
      { id: "B", text: "Sets are immutable" },
      { id: "C", text: "Sets are mutable and allow duplicates." },
      { id: "D", text: "Sets are not iterable" },
    ],
    correctAnswerId: "A",
    explanation:
      "The Sets are unordered collections of unique items, means it does not have a specific order and doesn't allow duplicate values",
  },
  {
    id: "py-loops-adv-001",
    topic: "Loops",
    difficulty: "Hard",
    questionText:
      "What is the output of the following code snippet?\n\n```python\nnumbers = [1, 2, 3, 4, 5]\nfor num in numbers[:]:  \n    if num % 2 == 0:\n        numbers.remove(num)\n\nprint(numbers)\n```",
    options: [
      { id: "A", text: "[1, 3, 5]" },
      { id: "B", text: "[1, 2, 3, 4, 5]" },
      { id: "C", text: "[2, 4]" },
      { id: "D", text: "[1, 3]" },
    ],
    correctAnswerId: "D",
    explanation:
      "This will print `[1, 3]` because, the code iterates over the original list, and when an even number (2) is encountered, it's removed from the original list, shifting the indices of the remaining elements. After removing 2, the iterator moves to the next original index, which now contains 4 (skipping 3). So when `3` is skipped loop encounter `4` , then removes `4` ",
  },
]
