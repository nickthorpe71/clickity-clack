export interface UserAPIResponse {
    userId: string;
}

export interface JoinShowdownAPIResponse {
    id: string;
    userId: string;
    combatantIds: string[];
}

export interface RoundCompletedEventResponse {
    combatants: Array<{
        userId: string;
        duration: number;
        winner: boolean;
    }>;
}

export interface ShowdownCompletedEventResponse {
    winner: string;
}
