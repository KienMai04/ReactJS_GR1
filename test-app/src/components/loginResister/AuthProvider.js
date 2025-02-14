import React, { createContext, useState } from 'react';

// Tạo Context
const AuthContext = createContext({});

// Tạo Provider
export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
