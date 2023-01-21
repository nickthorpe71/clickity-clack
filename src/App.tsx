import { useContext } from "react";

// types
import { GAME_STATE, GameManagerContextType } from "./types/gameManager.d";

// state
import { GameManager } from "./context/gameManager";

// views
import Lobby from "./views/Lobby/Lobby";
import Showdown from "./views/Showdown/Showdown";
import ShowdownResult from "./views/ShowdownResult/ShowdownResult";

const vignette =
    'after:content-[""] after:absolute after:top-0 after:left-0 after:w-full after:h-full after:shadow-vignette';

const App = () => {
    const { gameState } = useContext(GameManager) as GameManagerContextType;

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

    return (
        <div
            className={`h-screen w-screen flex flex-col gap-4 items-center justify-center bg-sunset bg-center bg-cover bg-no-repeat ${vignette}`}
        >
            {renderCurrentView()}
        </div>
    );
};

export default App;
