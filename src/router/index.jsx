import {createBrowserRouter} from "react-router-dom";
import LayoutPublic from "../layouts/LayoutPublic.jsx";
import LayoutPrivate from "../layouts/LayoutPrivate.jsx";
import Home from "../pages/Home.jsx";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import React from "react";
import AllRecipes from "../pages/AllRecipes.jsx";

const QuickRecipes = React.lazy(() => import("../pages/QuickRecipes"));
const ContactUs = React.lazy(() => import("../pages/ContactUs.jsx"));
const Breakfast = React.lazy(() => import("../pages/Breakfast"));
const LunchDinner = React.lazy(() => import("../pages/LunchDinner"));
const UserProfile = React.lazy(() => import("../pages/UserProfile"));
const NotFound = React.lazy(() => import("../pages/NotFound"));
const RecipeInfo = React.lazy(() => import("../pages/RecipeInfo"));
const UpdateUserProfile = React.lazy(() => import("../pages/UpdateUserProfile"));

const publicRoutes = [
    { path: "/", element: <Home /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/contactus", element: <ContactUs /> },
];

const privateRoutes = [
    { path: "/recipe/:id", element: <RecipeInfo /> },
    { path: "/quickrecipes", element: <QuickRecipes /> },
    { path: "/breakfast", element: <Breakfast /> },
    { path: "/lunchdinner", element: <LunchDinner /> },
    { path: "/allrecipes", element: <AllRecipes /> },
    { path: "/profile", element: <UserProfile /> },
    { path: "/profile/update", element: <UpdateUserProfile /> },
];

export const router = createBrowserRouter([
    {
        path: "/",
        element: <LayoutPublic />,
        errorElement: <NotFound />,
        children: publicRoutes.map((route) => ({
            index: route.path === "/" ? true : undefined,
            ...route,
        })),
    },
    {
        path: "/",
        element: <LayoutPrivate />,
        errorElement: <NotFound />,
        children: privateRoutes.map((route) => ({
            index: route.path === "/recipe/:id" ? true : undefined,
            ...route,
        })),
    },
]);
