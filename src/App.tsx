import { useContext } from "react";

// types
import { GAME_STATE, GameManagerContextType } from "./types/gameManager.d";

// state
import { GameManager } from "./context/gameManager";

// views
import Lobby from "./views/Lobby/Lobby";
import Showdown from "./views/Showdown/Showdown";
import ShowdownResult from "./views/ShowdownResult/ShowdownResult";

const App = () => {
    const { gameState } = useContext(GameManager) as GameManagerContextType;

    const renderCurrentView = () => {
        switch (gameState) {
            case GAME_STATE.LOBBY:
                return <Lobby />;
            case GAME_STATE.SHOWDOWN:
                return <Showdown />;
            case GAME_STATE.SHOWDOWN_RESULT:
                return <ShowdownResult />;
        }
    };

    return (
        <div className='h-screen w-screen flex flex-col gap-4 items-center justify-center'>
            {renderCurrentView()}
        </div>
    );
};

export default App;

// Pusher stuff

// import Pusher from "pusher-js";

// const pusher = new Pusher("a97e1f5ac552a37ff7fe", {
//     cluster: "us2",
// });

// useEffect(() => {
//     // Pusher.logToConsole = true;
//     // console.log(process.env.REACT_APP_PUSHER_ENV);
//     // const pusher = new Pusher("a97e1f5ac552a37ff7fe", {
//     //     cluster: "us2",
//     // });
//     // setIsConnected(pusher.connection.state === "connected");
//     // const messageChannel = pusher.subscribe("messageChannel");
//     // messageChannel.bind("private_channel_id", function (data: any) {
//     //     console.log(data);
//     //     alert(JSON.stringify(data));
//     // });
//     // const channel2 = pusher.subscribe("showdown-request");
//     // channel2.bind("new-showdown-request", function (data: any) {
//     //     alert(JSON.stringify(data));
//     // });
//     // console.log(pusher);
//     // return () => {
//     //     // pusher.unsubscribe("messageChannel");
//     //     pusher.unsubscribe("showdown-request");
//     // };
// }, []);
