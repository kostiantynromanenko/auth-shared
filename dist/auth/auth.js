import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext } from 'react';
import { Navigate, useLocation } from "react-router-dom";
export var AuthContext = createContext({
    user: null,
    signIn: function () { return Promise.resolve(); },
    signOut: function () { return Promise.resolve(); },
});
export var useAuth = function () { return useContext(AuthContext); };
export var RequiresAuth = function (_a) {
    var children = _a.children, signOutPath = _a.signOutPath;
    var user = useAuth().user;
    var location = useLocation();
    if (!user) {
        return _jsx(Navigate, { to: signOutPath || '/login', state: { from: location }, replace: true });
    }
    return children;
};
