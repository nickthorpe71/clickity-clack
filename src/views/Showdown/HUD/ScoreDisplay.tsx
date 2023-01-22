import { FC } from "react";

interface ScoreDisplayProps {
    label: string;
    score: number;
}

const ScoreDisplay: FC<ScoreDisplayProps> = ({ label, score }) => {
    return (
        <div className='text-center w-28'>
            <p>{label}</p>
            <p className='text-red-600 text-8xl'>{score}</p>
        </div>
    );
};

export default ScoreDisplay;
