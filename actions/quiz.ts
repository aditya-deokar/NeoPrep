"use server";

import prisma from "@/lib/prisma";
import { AssessmentSchema } from "@/types/zodAssesmentSchema";
import { google } from "@ai-sdk/google";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { generateObject } from "ai";
import { revalidatePath } from "next/cache";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });


export const GenerateQuiz = async (
  courseName: string,
  chapter: { ChapterName: string; About: string; }
) => {
  try {
    

    const { object } = await generateObject({
      model: google("gemini-2.0-flash-001", {
        structuredOutputs: false,
      }),
      schema: AssessmentSchema,
      prompt: `
      Act as an expert instructional designer and ${courseName} expert (e.g., 'Python Developer', 'Digital Marketing Strategist', 'Project Management Professional'). Your task is to generate a comprehensive Multiple Choice Question (MCQ) assessment for the course titled: ${courseName}.
      Primary Goal: This assessment must be designed to effectively gauge a candidate's true understanding and proficiency level, distinguishing between rote memorization and practical application/conceptual knowledge.

**Key Requirements:**

Initial Question Count:** Generate exactly 20 MCQs for the baseline assessment.
Knowledge Level Assessment:
    - Include a deliberate mix of questions targeting different knowledge depths relevant to this course. Use the following distribution as a guide, adjusting if necessary for the specific nature of **[Course Name]**:
        - **Foundational/Beginner (approx. 30%):** Basic terminology, core definitions, simple concepts specific to **[Course Subject Matter Area]**.
        - **Intermediate (approx. 50%):** Applying concepts, understanding processes, analyzing simple scenarios, comparing/contrasting key elements within **[Course Subject Matter Area]**.
        - **Advanced (approx. 20%):** Complex application, synthesis of multiple concepts, critical evaluation, problem-solving in nuanced scenarios relevant to **[Course Subject Matter Area]**.
    - Vary question formats: Include conceptual questions, scenario-based questions, and questions requiring analysis of information/data/code snippets relevant to **[Course Subject Matter Area]**.
Scalability Consideration: Design these questions as part of a larger potential pool. Tag each question with a difficulty ('Easy', 'Medium', 'Hard' - corresponding roughly to Foundational/Intermediate/Advanced) and a topic tag (using the specific topic names you listed above, e.g., 'Control Flow and Loops'). This facilitates potential future expansion or adaptive testing logic.
Questions should be clear, unambiguous, and test meaningful aspects of ${chapter} as covered in ${courseName}. Options should be plausible distractors. Avoid trivial questions unless essential for 'Easy' difficulty. Ensure any provided scenarios, data, or code snippets are accurate and relevant.
Generate the JSON array containing 20 MCQs based on the criteria above, using the specific course details provided.
Output Format: Provide the output as a **JSON array**. Each object in the array must represent a single MCQ and strictly adhere to the following structure:      
    

     {
      "id": "string (Unique identifier, e.g., py-basics-001, mktg-seo-005)",
      "topic": "string (Matches one of the specific topics you listed above)",
      "difficulty": "string ('Easy', 'Medium', 'Hard')",
      "questionText": "string (The question itself, potentially including relevant context, scenarios, or data/code snippets)",
      "options": [
        { "id": "string (e.g., 'A', 'B', '1', 'opt1')", "text": "string (Option text)" },
        // (Minimum 3-4 plausible options per question)
      ],
      "correctAnswerId": "string (The 'id' of the correct option from the 'options' array)",
      "explanation": "string (Brief explanation why the answer is correct, crucial for learning and validating the question's intent)"
    } 

    example:
    [
  {
    "id": "py-basics-001",
    "topic": "Python Basic Syntax and Data Types",
    "difficulty": "Easy",
    "questionText": "What is the correct way to assign the integer value 10 to a variable named 'age' in Python?",
    "options": [
      { "id": "A", "text": "age = 10" },
      { "id": "B", "text": "10 = age" },
      { "id": "C", "text": "int age = 10" },
      { "id": "D", "text": "age := 10" }
    ],
    "correctAnswerId": "A",
    "explanation": "In Python, assignment is done using the '=' operator, placing the variable name on the left and the value on the right. No explicit type declaration is needed."
  },
  {
    "id": "py-ds-001",
    "topic": "Python Data Structures",
    "difficulty": "Medium",
    "questionText": "Which data structure is most appropriate for storing an ordered collection of unique elements in Python?",
    "options": [
      { "id": "A", "text": "List" },
      { "id": "B", "text": "Tuple" },
      { "id": "C", "text": "Set" },
      { "id": "D", "text": "Dictionary" }
    ],
    "correctAnswerId": "C",
    "explanation": "A set is an unordered collection of unique elements. While lists and tuples are ordered, they allow duplicates. Dictionaries store key-value pairs."
  },...
  ]

`});


    return object ;


  } catch (error: any) {
    console.error("Error generating chapter content:", error);
    throw new Error(error.message || "Failed to generate chapter content.");
  }
};