export enum GAME_STATE {
    INTRO,
    LOBBY,
    SHOWDOWN,
    SHOWDOWN_RESULT,
}

export type GameManagerContextType = {
    userId: string;
    setUserId: (userId: string) => void;
    gameState: GAME_STATE;
    setGameState: (newState: GAME_STATE) => void;
};
