import { useContext } from "react";

// state
import { GameManager } from "../context/gameManager";

// types
import {
    GameManagerContextType,
    Showdown,
    JoinShowdownAPIResponse,
    RoundCompletedEventResponse,
    ShowdownCompletedEventResponse,
} from "../types";

// hooks
import usePusher from "./usePusher";

// services
import API from "../services/api";
import MockAPI from "../services/mockAPI";

function useBackend() {
    const { userId, setUserId, setShowdownId } = useContext(
        GameManager
    ) as GameManagerContextType;
    const { subscribe } = usePusher();

    const joinShowdown = async (
        callback: (data: Showdown) => void,
        isAI: boolean
    ) => {
        if (isAI) {
            MockAPI.startMockShowdown(userId, callback);
            return;
        }
        try {
            console.log("joining showdown");

            const res: { data: JoinShowdownAPIResponse } =
                await API.joinShowdown(userId);

            console.log("joined showdown", res.data);

            const newShowdownId = res.data.id;
            if (res.data.userId !== userId) setUserId(res.data.userId);

            setShowdownId(newShowdownId);

            console.log("subscribing to showdown ready event");

            subscribe(
                `showdown.${newShowdownId}.ready`,
                "ShowdownReady",
                callback
            );

            if (res.data.combatantIds.length > 1) {
                console.log("confirming showdown");
                await API.confirmShowdown(newShowdownId);
                console.log("confirmed showdown");
            }
        } catch (err) {
            console.error(err);
        }
    };

    const startShowdown = async (
        showdownId: string,
        roundCompletedCallback: (data: RoundCompletedEventResponse) => void,
        showdownCompletedCallback: (
            data: ShowdownCompletedEventResponse
        ) => void,
        isAI: boolean
    ) => {
        if (isAI) {
            MockAPI.subscribeToMockEvents(
                showdownId,
                roundCompletedCallback,
                showdownCompletedCallback
            );
            return;
        }

        console.log("subscribing to showdown events - id:", showdownId);

        subscribe(
            `showdown.${showdownId}.round.completed`,
            "RoundCompleted",
            roundCompletedCallback
        );

        subscribe(
            `showdown.${showdownId}.completed`,
            "ShowdownCompleted",
            showdownCompletedCallback
        );
    };

    const submitPerformance = async (
        duration: number,
        showdownId: string,
        roundId: string,
        isAI: boolean
    ) => {
        if (isAI) {
            MockAPI.runMockRound(showdownId, userId, duration);
            return;
        }
        try {
            console.log("submitting performance");
            await API.submitPerformance(userId, duration, showdownId, roundId);
            console.log("submitted performance");
        } catch (err) {
            console.error(err);
        }
    };

    return {
        joinShowdown,
        startShowdown,
        submitPerformance,
    };
}

export default useBackend;
