import { useEffect, useContext, useState, useRef } from "react";

// types
import { GAME_STATE, GameManagerContextType } from "../../types";
import {
    RoundCompletedEventResponse,
    ShowdownCompletedEventResponse,
} from "../../types";

// state
import { GameManager } from "../../context/gameManager";

// hooks
import useBackend from "../../hooks/useBackend";

// utils
import { sleep } from "../../utils";

// components
import PerformanceInput from "./PerformanceInput";

const Showdown = () => {
    const { userId, nextRound, setGameState, getCurrentRound, showdownId } =
        useContext(GameManager) as GameManagerContextType;

    const { submitPerformance, startShowdown } = useBackend();

    const [myScore, setMyScore] = useState<number>(0);
    const [opponentScore, setOpponentScore] = useState<number>(0);
    const [technique, setTechnique] = useState<string>("");
    const [canInput, setCanInput] = useState<boolean>(false);
    // const onRoundComplete = useRef<(data: any) => Promise<void>>(
    //     async (_: any) => {}
    // );

    useEffect(() => {
        startShowdown(
            showdownId,
            handleRoundCompletedEvent,
            handleShowdownCompletedEvent
        );

        setTechnique(getCurrentRound().technique);
        setCanInput(true);
    }, []);

    const handleRoundCompletedEvent = (data: RoundCompletedEventResponse) => {
        onRoundComplete(data);
    };

    const handleShowdownCompletedEvent = (
        data: ShowdownCompletedEventResponse
    ) => {
        onShowdownComplete(data);
    };

    const onRoundComplete = async (data: RoundCompletedEventResponse) => {
        incrementScore(data.combatants);
        setTechnique("");
        await sleep(3000);
        setTechnique(nextRound());
        setCanInput(true);
    };

    const onShowdownComplete = async (data: ShowdownCompletedEventResponse) => {
        // show some kind of result
        const winner = data.winner;
        console.log("winner", winner);

        sleep(2000);
        setGameState(GAME_STATE.LOBBY);
    };

    // useEffect(() => {
    //     onRoundComplete.current = async (data: any) => {
    //         incrementScore(data.winner);
    //         setTechnique("");
    //         await sleep(3000);
    //         setTechnique(nextRound());
    //         setCanInput(true);
    //     };
    // }, [myScore, opponentScore, technique, canInput, nextRound, userId]);

    const incrementScore = (
        combatants: Array<{
            userId: string;
            duration: number;
            winner: boolean;
        }>
    ) => {
        const myNewScore = combatants.find((c) => c.userId === userId)?.winner
            ? 1
            : 0;
        const opponentNewScore = combatants.find((c) => c.userId !== userId)
            ?.winner
            ? 1
            : 0;
        setMyScore(myScore + myNewScore);
        setOpponentScore(opponentScore + opponentNewScore);
    };

    const handleSubmitPerformance = async (duration: number) => {
        try {
            await submitPerformance(
                userId,
                duration,
                showdownId,
                getCurrentRound().id
            );
            setCanInput(false);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div>
            <h1>Showdown</h1>
            <p>{`Technique: ${technique}`}</p>
            <p>{`My score: ${myScore}`}</p>
            <p>{`Opp score: ${opponentScore}`}</p>

            {canInput && (
                <PerformanceInput submitPerformance={handleSubmitPerformance} />
            )}
        </div>
    );
};

export default Showdown;
