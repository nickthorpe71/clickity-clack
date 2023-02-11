import { Round, Combatant, Character } from "./game.d";

export enum GAME_STATE {
    INTRO,
    MAIN_MENU,
    LOBBY,
    SHOWDOWN,
    SHOWDOWN_RESULT,
}

export type GameManagerContextType = {
    // game state
    gameState: GAME_STATE;
    setGameState: (newState: GAME_STATE) => void;

    // showdown state
    isAI: boolean;
    setIsAI: (isAI: boolean) => void;
    setShowdownId: (showdownId: string) => void;
    nextRound: () => string;
    setShowdownState: (
        showdownId: string,
        newRounds: Round[],
        combatants: Combatant[]
    ) => void;
    getCurrentRound: () => Round;
    showdownId: string;
    combatants: Combatant[];

    // user state
    userId: string;
    setUserId: (userId: string) => void;
    selectedCharacter: Character | null;
    setSelectedCharacter: (character: Character) => void;
};
