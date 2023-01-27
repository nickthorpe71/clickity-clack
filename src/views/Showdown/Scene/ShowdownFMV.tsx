import { FC } from "react";

import { SHOWDOWN_STATE } from "../../../types";

// assets
import backgroundTint from "../../../images/fmv/background-tint.png";
import bottomLine from "../../../images/fmv/bottom-line.png";
import topLine from "../../../images/fmv/top-line.png";
import bladeMasterCloseUp from "../../../images/fmv/blade-master-close-up.png";
import smilingSamuraiCloseUp from "../../../images/fmv/smiling-samurai-close-up.png";

interface ShowdownSceneProps {
    showdownState: SHOWDOWN_STATE;
}

const ShowdownScene: FC<ShowdownSceneProps> = ({ showdownState }) => {
    return (
        <div className='absolute top-0 left-0 w-screen h-screen '>
            <img
                className='absolute top-0 left-0 w-screen h-screen animate-fade-in'
                src={backgroundTint}
                alt='background tint'
            />
            <img
                className='absolute h-2/5 top-0 left-0 w-screen animate-fade-in'
                src={topLine}
                alt='top line'
            />
            <img
                className='absolute h-2/5 bottom-0 left-0 w-screen animate-fade-in'
                src={bottomLine}
                alt='bottom line'
            />
            <img
                className='absolute h-[28%] bottom-0 right-0 animate-fade-in'
                src={bladeMasterCloseUp}
                alt='blade master close up'
            />
            <img
                className='absolute h-[28%] top-0 left-0 scale-x-[-1] animate-fade-in'
                src={smilingSamuraiCloseUp}
                alt='smiling samurai close up'
            />
        </div>
    );
};

export default ShowdownScene;
