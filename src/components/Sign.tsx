import { FC } from "react";

interface SignProps {
    style?: string;
    children: React.ReactNode;
}

const Sign: FC<SignProps> = ({ style = "", children }) => {
    return (
        <div
            className={`bg-orange-300 border-8 border-t-orange-600 border-r-orange-800 border-b-orange-900 border-l-orange-700 shadow-lg shadow-stone-900 ${style}`}
        >
            {children}
        </div>
    );
};

export default Sign;
