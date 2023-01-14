import { useState, FC, FormEvent } from "react";
import { Socket } from "socket.io-client";

interface PerformanceInputProps {
    socket: Socket;
}

const PerformanceInput: FC<PerformanceInputProps> = ({ socket }) => {
    const [performanceText, setPerformanceText] = useState("");

    const submitForm = (e: FormEvent) => {
        e.preventDefault();
        socket.emit("message", performanceText);
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
