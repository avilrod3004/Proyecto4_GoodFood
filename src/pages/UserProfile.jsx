import React, {useContext} from 'react';
import {UserContext} from "../context/UserContext.jsx";

const UserProfile = () => {
    const {user, setUser} = useContext(UserContext);
    const userDB;

    return (
        <div>
            Hola!!! {user.email}
        </div>
    );
};

export default UserProfile;