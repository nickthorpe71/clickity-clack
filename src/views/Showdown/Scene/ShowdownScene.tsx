import { FC } from "react";

import { SHOWDOWN_STATE } from "../../../types";

interface ShowdownSceneProps {
    showdownState: SHOWDOWN_STATE;
}

const ShowdownScene: FC<ShowdownSceneProps> = ({ showdownState }) => {
    return <div>{showdownState}</div>;
};

export default ShowdownScene;
