import { FC } from "react";

interface ImageButtonProps {
    imageSrc: string;
    onClick: () => void;
    customStyle?: string;
}

const ImageButton: FC<ImageButtonProps> = ({
    onClick,
    imageSrc,
    customStyle = "",
}) => {
    return (
        <button className={`select-none ${customStyle}`} onClick={onClick}>
            <img src={imageSrc} />
        </button>
    );
};

export default ImageButton;
