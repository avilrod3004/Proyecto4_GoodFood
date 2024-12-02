import React, {useContext, useEffect, useState} from 'react';
import {UserContext} from "../context/UserContext.jsx";
import {getUserData} from "../config/Firebase.jsx";

const UserProfile = () => {
    const {user, setUser} = useContext(UserContext);
    const [userData, setUserData] = useState(null);

    const fetchUserData = async (uid) => {
        const data = await getUserData(uid);
        if (data) {
            console.log("Datos del usuario:", data);
            setUserData(data);
        }
    };

    useEffect(() => {
        fetchUserData(user.uid);
    }, [])

    return (
        <div>
            Hola!!! {userData ? userData.userName : "No hay usuario"}
        </div>
    );
};

export default UserProfile;