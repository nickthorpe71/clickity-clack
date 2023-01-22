import { FC } from "react";

// components
import PerformanceInput from "./PerformanceInput";

interface ShowdownBottomHUDProps {
    technique: string;
    canInput: boolean;
    submitPerformance: (duration: number) => void;
}

const ShowdownBottomHUD: FC<ShowdownBottomHUDProps> = ({
    technique,
    canInput,
    submitPerformance,
}) => {
    return (
        <div className='w-full flex h-1/6 justify-center items-center z-hud-midground'>
            {canInput && (
                <PerformanceInput
                    technique={technique}
                    submitPerformance={submitPerformance}
                />
            )}
        </div>
    );
};

export default ShowdownBottomHUD;
