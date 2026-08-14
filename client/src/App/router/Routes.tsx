import { createBrowserRouter, Navigate } from "react-router";
import App from "../Layout/App";
import HomePage from "../../Features/home/HomePage";
import ActivityForm from "../../Features/Activities/Form/ActivityForm";
import ActivityDashboard from "../../Features/Activities/Dashboard/ActivityDashboard";
import ActivityDetailPage from "../../Features/Activities/Details/ActivityDetailPage";
import Counter from "../../Features/counter/Counter";
import TestErrors from "../../Features/errors/TestError";
import NotFound from "../../Features/errors/NotFound";
import ServerError from "../../Features/errors/ServerError";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { path: '', element: <HomePage /> },
            { path: 'activities', element: <ActivityDashboard /> },
            { path: 'activities/:id', element: <ActivityDetailPage /> },
            { path: 'createActivity', element: <ActivityForm key='create'/> },
            { path: 'manage/:id', element: <ActivityForm key='edit'/> },
            { path: 'counter', element: <Counter key='edit'/> },
            { path: 'errors', element: <TestErrors /> },
            { path: 'not-found', element: <NotFound /> },
            { path: 'server-error', element: <ServerError /> },
            { path: '*', element: <Navigate replace to='/not-found' /> }
        ]
    }
])