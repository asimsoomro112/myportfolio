import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';

// Initialize the Google Gen AI SDK
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

const SYSTEM_PROMPT = `
You are an AI assistant representing Muhammad Asim Soomro, a highly skilled Full-Stack Software Engineer & AI integration specialist.
Your goal is to answer questions from recruiters or visitors about Asim's skills, experience, and projects in a professional, confident, and slightly conversational tone.

Here is Asim's background context:
- Role: Software Engineer | Full-Stack & AI
- Location: Pakistan
- Email: muhammadasimsoomro@gmail.com
- GitHub: github.com/asimsoomro112
- Key Skills: React, Next.js, Node.js, Python, Firebase, Gemini API, YOLOv7, Computer Vision, Tailwind CSS.

Featured Projects:
1. Blueprint AI: An AI-powered workflow that converts unstructured layout sketches into structured Next.js website concepts using the Gemini API.
2. OrthoAI: A computer vision prototype using YOLOv7 for fracture detection in medical imagery.
3. Revault: A full-stack escrow marketplace platform with role-based flows (admin, seller, customer).
4. Live TV & Channel Browser: A fast streaming media aggregator.

Keep your answers concise, engaging, and directly helpful. If you don't know something about Asim, politely say so and encourage the user to reach out to him via the contact form.
Never break character. You are Asim's personal AI Assistant.
`;

export async function POST(req: Request) {
  try {
    const { message, history } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: "Missing Gemini API Key in environment variables." }, { status: 500 });
    }

    // Prepare contents array for the generateContent call
    const contents = [
      { role: 'user', parts: [{ text: SYSTEM_PROMPT }] },
      { role: 'model', parts: [{ text: "Understood. I am Asim's AI assistant. I'm ready to answer questions." }] }
    ];

    // Map history to the required format
    if (history && Array.isArray(history)) {
      history.forEach((msg: any) => {
        contents.push({
          role: msg.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: msg.content }]
        });
      });
    }

    // Append the current message
    contents.push({ role: 'user', parts: [{ text: message }] });

    const MODELS_TO_TRY = ['gemini-3.6-flash', 'gemini-3.5-flash'];
    let responseText = "";
    
    for (const modelName of MODELS_TO_TRY) {
      try {
        const response = await ai.models.generateContent({
          model: modelName,
          contents: contents
        });
        
        if (response.text) {
          responseText = response.text;
          break; // Successfully got a response, exit the loop
        }
      } catch (err: any) {
        console.warn(`[AI Chat] Model ${modelName} failed. Falling back to next model. Error:`, err.message);
        // If it's the last model in the array and it failed, throw the error
        if (modelName === MODELS_TO_TRY[MODELS_TO_TRY.length - 1]) {
          throw err;
        }
      }
    }

    return NextResponse.json({ 
      reply: responseText 
    });

  } catch (error: any) {
    console.error('Error generating AI response:', error);
    return NextResponse.json(
      { error: 'An error occurred while generating a response.' }, 
      { status: 500 }
    );
  }
}
