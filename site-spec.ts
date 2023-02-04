interface Component {
    name?: string;
    path: string;
    description?: string;
    states: State[];
}

interface State {
    name: string;
    description?: string;
    children?: Component[];
    behaviors?: Behavior[];
}

interface Behavior {
    name: string;
    description: string;
    triggerType: "onClick" | "onStateChange" | "onHover" | "onFocus" | string;
    targetComponentPath: string;
    targetState: string;
}

const joinShowdown: Behavior = {
    name: "join showdown",
    description: "The behavior that allows users to join a showdown",
    triggerType: "onClick",
    targetComponentPath: "clickityClack",
    targetState: "showdown",
};

const standardButtonHover: Behavior = {
    name: "buttonHover",
    description:
        "The behavior that changes the color of a button when the user hovers over it",
    triggerType: "onHover",
    targetComponentPath: "reusable/standardButton",
    targetState: "hover",
};

const standardButtonUnHover: Behavior = {
    name: "buttonUnHover",
    description:
        "The behavior that changes the color of a button when the user stops hovering over it",
    triggerType: "onMouseExit",
    targetComponentPath: "reusable/standardButton",
    targetState: "default",
};

const standardButton: Component = {
    path: "reusable/standardButton",
    description: "A standard button component",
    states: [
        {
            name: "default",
            description: "The default state of the button",
            behaviors: [standardButtonHover],
        },
        {
            name: "hover",
            description: "The state of the button when the user hovers over it",
            behaviors: [standardButtonUnHover],
        },
    ],
};

const lobbyMenu: Component = {
    path: "clickityClack/lobby/menu",
    description: "The menu component",
    states: [
        {
            name: "default",
            description: "The default state of the menu",
            children: [
                {
                    path: "clickityClack/lobby/menu/header",
                    description: "The header of the menu",
                    states: [
                        {
                            name: "default",
                            description: "The default state of the menu header",
                        },
                    ],
                },
                {
                    path: "clickityClack/lobby/menu/joinShowdownButton",
                    description:
                        "The button that allows users to join a showdown",
                    states: [
                        {
                            name: "default",
                            description:
                                "The default state of the join showdown button",
                            children: [standardButton],
                            behaviors: [joinShowdown],
                        },
                    ],
                },
            ],
        },
    ],
};

const lobby: Component = {
    path: "clickityClack/lobby",
    description: "The lobby component",
    states: [
        {
            name: "default",
            description: "The default state of the lobby",
            children: [lobbyMenu],
        },
    ],
};

const clickityClack: Component = {
    path: "clickityClack",
    description: "The root component of the site",
    states: [
        {
            name: "lobby",
            description:
                "The default state of the site. A lobby where users can join a showdown",
            children: [lobby],
        },
        {
            name: "showdown",
            description: "The state of the site when a showdown is active",
            children: [],
        },
    ],
};
