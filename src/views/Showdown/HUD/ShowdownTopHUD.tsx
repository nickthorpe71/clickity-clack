import { FC } from "react";

// types
import { SHOWDOWN_STATE } from "../../../types";

// components
import ScoreDisplay from "./ScoreDisplay";
import DurationDisplay from "./DurationDisplay";

interface ShowdownTopHUDProps {
    myScore: number;
    opponentScore: number;
    myDuration: number;
    opponentDuration: number;
    technique: string;
    showdownState: SHOWDOWN_STATE;
}

const ShowdownTopHUD: FC<ShowdownTopHUDProps> = ({
    myScore,
    opponentScore,
    myDuration,
    opponentDuration,
    technique,
    showdownState,
}) => {
    const displayCondition = () =>
        showdownState === SHOWDOWN_STATE.NOT_STARTED ||
        showdownState === SHOWDOWN_STATE.ROUND_COMPLETED ||
        showdownState === SHOWDOWN_STATE.SHOWDOWN_COMPLETED;

    const scoreDisplayStyles = () =>
        "w-3/12 min-w-fit px-12 flex gap-12 justify-between items-center border-slate-50 border-solid";

    return (
        <div
            className={`w-full flex h-1/6 justify-center items-top z-hud-midground py-10 px-32`}
        >
            {displayCondition() && (
                <div className={`${scoreDisplayStyles()} border-r-2`}>
                    <ScoreDisplay label={"Me"} score={myScore} />
                    <DurationDisplay
                        duration={myDuration}
                        winner={myDuration < opponentDuration}
                    />
                </div>
            )}
            <p>{`${technique}`}</p>
            {displayCondition() && (
                <div className={`${scoreDisplayStyles()} border-l-2`}>
                    <DurationDisplay
                        duration={opponentDuration}
                        winner={opponentDuration < myDuration}
                    />
                    <ScoreDisplay label={"Opponent"} score={opponentScore} />
                </div>
            )}
        </div>
    );
};

export default ShowdownTopHUD;
