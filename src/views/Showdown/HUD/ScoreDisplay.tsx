import { FC } from "react";

interface ScoreDisplayProps {
    label: string;
    score: number;
}

const ScoreDisplay: FC<ScoreDisplayProps> = ({ label, score }) => {
    return (
        <div className='text-center'>
            <p>{label}</p>
            <p>{score}</p>
        </div>
    );
};

export default ScoreDisplay;
