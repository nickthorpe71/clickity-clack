import { FC } from "react";

interface SignProps {
    style?: string;
    children: React.ReactNode;
}

const Sign: FC<SignProps> = ({ style = "", children }) => {
    return (
        <div
            className={`bg-orange-300 border-8 border-t-red-600 border-r-red-800 border-b-red-900 border-l-red-700 shadow-lg shadow-stone-900 ${style}`}
        >
            {children}
        </div>
    );
};

export default Sign;
