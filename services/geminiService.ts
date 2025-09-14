import { Category, AllOptions, TipsOptions, GenerationResult } from '../types';

const handleApiResponse = async (response: Response) => {
    if (!response.ok) {
        let errorMessage = 'An unknown error occurred.';
        try {
            const errorBody = await response.json();
            errorMessage = errorBody.error || `Request failed with status ${response.status}`;
        } catch (e) {
            errorMessage = `Request failed with status ${response.status}`;
        }
        throw new Error(errorMessage);
    }
    return response.json();
};

export const generateGameCode = async (
    category: Category,
    options: AllOptions,
    customPrompt: string,
    language: 'en' | 'ar',
    includeComments: boolean,
    onStatusUpdate: (status: string) => void,
): Promise<GenerationResult> => {
    onStatusUpdate('status_generating');

    try {
        const response = await fetch('/api/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                action: 'generateCode',
                payload: { category, options, customPrompt, language, includeComments },
            }),
        });
        return await handleApiResponse(response);
    } catch (error) {
        console.error("Error calling generation API:", error);
        throw new Error("Failed to generate code from AI. Please try again.");
    }
};

export const generateGameTips = async (
    options: TipsOptions,
    language: 'en' | 'ar',
    onStatusUpdate: (status: string) => void,
): Promise<string> => {
    onStatusUpdate('status_generating_tips');

    try {
        const response = await fetch('/api/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                action: 'generateTips',
                payload: { options, language },
            }),
        });
        const result = await handleApiResponse(response);
        return result.tips;
    } catch (error) {
        console.error("Error calling tips API:", error);
        throw new Error("Failed to get advice from AI. Please try again.");
    }
};
