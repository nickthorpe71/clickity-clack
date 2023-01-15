import { useState, FormEvent, FC } from "react";

interface PerformanceInputProps {
    submitPerformance: (duration: number) => void;
}

const PerformanceInput: FC<PerformanceInputProps> = ({ submitPerformance }) => {
    const [performanceText, setPerformanceText] = useState("");

    const submitForm = async (e: FormEvent) => {
        e.preventDefault();
        submitPerformance(10);
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
