import { createContext, useContext } from 'react';
export var AuthContext = createContext({
    user: null,
    signIn: function () { return Promise.resolve(); },
    signOut: function () { return Promise.resolve(); },
});
export var useAuth = function () { return useContext(AuthContext); };
