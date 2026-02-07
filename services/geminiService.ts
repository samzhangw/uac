import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getStudyAdvice = async (topic: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `請給我關於「${topic}」的簡短學習建議或鼓勵，針對準備參加台灣分科測驗的高中生。請保持語氣積極、專業且溫暖，字數在 100 字以內。`,
      config: {
        systemInstruction: "你是一位專業且溫暖的高中升學輔導教練，專門協助學生準備分科測驗。",
        temperature: 0.7,
      },
    });
    
    return response.text || "目前無法取得建議，請稍後再試。加油！";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "連線發生錯誤，請檢查網路或 API 金鑰。保持專注，你做得到的！";
  }
};