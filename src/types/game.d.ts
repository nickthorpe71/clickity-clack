export interface Showdown {
    id: string;
    rounds: Round[];
    combatants: Combatant[];
}

export interface Combatant {
    id: string;
}

export interface Round {
    id: string;
    technique: string;
}

export enum SHOWDOWN_STATE {
    NOT_STARTED = "NOT_STARTED",
    ROUND_FMV = "ROUND_FMV",
    ANTICIPATION = "ANTICIPATION",
    SUBMITTING_PERFORMANCE = "SUBMITTING_PERFORMANCE",
    WAITING_FOR_OPPONENT = "WAITING_FOR_OPPONENT",
    ROUND_COMPLETED = "ROUND_COMPLETED",
    SHOWDOWN_COMPLETED = "SHOWDOWN_COMPLETED",
}

export interface Character {
    name: string;
    id: string;
    images: {
        idle: string;
        attack: string;
        lose: string;
        win: string;
    };
}
