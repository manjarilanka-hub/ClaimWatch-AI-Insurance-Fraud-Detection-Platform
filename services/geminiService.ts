
import { GoogleGenAI, Type } from "@google/genai";
import { AssessmentResponse } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

export const analyzeClaim = async (claimData: any): Promise<AssessmentResponse> => {
  const model = "gemini-3-flash-preview";
  
  const prompt = `
    Analyze this agricultural insurance claim for potential fraud based on the following parameters:
    Farmer: ${claimData.farmerName}
    Crop: ${claimData.cropType}
    Claimed Amount: $${claimData.claimedAmount}
    Yield Loss: ${claimData.yieldLossPercentage}%
    Weather Anomaly (0-1 score): ${claimData.weatherAnomalyScore}
    Previous Claims: ${claimData.previousClaims}
    
    In your analysis, consider:
    1. Discrepancy between Yield Loss and Weather Anomaly (High loss with low anomaly is suspicious).
    2. Frequent previous claims.
    3. Claim amount relative to crop type.
    
    Return the result in JSON format.
  `;

  try {
    const result = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            fraudClassification: { type: Type.STRING, enum: ['Genuine', 'Fraudulent'] },
            riskScore: { type: Type.NUMBER, description: 'Score from 0 to 100' },
            reasoning: { type: Type.STRING },
            confidence: { type: Type.NUMBER },
            recommendedAction: { type: Type.STRING }
          },
          required: ['fraudClassification', 'riskScore', 'reasoning', 'confidence', 'recommendedAction']
        }
      }
    });

    return JSON.parse(result.text || "{}");
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw error;
  }
};
