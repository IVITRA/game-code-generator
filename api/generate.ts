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
// --- End of Types ---

if (!process.env.API_KEY) {
  // This error will be caught and sent as a 500 response, which is more informative for debugging.
  throw new Error("API Key is not configured. Please ensure the API_KEY environment variable is set correctly before running the application.");
}
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const codeGenerationSchema = {
    type: Type.OBJECT,
    properties: {
        code: { type: Type.STRING },
        advice: { type: Type.STRING },
    },
    required: ["code", "advice"],
};

const getSystemInstructionGenerate = (language: 'en' | 'ar', includeComments: boolean, category: Category) => {
  const lang = language === 'ar' ? 'ARABIC' : 'ENGLISH';
  const commentInstruction = includeComments
    ? `The code MUST be well-commented in ${lang}, explaining complex parts and XML comments for public members.`
    : `The code MUST NOT include any comments.`;

  let adviceInstruction = `The 'advice' field MUST contain a brief, helpful tip related to the code's context. If no specific advice is applicable, provide a general best practice or an empty string.`;
  if (category === Category.PROTECTION) {
      adviceInstruction = `The 'advice' field is CRUCIAL for this category and MUST be included. In it, you MUST explain the limitations of a client-side anti-cheat solution and strongly emphasize why server-side validation is the only truly secure approach.`;
  }

  return `You are an expert game developer specializing in Unity, Unreal Engine, and Godot.
Your task is to provide a JSON object containing a 'code' field and an 'advice' field.
The response language for all text, including code comments and advice, MUST be ${lang}.
CODE QUALITY REQUIREMENTS:
- The code must be modular, performant, and easy to integrate.
- Use clear, descriptive variable and function names.
- Adhere to the standard conventions and best practices of the target engine and language (e.g., use [SerializeField] for private variables exposed to the Unity inspector).
- For the UI Manager, you MUST implement it using the Singleton design pattern to ensure there's only one instance and it's easily accessible.
The 'code' field must contain the final, clean code snippet. ${commentInstruction}
${adviceInstruction}
Your response MUST be a valid JSON object that strictly adheres to the provided schema.`;
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
        case ProtectionType.TELEPORT: basePrompt += `Focus on detecting unauthorized teleportation. Check the distance moved in a single frame. If it exceeds a reasonable maximum (e.g., max speed + jump height), it's likely a teleport. Revert the position.`; break;
        case ProtectionType.MEMORY_EDITING: basePrompt += `Focus on detecting memory value editing for critical stats like health or ammo. Implement a 'shadow value' system where a critical variable has a corresponding encrypted or obfuscated copy. Periodically check if the primary value has been changed without going through the proper game functions by comparing it to the shadow value.`; break;
        case ProtectionType.TIME_SCALE: basePrompt += `Focus on detecting time scale manipulation. Monitor the game's time scale. Additionally, compare the in-game time progression with the real-world time progression using an independent timer. If there's a significant discrepancy, flag it.`; break;
      }
      break;
    }
     case Category.INVENTORY: {
      basePrompt = `Generate a ${lang} script for ${engineName} for a basic list-based inventory system. The script should include: an 'Item' class or struct (with fields like name, id, description), and an 'InventoryManager' class. The manager should have public functions to AddItem, RemoveItem, and CheckForItem.`;
      break;
    }
    case Category.UI_MANAGER: {
      const { components } = options as UiManagerOptions;
      const componentList = components.join(', ');
      basePrompt = `Generate a ${lang} script for ${engineName} for a UI Manager using the Singleton design pattern. The manager should control the following UI elements: ${componentList}. It must include public methods to update each of these elements (e.g., UpdateHealthBar(float amount), UpdateScore(int score)). Provide placeholder logic for the UI updates.`;
      break;
    }
  }

  if (customPrompt && customPrompt.trim().length > 0) {
    basePrompt += `\nADDITIONAL INSTRUCTIONS: ${customPrompt}`;
  }

  return basePrompt;
};


export default async function (request: Request) {
    if (request.method !== 'POST') {
        return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers: { 'Content-Type': 'application/json' } });
    }

    try {
        const { action, payload } = await request.json();

        if (action === 'generateCode') {
            const { category, options, customPrompt, language, includeComments } = payload;
            
            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: getPrompt(category, options, customPrompt),
                config: {
                    systemInstruction: getSystemInstructionGenerate(language, includeComments, category),
                    responseMimeType: "application/json",
                    responseSchema: codeGenerationSchema,
                }
            });

            return new Response(response.text, {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });

        } else if (action === 'generateTips') {
            const { options, language } = payload;
            const { engine, genre, description } = options as TipsOptions;

            const prompt = `Game Engine: ${engine}\nGame Genre: ${genre}\nGame Description: ${description}`;

            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
                config: {
                    systemInstruction: getSystemInstructionTips(language)
                }
            });

            return new Response(JSON.stringify({ tips: response.text }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });
        } else {
            return new Response(JSON.stringify({ error: 'Invalid action specified' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
        }

    } catch (e: any) {
        console.error('--- Vercel Function Error ---');
        console.error(e);
        console.error('-----------------------------');
        const errorMessage = e.message || 'An internal server error occurred.';
        return new Response(JSON.stringify({ error: `Server Error: ${errorMessage}` }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
