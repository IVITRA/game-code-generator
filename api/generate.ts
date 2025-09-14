// This is a Vercel serverless function that acts as a secure backend.
import { GoogleGenAI, Type } from "@google/genai";

// --- Types (duplicated from types.ts for self-containment in the serverless function) ---
enum Category {
  MOVEMENT = 'MOVEMENT',
  PROTECTION = 'PROTECTION',
  INVENTORY = 'INVENTORY',
  UI_MANAGER = 'UI_MANAGER',
  TIPS = 'TIPS',
}
enum Dimension { TWO_D = '2D', THREE_D = '3D' }
enum Engine { UNITY = 'Unity (C#)', UNREAL = 'Unreal Engine (C++)', GODOT = 'Godot (GDScript)' }
enum Genre { PLATFORMER = 'Platformer', RPG = 'RPG', PUZZLE = 'Puzzle', FPS = 'FPS (First-Person Shooter)', STRATEGY = 'Strategy', SIMULATION = 'Simulation' }
enum ProtectionType { SPEED_HACK = 'Speed Hacking', AIMBOT = 'Aimbot Detection', WALLHACK_NOCLIP = 'Wallhack / Noclip', TELEPORT = 'Teleport Detection', MEMORY_EDITING = 'Memory Value Editing', TIME_SCALE = 'Time Scale Manipulation' }
enum UiComponent { HEALTH_BAR = 'Health Bar', SCORE_TEXT = 'Score Text', AMMO_COUNTER = 'Ammo Counter', MINIMAP = 'Minimap' }
interface BaseOptions { engine: Engine }
interface MovementOptions extends BaseOptions { dimension: Dimension }
interface ProtectionOptions extends BaseOptions { protectionType: ProtectionType }
interface UiManagerOptions extends BaseOptions { components: UiComponent[] }
interface TipsOptions extends BaseOptions { genre: Genre; description: string }
type AllOptions = MovementOptions | ProtectionOptions | BaseOptions | TipsOptions | UiManagerOptions;
interface GenerationResult { code: string; advice?: string }
// --- End of Types ---

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set in Vercel settings.");
}
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });


// --- Logic (copied from original geminiService.ts) ---
const getSystemInstructionGenerate = (language: 'en' | 'ar', includeComments: boolean) => {
  const lang = language === 'ar' ? 'ARABIC' : 'ENGLISH';
  const commentInstruction = includeComments
    ? `The code MUST be well-commented in ${lang}, explaining complex parts and XML comments for public members.`
    : `The code MUST NOT include any comments.`;
  
  return `You are an expert game developer specializing in Unity, Unreal Engine, and Godot.
Your task is to provide a JSON object containing a 'code' field and an 'advice' field.
The response language for all text, including code comments and advice, MUST be ${lang}.
CODE QUALITY REQUIREMENTS:
- The code must be modular, performant, and easy to integrate.
- Use clear, descriptive variable and function names.
- Adhere to the standard conventions and best practices of the target engine and language (e.g., use [SerializeField] for private variables exposed to the Unity inspector).
- For the UI Manager, you MUST implement it using the Singleton design pattern to ensure there's only one instance and it's easily accessible.
The 'code' field must contain the final, clean code snippet. ${commentInstruction}
The 'advice' field must contain expert advice. For anti-cheat scripts, it MUST explain the limitations of the client-side script and why server-side validation is superior. For all other categories, this field MUST be an empty string ("").
Your response MUST be a valid JSON object.`;
};

const getSystemInstructionTips = (language: 'en' | 'ar') => {
    const lang = language === 'ar' ? 'ARABIC' : 'ENGLISH';
    return `You are a veteran game development mentor with decades of experience shipping successful titles on Unity, Unreal, and Godot.
Your task is to provide concise, actionable, and insightful advice based on the user's game concept.
Structure your response with clear headings (e.g., ## Core Mechanics, ## Asset Pipeline, ## Common Pitfalls).
Use bullet points for easy readability. The advice should be practical and tailored to the specified engine and genre.
Keep the tone encouraging and professional. The response must be in ${lang}.`;
};

