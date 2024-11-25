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

export const router = createBrowserRouter([

    {
        path: "/",
        element: <LayoutPublic/>,
        errorElement: <NotFound/>,
        children: [
            {
                errorElement: <NotFound/>,
                children: [
                    {
                        // path: "/",
                        index: true,
                        element: <Home/>
                    },
                    {
                        path: "/login",
                        element: <Login/>
                    },
                    {
                        path: "/register",
                        element: <Register/>
                    },
                    {
                        path: "/quickrecipes",
                        element: <QuickRecipes/>,
                    },
                    {
                        path: "/breakfast",
                        element: <Breakfast/>
                    },
                    {
                        path: "lunchdinner",
                        element: <LunchDinner/>
                    },
                    {
                        path: "/contactus",
                        element: <ContactUs/>
                    },
                    {
                        path: "/profile",
                        element: <UserProfile/>
                    }
                ]
            }
        ]
    }

])