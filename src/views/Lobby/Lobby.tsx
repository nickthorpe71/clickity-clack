import { useContext, useState } from "react";

// types
import { GAME_STATE, GameManagerContextType } from "../../types/gameManager.d";
import { Round, Showdown, Combatant } from "../../types/game.d";

// state
import { GameManager } from "../../context/gameManager";

// hooks
import useBackend from "../../hooks/useBackend";

// components
import Sign from "../../components/Sign";
import SignTitle from "../../components/SignTitle";
import SignButton from "../../components/SignButton";

const Lobby = () => {
    const { setGameState, setShowdownState } = useContext(
        GameManager
    ) as GameManagerContextType;

    const { joinShowdown } = useBackend(true);

    const [joining, setJoining] = useState<boolean>(false);

    const join = async () => {
        setJoining(true);
        joinShowdown((data: Showdown) => {
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
            <Sign style={"p-20"}>
                <SignTitle text='Lobby' />
                {joining && <p>Joining...</p>}
                {!joining && <SignButton text='Join Showdown' onClick={join} />}
            </Sign>
        </div>
    );
};

export default Lobby;
