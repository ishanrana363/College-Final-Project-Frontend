import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import HomePage from './../pages/client/home-page/HomePage';
import CategoryProduct from "../pages/client/categoy-product-page/CategoryProduct";
import LoginForm from "../components/login/LoginForm";
import SignUpForm from "../components/registration/SignUpForm";
import Shop from "../pages/client/shop-page/Shop";
import SingleProduct from "../pages/client/single-product/SingleProduct";


export const router = createBrowserRouter([
    {
        path : "/",
        element : <Layout></Layout>,
        children : [
            {
                path : "/",
                element : <HomePage></HomePage>
            },
            {
                path : "categories/:categoryName",
                element : <CategoryProduct></CategoryProduct>
            },
            {
                path : "shop",
                element : <Shop></Shop>
            },
            {
                path : "product-details/:id",
                element : <SingleProduct></SingleProduct>
            }
        ]
    },
    {
        path : "/login",
        element : <LoginForm></LoginForm>
    },
    {
        path :"/sign-up",
        element : <SignUpForm></SignUpForm>
    }
])