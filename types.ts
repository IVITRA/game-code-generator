export enum Category {
  MOVEMENT = 'MOVEMENT',
  PROTECTION = 'PROTECTION',
  INVENTORY = 'INVENTORY',
  UI_MANAGER = 'UI_MANAGER',
  TIPS = 'TIPS',
}

export enum Dimension {
  TWO_D = '2D',
  THREE_D = '3D',
}

export enum Engine {
  UNITY = 'Unity (C#)',
  UNREAL = 'Unreal Engine (C++)',
  GODOT = 'Godot (GDScript)',
}

export enum Genre {
    PLATFORMER = 'Platformer',
    RPG = 'RPG',
    PUZZLE = 'Puzzle',
    FPS = 'FPS (First-Person Shooter)',
    STRATEGY = 'Strategy',
    SIMULATION = 'Simulation',
}

export enum ProtectionType {
    SPEED_HACK = 'Speed Hacking',
    AIMBOT = 'Aimbot Detection',
    WALLHACK_NOCLIP = 'Wallhack / Noclip',
    TELEPORT = 'Teleport Detection',
    MEMORY_EDITING = 'Memory Value Editing',
    TIME_SCALE = 'Time Scale Manipulation',
}

export enum UiComponent {
    HEALTH_BAR = 'Health Bar',
    SCORE_TEXT = 'Score Text',
    AMMO_COUNTER = 'Ammo Counter',
    MINIMAP = 'Minimap',
}

export interface BaseOptions {
    engine: Engine;
}

export interface MovementOptions extends BaseOptions {
    dimension: Dimension;
}

export interface ProtectionOptions extends BaseOptions {
    protectionType: ProtectionType;
}

export interface UiManagerOptions extends BaseOptions {
    components: UiComponent[];
}

export interface TipsOptions extends BaseOptions {
    genre: Genre;
    description: string;
}

export type AllOptions = MovementOptions | ProtectionOptions | BaseOptions | TipsOptions | UiManagerOptions;

export interface GenerationResult {
    code: string;
    advice?: string;
}
