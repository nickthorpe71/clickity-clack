import { useState, useEffect } from "react";
import Pusher from "pusher-js";
import axios from "axios";

// components
import PerformanceInput from "./components/PerformanceInput";

const App = () => {
    const [isConnected, setIsConnected] = useState<boolean>(false);
    const [lastPong, setLastPong] = useState<string>("");

    useEffect(() => {
        // Pusher.logToConsole = true;
        // console.log(process.env.REACT_APP_PUSHER_ENV);
        // const pusher = new Pusher("a97e1f5ac552a37ff7fe", {
        //     cluster: "us2",
        // });
        // setIsConnected(pusher.connection.state === "connected");
        // const messageChannel = pusher.subscribe("messageChannel");
        // messageChannel.bind("private_channel_id", function (data: any) {
        //     console.log(data);
        //     alert(JSON.stringify(data));
        // });
        // const channel2 = pusher.subscribe("showdown-request");
        // channel2.bind("new-showdown-request", function (data: any) {
        //     alert(JSON.stringify(data));
        // });
        // console.log(pusher);
        // return () => {
        //     // pusher.unsubscribe("messageChannel");
        //     pusher.unsubscribe("showdown-request");
        // };
    }, []);

    const sendPing = async () => {
        try {
            const res = await axios.get(
                "http://tkqhyisibx.sharedwithexpose.com/api/test"
            );
            console.log("res data", res.data);
            setLastPong(res.data.test);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className='h-screen w-screen flex flex-col gap-4 items-center justify-center'>
            <div className='text-slate-50 h-min'>
                <p>Connected: {"" + isConnected}</p>
                <p>Last pong: {lastPong}</p>
                <button
                    className='bg-gray-800 px-4 py-1 rounded-md'
                    onClick={sendPing}
                >
                    Send ping
                </button>
            </div>
            <PerformanceInput />
        </div>
    );
};

export default App;
