import { useRef } from "react";
import { sleep } from "../utils";
import { sample, startCase, range } from "lodash";

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

function useMockBackend() {
    const showdownSubs = useRef<{ [key: string]: (data: any) => void }>({});
    const roundSubs = useRef<{ [key: string]: (data: any) => void }>({});

    const createTechnique = (): string => {
        return `${startCase(sample(adjectives))} ${sample(nouns)} ${sample(
            verbs
        )} ${sample(adverbs)}!`;
    };

    const createRound = () => {
        return {
            id: "rnd-1",
            technique: createTechnique(),
        };
    };

    const mockCreateShowdown = async (userId: string) => {
        try {
            await sleep(3000);
            showdownSubs.current[userId]({
                id: "shd-1",
                techniques: range(5).map(createRound),
                combatants: [
                    {
                        userId: userId,
                    },
                    {
                        userId: "comb-2",
                    },
                ],
            });
        } catch (e) {
            console.log(e);
        }
    };

    const postJoinShowdown = async (userId: string) => {
        mockCreateShowdown(userId);

        return {
            data: {},
            status: 200,
            statusText: "OK",
            headers: {},
            config: {},
            request: { userId },
        };
    };

    const mockRound = async (userId: string) => {
        try {
            await sleep(3000);
            roundSubs.current[userId]({
                winner: Math.random() < 0.5 ? userId : "opponent",
            });
        } catch (e) {
            console.log(e);
        }
    };

    const postSubmitPerformance = async (
        userId: string,
        duration: number,
        showdownId: string,
        roundId: string
    ) => {
        mockRound(userId);

        return {
            data: {},
            status: 200,
            statusText: "OK",
            headers: {},
            config: {},
            request: { userId, duration, showdownId, roundId },
        };
    };

    const subOnShowdownReady = (
        subscriberId: string,
        callback: (data: any) => void
    ) => {
        showdownSubs.current[subscriberId] = callback;
    };

    const subOnRoundComplete = (
        subscriberId: string,
        callback: (data: any) => void
    ) => {
        roundSubs.current[subscriberId] = callback;
    };

    return {
        postJoinShowdown,
        postSubmitPerformance,
        subOnShowdownReady,
        subOnRoundComplete,
    };
}

export default useMockBackend;
