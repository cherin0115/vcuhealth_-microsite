import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateDoctorScript = async (symptoms: string[]): Promise<string> => {
  const model = 'gemini-2.5-flash';
  
  const symptomsText = symptoms.length > 0 
    ? `I have been noticing these symptoms: ${symptoms.join(', ')}.` 
    : "I don't have urgent symptoms right now, but I want to be proactive.";

  const prompt = `
    You are a helpful medical communication assistant. 
    Write a short, polite, and empowering script (max 100 words) for a female patient to read to her primary care doctor.
    
    The goal is to ask for an anal cancer screening (often called an 'Anal Pap'), especially given the link between HPV and anal cancer.
    
    Context:
    - The patient's situation: ${symptomsText}
    - Tone: Confident, calm, and collaborative.
    - Format: Just the script text in quotes. No intro or outro.
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });
    return response.text.trim();
  } catch (error) {
    console.error("Error generating script:", error);
    return "I'd like to discuss my complete pelvic health. Given the link between HPV and anal cancer, could we discuss if an anal Pap smear would be appropriate for me?";
  }
};
