import { useState, FormEvent, FC, useEffect } from "react";

interface PerformanceInputProps {
    technique: string;
    submitPerformance: (duration: number) => void;
}

const PerformanceInput: FC<PerformanceInputProps> = ({ submitPerformance }) => {
    const [performanceText, setPerformanceText] = useState("");
    const [startTime, setStartTime] = useState<number>(0);

    // start timer when component is mounted
    // stop timer when component is unmounted
    useEffect(() => {
        setStartTime(Date.now());
    }, []);

    const submitForm = async (e: FormEvent) => {
        e.preventDefault();
        const endTime = Date.now();
        const duration = endTime - startTime;
        submitPerformance(duration);
        setPerformanceText("");
    };

    return (
        <form onSubmit={submitForm}>
            <input
                className='bg-gray-800 h-12 w-80 px-4 py-2 rounded-md text-slate-50'
                autoFocus
                value={performanceText}
                placeholder='Perform your technique...'
                onChange={(e) => {
                    setPerformanceText(e.currentTarget.value);
                }}
            />
        </form>
    );
};

export default PerformanceInput;
