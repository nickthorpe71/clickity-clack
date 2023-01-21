export interface UserAPIResponse {
    userId: string;
}

export interface JoinShowdownAPIResponse {
    showdownId: string;
    userId: string;
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
