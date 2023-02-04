import { FC } from "react";

interface SignButtonProps {
    text: string;
    onClick: () => void;
    customStyle?: string;
}

const SignButton: FC<SignButtonProps> = ({
    text,
    onClick,
    customStyle = "",
}) => {
    return (
        <button
            className={`font-semibold text-slate-50 select-none ${customStyle}`}
            onClick={onClick}
        >
            {text}
        </button>
    );
};

export default SignButton;
