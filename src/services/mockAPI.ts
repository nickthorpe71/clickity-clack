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
    "ancient",
    "fierce",
    "flying",
    "sneaky",
    "sly",
    "mystic",
    "savage",
    "mad",
    "crazy",
    "wild",
    "furious",
    "giant",
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
    "eagle",
    "wolf",
    "lion",
    "toad",
    "snake",
    "fox",
    "tortoise",
    "turtle",
    "crane",
    "crab",
    "frog",
    "knight",
    "samurai",
    "ninja",
    "warrior",
    "mage",
    "wizard",
    "warlock",
    "witch",
    "sorcerer",
    "sorceress",
    "shaman",
    "lord",
    "lady",
    "crone",
    "smith",
    "thief",
    "rogue",
    "assassin",
    "hunter",
    "ranger",
    "druid",
    "bard",
    "cleric",
    "paladin",
    "monk",
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
    "attacks",
    "laments",
    "cries",
    "screams",
    "sighs",
    "cries",
    "wanders",
    "punches",
    "charges",
    "stabs",
    "dives",
    "dodges",
    "dashes",
    "jumps",
    "lunges",
    "slices",
    "slashes",
    "leaps",
    "waits",
    "blocks",
    "parries",
    "strikes",
    "smashes",
    "bashes",
    "bites",
    "plots",
    "stalks",
    "stings",
    "plans",
    "kicks",
    "tumbles",
    "strides",
];
const adverbs = [
    "like water",
    "like smoke",
    "like a shadow",
    "like a cat",
    "like fire",
    "like ice",
    "like the wind",
    "like a storm",
    "like a hurricane",
    "like a tornado",
    "like a whirlwind",
    "silently",
    "quickly",
    "slowly",
    "swiftly",
    "elegantly",
    "aggressively",
    "defensively",
    "offensively",
    "defiantly",
    "boldly",
    "courageously",
    "bravely",
    "fearlessly",
    "recklessly",
    "patiently",
    "with determination",
    "with confidence",
    "with skill",
    "with precision",
    "with power",
    "with strength",
    "with speed",
    "with agility",
    "with grace",
    "with fury",
    "beautifully",
    "fiercely",
    "with grace",
    "with fury",
    "with passion",
    "with love",
    "with hate",
    "with anger",
    "with joy",
    "with sadness",
    "with fear",
    "with courage",
    "with bravery",
    "with honor",
    "with pride",
    "with humility",
    "with wisdom",
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
    await sleep(100);
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
    const showdownCompleted = playerWins === 3 || opponentWins === 3;
    if (localUserWins) playerWins++;
    else opponentWins++;
    if (showdownCompleted) {
        const localUserWinsShowdown = playerWins === 3;
        mockShowdownCompleteSubs[showdownId]({
            winner: localUserWinsShowdown ? "player" : "opponent",
        });
        playerWins = 0;
        opponentWins = 0;
        return;
    }
    mockRoundSubs[showdownId]({
        showdownCompleted,
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
};

const mockAPI = {
    startMockShowdown,
    subscribeToMockEvents,
    runMockRound,
};

export default mockAPI;
