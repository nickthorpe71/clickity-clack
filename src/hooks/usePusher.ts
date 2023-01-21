import { useEffect, useRef } from "react";
import Pusher from "pusher-js";
// Pusher.logToConsole = false;

function usePusher() {
    const pusher = useRef<any>(null);
    const subscriptions = useRef<string[]>([]);

    // Initialize Pusher
    useEffect(() => {
        if (pusher.current) return;
        try {
            const newPusher = new Pusher("a97e1f5ac552a37ff7fe", {
                cluster: "us2",
            });
            pusher.current = newPusher;
        } catch (err) {
            console.error(err);
        }

        return () => {
            subscriptions.current.forEach((channel) =>
                pusher.current.unsubscribe(channel)
            );
        };
    }, []);

    const subscribe = (
        channel: string,
        event: string,
        callback: (data: any) => void
    ) => {
        try {
            pusher.current.subscribe(channel).bind(event, callback);
            subscriptions.current = [...subscriptions.current, channel];
        } catch (err) {
            console.error(err);
        }
    };

    return { subscribe };
}

export default usePusher;
