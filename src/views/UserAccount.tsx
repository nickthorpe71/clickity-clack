import { useNavigate } from "react-router-dom";

// components
import Sign from "../components/Sign";
import SignTitle from "../components/SignTitle";
import SignButton from "../components/SignButton";

const UserSettings = () => {
    const navigate = useNavigate();

    return (
        <div className='z-hud-background flex flex-col h-full w-full gap-8 justify-center items-center'>
            <Sign customStyle='p-10'>
                <SignTitle text='User Settings' />
                <SignButton
                    text='Back to main menu'
                    onClick={() => navigate("/")}
                />
            </Sign>
        </div>
    );
};

export default UserSettings;
