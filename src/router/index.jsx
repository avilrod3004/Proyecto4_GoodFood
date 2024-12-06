import {createBrowserRouter} from "react-router-dom";
import LayoutPublic from "../layouts/LayoutPublic.jsx";
import LayoutPrivate from "../layouts/LayoutPrivate.jsx";
import Home from "../pages/Home.jsx";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import React from "react";

const QuickRecipes = React.lazy(() => import("../pages/QuickRecipes"));
const ContactUs = React.lazy(() => import("../pages/ContactUs.jsx"));
const Breakfast = React.lazy(() => import("../pages/Breakfast"));
const LunchDinner = React.lazy(() => import("../pages/LunchDinner"));
const UserProfile = React.lazy(() => import("../pages/UserProfile"));
const NotFound = React.lazy(() => import("../pages/NotFound"));
const RecipeInfo = React.lazy(() => import("../pages/RecipeInfo"));
const UpdateUserProfile = React.lazy(() => import("../pages/UpdateUserProfile"));

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
        path: "/recipe/:id",
        element: <LayoutPrivate/>,
        errorElement: <NotFound/>,
        children: [
            {
                index: true,
                element: <RecipeInfo/>
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
    },
    {
        path: "/profile/update",
        element: <LayoutPrivate/>,
        errorElement: <NotFound/>,
        children: [
            {
                index: true,
                element: <UpdateUserProfile/>
            }
        ]
    }

])