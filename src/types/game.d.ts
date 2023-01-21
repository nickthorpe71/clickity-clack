export interface Showdown {
    id: string;
    rounds: Round[];
    combatants: Combatant[];
}

export interface Combatant {
    userId: string;
}

export interface Round {
    id: string;
    technique: string;
}
