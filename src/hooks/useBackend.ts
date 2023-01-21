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

function useBackend(isAI: boolean = false) {
    const { setUserId } = useContext(GameManager) as GameManagerContextType;
    const { subscribe } = usePusher();

    const joinShowdown = async (
        userId: string,
        callback: (data: Showdown) => void
    ) => {
        if (isAI) {
            MockAPI.startMockShowdown(userId, callback);
            return;
        }
        try {
            const res: { data: JoinShowdownAPIResponse } =
                await API.joinShowdown(userId);
            if (res.data.userId !== userId) setUserId(res.data.userId);

            subscribe(
                `showdown.${res.data.showdownId}.ready`,
                "ShowdownReady",
                callback
            );
        } catch (err) {
            console.error(err);
        }
    };

    const startShowdown = async (
        showdownId: string,
        roundCompletedCallback: (data: RoundCompletedEventResponse) => void,
        showdownCompletedCallback: (
            data: ShowdownCompletedEventResponse
        ) => void
    ) => {
        if (isAI) {
            MockAPI.subscribeToMockEvents(
                showdownId,
                roundCompletedCallback,
                showdownCompletedCallback
            );
            return;
        }

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
        userId: string,
        duration: number,
        showdownId: string,
        roundId: string
    ) => {
        if (isAI) {
            MockAPI.runMockRound(showdownId, userId, duration);
            return;
        }
        try {
            await API.submitPerformance(userId, duration, showdownId, roundId);
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
