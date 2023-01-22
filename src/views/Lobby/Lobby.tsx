import { useContext, useState } from "react";

// types
import { GAME_STATE, GameManagerContextType } from "../../types/gameManager.d";
import { Round, Showdown, Combatant } from "../../types/game.d";

// state
import { GameManager } from "../../context/gameManager";

// hooks
import useBackend from "../../hooks/useBackend";

const Lobby = () => {
    const { setGameState, setShowdownState } = useContext(
        GameManager
    ) as GameManagerContextType;

    const { joinShowdown } = useBackend(true);

    const [joining, setJoining] = useState<boolean>(false);

    const join = async () => {
        setJoining(true);
        joinShowdown((data: Showdown) => {
            console.log("showdown data", data);
            const showdownId = data.id as string;
            const rounds = data.rounds as Round[];
            const combatants = data.combatants as Combatant[];

            setShowdownState(showdownId, rounds, combatants);
            setGameState(GAME_STATE.SHOWDOWN);
            setJoining(false);
        });
    };

    return (
        <div className='z-hud-background'>
            <h1>Lobby</h1>
            {joining && <p>Joining...</p>}
            {!joining && (
                <div className='text-slate-50 h-min'>
                    <button
                        className='bg-gray-800 px-4 py-1 rounded-md'
                        onClick={join}
                    >
                        Join Showdown
                    </button>
                </div>
            )}
        </div>
    );
};

export default Lobby;
