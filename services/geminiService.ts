import { GoogleGenAI, Type, Schema } from "@google/genai";
import { SpaFormData, AnalysisResult } from "../types";

// Helper to encode file to base64
export const fileToGenerativePart = async (file: File): Promise<{ inlineData: { data: string; mimeType: string } }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      // Remove data url prefix (e.g. "data:image/jpeg;base64,")
      const base64Data = base64String.split(',')[1];
      resolve({
        inlineData: {
          data: base64Data,
          mimeType: file.type,
        },
      });
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

const ANALYSIS_SCHEMA: Schema = {
  type: Type.OBJECT,
  properties: {
    visualSymbols: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "List of 3 distinct visual elements suitable for a logo (e.g. Lotus, Bamboo).",
    },
    colorPalette: {
      type: Type.STRING,
      description: "Recommended color scheme name and description. Must be in Chinese.",
    },
    englishTranslation: {
      type: Type.STRING,
      description: "English translation of the store name and slogan.",
    },
    designReasoning: {
      type: Type.STRING,
      description: "Brief explanation of why these elements fit the brand. Must be in Chinese.",
    }
  },
  required: ["visualSymbols", "colorPalette", "englishTranslation", "designReasoning"],
};

/**
 * Step 1: Analyze the requirements using Gemini 2.5 Flash
 */
export const analyzeBrandIdentity = async (formData: SpaFormData): Promise<AnalysisResult> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    Analyze the following Spa/Foot Bath store details to prepare for logo design.
    
    Store Name: ${formData.storeName}
    Slogan: ${formData.subText}
    Services: ${formData.services.join(', ')}
    Preferred Style: ${formData.style}
    Additional User Requirements: ${formData.additionalRequirements}

    Task:
    1. Visual Symbols: Based on the services and user requirements, recommend 3 distinct visual elements (e.g., Lotus, Bamboo, Abstract Foot curve, Steam, Hands).
    2. Color Palette: Recommend a color scheme based on the name, style, and requirements. Return this description in Chinese.
    3. Translation: Translate the store name and slogan into English (for internal design context).
    4. Reasoning: Explain the choices. Return this explanation in Chinese.
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
    config: {
      responseMimeType: 'application/json',
      responseSchema: ANALYSIS_SCHEMA,
    }
  });

  let text = response?.text; // Optional chaining
  if (!text) throw new Error("Failed to analyze brand identity.");
  
  // Robust JSON cleaning
  // 1. Remove markdown code blocks
  text = text.replace(/```json/g, '').replace(/```/g, '');
  
  // 2. Extract JSON object if there is extra text
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    text = jsonMatch[0];
  }

  try {
    return JSON.parse(text) as AnalysisResult;
  } catch (e) {
    console.error("Failed to parse analysis result:", text);
    throw new Error("AI Analysis failed to return valid data. Please try again.");
  }
};

/**
 * Step 2: Generate the logo using Gemini 3 Pro Image Preview
 */
export const generateLogoImage = async (
  formData: SpaFormData, 
  analysis: AnalysisResult
): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  // Construct the Master Prompt
  const visualElementStr = analysis.visualSymbols.join(', ');
  
  // Determine font style based on choice, but FORCE BOLD.
  let fontStyleDesc = "Bold Modern Sans-serif or Bold Elegant Serif";
  if (['Traditional', 'Classical', 'Zen'].includes(formData.style)) {
     fontStyleDesc = "Heavy Bold Chinese Calligraphy (Kaishu or Lishu style)";
  }

  const logoPrompt = `
    Role: Professional Logo Designer specializing in Wellness, Spa, and Luxury Hospitality branding.
    
    1. COMPOSITION (Layout):
    Vertical Layout: A distinct graphic icon on the TOP, followed by text on the BOTTOM.
    Style: Minimalist Vector Graphic, Flat Design, Premium aesthetic.
    Background: Pure White background (Hex #FFFFFF) for easy extraction.
    
    2. THE ICON (Graphic Symbol):
    Subject: A stylized, high-end vector representation of: ${visualElementStr}.
    Vibe: ${formData.style}, Relaxing, Professional.
    Details: Clean lines, geometric balance, no cluttered details. High-end vector illustration style. 
    Ensure the icon looks suitable for a ${formData.style} Foot Bath/SPA business.
    
    3. TYPOGRAPHY (Text Rendering):
    You must render the text precisely below the icon.
    Primary Text (Store Name): "${formData.storeName}"
    Font Style: ${fontStyleDesc}. 
    CRITICAL REQUIREMENT: All Chinese characters MUST be rendered in a very BOLD / HEAVY weight. Strokes must be thick and clearly visible. Do not use thin or light fonts.
    
    Secondary Text (Slogan): "${formData.subText}"
    Font Style: Smaller, but still legible.
    
    4. COLOR & LIGHTING:
    Palette: ${analysis.colorPalette}.
    Lighting: Soft studio lighting, 2k resolution, vector crispness.

    5. USER CONSTRAINTS & SPECIFIC REQUESTS:
    ${formData.additionalRequirements ? `The user specifically requested: "${formData.additionalRequirements}". Please respect this constraint.` : ''}
    
    Constraints:
    - No medical crosses.
    - No photorealistic messy textures.
    - If Chinese characters are complex, focus on the aesthetic balance of the strokes.
  `;

  const parts: any[] = [{ text: logoPrompt }];

  // Add reference image if exists
  if (formData.referenceImage) {
    const imagePart = await fileToGenerativePart(formData.referenceImage);
    parts.push(imagePart);
  }

  // NOTE: We use generateContent for Gemini 3 Pro Image Preview.
  // It returns base64 image data in the response parts (inlineData).
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-image-preview',
    contents: {
      parts: parts
    },
    // Adding optional generation config to ensure best quality
    config: {
       imageConfig: {
         imageSize: '2K'
       }
    }
  });

  // Extract image from response
  // Using optional chaining to prevent TypeScript errors about undefined values
  const candidates = response?.candidates;
  if (!candidates || candidates.length === 0) {
    throw new Error("No image generated.");
  }

  const generatedParts = candidates[0].content?.parts;
  if (!generatedParts) {
    throw new Error("No content parts found in response.");
  }

  let base64Image = '';

  for (const part of generatedParts) {
    if (part.inlineData && part.inlineData.data) {
      base64Image = `data:${part.inlineData.mimeType || 'image/png'};base64,${part.inlineData.data}`;
      break;
    }
  }

  if (!base64Image) {
    throw new Error("Model generated text instead of image. Please try again.");
  }

  return base64Image;
};