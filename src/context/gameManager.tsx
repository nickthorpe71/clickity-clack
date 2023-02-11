import { FC, ReactNode, useState, createContext, useRef } from "react";
import {
    GAME_STATE,
    GameManagerContextType,
    Round,
    Combatant,
    Character,
} from "../types";

export const GameManager = createContext<GameManagerContextType | null>(null);

interface GameManagerProps {
    children: ReactNode;
}

const GameManagerProvider: FC<GameManagerProps> = ({ children }) => {
    // Game state
    const [gameState, setGameState] = useState<GAME_STATE>(GAME_STATE.LOBBY);

    // Showdown state
    const [showdownId, setShowdownId] = useState<string>("");
    const rounds = useRef<Round[]>([]);
    const roundIndex = useRef<number>(0);
    const combatants = useRef<Combatant[]>([]);

    // User state
    const getUserId = (): string => {
        return localStorage.getItem("userId") || "comb-1";
    };
    const setUserId = (newUserId: string): void => {
        localStorage.setItem("userId", newUserId);
    };
    const [selectedCharacter, setSelectedCharacter] =
        useState<Character | null>(null);

    const nextRound = (): string => {
        roundIndex.current += 1;
        if (
            !rounds ||
            rounds.current.length === 0 ||
            roundIndex.current >= rounds.current.length
        )
            return "";
        return rounds.current[roundIndex.current].technique;
    };

    const setShowdownState = (
        newShowdownId: string,
        newRounds: Round[],
        newCombatants: Combatant[]
    ): void => {
        setShowdownId(newShowdownId);
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
                userId: getUserId(),
                setUserId,
                selectedCharacter,
                setSelectedCharacter,
                setShowdownId,
                gameState,
                setGameState,
                nextRound,
                setShowdownState,
                getCurrentRound,
                showdownId: showdownId,
                combatants: combatants.current,
            }}
        >
            {children}
        </GameManager.Provider>
    );
};

export default GameManagerProvider;
