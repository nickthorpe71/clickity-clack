import React, { useState, useEffect } from "react";

// utils
import { sleep } from "../../../utils";

// assets
import backgroundTint from "../../../images/fmv/background-tint.png";
import bottomLine from "../../../images/fmv/bottom-line.png";
import topLine from "../../../images/fmv/top-line.png";
import bladeMasterCloseUp from "../../../images/fmv/blade-master-close-up.png";
import smilingSamuraiCloseUpLeft from "../../../images/fmv/smiling-samurai-close-up-left.png";

const ShowdownScene = () => {
    const [portraitTrigger, setPortraitTrigger] = useState(false);
    const [fadeOutTrigger, setFadeOutTrigger] = useState(false);

    useEffect(() => {
        delaySequence();
    }, []);

    const delaySequence = async () => {
        await sleep(1000);
        setPortraitTrigger(true);
        await sleep(2700);
        setFadeOutTrigger(true);
    };

    return (
        <div
            className={`absolute top-0 left-0 w-screen h-screen ${
                fadeOutTrigger && "animate-fade-out"
            }`}
        >
            <img
                className='absolute top-0 left-0 w-screen h-screen animate-fade-in'
                src={backgroundTint}
                alt='background tint'
            />
            <img
                className='absolute h-2/5 top-0 left-0 w-screen animate-fade-in-down'
                src={topLine}
                alt='top line'
            />
            <img
                className='absolute h-2/5 bottom-0 left-0 w-screen animate-fade-in-up'
                src={bottomLine}
                alt='bottom line'
            />
            {portraitTrigger && (
                <>
                    <img
                        className='absolute h-[28%] bottom-0 right-0 animate-slide-in-right'
                        src={bladeMasterCloseUp}
                        alt='blade master close up'
                    />
                    <img
                        className='absolute h-[28%] top-0 left-0 animate-slide-in-left'
                        src={smilingSamuraiCloseUpLeft}
                        alt='smiling samurai close up'
                    />
                </>
            )}
        </div>
    );
};

export default ShowdownScene;
