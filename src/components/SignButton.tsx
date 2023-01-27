import { FC } from "react";

interface SignButtonProps {
    text: string;
    onClick: () => void;
    style?: string;
}

const SignButton: FC<SignButtonProps> = ({ text, onClick, style = "" }) => {
    return (
        <button
            className={`font-semibold text-slate-50 select-none ${style}`}
            onClick={onClick}
        >
            {text}
        </button>
    );
};

export default SignButton;
