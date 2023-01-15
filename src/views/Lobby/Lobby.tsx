import { useEffect, useContext } from "react";

// types
import { GAME_STATE, GameManagerContextType } from "../../types/gameManager.d";
import { Round } from "../../types/game.d";

// state
import { GameManager } from "../../context/gameManager";

// hooks
import useMockBackend from "../../hooks/useMockBackend";

const Lobby = () => {
    const { userId, setGameState, setRounds } = useContext(
        GameManager
    ) as GameManagerContextType;

    const { postJoinShowdown, subOnShowdownReady } = useMockBackend();

    useEffect(() => {
        subOnShowdownReady(userId, (data: any) => {
            console.log(data);
            const rounds = data.rounds as Round[];
            setRounds(rounds);
            setGameState(GAME_STATE.SHOWDOWN);
        });
    }, []);

    const joinShowdown = async () => {
        try {
            const res = await postJoinShowdown(userId);
            console.log("joining res", res);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div>
            <h1>Lobby</h1>
            <div className='text-slate-50 h-min'>
                <button
                    className='bg-gray-800 px-4 py-1 rounded-md'
                    onClick={joinShowdown}
                >
                    Join Showdown
                </button>
            </div>
        </div>
    );
};

export default Lobby;
