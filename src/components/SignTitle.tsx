import { FC } from "react";

interface SignTitleProps {
    text: string;
    customStyle?: string;
}

const SignTitle: FC<SignTitleProps> = ({ text, customStyle = "" }) => {
    return (
        <h1 className={`text-red-500 text-4xl select-none mb-4 ${customStyle}`}>
            {text}
        </h1>
    );
};

export default SignTitle;
