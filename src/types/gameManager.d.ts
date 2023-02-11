import { Round, Combatant, Character } from "./game.d";

export enum GAME_STATE {
    INTRO,
    MAIN_MENU,
    LOBBY,
    SHOWDOWN,
    SHOWDOWN_RESULT,
}

export type GameManagerContextType = {
    userId: string;
    setUserId: (userId: string) => void;
    selectedCharacter: Character | null;
    setSelectedCharacter: (character: Character) => void;
    setShowdownId: (showdownId: string) => void;
    gameState: GAME_STATE;
    setGameState: (newState: GAME_STATE) => void;
    nextRound: () => string;
    setShowdownState: (
        showdownId: string,
        newRounds: Round[],
        combatants: Combatant[]
    ) => void;
    getCurrentRound: () => Round;
    showdownId: string;
    combatants: Combatant[];
};
