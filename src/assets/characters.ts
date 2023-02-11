import { Character } from "../types/game";

// smiling samurai images
import smilingSamuraiIdle from "./images/smiling-samurai/smiling-samurai-idle.png";
import smilingSamuraiAttack from "./images/smiling-samurai/smiling-samurai-attack.png";
import smilingSamuraiLose from "./images/smiling-samurai/smiling-samurai-lose.png";
import smilingSamuraiWin from "./images/smiling-samurai/smiling-samurai-win.png";
import smilingSamuraiCloseUpLeft from "./images/smiling-samurai/smiling-samurai-close-up-left.png";
import smilingSamuraiCloseUpRight from "./images/smiling-samurai/smiling-samurai-close-up-right.png";

// blade master images
import bladeMasterIdle from "./images/blade-master/blade-master-idle.png";
import bladeMasterAttack from "./images/blade-master/blade-master-attack.png";
import bladeMasterLose from "./images/blade-master/blade-master-lose.png";
import bladeMasterWin from "./images/blade-master/blade-master-win.png";
import bladeMasterCloseUpLeft from "./images/blade-master/blade-master-close-up-left.png";
import bladeMasterCloseUpRight from "./images/blade-master/blade-master-close-up-right.png";

export const characters: { [characterId: string]: Character } = {
    smilingSamurai: {
        name: "Smiling Samurai",
        id: "smilingSamurai",
        images: {
            idle: smilingSamuraiIdle,
            attack: smilingSamuraiAttack,
            lose: smilingSamuraiLose,
            win: smilingSamuraiWin,
            closeUpLeft: smilingSamuraiCloseUpLeft,
            closeUpRight: smilingSamuraiCloseUpRight,
        },
    },
    bladeMaster: {
        name: "Blade Master",
        id: "bladeMaster",
        images: {
            idle: bladeMasterIdle,
            attack: bladeMasterAttack,
            lose: bladeMasterLose,
            win: bladeMasterWin,
            closeUpLeft: bladeMasterCloseUpLeft,
            closeUpRight: bladeMasterCloseUpRight,
        },
    },
};
