import React, {createContext, useState} from 'react';

export const UserContext = createContext(false);

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(false);

    if (user === null)
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;