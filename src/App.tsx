import { useContext, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// types
import { SoundManagerContextType } from "./types/";

// state
import { SoundManager } from "./context/soundManager";

// views
import MainMenu from "./views/MainMenu/MainMenu";
import Showdown from "./views/Showdown/Showdown";

// assets
import { MdVolumeUp, MdVolumeOff } from "react-icons/md";
import { BsFillBookFill } from "react-icons/bs";

const vignette =
    'after:content-[""] after:absolute after:top-0 after:left-0 after:w-full after:h-full after:shadow-vignette after:z-game-midground';

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainMenu />,
        errorElement: <div>404</div>,
    },
    {
        path: "/showdown",
        element: <Showdown />,
        errorElement: <div>404</div>,
    },
]);

const App = () => {
    const { toggleMute } = useContext(SoundManager) as SoundManagerContextType;
    const [isMuted, setIsMuted] = useState<boolean>(false);
    const [isStoryOpen, setIsStoryOpen] = useState<boolean>(false);

    const handleMute = () => {
        setIsMuted(!isMuted);
        toggleMute();
    };

    const toggleStory = () => {
        setIsStoryOpen(!isStoryOpen);
    };

    return (
        <div
            className={`h-screen w-screen relative flex flex-col gap-4 items-center justify-center bg-sunset bg-center bg-cover bg-no-repeat ${vignette} z-game-background`}
        >
            <RouterProvider router={router} />
            <div className=' z-hud-foreground absolute bottom-4 right-4'>
                <button
                    className='text-white text-2xl r flex items-center justify-center'
                    onClick={handleMute}
                >
                    {isMuted ? <MdVolumeUp /> : <MdVolumeOff />}
                </button>
            </div>
            <div className=' z-hud-foreground absolute bottom-12 right-4'>
                <button
                    className='text-white text-2xl r flex items-center justify-center'
                    onClick={toggleStory}
                >
                    <BsFillBookFill />
                </button>
            </div>
            {isStoryOpen && (
                <div className='absolute bottom-20 right-4 w-80 bg-black bg-opacity-50 flex align-middle justify-center z-hud-foreground'>
                    <p className='h-1/2 py-12 px-6'>
                        Long ago, two clans warred over an adjoining piece of
                        land. With both clans virtually wiped out, two great
                        warriors stand face to face in the bloody plains as the
                        sun rises on this day which could be their last. One of
                        them a samurai who smiles in the face of death, the
                        other a blade master who has seen enough death that she
                        no longer smiles at all...
                    </p>
                </div>
            )}
        </div>
    );
};

export default App;
