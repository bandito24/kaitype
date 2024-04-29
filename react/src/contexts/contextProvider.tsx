import {createContext, useState, useContext} from "react";
import { UserType} from "@/lib/types.tsx";


type StateContextType = {
    user: UserType | null;
    token: string | null;
    setUser: (user: UserType | null) => void;
    setToken: (token: string | null) => void;
};

const StateContext = createContext<StateContextType>({
    user: null,
    token: null,
    setUser: (): void => {},
    setToken: (): void => {},
});

export const ContextProvider = ({children}) => {
    const storedUserString = localStorage.getItem('USER');
    const storedUser: UserType | null = storedUserString ? JSON.parse(storedUserString) : null;

    const [user, _setUser] = useState<UserType | null>(() => storedUser);
    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN' || null));


    const handleSetToken = (newToken: string | null) => {
        _setToken(newToken);
        if (newToken) {
            localStorage.setItem("ACCESS_TOKEN", newToken);
            console.log('token set')
        } else {
            localStorage.removeItem("ACCESS_TOKEN");
            console.log('token removed')
        }
    };

    const handleSetUser = (newUser: UserType | null) => {
        _setUser(newUser);
        if (newUser) {
            localStorage.setItem("USER", JSON.stringify(newUser));
            console.log('user set')
        } else {
            localStorage.removeItem("USER");
            console.log('user removed')
        }
    };



    return (
        <StateContext.Provider value={{
            user,
            token,
            setUser: handleSetUser,
            setToken: handleSetToken
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)