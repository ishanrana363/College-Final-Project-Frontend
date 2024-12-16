import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import HomePage from './../pages/client/home-page/HomePage';
import CategoryProduct from "../pages/client/categoy-product-page/CategoryProduct";
import LoginForm from "../components/login/LoginForm";
import SignUpForm from "../components/registration/SignUpForm";
import Shop from "../pages/client/shop-page/Shop";
import SingleProduct from "../pages/client/single-product/SingleProduct";
import PaymentSuccess from "../components/payment/PaymentSuccess";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout></Layout>,
        children: [
            {
                path: "/",
                element: <HomePage></HomePage>
            },
            {
                path: "categories/:categoryName",
                element: <CategoryProduct></CategoryProduct>
            },
            {
                path: "shop",
                element: <Shop></Shop>
            },
            {
                path: "product-details/:id",
                element: <SingleProduct></SingleProduct>
            },
            {
                path: "/success",
                element: <PaymentSuccess></PaymentSuccess>
            }
        ]
    },
    {
        path: "/login",
        element: <LoginForm></LoginForm>
    },
    {
        path: "/sign-up",
        element: <SignUpForm></SignUpForm>
    },
    {
        path : "/dashboard/",
        element : <div>Dahsboard</div>,
        children : [
            // admin routs start
            {
                path : "manage-items",
                element : <div>Manage Items</div>
            },
            {
                path : "all-orders",
                element : <div>All orders</div>
            }
        ]
    },
    

])