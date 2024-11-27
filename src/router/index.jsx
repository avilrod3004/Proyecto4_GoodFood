import {createBrowserRouter} from "react-router-dom";
import LayoutPublic from "../layouts/LayoutPublic.jsx";
import NotFound from "../pages/NotFound.jsx";
import Home from "../pages/Home.jsx";
import QuickRecipes from "../pages/QuickRecipes.jsx";
import Breakfast from "../pages/Breakfast.jsx";
import LunchDinner from "../pages/LunchDinner.jsx";
import ContactUs from "../pages/ContactUs.jsx";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import UserProfile from "../pages/UserProfile.jsx";
import LayoutPrivate from "../layouts/LayoutPrivate.jsx";

export const router = createBrowserRouter([

    {
        path: "/",
        element: <LayoutPublic/>,
        errorElement: <NotFound/>,
        children: [
            {
                // path: "/",
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