import { useEffect, useContext, useState, useRef } from "react";

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
    const { userId, nextRound, setGameState, getCurrentRound, showdownId } =
        useContext(GameManager) as GameManagerContextType;

    const { submitPerformance, startShowdown } = useBackend(true);

    const [showdownState, setShowdownState] = useState<SHOWDOWN_STATE>(
        SHOWDOWN_STATE.NOT_STARTED
    );
    const [myScore, setMyScore] = useState<number>(0);
    const [opponentScore, setOpponentScore] = useState<number>(0);
    const [myDuration, setMyDuration] = useState<string>("");
    const [opponentDuration, setOpponentDuration] = useState<string>("");
    const [technique, setTechnique] = useState<string>("");
    const [canInput, setCanInput] = useState<boolean>(false);
    const onRoundComplete = useRef<(data: any) => Promise<void>>(
        async (_: any) => {}
    );

    useEffect(() => {
        console.log("start showdown");
        startShowdown(handleRoundCompletedEvent, handleShowdownCompletedEvent);
        startRound(getCurrentRound().technique);
    }, []);

    useEffect(() => {
        onRoundComplete.current = async (data: RoundCompletedEventResponse) => {
            setShowdownState(SHOWDOWN_STATE.ROUND_COMPLETED);
            setTechnique("");
            setDurations(data.combatants);
            await sleep(2000);
            incrementScore(data.combatants);
            await sleep(1000);
            resetDurations();
            startRound(nextRound());
        };
    }, [myScore, opponentScore]);

    const startRound = async (technique: string) => {
        setShowdownState(SHOWDOWN_STATE.ROUND_FMV);
        setShowdownState(SHOWDOWN_STATE.ANTICIPATION);
        const waitTime = Math.random() * 14000 + 1000;
        await sleep(waitTime);
        setCanInput(true);
        setTechnique(technique);
        setShowdownState(SHOWDOWN_STATE.SUBMITTING_PERFORMANCE);
    };

    const handleRoundCompletedEvent = (data: RoundCompletedEventResponse) => {
        console.log("round complete", data);
        onRoundComplete.current(data);
    };

    const handleShowdownCompletedEvent = (
        data: ShowdownCompletedEventResponse
    ) => {
        console.log("showdown complete", data);
        onShowdownComplete(data);
    };

    const onShowdownComplete = async (data: ShowdownCompletedEventResponse) => {
        setShowdownState(SHOWDOWN_STATE.ROUND_COMPLETED);
        const winner = data.winner;
        console.log("winner", winner);

        sleep(2000);
        setGameState(GAME_STATE.LOBBY);
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
        setMyDuration(String(myDuration));
        setOpponentDuration(String(opponentDuration));
    };

    const resetDurations = () => {
        setMyDuration("");
        setOpponentDuration("");
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
            console.log(e);
        }
    };

    return (
        <div className='z-hud-background w-full h-5/6'>
            <ShowdownTopHUD
                myScore={myScore}
                opponentScore={opponentScore}
                myDuration={myDuration}
                opponentDuration={opponentDuration}
                technique={technique}
            />

            <ShowdownScene showdownState={showdownState} />
            <ShowdownBottomHUD
                technique={technique}
                canInput={canInput}
                submitPerformance={handleSubmitPerformance}
            />
        </div>
    );
};

export default Showdown;
