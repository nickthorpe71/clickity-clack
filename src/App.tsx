import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

// views
import MainMenu from "./views/MainMenu/MainMenu";
import Showdown from "./views/Showdown/Showdown";
import UserAccount from "./views/UserAccount";

// components
import Overlay from "./Overlay";

const vignette =
    'after:content-[""] after:absolute after:top-0 after:left-0 after:w-full after:h-full after:shadow-vignette after:z-game-midground';

const AppLayout = () => (
    <div
        className={`h-screen w-screen relative flex flex-col gap-4 items-center justify-center bg-sunset bg-center bg-cover bg-no-repeat ${vignette} z-game-background`}
    >
        <Overlay />
        <Outlet />
    </div>
);

const router = createBrowserRouter([
    {
        element: <AppLayout />,
        children: [
            {
                path: "/",
                element: <MainMenu />,
                errorElement: <div>404</div>,
            },
            {
                path: "/showdown",
                element: <Showdown />,
                errorElement: <div>404</div>,
            },
            {
                path: "/account",
                element: <UserAccount />,
                errorElement: <div>404</div>,
            },
        ],
    },
]);

const App = () => {
    return <RouterProvider router={router} />;
};

export default App;
