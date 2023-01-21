import { useContext } from "react";

// types
import { GAME_STATE, GameManagerContextType } from "../../types/gameManager.d";
import { Round } from "../../types/game.d";

// state
import { GameManager } from "../../context/gameManager";

// hooks
import useBackend from "../../hooks/useBackend";

const Lobby = () => {
    const { userId, setGameState, setShowdownState } = useContext(
        GameManager
    ) as GameManagerContextType;

    const { joinShowdown } = useBackend();

    const join = async () => {
        joinShowdown(userId, (data: any) => {
            const showdownId = data.id as string;
            const rounds = data.rounds as Round[];
            const combatants = data.combatants as string[];

            setShowdownState(showdownId, rounds, combatants);
            setGameState(GAME_STATE.SHOWDOWN);
        });
    };

    return (
        <div>
            <h1>Lobby</h1>
            <div className='text-slate-50 h-min'>
                <button
                    className='bg-gray-800 px-4 py-1 rounded-md'
                    onClick={join}
                >
                    Join Showdown
                </button>
            </div>
        </div>
    );
};

export default Lobby;
