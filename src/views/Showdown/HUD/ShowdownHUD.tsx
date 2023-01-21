import { FC } from "react";

// components
import PerformanceInput from "./PerformanceInput";

interface ShowdownHUDProps {
    myScore: number;
    opponentScore: number;
    technique: string;
    canInput: boolean;
    submitPerformance: (duration: number) => void;
}

const ShowdownHUD: FC<ShowdownHUDProps> = ({
    myScore,
    opponentScore,
    technique,
    canInput,
    submitPerformance,
}) => {
    return (
        <div>
            <p>{`Technique: ${technique}`}</p>
            <p>{`My score: ${myScore}`}</p>
            <p>{`Opp score: ${opponentScore}`}</p>
            {canInput && (
                <PerformanceInput
                    technique={technique}
                    submitPerformance={submitPerformance}
                />
            )}
        </div>
    );
};

export default ShowdownHUD;
