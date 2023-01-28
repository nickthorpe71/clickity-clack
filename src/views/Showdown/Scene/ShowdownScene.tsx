import { FC } from "react";

import { SHOWDOWN_STATE } from "../../../types";
import ShowdownFMV from "./ShowdownFMV";

// assets

// smiling samurai images
import smilingSamuraiIdleSprite from "../../../images/smiling-samurai/smiling-samurai-idle.png";
import smilingSamuraiAttackSprite from "../../../images/smiling-samurai/smiling-samurai-attack.png";
import smilingSamuraiWinSprite from "../../../images/smiling-samurai/smiling-samurai-win.png";
import smilingSamuraiLoseSprite from "../../../images/smiling-samurai/smiling-samurai-lose.png";

// blade master images
import bladeMasterIdleSprite from "../../../images/blade-master/blade-master-idle.png";
import bladeMasterAttackSprite from "../../../images/blade-master/blade-master-attack.png";
import bladeMasterWinSprite from "../../../images/blade-master/blade-master-win.png";
import bladeMasterLoseSprite from "../../../images/blade-master/blade-master-lose.png";

interface ShowdownSceneProps {
    showdownState: SHOWDOWN_STATE;
}

const ShowdownScene: FC<ShowdownSceneProps> = ({ showdownState }) => {
    return (
        <div className='w-full flex h-4/6 justify-between items-end z-game-midground py-12 px-[10vw]'>
            <img
                className='max-h-52 scale-x-[-1]'
                src={smilingSamuraiIdleSprite}
                alt='smiling samurai'
            />
            <img
                className='max-h-60'
                src={bladeMasterIdleSprite}
                alt='blade master'
            />

            {showdownState === SHOWDOWN_STATE.ROUND_FMV && <ShowdownFMV />}
        </div>
    );
};

export default ShowdownScene;
