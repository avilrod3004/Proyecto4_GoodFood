import {StrictMode, Suspense} from 'react'
import { createRoot } from 'react-dom/client'
import {RouterProvider} from "react-router-dom";
import {router} from "./router/index.jsx";
import UserProvider from "./context/UserContext.jsx";
import './sass/main.scss';
import ThemeProvider from "./context/ThemeContext.jsx";
import Loading from "./components/Loading.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Suspense fallback={<Loading/>}>
        <ThemeProvider>
            <UserProvider>
                <RouterProvider router={router}/>
            </UserProvider>
        </ThemeProvider>
    </Suspense>
  </StrictMode>
)
