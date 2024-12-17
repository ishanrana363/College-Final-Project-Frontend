import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import HomePage from './../pages/client/home-page/HomePage';
import CategoryProduct from "../pages/client/categoy-product-page/CategoryProduct";
import LoginForm from "../components/login/LoginForm";
import SignUpForm from "../components/registration/SignUpForm";
import Shop from "../pages/client/shop-page/Shop";
import SingleProduct from "../pages/client/single-product/SingleProduct";
import PaymentSuccess from "../components/payment/PaymentSuccess";
import DashboardLayout from "../dashboard-layout/DashboardLayout";
import ManageItem from "../pages/admin/manage-item-page/ManageItem";
import AllOrder from "../pages/admin/all-order-page/AllOrder";
import AddProduct from "../pages/admin/add-product-page/AddProduct";
import DashboardHome from "../pages/admin/dashboard-home-page/DashboardHome";
import Profile from "../pages/client/profile-page/Profile";
import Payment from "../pages/client/payment-page/Payment";
import Order from "../pages/client/order-page/Order";
import UserMain from "../pages/client/user-main-page/UserMain";
import PrivateRoute from './PrivateRoute';
import AdminMain from "../pages/admin/admin-main-page/AdminMain";
import AllUsers from "../pages/admin/all-users-page/AllUsers";
import AdminHome from "../pages/admin/admin-home-page/AdminHome";
import UserDashboard from './../pages/client/user-dashboard/UserDashboard';
import OrderDetails from "../pages/client/order-page/OrderDetails";


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
            },
            {
                path:"/order-details/:id",
                element : <OrderDetails></OrderDetails>
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
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
            // user routes start
            {
                path:"",
                element : <UserDashboard/>,
            },
            {
                path: "profile",
                element: <Profile></Profile>
            },
            {
                path: "payments",
                element: <Payment></Payment>
            },
            {
                path: "orders",
                element: <Order></Order>
            },
            // admin routs start
            {
                path: "admin",
                element: <PrivateRoute role={"admin"} > <AdminHome/> </PrivateRoute>
            },
            {
                path: "manage-items",
                element: <PrivateRoute role={"admin"} > <ManageItem></ManageItem> </PrivateRoute>
            },
            {
                path: "all-orders",
                element: <PrivateRoute role={"admin"} ><AllOrder></AllOrder></PrivateRoute>
            },
            // admin routes end
            {
                path: "add-products",
                element: <PrivateRoute role={"admin"} ><AddProduct></AddProduct></PrivateRoute>
            },
            {
                path: "users",
                element: <PrivateRoute role={"admin"} > <AllUsers></AllUsers> </PrivateRoute>
            },


        ]
    },


])