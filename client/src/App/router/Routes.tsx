import { createBrowserRouter } from "react-router";
import App from "../Layout/App";
import HomePage from "../../Features/home/HomePage";
import ActivityForm from "../../Features/Activities/Form/ActivityForm";
import ActivityDashboard from "../../Features/Activities/Dashboard/ActivityDashboard";
import ActivityDetailPage from "../../Features/Activities/Details/ActivityDetailPage";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { path: '', element: <HomePage /> },
            { path: 'activities', element: <ActivityDashboard /> },
            { path: 'activities/:id', element: <ActivityDetailPage /> },
            { path: 'createActivity', element: <ActivityForm key='create'/> },
            { path: 'manage/:id', element: <ActivityForm key='edit'/> }
        ]
    }
])