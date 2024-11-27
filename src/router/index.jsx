import {createBrowserRouter} from "react-router-dom";
import LayoutPublic from "../layouts/LayoutPublic.jsx";
import LayoutPrivate from "../layouts/LayoutPrivate.jsx";
import Home from "../pages/Home.jsx";
import ContactUs from "../pages/ContactUs.jsx";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import React from "react";

const QuickRecipes = React.lazy(() => import("../pages/QuickRecipes"));
const Breakfast = React.lazy(() => import("../pages/Breakfast"));
const LunchDinner = React.lazy(() => import("../pages/LunchDinner"));
const UserProfile = React.lazy(() => import("../pages/UserProfile"));
const NotFound = React.lazy(() => import("../pages/NotFound"));

export const router = createBrowserRouter([

    {
        path: "/",
        element: <LayoutPublic/>,
        errorElement: <NotFound/>,
        children: [
            {
                index: true,
                element: <Home/>
            }
        ]
    },
    {
        path: "/login",
        element: <LayoutPublic/>,
        errorElement: <NotFound/>,
        children: [
            {
                index: true,
                element: <Login/>
            }
        ]
    },
    {
        path: "/register",
        element: <LayoutPublic/>,
        errorElement: <NotFound/>,
        children: [
            {
                index: true,
                element: <Register/>
            }
        ]
    },
    {
        path: "/quickrecipes",
        element: <LayoutPrivate/>,
        errorElement: <NotFound/>,
        children: [
            {
                index: true,
                element: <QuickRecipes/>
            }
        ]
    },
    {
        path: "/breakfast",
        element: <LayoutPrivate/>,
        errorElement: <NotFound/>,
        children: [
            {
                index: true,
                element: <Breakfast/>
            }
        ]
    },
    {
        path: "/lunchdinner",
        element: <LayoutPrivate/>,
        errorElement: <NotFound/>,
        children: [
            {
                index: true,
                element: <LunchDinner/>
            }
        ]
    },
    {
        path: "/contactus",
        element: <LayoutPublic/>,
        errorElement: <NotFound/>,
        children: [
            {
                index: true,
                element: <ContactUs/>
            }
        ]
    },
    {
        path: "/profile",
        element: <LayoutPrivate/>,
        errorElement: <NotFound/>,
        children: [
            {
                index: true,
                element: <UserProfile/>
            }
        ]
    }

])