import React, {useContext} from 'react';
import {UserContext} from "../context/UserContext.jsx";
import {Navigate, useNavigate} from "react-router-dom";

const UserProfile = () => {
    const {user, setUser} = useContext(UserContext);

    return (
        <>
            {
                user
                    ? <h1>Hola</h1>
                    : <Navigate to="/"/>
            }
        </>
    );
};

export default UserProfile;