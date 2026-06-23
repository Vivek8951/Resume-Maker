import { NextResponse } from "next/server";
import { HfInference } from "@huggingface/inference";

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    if (!text) {
      return NextResponse.json({ error: "No text provided" }, { status: 400 });
    }

    if (!process.env.HUGGINGFACE_API_KEY) {
      return NextResponse.json({ error: "HUGGINGFACE_API_KEY is not configured on the server." }, { status: 500 });
    }

    const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

    const prompt = `
      You are an expert ATS resume parser. I will provide you with the raw extracted text from a user's resume PDF.
      Your job is to parse this text perfectly and map it into the following JSON structure. 
      
      CRITICAL INSTRUCTIONS:
      1. Do NOT summarize or shorten bullet points. Extract them exactly as written.
      2. Do NOT skip any past jobs, education, or projects. Map every single one you find.
      3. Do NOT return any markdown formatting, explanation, or conversational text. Just output the raw JSON object.

      Return a JSON object exactly matching this structure:
      {
        "personal": {
          "name": "string",
          "email": "string",
          "phone": "string",
          "github": "string (optional)",
          "summary": "string (a professional summary extracted or generated based on their experience)"
        },
        "education": [
          {
            "id": "string (1, 2, 3...)",
            "degree": "string",
            "school": "string",
            "board": "string (optional)",
            "date": "string (e.g. 2020 - 2024)",
            "marks": "string (e.g. CGPA: 3.8/4.0)",
            "certificateUrl": "string (optional url to degree/transcript/certificate)"
          }
        ],
        "experience": [
          {
            "id": "string (1, 2, 3...)",
            "title": "string",
            "company": "string",
            "location": "string",
            "date": "string (e.g. Jan 2022 - Present)",
            "description": "string (bullet points or paragraph of what they did)",
            "certificateUrl": "string (optional url to internship/work certificate)"
          }
        ],
        "trainings": [
          {
            "id": "string",
            "title": "string",
            "company": "string",
            "location": "string",
            "date": "string",
            "certificateUrl": "string (optional url to course/training certificate)",
            "description": "string (optional training/course description or topics covered)"
          }
        ],
        "projects": [
          {
            "id": "string",
            "title": "string",
            "date": "string",
            "description": "string",
            "link": "string (optional url)"
          }
        ],
        "skills": [
          {
            "id": "string",
            "name": "string",
            "level": "Beginner | Intermediate | Advanced"
          }
        ]
      }

      Here is the raw resume text:
      ${text}
      
      JSON OUTPUT ONLY:
    `;

    const response = await hf.chatCompletion({
      model: "meta-llama/Meta-Llama-3-8B-Instruct",
      messages: [
        {
          role: "system",
          content: "You are a precise resume parser. Output ONLY a raw, valid JSON object matching the requested schema. Do not output markdown code blocks (like ```json). Do not write any conversational text or introductory sentences."
        },
        { role: "user", content: prompt }
      ],
      temperature: 0.1,
    });

    let result = response.choices[0]?.message?.content || "{}";
    
    // Clean up potential markdown blocks or conversational wrappers
    const firstOpenBrace = result.indexOf("{");
    const lastCloseBrace = result.lastIndexOf("}");
    if (firstOpenBrace !== -1 && lastCloseBrace !== -1 && lastCloseBrace > firstOpenBrace) {
      result = result.substring(firstOpenBrace, lastCloseBrace + 1);
    } else {
      if (result.includes("```json")) {
        result = result.split("```json")[1].split("```")[0].trim();
      } else if (result.includes("```")) {
        result = result.split("```")[1].split("```")[0].trim();
      }
    }

    const parsedData = JSON.parse(result);

    return NextResponse.json({ success: true, data: parsedData });
  } catch (error: any) {
    console.error("AI Analysis Error:", error);
    return NextResponse.json({ error: error.message || "Failed to analyze resume" }, { status: 500 });
  }
}

