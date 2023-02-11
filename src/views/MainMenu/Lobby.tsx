import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

// types
import {
    Round,
    Showdown,
    Combatant,
    GAME_STATE,
    GameManagerContextType,
} from "../../types";

// state
import { GameManager } from "../../context/gameManager";

// hooks
import useBackend from "../../hooks/useBackend";

// components
import Sign from "../../components/Sign";
import SignTitle from "../../components/SignTitle";
import SignButton from "../../components/SignButton";

const Lobby = () => {
    const { setGameState, setShowdownState, setIsAI } = useContext(
        GameManager
    ) as GameManagerContextType;
    const navigate = useNavigate();

    const { joinShowdown } = useBackend();

    const [joining, setJoining] = useState<boolean>(false);

    const join = async (isAI: boolean) => {
        setIsAI(isAI);
        setJoining(true);
        joinShowdown((data: Showdown) => {
            console.log("joinedShowdown", data);

            const showdownId = data.id as string;
            const rounds = data.rounds as Round[];
            const combatants = data.combatants as Combatant[];

            setShowdownState(showdownId, rounds, combatants);
            setGameState(GAME_STATE.SHOWDOWN);
            navigate("/showdown");
            setJoining(false);
        }, isAI);
    };

    return (
        <Sign
            customStyle={
                "w-1/3 h-1/4 max-w-lg max-h-md p-4 pb-6 text-center flex flex-col justify-center"
            }
        >
            <SignTitle text='Lobby' />
            {joining && <p>Joining...</p>}
            <div className='flex flex-col'>
                {!joining && (
                    <SignButton
                        text='Join Showdown'
                        onClick={() => join(false)}
                    />
                )}
                {!joining && (
                    <SignButton text='Play AI' onClick={() => join(true)} />
                )}
            </div>
        </Sign>
    );
};

export default Lobby;
