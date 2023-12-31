import { createBrowserRouter } from 'react-router-dom'
import PublicRoute from "./route-guards/public-route/PublicRoute.js";
import PrivateRoute from './route-guards/private-route/PrivateRoute.js';
import PublicLayout from "./layouts/public-layout/PublicLayout.js";
import { ROUTE_HOME, ROUTE_LOGIN, ROUTE_SIGNUP,ROUTE_FORGET_PASSWORD, ROUTE_RESET_PASSWORD, ROUTE_SEND_MESSAGE, ROUTE_SHOW_ALL_CHATS } from "./utilities/routeNames.js";
import SignUp from './public/signUp/signUp.js';
import LogIn from './public/login/logIn.js';
import ForgetPssw from './public/password/forgPssw.js';
import ResetPasswordPage from './public/password/resetPssw.js';
import Welcome from './private/welcome/welcome.js';
import SendMessage from './private/messages/sendMessage/sendMessage.js';
import ShowAllChats from './private/messages/messageHistory/messageHistory.js';

const router = createBrowserRouter(
    [
        {
            element: <PublicRoute />,
            children: [
                {
                    element: <PublicLayout />,
                    children: [
                        {
                            path: ROUTE_LOGIN,
                            element: <LogIn />,
                        }
                    ]
                }
            ],
        },
        {
            element: <PublicRoute />,
            children: [
                {
                    element: <PublicLayout />,
                    children: [
                        {
                            path: ROUTE_SIGNUP,
                            element: <SignUp/>,
                        }
                    ]
                }
            ],
        },
        {
            element: <PublicRoute />,
            children: [
                {
                    element: <PublicLayout />,
                    children: [
                        {
                            path: ROUTE_FORGET_PASSWORD,
                            element: <ForgetPssw/>,
                        }
                    ]
                }
            ],
        },
        {
            element: <PublicRoute />,
            children: [
                {
                    element: <PublicLayout />,
                    children: [
                        {
                            path: ROUTE_RESET_PASSWORD,
                            element: <ResetPasswordPage/>,
                        }
                    ]
                }
            ],
        },
        {
            element: <PrivateRoute />,
            children: [
                {
                    element: <PublicLayout />,
                    children: [
                        {
                            path: ROUTE_HOME,
                            element: <Welcome/>,
                        }
                    ]
                }
            ],
        },
        {
            element: <PrivateRoute />,
            children: [
                {
                    element: <PublicLayout />,
                    children: [
                        {
                            path: ROUTE_SEND_MESSAGE,
                            element: <SendMessage/>,
                        }
                    ]
                }
            ],
        },
        {
            element: <PrivateRoute />,
            children: [
                {
                    element: <PublicLayout />,
                    children: [
                        {
                            path: ROUTE_SHOW_ALL_CHATS,
                            element: < ShowAllChats/>,
                        }
                    ]
                }
            ],
        },
    ],
    {
        basename: '/',
    }
)

export default router
 