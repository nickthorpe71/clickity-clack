import { FC } from "react";

interface SignTitleProps {
    text: string;
    customStyle?: string;
}

const SignTitle: FC<SignTitleProps> = ({ text, customStyle = "" }) => {
    return (
        <h1 className={`text-red-500 text-4xl select-none ${customStyle}`}>
            {text}
        </h1>
    );
};

export default SignTitle;
