import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    const registerUser = async (email, password) => {
        const fakeUser = {
            email,
            username: email.split('@')[0],
            photo: null,
        };
        localStorage.setItem("user", JSON.stringify(fakeUser));
        setCurrentUser(fakeUser);
        return fakeUser;
    };

    const loginUser = async (email, password) => {
        // accepts any email/password
        const fakeUser = {
            email,
            username: email.split('@')[0],
            photo: null,
        };
        localStorage.setItem("user", JSON.stringify(fakeUser));
        setCurrentUser(fakeUser);
        return fakeUser;
    };

    const signInWithGoogle = async () => {
        // Fake Google sign-in
        const fakeGoogleUser = {
            email: "testuser@gmail.com",
            username: "GoogleUser",
            photo: "null",
        };
        localStorage.setItem("user", JSON.stringify(fakeGoogleUser));
        setCurrentUser(fakeGoogleUser);
        return fakeGoogleUser;
    };

    const logout = () => {
        localStorage.removeItem("user");
        setCurrentUser(null);
    };

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setCurrentUser(JSON.parse(storedUser));
        }
    }, []);

    const value = {
        currentUser,
        registerUser,
        loginUser,
        signInWithGoogle,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
