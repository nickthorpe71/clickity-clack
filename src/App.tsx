import { useState, useEffect } from "react";
import io from "socket.io-client";

// components
import PerformanceInput from "./components/PerformanceInput";

interface Props {}

const socket = io();

const App = ({}: Props) => {
    const [isConnected, setIsConnected] = useState<boolean>(socket.connected);
    const [lastPong, setLastPong] = useState<string>("");

    useEffect(() => {
        socket.on("connect", () => {
            setIsConnected(true);
        });

        socket.on("disconnect", () => {
            setIsConnected(false);
        });

        socket.on("pong", () => {
            setLastPong(new Date().toISOString());
        });

        return () => {
            socket.off("connect");
            socket.off("disconnect");
            socket.off("pong");
        };
    }, []);

    const sendPing = () => {
        socket.emit("ping");
    };

    return (
        <div className='h-screen w-screen flex flex-col gap-4 items-center justify-center'>
            <div className='text-slate-50 h-min'>
                <p>Connected: {"" + isConnected}</p>
                <p>Last pong: {lastPong || "-"}</p>
                <button
                    className='bg-gray-800 px-4 py-1 rounded-md'
                    onClick={sendPing}
                >
                    Send ping
                </button>
            </div>
            <PerformanceInput socket={socket} />
        </div>
    );
};

export default App;
