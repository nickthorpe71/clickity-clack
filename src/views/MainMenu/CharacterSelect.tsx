import { useContext } from "react";

// types
import { GameManagerContextType } from "../../types";

// state
import { GameManager } from "../../context/gameManager";

// data
import { characters } from "../../assets/characters";

// components
import Sign from "../../components/Sign";
import ImageButton from "../../components/ImageButton";

const Lobby = () => {
    const { setSelectedCharacter, selectedCharacter } = useContext(
        GameManager
    ) as GameManagerContextType;

    const getSelectedStyle = (characterId: string): string => {
        return selectedCharacter && selectedCharacter.id === characterId
            ? "bg-red-500"
            : "";
    };

    const handleCharacterSelect = (characterId: string) => {
        setSelectedCharacter(characters[characterId]);
    };

    return (
        <div className='z-hud-background h-fit w-1/3 max-w-lg'>
            <Sign
                customStyle={
                    "w-full h-full p-4 text-center flex flex-col justify-center"
                }
            >
                <div className='flex justify-evenly items-center h-full'>
                    {Object.values(characters).map((character) => {
                        return (
                            <ImageButton
                                key={character.id}
                                imageSrc={character.images.idle}
                                onClick={() =>
                                    handleCharacterSelect(character.id)
                                }
                                customStyle={`w-40 h-40 hover:bg-red-600 rounded-full ${getSelectedStyle(
                                    character.id
                                )}`}
                            />
                        );
                    })}
                </div>
            </Sign>
        </div>
    );
};

export default Lobby;
