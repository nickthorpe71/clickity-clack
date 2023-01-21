import { useRef } from "react";
import { sample, startCase, range } from "lodash";

// types
import {
    Showdown,
    JoinShowdownAPIResponse,
    RoundCompletedEventResponse,
    ShowdownCompletedEventResponse,
} from "../types";

// utils
import { sleep } from "../utils";

// hooks
import usePusher from "./usePusher";

// services
import API from "../services/api";

const adjectives = [
    "angry",
    "drunken",
    "clever",
    "brave",
    "dark",
    "elegant",
    "flaming",
    "sleeping",
    "enlightened",
];
const nouns = [
    "phoenix",
    "boar",
    "hawk",
    "bear",
    "tiger",
    "dragon",
    "king",
    "queen",
    "berserker",
    "monkey",
];
const verbs = [
    "slaps",
    "charges",
    "dives",
    "leaps",
    "waits",
    "strikes",
    "kicks",
    "tumbles",
    "strides",
];
const adverbs = [
    "like water",
    "silently",
    "aggressively",
    "patiently",
    "with determination",
    "beautifully",
    "fiercely",
    "hastily",
    "keenly",
    "softly",
];

function useBackend(isAI: boolean = false) {
    const { subscribe } = usePusher();

    const mockRoundSubs = useRef<{ [key: string]: (data: any) => void }>({});
    const mockShowdownCompleteSubs = useRef<{
        [key: string]: (data: any) => void;
    }>({});

    const createMockTechnique = (): string => {
        return `${startCase(sample(adjectives))} ${sample(nouns)} ${sample(
            verbs
        )} ${sample(adverbs)}!`;
    };

    const createMockRound = () => {
        return {
            id: "rnd-1",
            technique: createMockTechnique(),
        };
    };

    const mockCreateShowdown = async (
        userId: string,
        callback: (data: any) => void
    ) => {
        await sleep(1000);
        callback({
            id: "shd-1",
            rounds: range(5).map(createMockRound),
            combatants: [userId, "comb-2"],
        });
    };

    const mockRound = async (showdownId: string, userId: string) => {
        await sleep(2000);
        mockRoundSubs.current[showdownId]({
            winner: Math.random() < 0.5 ? userId : "comb-2",
        });
    };

    const joinShowdown = async (
        userId: string,
        callback: (data: Showdown) => void
    ) => {
        if (isAI) {
            mockCreateShowdown(userId, callback);
            return;
        }
        try {
            const res: JoinShowdownAPIResponse = await API.joinShowdown(userId);
            subscribe(`showdown.${res.data.showdownId}.ready`, callback);
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
            mockRoundSubs.current[showdownId] = roundCompletedCallback;
            mockShowdownCompleteSubs.current[showdownId] =
                showdownCompletedCallback;
            return;
        }

        subscribe(
            `showdown.${showdownId}.round.completed`,
            roundCompletedCallback
        );

        subscribe(
            `showdown.${showdownId}.completed`,
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
            mockRound(showdownId, userId);
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
