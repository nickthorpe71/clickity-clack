import { useState, FormEvent, ReactNode } from "react";
import api from "../services/http";

const PerformanceInput = () => {
    const [performanceText, setPerformanceText] = useState("");

    const submitForm = async (e: FormEvent) => {
        e.preventDefault();
        const res = await api.get("/api/test");
        console.log(res);
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
