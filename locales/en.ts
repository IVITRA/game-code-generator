const enTranslations = {
  // App Info
  "appTitle": "AI Game Code Generator",
  "appDescription": "Get production-ready code snippets for your game, powered by AI.",
  "selectCategory": "Select a Category",
  "backToCategories": "Back to Categories",

  // Category Titles
  "movementTitle": "Character Movement",
  "protectionTitle": "Game Protection",
  "inventoryTitle": "Inventory System",
  "uimanagerTitle": "UI Manager",
  "tipsTitle": "Game Dev Advice",

  // Category Descriptions (for cards)
  "movementDescription": "Generate 2D/3D player controllers for various game engines.",
  "protectionDescription": "Generate scripts against specific cheats like speed hacks, aimbots, wallhacks, and more.",
  "inventoryDescription": "Generate scripts to manage player inventory and items.",
  "uimanagerDescription": "Create code to manage UI like health bars and scores.",
  "tipsDescription": "Get AI-powered tips and best practices for your game.",

  // Generator Headers - Descriptions
  "movementHeaderDescription": "This module generates a complete character controller script. It includes basic movement, jumping, and physics handling tailored for your chosen engine and dimension.",
  "protectionHeaderDescription": "This module generates client-side anti-cheat scripts. Select a specific type of cheat to generate a script designed to detect and counter it. Remember, client-side detection is a deterrent, not a foolproof solution.",
  "inventoryHeaderDescription": "This module generates a foundational inventory system. The script will include a simple Item class and core functions to add, remove, and check for items in a list-based inventory.",
  "uimanagerHeaderDescription": "This module generates a UI Manager using the Singleton design pattern, a common and effective way to handle UI in games. Select the UI elements you need, and the AI will create a central script to manage them.",
  "tipsHeaderDescription": "This module provides expert advice for your game project. Describe your game concept, and the AI will act as a veteran mentor, offering tips on mechanics, asset pipelines, and common pitfalls to avoid for your specific genre and engine.",

  // Generator Headers - Examples
  "movementHeaderExample": "Example: 'Add a dash ability on the Shift key.'",
  "protectionHeaderExample": "Example: 'Increase the speed detection tolerance slightly.'",
  "inventoryHeaderExample": "Example: 'Add a 'maxStack' field to the Item class.'",
  "uimanagerHeaderExample": "Example: 'Ensure the health bar update uses a smooth lerp.'",
  "tipsHeaderExample": "Example: 'A 2D puzzle platformer where you control time.'",
  
  // General Labels
  "selectDimensions": "Select Character Dimensions",
  "selectEngine": "Select Game Engine",
  "selectGenre": "Select Game Genre",
  "selectProtectionType": "Select Cheat to Counter",
  "customInstructionsLabel": "Add Custom Instructions (Optional)",
  "customInstructionsPlaceholder": "e.g., 'Add a double jump feature', 'Make the inventory save to a file'",
  "gameDescriptionLabel": "Describe Your Game",
  "gameDescriptionPlaceholder": "e.g., 'A 2D puzzle platformer where you control time.'",
  "includeCommentsLabel": "Include Comments",
  
  // Protection Types
  "protectionTypeSpeedHacking": "Speed Hacking",
  "protectionTypeAimbotDetection": "Aimbot Detection",
  "protectionTypeWallhack/Noclip": "Wallhack / Noclip",
  "protectionTypeTeleportDetection": "Teleport Detection",
  "protectionTypeMemoryValueEditing": "Memory Value Editing",
  "protectionTypeTimeScaleManipulation": "Time Scale Manipulation",

  // UI Manager
  "uiManagerSelectComponents": "Select UI Components",
  "uiComponentHealthBar": "Health Bar",
  "uiComponentScoreText": "Score Text",
  "uiComponentAmmoCounter": "Ammo Counter",
  "uiComponentMinimap": "Minimap",
  
  // Buttons & Status
  "generateCode": "Generate Code",
  "getAdvice": "Get Advice",
  "generating": "Generating...",
  "status_generating": "AI is generating the code and advice...",
  "status_refining": "Refining, optimizing, and adding comments...",
  "status_generating_tips": "Consulting with AI mentor for expert advice...",
  "copyCode": "Copy Code",
  "copied": "Copied!",
  "tabCode": "Code",
  "tabAdvice": "Expert Advice",

  // Errors
  "errorOccurred": "An error occurred while generating code. Please try again.",
  "errorOccurredTips": "An error occurred while getting advice. Please try again.",
  "errorUiManagerComponents": "Please select at least one UI component to generate a manager."
};

export default enTranslations;
