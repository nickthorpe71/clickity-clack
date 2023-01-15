import { FC, ReactNode, useState, createContext, useRef } from "react";
import { GAME_STATE, GameManagerContextType } from "../types/gameManager.d";
import { Round } from "../types/game.d";

export const GameManager = createContext<GameManagerContextType | null>(null);

interface GameManagerProps {
    children: ReactNode;
}

const GameManagerProvider: FC<GameManagerProps> = ({ children }) => {
    const userId = useRef<string>("comb-1");
    const [gameState, setGameState] = useState<GAME_STATE>(GAME_STATE.LOBBY);
    const rounds = useRef<Round[]>([]);
    const roundIndex = useRef<number>(0);

    const setUserId = (newUserId: string): void => {
        userId.current = newUserId;
    };
    const nextRound = (): string => {
        if (!rounds || rounds.current.length === 0) return "";
        roundIndex.current += 1;
        return rounds.current[roundIndex.current].technique;
    };

    const setRounds = (newRounds: Round[]): void => {
        rounds.current = newRounds;
    };

    const getCurrentRound = (): Round => {
        return rounds.current[roundIndex.current];
    };

    return (
        <GameManager.Provider
            value={{
                userId: userId.current,
                setUserId,
                gameState,
                setGameState,
                nextRound,
                setRounds,
                getCurrentRound,
            }}
        >
            {children}
        </GameManager.Provider>
    );
};

export default GameManagerProvider;
