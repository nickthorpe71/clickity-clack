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

    // Showdown state
    const showdownId = useRef<string>("");
    const rounds = useRef<Round[]>([]);
    const roundIndex = useRef<number>(0);
    const combatants = useRef<string[]>([]);

    const setUserId = (newUserId: string): void => {
        userId.current = newUserId;
    };

    const nextRound = (): string => {
        if (!rounds || rounds.current.length === 0) return "";
        roundIndex.current += 1;
        return rounds.current[roundIndex.current].technique;
    };

    const setShowdownState = (
        newShowdownId: string,
        newRounds: Round[],
        newCombatants: string[]
    ): void => {
        showdownId.current = newShowdownId;
        rounds.current = newRounds;
        roundIndex.current = 0;
        combatants.current = newCombatants;
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
                setShowdownState,
                getCurrentRound,
                showdownId: showdownId.current,
                combatants: combatants.current,
            }}
        >
            {children}
        </GameManager.Provider>
    );
};

export default GameManagerProvider;
