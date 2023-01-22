import { useState, FormEvent, FC, useEffect } from "react";

interface PerformanceInputProps {
    technique: string;
    submitPerformance: (duration: number) => void;
}

const PerformanceInput: FC<PerformanceInputProps> = ({
    technique,
    submitPerformance,
}) => {
    const [performanceText, setPerformanceText] = useState("");
    const [startTime, setStartTime] = useState<number>(0);

    useEffect(() => {
        setStartTime(Date.now());
    }, []);

    const submitTechnique = () => {
        const endTime = Date.now();
        const duration = endTime - startTime;
        submitPerformance(duration);
        setPerformanceText("");
    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPerformanceText(e.currentTarget.value);
        if (e.currentTarget.value === technique) submitTechnique();
    };

    return (
        <div>
            <input
                className='bg-gray-800 h-12 w-80 px-4 py-2 rounded-md text-slate-50'
                autoFocus
                value={performanceText}
                placeholder='Perform your technique...'
                onChange={onInputChange}
            />
        </div>
    );
};

export default PerformanceInput;
