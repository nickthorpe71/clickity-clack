import { FC, ReactNode, useState, createContext } from "react";
import { GAME_STATE, GameManagerContextType } from "../types/gameManager.d";

export const GameManager = createContext<GameManagerContextType | null>(null);

interface GameManagerProps {
    children: ReactNode;
}

const GameManagerProvider: FC<GameManagerProps> = ({ children }) => {
    const [userId, setUserId] = useState<string>("comb-1");
    const [gameState, setGameState] = useState<GAME_STATE>(GAME_STATE.LOBBY);

    return (
        <GameManager.Provider
            value={{ userId, setUserId, gameState, setGameState }}
        >
            {children}
        </GameManager.Provider>
    );
};

export default GameManagerProvider;
