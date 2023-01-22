import { FC } from "react";

interface SignTitleProps {
    text: string;
    style?: string;
}

const SignTitle: FC<SignTitleProps> = ({ text, style = "" }) => {
    return <h1 className={`text-red-500 text-4xl ${style}`}>{text}</h1>;
};

export default SignTitle;
