import {
    FC,
    ReactNode,
    createContext,
    useRef,
    useContext,
    useEffect,
} from "react";
import {
    SoundManagerContextType,
    GameManagerContextType,
    GAME_STATE,
} from "../types";
import { GameManager } from "./gameManager";

// assets
// @ts-ignore
import lobby from "../assets/sounds/lobby.mp3";

// @ts-ignore
import fmv from "../assets/sounds/fmv.mp3";

export const SoundManager = createContext<SoundManagerContextType | null>(null);

interface SoundManagerProps {
    children: ReactNode;
}

const SoundManagerProvider: FC<SoundManagerProps> = ({ children }) => {
    const { gameState } = useContext(GameManager) as GameManagerContextType;
    const backgroundTrack = useRef<HTMLAudioElement | null>(new Audio(lobby));
    const isMuted = useRef<boolean>(true);

    const musicMap: { [key: string]: HTMLAudioElement } = {
        [GAME_STATE.LOBBY]: new Audio(lobby),
    };

    const sfxMap: { [key: string]: HTMLAudioElement } = {
        fmv: new Audio(fmv),
    };

    // Automatically change the background music when the game state changes
    // to match the current game state
    useEffect(() => {
        playMusic();
    }, [gameState]);

    const playMusic = () => {
        if (!backgroundTrack.current) return;
        if (!musicMap[gameState]) {
            backgroundTrack.current.pause();
            return;
        }
        backgroundTrack.current = musicMap[gameState];
        backgroundTrack.current.currentTime = 0;
        backgroundTrack.current.volume = 0.4;
        backgroundTrack.current.loop = true;
        if (!isMuted.current) backgroundTrack.current.play();
    };

    const toggleMute = () => {
        isMuted.current = !isMuted.current;
        if (backgroundTrack.current) {
            if (isMuted.current) {
                backgroundTrack.current.pause();
            } else {
                playMusic();
            }
        }

        Object.keys(sfxMap).forEach((sfx) => {
            if (isMuted.current) sfxMap[sfx].pause();
        });
    };

    const playSFX = (sfx: string) => {
        if (isMuted.current || !sfxMap[sfx]) return;
        sfxMap[sfx].currentTime = 0;
        sfxMap[sfx].volume = 0.8;
        sfxMap[sfx].play();
    };

    return (
        <SoundManager.Provider
            value={{
                isMuted: isMuted.current,
                toggleMute,
                playSFX,
            }}
        >
            {children}
        </SoundManager.Provider>
    );
};

export default SoundManagerProvider;
