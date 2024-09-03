// UserContext.js
import React, { createContext, useState, useEffect } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Fetch user data on initial load
        async function fetchUser() {
            try {
                const response = await fetch('/api/user');
                const data = await response.json();
                setUser(data);
            } catch (error) {
                console.error('Failed to fetch user data:', error);
            }
        }

        fetchUser();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    return React.useContext(UserContext);
}
