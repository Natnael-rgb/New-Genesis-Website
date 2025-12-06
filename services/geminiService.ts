import { GoogleGenAI, Modality } from "@google/genai";
import { ModelMode } from "../types";

// Initialize the client
// CRITICAL: Ensure process.env.API_KEY is available in your environment
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Generates text response based on the selected mode.
 */
export const generateResponse = async (
  prompt: string,
  mode: ModelMode
): Promise<string> => {
  try {
    let response;

    if (mode === ModelMode.THINKING) {
      // Use gemini-3-pro-preview for complex reasoning with high thinking budget
      response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: prompt,
        config: {
          thinkingConfig: { thinkingBudget: 32768 }, // Max budget for deep thinking
          // Do not set maxOutputTokens when using thinkingConfig significantly, 
          // or set it very high to accommodate thinking + response.
        },
      });
    } else {
      // Use gemini-2.5-flash-lite for fast, low-latency responses
      response = await ai.models.generateContent({
        model: 'gemini-flash-lite-latest', // Alias for flash-lite
        contents: prompt,
      });
    }

    if (response.text) {
      return response.text;
    }
    return "I couldn't generate a text response.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};

/**
 * Generates speech (TTS) from text using Gemini.
 * Returns base64 encoded audio string.
 */
export const generateSpeech = async (text: string): Promise<string | undefined> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: text }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' },
          },
        },
      },
    });

    // Extract base64 audio data
    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    return base64Audio;
  } catch (error) {
    console.error("Gemini TTS Error:", error);
    return undefined;
  }
};
