import { useContext, useState } from "react";

// types
import {
    GAME_STATE,
    GameManagerContextType,
    SoundManagerContextType,
} from "./types/";

// state
import { GameManager } from "./context/gameManager";
import { SoundManager } from "./context/soundManager";

// views
import Lobby from "./views/Lobby/Lobby";
import Showdown from "./views/Showdown/Showdown";
import ShowdownResult from "./views/ShowdownResult/ShowdownResult";

import { MdVolumeUp, MdVolumeOff } from "react-icons/md";

const vignette =
    'after:content-[""] after:absolute after:top-0 after:left-0 after:w-full after:h-full after:shadow-vignette after:z-game-midground';

const App = () => {
    const { gameState } = useContext(GameManager) as GameManagerContextType;
    const { toggleMute } = useContext(SoundManager) as SoundManagerContextType;
    const [isMuted, setIsMuted] = useState<boolean>(false);

    const renderCurrentView = () => {
        switch (gameState) {
            case GAME_STATE.LOBBY:
                return <Lobby />;
            case GAME_STATE.SHOWDOWN:
                return <Showdown />;
            case GAME_STATE.SHOWDOWN_RESULT:
                return <ShowdownResult />;
        }
    };

    const handleMute = () => {
        setIsMuted(!isMuted);
        toggleMute();
    };

    return (
        <div
            className={`h-screen w-screen relative flex flex-col gap-4 items-center justify-center bg-sunset bg-center bg-cover bg-no-repeat ${vignette} z-game-background`}
        >
            {renderCurrentView()}
            <div className=' z-hud-foreground absolute bottom-4 right-4'>
                <button
                    className='text-white text-2xl r flex items-center justify-center'
                    onClick={handleMute}
                >
                    {isMuted ? <MdVolumeUp /> : <MdVolumeOff />}
                </button>
            </div>
        </div>
    );
};

export default App;
