import { useEffect, useState } from "react";
import Pusher from "pusher-js";

function usePusher() {
    const [pusher, setPusher] = useState<any>(null);
    const [subscriptions, setSubscriptions] = useState<string[]>([]);

    // Initialize Pusher
    useEffect(() => {
        Pusher.logToConsole = false;
        if (pusher) return;
        setPusher(
            new Pusher("a97e1f5ac552a37ff7fe", {
                cluster: "us2",
            })
        );

        // Cleanup Subscriptions
        return () => {
            subscriptions.forEach((channel) => pusher.unsubscribe(channel));
        };
    }, [pusher, subscriptions]);

    const subscribe = (
        channel: string,
        event: string,
        callback: (data: any) => void
    ) => {
        pusher.subscribe(channel).bind(event, callback);
        setSubscriptions([...subscriptions, channel]);
    };

    return { subscribe };
}

export default usePusher;
