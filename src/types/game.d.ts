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
