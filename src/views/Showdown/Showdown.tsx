import { useEffect, useContext, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

// types
import {
    GAME_STATE,
    SHOWDOWN_STATE,
    GameManagerContextType,
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
import ShowdownTopHUD from "./HUD/ShowdownTopHUD";
import ShowdownBottomHUD from "./HUD/ShowdownBottomHUD";
import ShowdownScene from "./Scene/ShowdownScene";

const Showdown = () => {
    const navigate = useNavigate();

    const { userId, nextRound, setGameState, getCurrentRound, showdownId } =
        useContext(GameManager) as GameManagerContextType;

    const { submitPerformance, startShowdown } = useBackend(false);

    const [showdownState, setShowdownState] = useState<SHOWDOWN_STATE>(
        SHOWDOWN_STATE.NOT_STARTED
    );
    const [myScore, setMyScore] = useState<number>(0);
    const [opponentScore, setOpponentScore] = useState<number>(0);
    const [myDuration, setMyDuration] = useState<number | null>(0);
    const [opponentDuration, setOpponentDuration] = useState<number | null>(0);
    const [technique, setTechnique] = useState<string>("");
    const [canInput, setCanInput] = useState<boolean>(false);
    const [winner, setWinner] = useState<"me" | "opponent" | null>(null);
    const onRoundComplete = useRef<
        (data: RoundCompletedEventResponse) => Promise<void>
    >(async (_: any) => {});
    const onShowdownComplete = useRef<
        (data: ShowdownCompletedEventResponse) => Promise<void>
    >(async (_: any) => {});

    useEffect(() => {
        startShowdown(
            showdownId,
            handleRoundCompletedEvent,
            handleShowdownCompletedEvent
        );
        startRound(getCurrentRound().technique);

        return () => {
            resetAllState();
        };
    }, [showdownId]);

    const resetAllState = () => {
        setShowdownState(SHOWDOWN_STATE.NOT_STARTED);
        setMyScore(0);
        setOpponentScore(0);
        setMyDuration(null);
        setOpponentDuration(null);
        setTechnique("");
        setCanInput(false);
    };

    useEffect(() => {
        onRoundComplete.current = async (data: RoundCompletedEventResponse) => {
            console.log("round complete", data);

            setTechnique("");
            setDurations(data.combatants);
            incrementScore(data.combatants);
            updateWinner(data.combatants);
            setShowdownState(SHOWDOWN_STATE.ROUND_COMPLETED);
            await sleep(3300);
            if (!data.showdownCompleted) startRound(nextRound());
        };
    }, [myScore, opponentScore, showdownState, technique]);

    useEffect(() => {
        onShowdownComplete.current = async (
            data: ShowdownCompletedEventResponse
        ) => {
            console.log("showdown complete", data);

            await sleep(2000);
            const winner = data.winner;
            setTechnique("");
            setMyDuration(null);
            setOpponentDuration(null);
            if (winner === userId) setMyScore(myScore + 1);
            else setOpponentScore(opponentScore + 1);
            setWinner(winner === userId ? "me" : "opponent");
            setShowdownState(SHOWDOWN_STATE.SHOWDOWN_COMPLETED);
        };
    }, [myScore, opponentScore, showdownState, technique]);

    const startRound = async (technique: string) => {
        setShowdownState(SHOWDOWN_STATE.ANTICIPATION);
        await sleep(1200);
        setShowdownState(SHOWDOWN_STATE.ROUND_FMV);
        await sleep(3000);
        setShowdownState(SHOWDOWN_STATE.ANTICIPATION);
        const waitTime = Math.random() * 3000 + 500;
        await sleep(waitTime);
        setCanInput(true);
        setTechnique(technique);
        setShowdownState(SHOWDOWN_STATE.SUBMITTING_PERFORMANCE);
    };

    const handleRoundCompletedEvent = (data: RoundCompletedEventResponse) => {
        onRoundComplete.current(data);
    };

    const handleShowdownCompletedEvent = (
        data: ShowdownCompletedEventResponse
    ) => {
        onShowdownComplete.current(data);
    };

    const exitShowdown = () => {
        setGameState(GAME_STATE.LOBBY);
        navigate("/");
    };

    const setDurations = (
        combatants: Array<{
            userId: string;
            duration: number;
            winner: boolean;
        }>
    ) => {
        const myDuration = combatants.find(
            (c) => c.userId === userId
        )?.duration;
        const opponentDuration = combatants.find(
            (c) => c.userId !== userId
        )?.duration;
        setMyDuration(Math.min(myDuration || 60000, 60000));
        setOpponentDuration(Math.min(opponentDuration || 60000, 60000));
    };

    const updateWinner = (
        combatants: Array<{ userId: string; winner: boolean }>
    ) => {
        const winner = combatants.find((c) => c.winner)?.userId;
        if (!winner) setWinner(null);
        else if (winner === userId) setWinner("me");
        else setWinner("opponent");
    };

    const incrementScore = (
        combatants: Array<{
            userId: string;
            duration: number;
            winner: boolean;
        }>
    ) => {
        const myPoint = combatants.find((c) => c.userId === userId)?.winner
            ? 1
            : 0;
        const opponentPoint = combatants.find((c) => c.userId !== userId)
            ?.winner
            ? 1
            : 0;
        setMyScore(myScore + myPoint);
        setOpponentScore(opponentScore + opponentPoint);
    };

    const handleSubmitPerformance = async (duration: number) => {
        try {
            setCanInput(false);
            await submitPerformance(duration, showdownId, getCurrentRound().id);
            setShowdownState(SHOWDOWN_STATE.WAITING_FOR_OPPONENT);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className='z-hud-background w-full h-5/6'>
            <ShowdownTopHUD
                myScore={myScore}
                opponentScore={opponentScore}
                myDuration={myDuration}
                opponentDuration={opponentDuration}
                showdownState={showdownState}
            />

            <ShowdownScene showdownState={showdownState} winner={winner} />
            <ShowdownBottomHUD
                technique={technique}
                canInput={canInput}
                submitPerformance={handleSubmitPerformance}
                showdownState={showdownState}
                scoreDifference={myScore - opponentScore}
                exitShowdown={exitShowdown}
            />
        </div>
    );
};

export default Showdown;
