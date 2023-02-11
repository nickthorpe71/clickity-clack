import CharacterSelect from "./CharacterSelect";
import Lobby from "./Lobby";

const MainMenu = () => {
    return (
        <div className='z-hud-background flex flex-col h-full w-full gap-8 justify-center items-center'>
            <Lobby />
            <CharacterSelect />
        </div>
    );
};

export default MainMenu;
