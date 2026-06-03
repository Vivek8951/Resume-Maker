import { NextResponse } from "next/server";
import { HfInference } from "@huggingface/inference";

export async function POST(req: Request) {
  try {
    const { text, type } = await req.json();

    if (!text) {
      return NextResponse.json({ error: "No text provided" }, { status: 400 });
    }

    if (!process.env.HUGGINGFACE_API_KEY) {
      return NextResponse.json({ error: "HUGGINGFACE_API_KEY is not configured on the server." }, { status: 500 });
    }

    const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

    let typeContext = "work experience description";
    if (type === "project") {
      typeContext = "project description";
    } else if (type === "summary") {
      typeContext = "professional summary";
    }

    const prompt = `
      You are an expert resume writer and ATS optimization specialist. 
      Your task is to rewrite and enhance the following ${typeContext} to make it sound highly professional, action-oriented, and impactful.
      
      CRITICAL INSTRUCTIONS:
      1. Use strong action verbs (e.g., Developed, Spearheaded, Optimized, Orchestrated).
      2. Keep the core meaning, technologies, and achievements, but make them sound more impressive and articulate.
      3. Keep it concise. For experience/projects, format them as professional bullet points (using "-" at the start of lines) or a single high-impact paragraph depending on the input.
      4. Output ONLY the enhanced text. Do not write any conversational text, explanations, intro, or wrap in markdown blocks.
      
      Original Text:
      "${text}"
      
      Enhanced Text:
    `;

    const response = await hf.chatCompletion({
      model: "meta-llama/Meta-Llama-3-8B-Instruct",
      messages: [
        {
          role: "system",
          content: "You are a professional resume editor. Output ONLY the enhanced text matching the user's input type. Never output markdown code blocks (like ```), introduction, conversational text, or explanation."
        },
        { role: "user", content: prompt }
      ],
      temperature: 0.3,
    });

    let result = response.choices[0]?.message?.content || "";
    
    // Clean up potential markdown formatting
    result = result.trim();
    if (result.startsWith('"') && result.endsWith('"')) {
      result = result.substring(1, result.length - 1);
    }
    
    return NextResponse.json({ success: true, data: result });
  } catch (error: any) {
    console.error("AI Enhancement Error:", error);
    return NextResponse.json({ error: error.message || "Failed to enhance description" }, { status: 500 });
  }
}
