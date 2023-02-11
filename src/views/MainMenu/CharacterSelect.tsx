import { useContext, useState } from "react";

// types
import { GameManagerContextType } from "../../types";

// state
import { GameManager } from "../../context/gameManager";

// data
import { characters } from "../../assets/characters";

// components
import Sign from "../../components/Sign";
import SignTitle from "../../components/SignTitle";
import ImageButton from "../../components/ImageButton";

const Lobby = () => {
    const { setGameState, setShowdownState } = useContext(
        GameManager
    ) as GameManagerContextType;

    return (
        <div className='z-hud-background h-fit w-1/3 max-w-lg'>
            <Sign
                customStyle={
                    "w-full h-full p-4 text-center flex flex-col justify-center"
                }
            >
                {/* <SignTitle text='Character Select' customStyle={"mb-4"} /> */}
                <div className='flex justify-evenly items-center h-full'>
                    {Object.values(characters).map((character) => {
                        return (
                            <ImageButton
                                imageSrc={character.images.idle}
                                onClick={() => {}}
                                customStyle={
                                    "w-40 h-40 hover:bg-red-600 rounded-full"
                                }
                            />
                        );
                    })}
                </div>
            </Sign>
        </div>
    );
};

export default Lobby;
