import { sample, startCase, range } from "lodash";

// types
import {
    RoundCompletedEventResponse,
    ShowdownCompletedEventResponse,
} from "../types";

// utils
import { sleep } from "../utils";

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

// mock state
const mockRoundSubs: {
    [key: string]: (data: RoundCompletedEventResponse) => void;
} = {};
const mockShowdownCompleteSubs: {
    [key: string]: (data: ShowdownCompletedEventResponse) => void;
} = {};
let playerWins = 0;
let opponentWins = 0;

const createMockTechnique = (): string => {
    return `${startCase(sample(adjectives))} ${sample(nouns)} ${sample(
        verbs
    )} ${sample(adverbs)}!`;
};

const createMockRound = (id: number) => {
    return {
        id: `rnd-${id}`,
        technique: createMockTechnique(),
    };
};

const startMockShowdown = async (
    userId: string,
    callback: (data: any) => void
) => {
    await sleep(1500);
    callback({
        id: "shd-1",
        rounds: range(5).map((i) => createMockRound(i)),
        combatants: [userId, "comb-2"],
    });
};

const subscribeToMockEvents = async (
    showdownId: string,
    roundCompletedCallback: (data: RoundCompletedEventResponse) => void,
    showdownCompletedCallback: (data: ShowdownCompletedEventResponse) => void
) => {
    mockRoundSubs[showdownId] = roundCompletedCallback;
    mockShowdownCompleteSubs[showdownId] = showdownCompletedCallback;
};

const runMockRound = async (
    showdownId: string,
    userId: string,
    duration: number
) => {
    await sleep(2000);
    // random between 1 and 10 seconds
    const opponentDuration = Math.floor(Math.random() * 10000) + 1000;
    const localUserWins = duration < opponentDuration;
    mockRoundSubs[showdownId]({
        combatants: [
            {
                userId,
                duration,
                winner: localUserWins,
            },
            {
                userId: "comb-2",
                duration: opponentDuration,
                winner: !localUserWins,
            },
        ],
    });
    adjustScores(localUserWins, showdownId);
};

const adjustScores = (localUserWins: boolean, showdownId: string) => {
    if (localUserWins) {
        playerWins++;
    } else {
        opponentWins++;
    }

    if (playerWins === 3 || opponentWins === 3) {
        const localUserWinsShowdown = playerWins === 3;
        mockShowdownCompleteSubs[showdownId]({
            winner: localUserWinsShowdown ? "player" : "opponent",
        });
        playerWins = 0;
        opponentWins = 0;
    }
};

const mockAPI = {
    startMockShowdown,
    subscribeToMockEvents,
    runMockRound,
};

export default mockAPI;
