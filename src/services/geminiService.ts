import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export interface AssistantResponse {
  text: string;
  sources?: { uri: string; title: string }[];
}

export async function askAssistant(prompt: string, context?: string): Promise<AssistantResponse> {
  try {
    const result = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: `You are VoterLab AI, an expert assistant on the Indian electoral process (Lok Sabha). 
        Your goal is to educate users on:
        1. How voting works in India (registration via NVSP, Voter ID/EPIC, EVMs, VVPATs).
        2. Election phases and timelines for the General Elections.
        3. Understanding coalition platforms (NDA, I.N.D.I.A, etc.) in a non-partisan way.
        4. Steps to check name in the electoral roll and finding polling booths.
        
        Keep your tone friendly, educational, and strictly non-partisan. Use markdown for better readability.
        ALWAYS use the search tool to provide the most recent and accurate data on election dates, results, and candidate news for Indian Elections.
        ${context ? `Previous conversation history: ${context}` : ''}`,
        tools: [{ googleSearch: {} }],
      },
    });

    const text = result.text || "I'm sorry, I'm having trouble retrieving that information.";
    
    // Extract grounding sources
    const sources: { uri: string; title: string }[] = [];
    const chunks = result.candidates?.[0]?.groundingMetadata?.groundingChunks;
    if (chunks) {
      chunks.forEach((chunk: any) => {
        if (chunk.web?.uri) {
          sources.push({ uri: chunk.web.uri, title: chunk.web.title || 'Source' });
        }
      });
    }

    return { text, sources };
  } catch (error) {
    console.error('Error in VoterLab Assistant:', error);
    return { 
      text: "I'm sorry, I'm having trouble connecting right now. Please verify your connection or try again later." 
    };
  }
}
