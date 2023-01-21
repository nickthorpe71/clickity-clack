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
import ShowdownHUD from "./HUD/ShowdownHUD";
import ShowdownScene from "./Scene/ShowdownScene";

const Showdown = () => {
    const { userId, nextRound, setGameState, getCurrentRound, showdownId } =
        useContext(GameManager) as GameManagerContextType;

    const { submitPerformance, startShowdown } = useBackend(false);

    const [showdownState, setShowdownState] = useState<SHOWDOWN_STATE>(
        SHOWDOWN_STATE.NOT_STARTED
    );
    const [myScore, setMyScore] = useState<number>(0);
    const [opponentScore, setOpponentScore] = useState<number>(0);
    const [technique, setTechnique] = useState<string>("");
    const [canInput, setCanInput] = useState<boolean>(false);
    const onRoundComplete = useRef<(data: any) => Promise<void>>(
        async (_: any) => {}
    );

    useEffect(() => {
        console.log("start showdown");
        startShowdown(handleRoundCompletedEvent, handleShowdownCompletedEvent);
        startShowdownRound();
    }, []);

    useEffect(() => {
        onRoundComplete.current = async (data: RoundCompletedEventResponse) => {
            console.log("on round complete", data);
            incrementScore(data.combatants);
            setTechnique("");
            await sleep(3000);
            setTechnique(nextRound());
            setCanInput(true);
            setShowdownState(SHOWDOWN_STATE.ROUND_COMPLETED);
        };
    }, [myScore, opponentScore]);

    const startShowdownRound = async () => {
        await sleep(2000);
        setCanInput(true);
        setTechnique(getCurrentRound().technique);
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
        <div className='z-hud-background w-full h-full'>
            <h1>Showdown</h1>
            <ShowdownHUD
                myScore={myScore}
                opponentScore={opponentScore}
                technique={technique}
                canInput={canInput}
                submitPerformance={handleSubmitPerformance}
            />
            <ShowdownScene showdownState={showdownState} />
        </div>
    );
};

export default Showdown;
