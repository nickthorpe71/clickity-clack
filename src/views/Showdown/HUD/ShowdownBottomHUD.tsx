import { FC } from "react";

// types
import { SHOWDOWN_STATE } from "../../../types";

// components
import PerformanceInput from "./PerformanceInput";
import Sign from "../../../components/Sign";
import SignTitle from "../../../components/SignTitle";
import SignButton from "../../../components/SignButton";

interface ShowdownBottomHUDProps {
    technique: string;
    canInput: boolean;
    submitPerformance: (duration: number) => void;
    showdownState: SHOWDOWN_STATE;
    scoreDifference: number;
    exitShowdown: () => void;
}

const ShowdownBottomHUD: FC<ShowdownBottomHUDProps> = ({
    technique,
    canInput,
    submitPerformance,
    showdownState,
    scoreDifference,
    exitShowdown,
}) => {
    const getFinalText = () => {
        if (scoreDifference > 0) {
            return "YOU WON!";
        } else if (scoreDifference < 0) {
            return "YOU LOST...";
        } else {
            return "DRAW";
        }
    };

    return (
        <div className='w-full flex h-1/6 justify-center items-center z-hud-midground relative'>
            {canInput && (
                <PerformanceInput
                    technique={technique}
                    submitPerformance={submitPerformance}
                />
            )}
            {showdownState === SHOWDOWN_STATE.SHOWDOWN_COMPLETED && (
                <Sign style='p-12 absolute bottom-[30vh]'>
                    <SignTitle text={getFinalText()} />
                    <SignButton text='Return to Lobby' onClick={exitShowdown} />
                </Sign>
            )}
        </div>
    );
};

export default ShowdownBottomHUD;
