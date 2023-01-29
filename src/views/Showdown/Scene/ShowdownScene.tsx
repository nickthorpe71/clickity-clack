import { FC, useState, useEffect } from "react";

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
    winner: "me" | "opponent" | null;
}

enum CHARACTER_STATE {
    IDLE,
    ATTACK,
    WIN,
    LOSE,
}

const ShowdownScene: FC<ShowdownSceneProps> = ({ showdownState, winner }) => {
    const [myCharacterState, setMyCharacterState] = useState<CHARACTER_STATE>(
        CHARACTER_STATE.IDLE
    );
    const [opponentCharacterState, setOpponentCharacterState] =
        useState<CHARACTER_STATE>(CHARACTER_STATE.IDLE);

    const smilingSamuraiSpriteMap = {
        [CHARACTER_STATE.IDLE]: smilingSamuraiIdleSprite,
        [CHARACTER_STATE.ATTACK]: smilingSamuraiAttackSprite,
        [CHARACTER_STATE.WIN]: smilingSamuraiWinSprite,
        [CHARACTER_STATE.LOSE]: smilingSamuraiLoseSprite,
    };

    const bladeMasterSpriteMap = {
        [CHARACTER_STATE.IDLE]: bladeMasterIdleSprite,
        [CHARACTER_STATE.ATTACK]: bladeMasterAttackSprite,
        [CHARACTER_STATE.WIN]: bladeMasterWinSprite,
        [CHARACTER_STATE.LOSE]: bladeMasterLoseSprite,
    };

    useEffect(() => {
        switch (showdownState) {
            case SHOWDOWN_STATE.ROUND_FMV:
                setMyCharacterState(CHARACTER_STATE.IDLE);
                setOpponentCharacterState(CHARACTER_STATE.IDLE);
                break;
            case SHOWDOWN_STATE.WAITING_FOR_OPPONENT:
                setMyCharacterState(CHARACTER_STATE.ATTACK);
                setOpponentCharacterState(CHARACTER_STATE.ATTACK);
                break;
            case SHOWDOWN_STATE.ROUND_COMPLETED ||
                SHOWDOWN_STATE.SHOWDOWN_COMPLETED:
                setMyCharacterState(
                    winner === "me" ? CHARACTER_STATE.WIN : CHARACTER_STATE.LOSE
                );
                setOpponentCharacterState(
                    winner === "opponent"
                        ? CHARACTER_STATE.WIN
                        : CHARACTER_STATE.LOSE
                );
                break;
            default:
                setMyCharacterState(CHARACTER_STATE.IDLE);
                setOpponentCharacterState(CHARACTER_STATE.IDLE);
                break;
        }
    }, [showdownState, winner]);

    const getCharacterPosition = () => {
        return myCharacterState === CHARACTER_STATE.IDLE
            ? "px-[16vw]"
            : "flex-row-reverse px-[32vw]";
    };

    return (
        <div
            className={`w-full flex h-4/6 justify-between items-end z-game-midground py-12 ${getCharacterPosition()}`}
        >
            <img
                className='max-h-52 scale-x-[-1] select-none'
                src={smilingSamuraiSpriteMap[myCharacterState]}
                alt='smiling samurai'
            />
            <img
                className='max-h-60 select-none'
                src={bladeMasterSpriteMap[opponentCharacterState]}
                alt='blade master'
            />

            {showdownState === SHOWDOWN_STATE.ROUND_FMV && <ShowdownFMV />}
        </div>
    );
};

export default ShowdownScene;
