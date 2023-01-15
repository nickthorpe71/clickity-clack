import { useEffect, useContext } from "react";

// types
import { GAME_STATE, GameManagerContextType } from "../../types/gameManager.d";

// state
import { GameManager } from "../../context/gameManager";

// hooks
import useMockBackend from "../../hooks/useMockBackend";

// components
import PerformanceInput from "./PerformanceInput";

const Showdown = () => {
    const { userId, setGameState } = useContext(
        GameManager
    ) as GameManagerContextType;

    const { subOnRoundComplete, postSubmitPerformance } = useMockBackend();

    useEffect(() => {
        subOnRoundComplete(userId, (data: any) => {
            console.log(data);
        });
    }, []);

    const submitPerformance = async (duration: number) => {
        try {
            const res = await postSubmitPerformance(
                userId,
                duration,
                "asd",
                "dsa"
            );
            console.log("submitting res", res);
        } catch (e) {
            console.log(e);
        }
    };

    const endShowdown = () => {
        setGameState(GAME_STATE.SHOWDOWN_RESULT);
    };

    return (
        <div>
            <h1>Showdown</h1>
            <PerformanceInput submitPerformance={submitPerformance} />
        </div>
    );
};

export default Showdown;