const getPrompt = (category: Category, options: AllOptions, customPrompt?: string): string => {
  const { engine } = options as BaseOptions;
  const lang = engine.split(' ')[1].replace(/[()]/g, '');
  const engineName = engine.split(' ')[0];
  let basePrompt = '';

  switch (category) {
    case Category.MOVEMENT: {
      const { dimension } = options as MovementOptions;
      basePrompt = `Generate a ${lang} script for ${engineName} for a ${dimension} player character controller. The script must include: basic movement (WASD/Arrows), jumping (Space bar), and proper physics handling. The class/script should be fully self-contained.`;
      break;
    }
    case Category.PROTECTION: {
      const { protectionType } = options as ProtectionOptions;
      basePrompt = `Generate a ${lang} script for ${engineName} for an anti-cheat mechanism. `;
      switch (protectionType) {
        case ProtectionType.SPEED_HACK: basePrompt += `Focus on detecting speed hacking by comparing the player's position change over time against a defined maximum speed threshold. If detected, log a warning and revert the position.`; break;
        case ProtectionType.AIMBOT: basePrompt += `Focus on detecting Aimbots. Monitor the camera/player rotation speed. If the angular velocity exceeds a plausible threshold for human input in a single frame, flag it. This is a client-side heuristic.`; break;
        case ProtectionType.WALLHACK_NOCLIP: basePrompt += `Focus on detecting Wallhacks or Noclipping. From the player's last valid position, cast a ray/trace to the current position. If the ray hits a wall or obstacle, it means the player has illegally passed through it. If detected, move the player back to their last valid position.`; break;
        case ProtectionType.TELEPORT: basePrompt += `Focus on detecting teleportation exploits. Track the player's position every frame. If the distance moved in a single frame is greater than the maximum possible distance (max speed * delta time), flag it as a teleport.`; break;
        case ProtectionType.MEMORY_EDITING: basePrompt += `Focus on detecting memory editing for critical values (like health or ammo). Implement a "shadow value" system. Store the critical value in two variables: the real one, and a second one that is obfuscated (e.g., XORed with a secret key). Before using the value, check if the obfuscated one still matches the real one. If not, a memory editor was likely used.`; break;
        case ProtectionType.TIME_SCALE: basePrompt += `Focus on detecting time scale manipulation. Compare the game's delta time with the real-world time that has passed since the last frame (using an independent system clock). If there's a significant discrepancy, the player is likely manipulating the game's time scale.`; break;
      }
      basePrompt += `\nCrucially, provide expert advice in the 'advice' field explaining the script's limitations as a client-side solution and why server-side validation is the ultimate, most secure approach.`;
      break;
    }
    case Category.INVENTORY: {
      basePrompt = `Generate a ${lang} script for ${engineName} for a basic list-based inventory system. The script should include functions for: adding an item, removing an item, and checking for an item. Define a simple Item class/struct within the script. It should be a self-contained component.`;
      break;
    }
    case Category.UI_MANAGER: {
      const { components } = options as UiManagerOptions;
      basePrompt = `Generate a ${lang} script for ${engineName} for a UI Manager using the Singleton pattern. The script must manage the following UI components:\n${components.map(c => `- ${c}`).join('\n')}\n\nFor each component, create a public method to update it (e.g., UpdateHealthBar, UpdateScoreText). The script should assume UI elements are linked in the editor.`;
      break;
    }
    default:
      throw new Error("Invalid category specified for code generation");
  }

  if (customPrompt) {
    basePrompt += `\n\nADDITIONAL USER INSTRUCTIONS: "${customPrompt}". Please incorporate these requirements into the code.`;
  }
  return basePrompt;
};

// --- API Handler ---

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { action, payload } = req.body;

    if (action === 'generateCode') {
      const { category, options, customPrompt, language, includeComments } = payload;
      const generationPrompt = getPrompt(category, options, customPrompt);
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: generationPrompt,
        config: {
          systemInstruction: getSystemInstructionGenerate(language, includeComments),
          responseMimeType: "application/json",
          responseSchema: { type: Type.OBJECT, properties: { code: { type: Type.STRING }, advice: { type: Type.STRING } } }
        },
      });
      const jsonString = response.text.trim();
      const result: GenerationResult = JSON.parse(jsonString);
      if (result.code) {
        result.code = result.code.replace(/^`{3}[a-zA-Z]*\n/, '').replace(/\n`{3}$/, '');
      }
      return res.status(200).json(result);

    } else if (action === 'generateTips') {
      const { options, language } = payload;
      const { engine, genre, description } = options;
      const prompt = `Game Engine: ${engine}\nGame Genre: ${genre}\nGame Description: "${description}"\n\nPlease provide expert advice for developing this game.`;
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: { systemInstruction: getSystemInstructionTips(language), temperature: 0.7 },
      });
      const tips = response.text.trim();
      return res.status(200).json({ tips });

    } else {
      return res.status(400).json({ error: 'Invalid action specified.' });
    }
  } catch (error: any) {
    console.error("Error in serverless function:", error);
    return res.status(500).json({ error: error.message || 'An internal server error occurred.' });
  }
}