import { FC } from "react";

// components
import ScoreDisplay from "./ScoreDisplay";

interface ShowdownTopHUDProps {
    myScore: number;
    opponentScore: number;
    myDuration: string;
    opponentDuration: string;
    technique: string;
}

const ShowdownTopHUD: FC<ShowdownTopHUDProps> = ({
    myScore,
    opponentScore,
    myDuration,
    opponentDuration,
    technique,
}) => {
    return (
        <div className='w-full flex h-1/6 justify-between items-top z-hud-midground py-10 px-32'>
            <ScoreDisplay label={"Me"} score={myScore} />
            <p>{myDuration}</p>
            <p>{`${technique}`}</p>
            <p>{opponentDuration}</p>
            <ScoreDisplay label={"Opponent"} score={opponentScore} />
        </div>
    );
};

export default ShowdownTopHUD;
