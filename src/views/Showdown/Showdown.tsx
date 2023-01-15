import { useEffect, useContext, useState, useRef } from "react";

// types
import { GAME_STATE, GameManagerContextType } from "../../types/gameManager.d";

// state
import { GameManager } from "../../context/gameManager";

// hooks
import useMockBackend from "../../hooks/useMockBackend";

// utils
import { sleep } from "../../utils";

// components
import PerformanceInput from "./PerformanceInput";

const Showdown = () => {
    const { userId, nextRound, setGameState, getCurrentRound } = useContext(
        GameManager
    ) as GameManagerContextType;

    const { subOnRoundComplete, postSubmitPerformance } = useMockBackend();

    const [myScore, setMyScore] = useState<number>(0);
    const [opponentScore, setOpponentScore] = useState<number>(0);
    const [technique, setTechnique] = useState<string>("");
    const [canInput, setCanInput] = useState<boolean>(false);
    const onRoundComplete = useRef<(data: any) => Promise<void>>(
        async (_: any) => {}
    );

    useEffect(() => {
        subOnRoundComplete(userId, (data: any) => {
            onRoundComplete.current(data);
        });

        setTechnique(getCurrentRound().technique);
        setCanInput(true);
    }, []);

    useEffect(() => {
        onRoundComplete.current = async (data: any) => {
            incrementScore(data.winner);
            setTechnique("");
            await sleep(3000);
            setTechnique(nextRound());
            setCanInput(true);
        };
    }, [myScore, opponentScore, technique, canInput, nextRound, userId]);

    const incrementScore = (winner: string) => {
        const myNewScore = winner === userId ? myScore + 1 : myScore;
        const opponentNewScore =
            winner !== userId ? opponentScore + 1 : opponentScore;

        if (hasWinner(myNewScore, opponentNewScore)) {
            endShowdown(myNewScore);
        } else {
            setMyScore(myNewScore);
            setOpponentScore(opponentNewScore);
        }
    };

    const hasWinner = (myNewScore: number, opponentNewScore: number) => {
        return myNewScore === 3 || opponentNewScore === 3;
    };

    const submitPerformance = async (duration: number) => {
        try {
            await postSubmitPerformance(userId, duration, "asd", "dsa");
            setCanInput(false);
        } catch (e) {
            console.log(e);
        }
    };

    const endShowdown = (myNewScore: number) => {
        console.log(myNewScore === 3 ? "You win!" : "You lose...");
        setGameState(GAME_STATE.SHOWDOWN_RESULT);
    };

    return (
        <div>
            <h1>Showdown</h1>
            <p>{`Technique: ${technique}`}</p>
            <p>{`My score: ${myScore}`}</p>
            <p>{`Opp score: ${opponentScore}`}</p>

            {canInput && (
                <PerformanceInput submitPerformance={submitPerformance} />
            )}
        </div>
    );
};

export default Showdown;
