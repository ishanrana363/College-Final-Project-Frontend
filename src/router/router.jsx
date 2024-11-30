import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import HomePage from './../pages/client/home-page/HomePage';


export const router = createBrowserRouter([
    {
        path : "/",
        element : <Layout></Layout>,
        children : [
            {
                path : "/",
                element : <HomePage></HomePage>
            }
        ]
    }
])