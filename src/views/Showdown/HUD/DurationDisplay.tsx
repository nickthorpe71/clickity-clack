import { FC } from "react";

interface DurationDisplayProps {
    duration: number;
    winner: boolean;
}

const DurationDisplay: FC<DurationDisplayProps> = ({ duration, winner }) => {
    return (
        <p
            className={`
                ${
                    winner ? "text-green-500" : "text-amber-500"
                } text-2xl w-28 text-center
            `}
        >
            {duration / 1000}
        </p>
    );
};

export default DurationDisplay;
