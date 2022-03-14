import React, { useState } from "react";

export const UserContext = React.createContext();

export function UserProvider(props) {
    const [contextData, setContextData] = useState({
        user: {
            userid: 1,
            username: "PlaceHolderUsername",
            password: "HashedPassword",
            userFirstName: "PlaceHolderUserFirstname",
            userLastName: "PlaceHolderUserLastname",
        },
        token: "PlaceHolderToken",
        cart: [],
    });
    return (
        <UserContext.Provider value={{ contextData, setContextData }}>
            {props.children}
        </UserContext.Provider>
    );
}
