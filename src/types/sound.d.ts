export type SoundManagerContextType = {
    isMuted: boolean;
    toggleMute: () => void;
    playSFX: (name: string) => void;
};
