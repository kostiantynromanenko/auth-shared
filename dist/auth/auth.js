import { createContext, useContext } from 'react';
export var AuthContext = createContext({
    user: null,
    isLoading: true,
    error: null,
    signIn: function () { return Promise.resolve(); },
    signInWithRedirect: function () { return Promise.resolve(); },
    signOut: function () { return Promise.resolve(); },
    handleAuthRedirect: function () { return Promise.resolve(); },
    authService: null
});
export var useAuth = function () { return useContext(AuthContext); };
