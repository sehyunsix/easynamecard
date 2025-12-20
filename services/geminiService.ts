
import { GoogleGenAI } from "@google/genai";

// Function to refine content using Gemini AI
export const refineContent = async (type: 'goal' | 'tagline', input: string, position: string) => {
  // The API key must be obtained exclusively from process.env.API_KEY
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = type === 'goal' 
    ? `Refine this professional goal for a business card. Position: ${position}. Raw goal: "${input}". Make it professional, concise, and inspiring (max 80 characters). Return only the refined text.`
    : `Generate a short, catchy professional tagline based on this position: "${position}". Context: "${input}". (max 50 characters). Return only the refined text.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    // Access the .text property directly to get the generated response
    return response.text?.trim() || input;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return input;
  }
};
