import { FC, useState, useEffect, useContext, useRef } from "react";

// types
import {
    SHOWDOWN_STATE,
    GameManagerContextType,
    Character,
} from "../../../types";

// state
import { GameManager } from "../../../context/gameManager";

// components
import ShowdownFMV from "./ShowdownFMV";

// assets
import { characters } from "../../../assets/characters";

interface ShowdownSceneProps {
    showdownState: SHOWDOWN_STATE;
    winner: "me" | "opponent" | null;
}

enum CHARACTER_STATE {
    IDLE = "idle",
    ATTACK = "attack",
    WIN = "win",
    LOSE = "lose",
}

const ShowdownScene: FC<ShowdownSceneProps> = ({ showdownState, winner }) => {
    const { selectedCharacter } = useContext(
        GameManager
    ) as GameManagerContextType;

    const getRandomCharacter = (): Character => {
        return characters[
            Object.keys(characters)[
                Math.floor(Math.random() * Object.keys(characters).length)
            ]
        ];
    };

    const opponentCharacter = useRef<Character>(
        characters[
            Object.keys(characters)[
                Math.floor(Math.random() * Object.keys(characters).length)
            ]
        ]
    );
    const [opponentCharacterState, setOpponentCharacterState] =
        useState<CHARACTER_STATE>(CHARACTER_STATE.IDLE);

    const myCharacter = useRef<Character>(
        selectedCharacter ? selectedCharacter : getRandomCharacter()
    );
    const [myCharacterState, setMyCharacterState] = useState<CHARACTER_STATE>(
        CHARACTER_STATE.IDLE
    );

    useEffect(() => {
        switch (showdownState) {
            case SHOWDOWN_STATE.ROUND_FMV:
                setMyCharacterState(CHARACTER_STATE.IDLE);
                setOpponentCharacterState(CHARACTER_STATE.IDLE);
                break;
            case SHOWDOWN_STATE.WAITING_FOR_OPPONENT:
                setMyCharacterState(CHARACTER_STATE.ATTACK);
                setOpponentCharacterState(CHARACTER_STATE.ATTACK);
                break;
            case SHOWDOWN_STATE.ROUND_COMPLETED ||
                SHOWDOWN_STATE.SHOWDOWN_COMPLETED:
                setMyCharacterState(
                    winner === "me" ? CHARACTER_STATE.WIN : CHARACTER_STATE.LOSE
                );
                setOpponentCharacterState(
                    winner === "opponent"
                        ? CHARACTER_STATE.WIN
                        : CHARACTER_STATE.LOSE
                );
                break;
            default:
                setMyCharacterState(CHARACTER_STATE.IDLE);
                setOpponentCharacterState(CHARACTER_STATE.IDLE);
                break;
        }
    }, [showdownState, winner]);

    const getCharacterPosition = () => {
        return myCharacterState === CHARACTER_STATE.IDLE
            ? "px-[16vw]"
            : "flex-row-reverse px-[32vw]";
    };

    return (
        <div
            className={`w-full flex h-4/6 justify-between items-end z-game-midground py-12 ${getCharacterPosition()}`}
        >
            <img
                className='max-h-52 scale-x-[-1] select-none'
                src={
                    characters[myCharacter.current.id].images[myCharacterState]
                }
                alt={myCharacter.current.name}
            />
            <img
                className='max-h-52 select-none'
                src={
                    characters[opponentCharacter.current.id].images[
                        opponentCharacterState
                    ]
                }
                alt={opponentCharacter.current.name}
            />
            {showdownState === SHOWDOWN_STATE.ROUND_FMV && (
                <ShowdownFMV
                    characterLeft={myCharacter.current.images.closeUpLeft}
                    characterRight={
                        opponentCharacter.current.images.closeUpRight
                    }
                />
            )}
        </div>
    );
};

export default ShowdownScene;
