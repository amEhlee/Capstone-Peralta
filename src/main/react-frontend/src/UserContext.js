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
            email:"PlaceHolderUserEmail",
            address:"PlaceHolderUserAddress",
            phone:"PlaceHolderUserPhone",
            postalcode:"PlaceHolderUserPostalcode",
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
