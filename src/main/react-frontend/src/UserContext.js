import React, { useState } from "react";

export const UserContext = React.createContext();

export function UserProvider(props) {
    const [contextData, setContextData] = useState({
        user: null,
        token: null,
        cart: [],
    });
    return (
        <UserContext.Provider value={{ contextData, setContextData }}>
            {props.children}
        </UserContext.Provider>
    );
}
