import { FC } from "react";

import { SHOWDOWN_STATE } from "../../../types";

// assets
import smilingSamuraiWinSprite from "../../../images/smiling-samurai-win.png";
import bladeMasterSprite from "../../../images/blade-master.png";

interface ShowdownSceneProps {
    showdownState: SHOWDOWN_STATE;
}

const ShowdownScene: FC<ShowdownSceneProps> = ({ showdownState }) => {
    return (
        <div className='w-full flex h-4/6 justify-between items-end z-game-midground py-12 px-40'>
            <img
                className='max-h-52'
                src={smilingSamuraiWinSprite}
                alt='smiling samurai'
            />
            <img
                className='max-h-52'
                src={bladeMasterSprite}
                alt='blade master'
            />
        </div>
    );
};

export default ShowdownScene;
