import { FC, ReactNode, useState, createContext, useRef } from "react";
import { GAME_STATE, GameManagerContextType } from "../types/gameManager.d";
import { Round, Combatant } from "../types/game.d";

export const GameManager = createContext<GameManagerContextType | null>(null);

interface GameManagerProps {
    children: ReactNode;
}

const GameManagerProvider: FC<GameManagerProps> = ({ children }) => {
    const [gameState, setGameState] = useState<GAME_STATE>(GAME_STATE.LOBBY);

    // Showdown state
    const showdownId = useRef<string>("");
    const rounds = useRef<Round[]>([]);
    const roundIndex = useRef<number>(0);
    const combatants = useRef<Combatant[]>([]);

    const getUserId = (): string => {
        return localStorage.getItem("userId") || "comb-1";
    };

    const setUserId = (newUserId: string): void => {
        localStorage.setItem("userId", newUserId);
    };

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
        console.log(
            "setShowdownState",
            newShowdownId,
            newRounds,
            newCombatants
        );
        showdownId.current = newShowdownId;
        rounds.current = newRounds;
        roundIndex.current = 0;
        combatants.current = newCombatants;
    };

    const setShowdownId = (newShowdownId: string): void => {
        showdownId.current = newShowdownId;
    };

    const getCurrentRound = (): Round => {
        return rounds.current[roundIndex.current];
    };

    return (
        <GameManager.Provider
            value={{
                userId: getUserId(),
                setUserId,
                setShowdownId,
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
