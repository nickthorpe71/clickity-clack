import { useState, useCallback, FC, useEffect } from "react";

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

    const onInputChange = useCallback((e: KeyboardEvent) => {
        const newChar = e.key;
        if (newChar === "Backspace") {
            setPerformanceText((performanceText) =>
                performanceText.slice(0, -1)
            );
            return;
        }
        if (!isValidChar(newChar)) return;
        setPerformanceText((performanceText) => `${performanceText}${newChar}`);
    }, []);

    useEffect(() => {
        setStartTime(Date.now());

        //wait 60 seconds then submit a 60sec performance
        const timeoutCheckTimer = setTimeout(() => {
            if (performanceText !== technique) submitTechnique();
        }, 60000);

        return () => {
            clearTimeout(timeoutCheckTimer);
        };
    }, []);

    useEffect(() => {
        document.addEventListener("keydown", onInputChange);

        return () => {
            document.removeEventListener("keydown", onInputChange);
        };
    }, [onInputChange]);

    useEffect(() => {
        if (performanceText === technique) submitTechnique();
    }, [performanceText]);

    const submitTechnique = () => {
        const endTime = Date.now();
        const duration = endTime - startTime;
        submitPerformance(duration);
        setPerformanceText("");
    };

    const isValidChar = (c: string) => c.length === 1;

    return (
        <div className='bg-orange-300 flex justify-center w-md max-w-xl rounded-md text-slate-900'>
            <p className='text-3xl leading-10 text-center align-middle font-bold py-12 px-8 select-none'>
                {technique.split("").map((char: string, index: number) => (
                    <span
                        key={`${char}-${index}`}
                        className={
                            performanceText.length - 1 >= index &&
                            char === performanceText[index]
                                ? "bg-green-400"
                                : performanceText.length - 1 >= index
                                ? "bg-red-500"
                                : ""
                        }
                    >
                        {char}
                    </span>
                ))}
            </p>
        </div>
    );
};

export default PerformanceInput;
