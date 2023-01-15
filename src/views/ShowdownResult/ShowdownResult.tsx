import { useContext } from "react";

// types
import { GAME_STATE, GameManagerContextType } from "../../types/gameManager.d";

// state
import { GameManager } from "../../context/gameManager";

const ShowdownResult = () => {
    const { setGameState } = useContext(GameManager) as GameManagerContextType;

    return (
        <div>
            <h1>Showdown Result</h1>
            <button
                className='bg-gray-800 px-4 py-1 rounded-md'
                onClick={() => setGameState(GAME_STATE.LOBBY)}
            >
                Back to Lobby
            </button>
        </div>
    );
};

export default ShowdownResult;
