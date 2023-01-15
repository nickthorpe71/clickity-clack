import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import GameManagerProvider from "./context/gameManager";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <React.StrictMode>
        <GameManagerProvider>
            <App />
        </GameManagerProvider>
    </React.StrictMode>
);
